/* eslint-disable @next/next/no-img-element */
import { HtmlViewWrapper } from '@/components/shared/view/HtmlView';
import i18n from '@/i18n';
import { CardMedia, TableContainer } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic';
// import Breadcrumb from '@/components/Breadcrumb';
import Layout from '@/components/Layout';
// import MDTypography from '@/mui/components/MDTypography';
import moment from 'moment';
// import PageContent from '@/components/shared/view/PageContent';
import TopBrokersView from '@/components/broker/components/TopBrokersView';
import AuthorView from '@/components/shared/view/AuthorView';
// import MDBox from '@/mui/components/MDBox';
// import DefaultCategoryDescription from '@/components/DefaultCategoryDescription';
// import DashBorder from '@/components/shared/DashBorder';
import axios, { all } from 'axios';
import config from '@/config';
import React from 'react';
import DataTableBodyCell from '@/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from '@/mui/shared/Tables/DataTable/DataTableHeadCell';
import MaterialLink from '@mui/material/Link';
// import RatingListItem from '@/components/shared/table/RatingListItem';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import Image from 'next/image';
import Spinner from '@/components/shared/Spinner';
import LazyLoad from 'react-lazyload';

const MDBox = dynamic(() => import('@/mui/components/MDBox'));
const Breadcrumb = dynamic(() => import('@/components/Breadcrumb'));
const MDTypography = dynamic(() => import('@/mui/components/MDTypography'));
const PageContent = dynamic(() => import('@/components/shared/view/PageContent'), { loading: () => <Spinner />});
const DefaultCategoryDescription = dynamic(() => import('@/components/DefaultCategoryDescription'), { loading: () => <Spinner />});
const DashBorder = dynamic(() => import('@/components/shared/DashBorder'));
const RatingListItem = dynamic(() => import('@/components/shared/table/RatingListItem'));
const Table = dynamic(() => import('@mui/material/Table'), { loading: () => <Spinner />});
const TableBody = dynamic(() => import('@mui/material/TableBody'), { loading: () => <Spinner />});
const TableRow = dynamic(() => import('@mui/material/TableRow'), { loading: () => <Spinner />});
const Topbar = dynamic(() => import('@/components/Topbar'), {});

