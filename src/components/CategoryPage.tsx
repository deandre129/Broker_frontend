/* eslint-disable @next/next/no-img-element */
import i18n from '@/i18n';
import { CardMedia, TableContainer } from '@mui/material';
import AuthorView from './shared/view/AuthorView';
// import Breadcrumb from './Breadcrumb';
// import DefaultCategoryDescription from './DefaultCategoryDescription';
// import HtmlView from './shared/view/HtmlView';
// import MDBox from '@/mui/components/MDBox';
// import MDTypography from '@/mui/components/MDTypography';
//import PageContent from './shared/view/PageContent';
import TopBrokersView from './broker/components/TopBrokersView';
// import DashBorder from './shared/DashBorder';
import DataTableBodyCell from '@/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from '@/mui/shared/Tables/DataTable/DataTableHeadCell';
import MaterialLink from '@mui/material/Link';
//import RatingListItem from '@/components/shared/table/RatingListItem';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import LazyLoad from 'react-lazyload';

const Breadcrumb = dynamic(() => import('./Breadcrumb'));
const DefaultCategoryDescription = dynamic(() => import('./DefaultCategoryDescription'));
const HtmlView = dynamic(() => import('./shared/view/HtmlView'));
const MDBox = dynamic(() => import('@/mui/components/MDBox'));
const MDTypography = dynamic(() => import('@/mui/components/MDTypography'));
const PageContent = dynamic(() => import('./shared/view/PageContent'));
const DashBorder = dynamic(() => import('./shared/DashBorder'));
const RatingListItem = dynamic(() => import('@/components/shared/table/RatingListItem'));
const Table = dynamic(() => import('@mui/material/Table'));
const TableBody = dynamic(() => import('@mui/material/TableBody'));
const TableRow = dynamic(() => import('@mui/material/TableRow'));


function CategoryPage({allBroker, category, navigation, author, topBroker }) {
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
      query: { field: field, orderBy: order, category: category.id}
    })
  };

  return (
    <MDBox
      display="flex"
      flexDirection="column"
      sx={{
        '& > * + *': {
          mt: 2,
        },
      }}
    >
      <PageContent>
        
        <Breadcrumb
          navigation = {navigation}
          items={[
            {
              name: `${category.name}`,
              route: category.link,
            },
          ]}
        />
        <MDTypography variant="h1">
          {category.title}
        </MDTypography>
        {category.teaser ? (
          <HtmlView value={category.teaser} />
        ) : (
          <HtmlView
            value={i18n.entities.category.placeholders.description(category.name)}
          />
        )}
        <DashBorder my={2} pb={2} borderTop borderBottom>
          <MDTypography display="block" variant="h3" my={2}>
            {i18n.entities.home.top_brokers}
          </MDTypography>
          {category.topBrokers && (
            <TopBrokersView topBrokers={topBroker} />
          )}
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
                            component="img"
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
          {category.description ? (
            <HtmlView value={category.description} />
          ) : (
            <DefaultCategoryDescription />
          )}
      </PageContent>
      <AuthorView author={author} />
    </MDBox>
  );
}

export default CategoryPage;
