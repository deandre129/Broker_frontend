/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
// import BrokerArticlePage from '@/components/BrokerArticlePage';
// import CategoryPage from '@/components/CategoryPage';
import Layout from '@/components/Layout';
import moment from 'moment';
// import NormalPage from '@/components/NormalPage';
import ScrollTo from '@/components/ScrollTo';
import urlParse from 'url-parse';
import axios from 'axios';
import config from '@/config';
import authAxios from '@/modules/shared/axios/authAxios';
import dynamic from 'next/dynamic';
import Spinner from '@/components/shared/Spinner';
import { initPiwik } from '@/utils/piwik';

const BrokerArticlePage = dynamic(() => import('@/components/BrokerArticlePage'), { loading: () => <Spinner />});
const CategoryPage = dynamic(() => import('@/components/CategoryPage'), { loading: () => <Spinner />});
const NormalPage = dynamic(() => import('@/components/NormalPage'), { loading: () => <Spinner />});
const Topbar = dynamic(() => import('@/components/Topbar'), {});

const GeneralPage = ({ broker, topbarList, downloadPdf, slug, author, allBroker, pageType, page, topBroker, category, mostRead, featuredBrokers, forexSchool, forexStrategy, promotion, navigation, categoryFooter}) => {

  const router = useRouter();

  const [record, setRecord] = useState(broker);

  useEffect(() => {
    if(!page) {
      router.push('/404');
    }
    // if(pageType == 'article') {
    //   const url = page.broker.name_normalized;
    //   const recordRes = axios.post(`${config.backendUrl}/broker`, { url })
    //   .then(res => {
    //     setRecord(res.data)
    //   })
    // } else {
    //   setRecord(null);
    // }
  }, [page, router.asPath]);

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
    } ${moment().year()} » 100% unabhängiger Test`;
    keywords = [page.name, 'Vergleich', 'Test'];
    description = `100% unabhängiger ${
      page.name
    } ✚✚ Über ${page.count ?? 0} ${
      page.name
    } im Test mit Erfahrungsberichten von Tradern ➔ Jetzt lesen!`;
  }else if (pageType=="page") {
    title = page.title;
    keywords = [page.meta_keywords];
    description = page.meta_description;
  }else if (pageType=='article') {
    title = page.pagetitle;
    keywords = [page.metakeywords];
    description = page.metadescription;
  } else {
    //router.push('/404');
   
  }

  return (
    <>
      {topbarList && topbarList.rows[0].data.activated  == true && (
        <Topbar topbar = {topbarList} slug={slug[0]}/>
      )}
      <Layout
        title={title}
        keywords={keywords}
        description={description}
        record={record}
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
      >
        {pageType == "category" && (
          <CategoryPage category={page} topBroker={topBroker} navigation = {navigation} allBroker = {allBroker} author={author}/>
        )}
        {pageType == "page" && (
          <NormalPage page={page} topBroker={topBroker} navigation = {navigation} author={author} downloadPdf={downloadPdf}/>
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

export async function getStaticPaths() {
  const res = await axios.get(`${config.backendUrl}/generalPath`);
  const posts = await res.data;
 
  // Get the paths we want to pre-render based on posts
  const paths = posts.allPaths.map((post) => ({
    params: { slug: post.split('/') },
  }));
 
  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({params}) {
  const slug = params.slug;
  let url = "";
  for(let i=0; slug[i] ;i++){
    url+="/"+slug[i];
  }
  
  let page: any;
  let pageType : any;

  const [
    categoryRes,
    generalPageRes,
    articleRes,
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

  let downloadUrl;
  if(page?.navigation) {
    downloadUrl = page.navigation?.link + '.pdf';
  } else if(page && page?.link !== '') {
    downloadUrl = page.link  + '.pdf';
  } else {
    downloadUrl = "";
  }

  const filter = {
    activated: true,
    category: page?.id? page?.id : 0
  }
  
  // const params = {
  //   filter: filter,
  //   orderBy: "name_asc",
  //   limit: null,
  //   offset: 1,
  // }

  const [
    baseRes,
    allBrokerRes,
    downloadPdfRes,
    ] = await Promise.all([
    axios.get(`${config.backendUrl}/base`),
    axios.get(`${config.backendUrl}/broker`, {params: {
      filter: filter,
      orderBy: "name_asc",
      limit: null,
      offset: 1,
    }}),
    authAxios.post(`/general-page`, {url:downloadUrl}),
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
  const downloadPdf = downloadPdfRes.data;
  const topbarList = baseRes.data.topbarList;
  let brokerRes;
  let broker = null;
  if(page && pageType == 'article') {
    const url = page?.broker.name_normalized;
    brokerRes = await axios.post(`${config.backendUrl}/broker`, { url });
    broker = brokerRes.data;
  }

  return { 
    props: { broker, topbarList, downloadPdf, brokerComparable, allBroker, slug, pageType, author, page, topBroker, category, mostRead, featuredBrokers, forexSchool, forexStrategy, promotion, navigation, categoryFooter },
    revalidate: 300,
  };
};

// export async function getServerSideProps(context) {
//   const { query } = context
//   const { slug } = query;
//   let url ="";
//   for(let i=0; slug[i] ;i++){
//     url+="/"+slug[i];
//   }
  
//   let page: any;
//   let pageType : any;

//   const [
//     categoryRes,
//     generalPageRes,
//     articleRes,
//     ] = await Promise.all([
//       authAxios.post(`${config.backendUrl}/category`,{url}),
//       authAxios.post(`${config.backendUrl}/general-page`,{url}),
//       authAxios.post(`${config.backendUrl}/broker-article`,{url})
//   ])

//   if(categoryRes.data){
//     page = categoryRes.data;
//     pageType = "category";
//   }
//   else if(generalPageRes.data){
//     page = generalPageRes.data;
//     pageType = "page";
//   }
//   else if(articleRes.data){
//     page = articleRes.data;
//     pageType = "article";
//   }

//   let downloadUrl;
//   if(page?.navigation) {
//     downloadUrl = page.navigation?.link + '.pdf';
//   } else if(page && page.link !== '') {
//     downloadUrl = page.link  + '.pdf';
//   } else {
//     downloadUrl = "";
//   }
  
//   const sortField = query.field ? query.field : 'name';
//   const sortOrder = query.orderBy ? query.orderBy : "asc";

//   const filter = {
//     activated: query.activated ? query.activated : true,
//     category: page.id? page.id : 0
//   }
  
//   const params = {
//     filter: filter,
//     orderBy: sortField+"_"+sortOrder,
//     limit: null,
//     offset: 1,
//   }

//   const [
//     baseRes,
//     allBrokerRes,
//     downloadPdfRes,
//     generalRes,
//     topbarListRes,
//     ] = await Promise.all([
//     axios.get(`${config.backendUrl}/base`),
//     axios.get(`${config.backendUrl}/broker`, {params}),
//     authAxios.post(`/general-page`, {url:downloadUrl}),
//     axios.get(`${config.backendUrl}/generalPath`),
//     axios.get(`${config.backendUrl}/topbarList`),
//   ])
//   const topBroker = baseRes.data.brokerTop;
//   const category = baseRes.data.categorySidebar;
//   const mostRead = baseRes.data.mostRead;
//   const featuredBrokers = baseRes.data.brokerFeatured;
//   const forexSchool = baseRes.data.forexSchool;  
//   const forexStrategy = baseRes.data.forexStrategy;
//   const promotion = baseRes.data.promotion;
//   const navigation = baseRes.data.navigation;
//   const categoryFooter = baseRes.data.footer;
//   const author = baseRes.data.author;
//   //const brokerComparable = baseRes.data.brokerComparable;
//   const allBroker = allBrokerRes.data;
//   const downloadPdf = downloadPdfRes.data;
//   const allPath = generalRes.data;
//   const topbarList = topbarListRes.data;

//   let brokerRes;
//   let broker = null;
//   if(page && pageType == 'article') {
//     const url = page?.broker.name_normalized;
//     brokerRes = await axios.post(`${config.backendUrl}/broker`, { url });
//     broker = brokerRes.data;
//   }

//   return { props: { broker, topbarList, allPath, downloadPdf, allBroker, slug, pageType, author, page, topBroker, category, mostRead, featuredBrokers, forexSchool, forexStrategy, promotion, navigation, categoryFooter } };
// };

export default GeneralPage;