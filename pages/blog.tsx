import i18n from '@/i18n';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import HtmlView from '@/components/shared/view/HtmlView';
import Layout from '@/components/Layout';
import MaterialLink from '@mui/material/Link';
import MDBox from '@/mui/components/MDBox';
import MDTypography from '@/mui/components/MDTypography';
import PageContent from '@/components/shared/view/PageContent';
import Pagination from '@/components/shared/table/Pagination';
import Breadcrumb from '@/components/Breadcrumb';
import ImageView from '@/components/ImageView';
import axios from 'axios';
import config from '@/config';

const BlogListPage = ({author, topBroker, category, mostRead, featuredBrokers, forexSchool, forexStrategy, promotion, navigation, categoryFooter}) => {

  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [count, setCount] = useState(0);


  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const paginationChange = {
    current: current ,
    pageSize: pageSize,
    total: count,
  }

  const doChangePagination = async (paginationChange) => {
    setCurrent(paginationChange.current);
    setPageSize(paginationChange.pageSize);

    const params = {
      limit: paginationChange.pageSize,
      offset: (paginationChange.current-1)*paginationChange.pageSize,
    }
    const blogRes = await axios.get(`${config.backendUrl}/blog`, {params});
    const blogData = blogRes.data;
    setRows(blogData.rows)
  };

  useEffect(()=>{
    setCurrent(1);
    setPageSize(10);
    const params = {
      limit: 10,
      offset: 0,
    }
    const blogRes = axios.get(
      `${config.backendUrl}/blog`, { params }
    ).then(res => {
      const blogData = res.data;
      console.log(blogData);
      setRows(blogData.rows);
      setCount(blogData.count);
    }).catch(error => {
      console.log(error);
    })
  },[]);

  return (
    <Layout 
        title="Broker-Bewertungen Blog"
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
      <PageContent id="list-top-4-pagination">
        <MDBox display="none">
          <Breadcrumb
          navigation = {navigation}
            items={[
              {
                name: i18n.entities.blog.title,
                route: '/blog',
              },
            ]}
          />
        </MDBox>
        <MDTypography variant="h1" pb={5}>
          {i18n.entities.blog.title}
        </MDTypography>
        {rows && (
          <>
            <MDBox
              display="flex"
              flexDirection="column"
              gap={5}
            >
              {rows.map((record) => (
                // <LazyLoad key={record.id}>
                <MDBox
                  key={record.id}
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="start"
                  gap={5}
                >
                  {record.blog_image[0].downloadUrl && (
                    <ImageView
                      value={record.blog_image}
                      sx={{
                        objectFit: 'contain',
                        width: '150px',
                      }}
                    />
                  )}

                  <MDBox color="text">
                    <MDTypography
                      variant="body1"
                      fontWeight="bold"
                    >
                      <MaterialLink
                        component={Link}
                        href={`/blog/${record.name_normalized}`}
                        underline="hover"
                      >
                        {record.name}
                      </MaterialLink>
                    </MDTypography>
                    <HtmlView value={record.teaser} />
                  </MDBox>
                </MDBox>
                // </LazyLoad>
              ))}
            </MDBox>

            <MDBox mt={2}>
              <Pagination
                onChange={doChangePagination}
                pagination={paginationChange}
                noPadding
                entriesPerPage
                showTotalEntries
              />
            </MDBox>
          </>
        )}
      </PageContent>
    </Layout>
  );
};

export async function getServerSideProps({ query }) {

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
  

    return { props: { author, topBroker, category, mostRead, featuredBrokers, forexSchool, forexStrategy, promotion, navigation, categoryFooter } };
  } ;

export default BlogListPage;
