import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import brokerArticleHomeSelectors from '@/modules/brokerArticle/home/brokerArticleHomeSelectors';
import BrokerArticlePage from '@/components/BrokerArticlePage';
import categoryHomeActions from '@/modules/category/home/categoryHomeActions';
import categoryHomeSelectors from '@/modules/category/home/categoryHomeSelectors';
import CategoryPage from '@/components/CategoryPage';
import Layout from '@/components/Layout';
import moment from 'moment';
import NormalPage from '@/components/NormalPage';
import pageHomeSelectors from '@/modules/page/home/pageHomeSelectors';
import ScrollTo from '@/components/ScrollTo';
import Spinner from '@/components/shared/Spinner';
import urlParse from 'url-parse';
import axios from 'axios';
import config from '@/config';
import authAxios from '@/modules/shared/axios/authAxios';

const GeneralPage = ({slug, author, allBroker, pageType, page, topBroker, category, mostRead, featuredBrokers, forexSchool, forexStrategy, promotion, navigation, categoryFooter}) => {

  const router = useRouter();

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

  console.log(slug);
  let url ="";
  for(let i=0; slug[i] ;i++){
    url+="/"+slug[i];
  }
  console.log(url);
  
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
        // window.open(config.frontendUrl.protocol+"://"+config.frontendUrl.host+"/404");
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

  const allBrokerRes = await axios.get(`${config.backendUrl}/broker`, {params});
  const allBroker = allBrokerRes.data;
  
  const topBrokerRes = await axios.get(`${config.backendUrl}/broker/top`);
  const topBroker = topBrokerRes.data;

  const categoryRes = await axios.get(`${config.backendUrl}/category/sidebar`);
  const category = categoryRes.data;

  const mostReadRes = await axios.get(`${config.backendUrl}/navigation/most-read`);
  const mostRead = mostReadRes.data;

  const featuredBrokersRes = await axios.get(`${config.backendUrl}/broker/featured`);
  const featuredBrokers = featuredBrokersRes.data;

  const forexSchoolRes = await axios.get(`${config.backendUrl}/navigation/forex-school`);
  const forexSchool = forexSchoolRes.data;  

  const forexStrategyRes = await axios.get(`${config.backendUrl}/navigation/forex-strategy`);
  const forexStrategy = forexStrategyRes.data;
  
  const promotionRes = await axios.get(`${config.backendUrl}/promotion`);
  const promotion = promotionRes.data;

  const navigationRes = await axios.get(`${config.backendUrl}/navigation`);
  const navigation = navigationRes.data;

  const categoryFooterRes = await axios.get(`${config.backendUrl}/category/footer`);
  const categoryFooter = categoryFooterRes.data;

  const authorRes = await axios.get(`${config.backendUrl}/author`);
  const author = authorRes.data;

  return { props: { allBroker, slug, pageType, author, page, topBroker, category, mostRead, featuredBrokers, forexSchool, forexStrategy, promotion, navigation, categoryFooter } };
};

export default GeneralPage;
