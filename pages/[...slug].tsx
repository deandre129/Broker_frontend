import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
// import BrokerArticlePage from '@/components/BrokerArticlePage';
// import CategoryPage from '@/components/CategoryPage';
// import Layout from '@/components/Layout';
import moment from 'moment';
// import NormalPage from '@/components/NormalPage';
import ScrollTo from '@/components/ScrollTo';
import urlParse from 'url-parse';
import axios from 'axios';
import config from '@/config';
import authAxios from '@/modules/shared/axios/authAxios';
import dynamic from 'next/dynamic';
import Spinner from '@/components/shared/Spinner';

const BrokerArticlePage = dynamic(() => import('@/components/BrokerArticlePage'), { loading: () => <Spinner />});
const CategoryPage = dynamic(() => import('@/components/CategoryPage'), { loading: () => <Spinner />});
const Layout = dynamic(() => import('@/components/Layout'));
const NormalPage = dynamic(() => import('@/components/NormalPage'), { loading: () => <Spinner />});

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
        navigation={navigation}
        topBroker={topBroker}
        category={category}
        mostRead={mostRead}
        featuredBrokers={featuredBrokers}
        forexSchool={forexSchool}
        forexStrategy={forexStrategy}
        promotion={promotion}
        categoryFooter={categoryFooter}
        brokerComparable={brokerComparable} 
        record={undefined}
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

  const [
    categoryRes,
    generalPageRes,
    articleRes
    ] = await Promise.all([
      authAxios.post(`${config.backendUrl}/category`,{url}),
      authAxios.post(`${config.backendUrl}/general-page`,{url}),
      authAxios.post(`${config.backendUrl}/broker-article`,{url})
  ])

  if(categoryRes.data){
    page = categoryRes.data;
    pageType = "category";
  }
  else if(generalPageRes.data){
    page = generalPageRes.data;
    pageType = "page";
  }
  else if(articleRes.data){
    page = articleRes.data;
    pageType = "article";
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
    baseRes,
    allBrokerRes,
    ] = await Promise.all([
    axios.get(`${config.backendUrl}/base`),
    axios.get(`${config.backendUrl}/broker`, {params}),
  ])
  const topBroker = baseRes.data.brokerTop;
  const category = baseRes.data.categorySidebar;
  const mostRead = baseRes.data.mostRead;
  const featuredBrokers = baseRes.data.brokerFeatured;
  const forexSchool = baseRes.data.forexSchool;  
  const forexStrategy = baseRes.data.forexStrategy;
  const promotion = baseRes.data.promotion;
  const navigation = baseRes.data.navigation;
  const categoryFooter = baseRes.data.footer;
  const author = baseRes.data.author;
  const brokerComparable = baseRes.data.brokerComparable;
  const allBroker = allBrokerRes.data;

  return { props: { brokerComparable, allBroker, slug, pageType, author, page, topBroker, category, mostRead, featuredBrokers, forexSchool, forexStrategy, promotion, navigation, categoryFooter } };
};

export default GeneralPage;