const ComparisonPage = ({ allBroker, topbarList, brokerComparable, category, author, topBrokerSidebar, categorySidebar, mostReadSidebar, featuredBrokersSidebar, forexSchoolSidebar, forexStrategySidebar, promotionSidebar, navigationSidebar, categoryFooterSidebar,}) => {
  const router = useRouter();

  const [rows, setRows] = useState(allBroker.rows);
  const [count, setCount] = useState(allBroker.count);

  const [sorter, setSorter] =useState({
    field: 'name',
    orderBy: 'asc',
  });

  const doChangeSort = (field) => {
    const order =
      sorter.field === field && sorter.orderBy === 'asc'
        ? 'desc'
        : 'asc';

    setSorter({field: field, orderBy: order})

    // router.push({
    //   pathname: router.pathname,
    //   query: { field: field, orderBy: order}
    // })

    const sortField = field ? field : 'name';
    const sortOrder = order ? order : "asc";

    const filter = {
      activated: true,
      category: 0
    }
    
    const params = {
      filter: filter,
      orderBy: sortField+"_"+sortOrder,
      limit: null,
      offset: 1,
    }

    const allBrokerRes = axios.get(
      `${config.backendUrl}/broker`, {params}
      ).then(res => {
        const allBroker = res.data;
        setRows(allBroker.rows);
        setCount(allBroker.count);
      }).catch(error => {
      })
  };


  return (
    <>
      {topbarList && topbarList.rows[0].data.activated  == true && (
        <Topbar topbar = {topbarList} slug={"broker-vergleich"}/>
      )}
      <Layout
        title={`Broker Vergleich ${moment().year()} » 100% unabhängiger Test`}
        keywords={[
          'broker bewertung',
          'broker erfahrungen',
          'broker bewertungen',
        ]}
        author={author}
        brokerComparable={brokerComparable}
        navigation={navigationSidebar}
        topBroker={topBrokerSidebar}
        category={categorySidebar}
        mostRead={mostReadSidebar}
        featuredBrokers={featuredBrokersSidebar}
        forexSchool={forexSchoolSidebar}
        forexStrategy={forexStrategySidebar}
        promotion={promotionSidebar}
        categoryFooter={categoryFooterSidebar}
        description={`100% unabhängiger Broker Vergleich ✚✚ Über ${category?.count ?? 0} Broker Vergleich im Test mit Erfahrungsberichten von Tradern ➔ Jetzt lesen!`} 
      >
        <MDBox display="flex" flexDirection="column" gap={2}>
          {category && (
            <PageContent>
              <Breadcrumb
              navigation = {navigationSidebar}
                items={[
                  {
                    name: 'Online Broker Vergleich',
                    route: '/broker-vergleich',
                  },
                ]}
              />
              <MDTypography variant="h1" pb={2}>
                Broker Vergleich
              </MDTypography>
              <HtmlViewWrapper>
                <p>
                  {i18n.entities.broker.text.broker_comparison_teaser}
                </p>
              </HtmlViewWrapper>
              <DashBorder
                my={2}
                pb={2}
                borderTop
                borderBottom
              >
                <MDTypography
                  display="block"
                  variant="h3"
                  my={2}
                >
                  {i18n.entities.home.top_brokers}
                </MDTypography>
                <TopBrokersView topBrokers={topBrokerSidebar}/>
              </DashBorder>
              <MDBox my={3}>
                <TableContainer
                  id="list-top-4-pagination"
                  sx={{ boxShadow: 'none' }}
                >
                  <Table>
                    <MDBox component="thead">
                      <TableRow>
                        <DataTableHeadCell sorted={false} px={1}>
                          {' '}
                        </DataTableHeadCell>
                        <DataTableHeadCell sorted={false} px={1}>
                          {i18n.entities.broker.fields.minimum_deposit}
                        </DataTableHeadCell>
                        <DataTableHeadCell
                          px={1}
                          onClick={() =>
                            doChangeSort(
                              'broker_rating.overall_reviews',
                            )
                          }
                          sorted={
                            sorter.orderBy === 'asc'
                              ? 'desc'
                              : 'asc'
                          }
                        >
                          {i18n.entities.brokerPost.fields.review}
                        </DataTableHeadCell>
                        <DataTableHeadCell
                          px={1}
                          onClick={() =>
                            doChangeSort(
                              'broker_rating.overall_rating',
                            )
                          }
                          sorted={
                            sorter.orderBy === 'asc'
                              ? 'desc'
                              : 'asc'
                          }
                        >
                          {i18n.entities.brokerPost.fields.rating}
                        </DataTableHeadCell>
                        <DataTableHeadCell sorted={false} px={1}>
                          {i18n.entities.broker.fields.regulation}
                        </DataTableHeadCell>
                        <DataTableHeadCell
                          px={1}
                          onClick={() => doChangeSort('name')}
                          sorted={
                            sorter.orderBy === 'asc'
                              ? 'desc'
                              : 'asc'
                          }
                        >
                          {i18n.entities.broker.fields.name}
                        </DataTableHeadCell>
                      </TableRow>
                    </MDBox>
                    <TableBody>
                      {!allBroker && (
                        <TableRow>
                          <DataTableBodyCell
                            align="center"
                            colSpan={100}
                          >
                            <MDTypography align="center">
                              {i18n.table.noData}
                            </MDTypography>
                          </DataTableBodyCell>
                        </TableRow>
                      )}
                      {rows.map((row) => (
                        <TableRow key={row.id}>
                          <DataTableBodyCell width="auto" px={1}>
                            <LazyLoad>
                            <MaterialLink
                              href={row.meta?.homepage}
                              target="_blank"
                              underline="hover"
                            >
                              <CardMedia
                                component={"img"}
                                image={
                                  row.broker_image_broker_logo[0]
                                    ?.downloadUrl
                                }
                                alt={row.name}
                                sx={{
                                  margin: 0,
                                  borderRadius: 0,
                                  width: 115,
                                  height: 45,
                                }}
                              />
                            </MaterialLink>
                            </LazyLoad>
                          </DataTableBodyCell>
                          <DataTableBodyCell width="auto" px={1}>
                            {row.meta?.minimum_deposit}
                          </DataTableBodyCell>
                          <DataTableBodyCell width="auto" px={1}>
                            {row.rating?.overall_reviews}
                          </DataTableBodyCell>
                          <DataTableBodyCell width="auto" px={1}>
                            <LazyLoad>
                            <RatingListItem
                              precision={0.1}
                              value={
                                row.rating?.overall_rating ?? 0
                              }
                              emptyIcon={
                                <svg
                                  width={18}
                                  height={16}
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12.1053 3.68421L14.7074 8.95579L20.5263 9.80632L16.3158 13.9074L17.3095 19.7011L12.1053 16.9642L6.90105 19.7011L7.89473 13.9074L3.6842 9.80632L9.50315 8.95579L12.1053 3.68421Z"
                                    fill="#FCFBF8"
                                    stroke="#E2E0DA"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              }
                              icon={
                                <svg
                                  width={18}
                                  height={16}
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12 4.5L14.3175 9.195L19.5 9.9525L15.75 13.605L16.635 18.765L12 16.3275L7.365 18.765L8.25 13.605L4.5 9.9525L9.6825 9.195L12 4.5Z"
                                    fill="#EBC03F"
                                    stroke="#EBC03F"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              }
                              size="large"
                            />
                            </LazyLoad>
                          </DataTableBodyCell>
                          <DataTableBodyCell width="auto" px={1}>
                            {(row.regulatory_authorities || [])
                              .map((v) => v.abbreviation)
                              .join(', ')}
                          </DataTableBodyCell>
                          <DataTableBodyCell width="auto" px={1}>
                            <MaterialLink
                              component={Link}
                              href={`/erfahrungsberichte/${row.name_normalized}`}
                              underline="hover"
                            >
                              {`${row.name
                                .replace(/\([\w\d\s]+\)/g, '')
                                .trim()} Erfahrungen`}
                            </MaterialLink>
                          </DataTableBodyCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </MDBox> 
                <DefaultCategoryDescription />
            </PageContent>
          )}
            <AuthorView author={author} />
        </MDBox>
      </Layout>
    </>
  );
};

export async function getStaticProps() {

  
  // const params = {
  //   filter: filter,
  //   orderBy: sortField+"_"+sortOrder,
  //   limit: null,
  //   offset: 1,
  // }  

  const [
    baseRes,
    categoryRes,
    pageRes,
    ] = await Promise.all([
    axios.get(`${config.backendUrl}/base`),
    axios.post(`${config.backendUrl}/category`,{url:"/broker-vergleich"}),
    axios.post(`${config.backendUrl}/general-page`,{url:"/broker-vergleich"}),
  ])
  const topBrokerSidebar = baseRes.data.brokerTop;
  const categorySidebar = baseRes.data.categorySidebar;
  const mostReadSidebar = baseRes.data.mostRead;
  const featuredBrokersSidebar = baseRes.data.brokerFeatured;
  const forexSchoolSidebar = baseRes.data.forexSchool;  
  const forexStrategySidebar = baseRes.data.forexStrategy;
  const promotionSidebar = baseRes.data.promotion;
  const navigationSidebar = baseRes.data.navigation;
  const categoryFooterSidebar = baseRes.data.footer;
  const author = baseRes.data.author;
  const brokerComparable = baseRes.data.brokerComparable;
  //const allBroker = allBrokerRes.data;
  const topbarList = baseRes.data.topbarList;

  let category;
  if(!categoryRes){
    category = pageRes.data;
  }else{
    category = categoryRes.data;
  }

  const filter = {
    activated: true,
    category: 0
  }

  const allBrokerRes = await axios.get(`${config.backendUrl}/broker`, {params: {
    filter: filter,
    orderBy: "name_asc",
    limit: null,
    offset: 1,
  }});

  const allBroker = allBrokerRes.data;
  
  return { 
    props: { allBroker, topbarList, brokerComparable, author, topBrokerSidebar, categorySidebar, mostReadSidebar, featuredBrokersSidebar, forexSchoolSidebar, forexStrategySidebar, promotionSidebar, navigationSidebar, categoryFooterSidebar, category },
    revalidate: 10,
  };
} ;

export default ComparisonPage;
