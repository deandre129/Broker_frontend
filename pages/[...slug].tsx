import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import BrokerArticlePage from '@/components/BrokerArticlePage';
import CategoryPage from '@/components/CategoryPage';
import Layout from '@/components/Layout';
import moment from 'moment';
import NormalPage from '@/components/NormalPage';
import ScrollTo from '@/components/ScrollTo';
import urlParse from 'url-parse';
import axios from 'axios';
import config from '@/config';
import authAxios from '@/modules/shared/axios/authAxios';

const GeneralPage = ({ brokerComparable, slug, author, allBroker, pageType, page, topBroker, category, mostRead, featuredBrokers, forexSchool, forexStrategy, promotion, navigation, categoryFooter}) => {

  const router = useRouter();
  if(pageType == 'error'){
    router.push('/404');
  }

  useEffect(() => {
    const url = "/"+slug;
    const handleOnClickA = (evt) => {
      if (evt.target.tagName.toLowerCase() === 'a') {
        const parsedUrl = urlParse(evt.target.href);
        if (
          parsedUrl.pathname === url &&
          parsedUrl.hash !== ''
        ) {
          evt.preventDefault();
          evt.stopPropagation();
          evt.stopImmediatePropagation();
          ScrollTo(
            decodeURI(
              parsedUrl.hash
                .substring(1)
                .replace(/\%\%/g, '%25%'),
            ),
          );
        }
      }
    };
    window.addEventListener('click', handleOnClickA);
    return () =>
      window.removeEventListener('click', handleOnClickA);
  }, [router.asPath]);

  let title = '';
  let keywords = [];
  let description = '';

  if (pageType=="category") {
    title = `${
      page.name
    } Vergleich ${moment().year()} » 100% unabhängiger Test`;
      keywords = [page.name, 'Vergleich', 'Test'];
      description = `100% unabhängiger ${
        page.name
      } Vergleich ✚✚ Über ${page.count ?? 0} ${
        page.name
      } im Test mit Erfahrungsberichten von Tradern ➔ Jetzt lesen!`;
    }

    if (pageType=="page") {
      title = page.title;
      keywords = [page.meta_keywords];
      description = page.meta_description;
    }

    if (pageType=='article') {
      title = page.pagetitle;
      keywords = [page.metakeywords];
      description = page.metadescription;
    }

  return (
    <>
      <Layout
        title={title}
        keywords={keywords}
        description={description}

        author={author}
        navigation = {navigation}
        topBroker = {topBroker}
        category = { category }
        mostRead = { mostRead }
        featuredBrokers = { featuredBrokers }
        forexSchool = { forexSchool }
        forexStrategy = { forexStrategy }
        promotion = { promotion }
        categoryFooter = { categoryFooter }
        brokerComparable={brokerComparable}
      >
        {pageType == "category" && (
          <CategoryPage category={page} topBroker={topBroker} navigation = {navigation} allBroker = {allBroker} author={author}/>
        )}
        {pageType == "page" && (
          <NormalPage page={page} topBroker={topBroker} navigation = {navigation} author={author}/>
        )}
        { pageType == "article" && (
            <BrokerArticlePage
              navigation = {navigation}
              brokerArticle={page}
              topBroker = { topBroker }
              author={author}
            />
          )}
      </Layout>
    </>
  );
};



export async function getServerSideProps(context) {
  const { query } = context
  const { slug } = query;
  let url ="";
  for(let i=0; slug[i] ;i++){
    url+="/"+slug[i];
  }
  
  let page: any;
  let pageType : any;
  let pageRes: any;

  pageRes = await authAxios.post(`${config.backendUrl}/category`,{url});
  page = pageRes.data;
  if(page){
    pageType = "category";
  }
  else{
    page =null;
    pageRes = await authAxios.post(`${config.backendUrl}/general-page`,{url});
    page = pageRes.data;
    if(page){
      pageType = "page";
      if(page.downloadPdf) {
        window.location.href = page.downloadUrl;
      }
    }
    else {
      page = null;
      pageRes = await authAxios.post(`${config.backendUrl}/broker-article`,{url});
      page = pageRes.data;
      if(page){
        pageType = "article";
        if(page.downloadPdf) {
          window.location.href = page.downloadUrl;
        }
      }
      else{
        pageType= "error";
        //window.open(config.frontendUrl.protocol+"://"+config.frontendUrl.host+"/404");
      }
    }
  }


  const sortField = query.field ? query.field : 'name';
  const sortOrder = query.orderBy ? query.orderBy : "asc";


  const filter = {
    activated: query.activated ? query.activated : true,
    category: page.id? page.id : 0
  }
  
  const params = {
    filter: filter,
    orderBy: sortField+"_"+sortOrder,
    limit: null,
    offset: 1,
  }

  const [
    topBrokerRes,
    categoryRes,
    mostReadRes,
    featuredBrokersRes,
    forexSchoolRes,
    forexStrategyRes,
    promotionRes,
    navigationRes,
    categoryFooterRes,
    authorRes,
    allBrokerRes,
    brokerComparableRes,
    ] = await Promise.all([
    axios.get(`${config.backendUrl}/broker/top`),
    axios.get(`${config.backendUrl}/category/sidebar`),
    axios.get(`${config.backendUrl}/navigation/most-read`),
    axios.get(`${config.backendUrl}/broker/featured`),
    axios.get(`${config.backendUrl}/navigation/forex-school`),
    axios.get(`${config.backendUrl}/navigation/forex-strategy`),
    axios.get(`${config.backendUrl}/promotion`),
    axios.get(`${config.backendUrl}/navigation`),
    axios.get(`${config.backendUrl}/category/footer`),
    axios.get(`${config.backendUrl}/author`),
    axios.get(`${config.backendUrl}/broker`, {params}),
    axios.get(`${config.backendUrl}/broker/comparable`),
  ])
  const topBroker = topBrokerRes.data;
  const category = categoryRes.data;
  const mostRead = mostReadRes.data;
  const featuredBrokers = featuredBrokersRes.data;
  const forexSchool = forexSchoolRes.data;  
  const forexStrategy = forexStrategyRes.data;
  const promotion = promotionRes.data;
  const navigation = navigationRes.data;
  const categoryFooter = categoryFooterRes.data;
  const author = authorRes.data;
  const allBroker = allBrokerRes.data;
  const brokerComparable = brokerComparableRes.data;

  return { props: { brokerComparable, allBroker, slug, pageType, author, page, topBroker, category, mostRead, featuredBrokers, forexSchool, forexStrategy, promotion, navigation, categoryFooter } };
};

export default GeneralPage;
