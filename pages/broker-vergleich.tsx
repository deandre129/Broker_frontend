/* eslint-disable @next/next/no-img-element */
import { HtmlViewWrapper } from '@/components/shared/view/HtmlView';
import i18n from '@/i18n';
import { CardMedia, TableContainer } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router'
import Breadcrumb from '@/components/Breadcrumb';
import Layout from '@/components/Layout';
import MDTypography from '@/mui/components/MDTypography';
import moment from 'moment';
import PageContent from '@/components/shared/view/PageContent';
import TopBrokersView from '@/components/broker/components/TopBrokersView';
import AuthorView from '@/components/shared/view/AuthorView';
import MDBox from '@/mui/components/MDBox';
import DefaultCategoryDescription from '@/components/DefaultCategoryDescription';
import DashBorder from '@/components/shared/DashBorder';
import axios from 'axios';
import config from '@/config';
import React from 'react';
import DataTableBodyCell from '@/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from '@/mui/shared/Tables/DataTable/DataTableHeadCell';
import MaterialLink from '@mui/material/Link';
import RatingListItem from '@/components/shared/table/RatingListItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import Image from 'next/image';

const ComparisonPage = ({ brokerComparable, allBroker,category, author, topBrokerSidebar, categorySidebar, mostReadSidebar, featuredBrokersSidebar, forexSchoolSidebar, forexStrategySidebar, promotionSidebar, navigationSidebar, categoryFooterSidebar,}) => {
  const router = useRouter();

  const [sorter, setSorter] =useState({
    field: 'name',
    order: 'asc',
  });

  const doChangeSort = (field) => {
    const order =
      sorter.field === field && sorter.order === 'asc'
        ? 'desc'
        : 'asc';

    setSorter({field: field, order: order})

    router.push({
      pathname: router.pathname,
      query: { field: field, orderBy: order}
    })
  };

  return (
    <Layout
      title={`Broker Vergleich ${moment().year()} » 100% unabhängiger Test`}
      keywords={[
        'broker bewertung',
        'broker erfahrungen',
        'broker bewertungen',
      ]}
      author = {author}
      brokerComparable={brokerComparable}
      navigation = {navigationSidebar}
      topBroker = {topBrokerSidebar}
      category = { categorySidebar }
      mostRead = { mostReadSidebar }
      featuredBrokers = { featuredBrokersSidebar }
      forexSchool = { forexSchoolSidebar }
      forexStrategy = { forexStrategySidebar }
      promotion = { promotionSidebar }
      categoryFooter = { categoryFooterSidebar }
      description={`100% unabhängiger Broker Vergleich ✚✚ Über ${
        category?.count ?? 0
      } Broker Vergleich im Test mit Erfahrungsberichten von Tradern ➔ Jetzt lesen!`}
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
                          sorter.order === 'asc'
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
                          sorter.order === 'asc'
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
                          sorter.order === 'asc'
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
                    {allBroker.rows.map((row) => (
                        <TableRow key={row.id}>
                          <DataTableBodyCell width="auto" px={1}>
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
                          </DataTableBodyCell>
                          <DataTableBodyCell width="auto" px={1}>
                            {row.meta?.minimum_deposit}
                          </DataTableBodyCell>
                          <DataTableBodyCell width="auto" px={1}>
                            {row.rating?.overall_reviews}
                          </DataTableBodyCell>
                          <DataTableBodyCell width="auto" px={1}>
                            <RatingListItem
                              precision={0.1}
                              value={
                                row.rating?.overall_rating ?? 0
                              }
                              emptyIcon={
                                <Image
                                  src="/images/star-grey.png"
                                  width='18'
                                  height="16"
                                  alt="star-grey"
                                />
                              }
                              icon={
                                <Image
                                  src="/images/star-fill.png"
                                  width='18'
                                  height="16"
                                  alt="star-fill"
                                />
                              }
                            />
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
  );
};

export async function getServerSideProps({query}) {

  const sortField = query.field ? query.field : 'name';
  const sortOrder = query.orderBy ? query.orderBy : "asc";

  const filter = {
    activated: query.activated ? query.activated : true,
    category: query.category ? query.category : 0
  }
  
  const params = {
    filter: filter,
    orderBy: sortField+"_"+sortOrder,
    limit: null,
    offset: 1,
  }  

  const [
    topBrokerSidebarRes,
    categorySidebarRes,
    mostReadSidebarRes,
    featuredBrokersSidebarRes,
    forexSchoolSidebarRes,
    forexStrategySidebarRes,
    promotionSidebarRes,
    navigationSidebarRes,
    categoryFooterSidebarRes,
    authorRes,
    categoryRes,
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
    axios.post(`${config.backendUrl}/category`,{url:"/broker-vergleich"}),
    axios.get(`${config.backendUrl}/broker`, {params}),
    axios.get(`${config.backendUrl}/broker/comparable`),
  ])
  const topBrokerSidebar = topBrokerSidebarRes.data;
  const categorySidebar = categorySidebarRes.data;
  const mostReadSidebar = mostReadSidebarRes.data;
  const featuredBrokersSidebar = featuredBrokersSidebarRes.data;
  const forexSchoolSidebar = forexSchoolSidebarRes.data;  
  const forexStrategySidebar = forexStrategySidebarRes.data;
  const promotionSidebar = promotionSidebarRes.data;
  const navigationSidebar = navigationSidebarRes.data;
  const categoryFooterSidebar = categoryFooterSidebarRes.data;
  const author = authorRes.data;
  const allBroker = allBrokerRes.data;
  const brokerComparable = brokerComparableRes.data;

  let category;
  if(!categoryRes){
    const pageRes = await axios.post(`${config.backendUrl}/general-page`,{url:"/broker-vergleich"});
    category = pageRes.data;
  }else{
    category = categoryRes.data;
  }
  
  return { props: { brokerComparable, allBroker, author, topBrokerSidebar, categorySidebar, mostReadSidebar, featuredBrokersSidebar, forexSchoolSidebar, forexStrategySidebar, promotionSidebar, navigationSidebar, categoryFooterSidebar, category } };
} ;

export default ComparisonPage;
