import i18n from "@/i18n";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// import HtmlView from '@/components/shared/view/HtmlView';
import Layout from "@/components/Layout";
import MaterialLink from "@mui/material/Link";
// import MDBox from '@/mui/components/MDBox';
// import MDTypography from '@/mui/components/MDTypography';
// import PageContent from '@/components/shared/view/PageContent';
// import Pagination from '@/components/shared/table/Pagination';
// import Breadcrumb from '@/components/Breadcrumb';
import ImageView from "@/components/ImageView";
import axios from "axios";
import config from "@/config";
import dynamic from "next/dynamic";
import Spinner from "@/components/shared/Spinner";
import authAxios from "@/modules/shared/axios/authAxios";

const HtmlView = dynamic(() => import("@/components/shared/view/HtmlView"), {
  loading: () => <Spinner />,
});
const MDBox = dynamic(() => import("@/mui/components/MDBox"));
const MDTypography = dynamic(() => import("@/mui/components/MDTypography"));
const PageContent = dynamic(
  () => import("@/components/shared/view/PageContent"),
  { loading: () => <Spinner /> },
);
const Pagination = dynamic(
  () => import("@/components/shared/table/Pagination"),
);
const Breadcrumb = dynamic(() => import("@/components/Breadcrumb"));
const Topbar = dynamic(() => import("@/components/Topbar"), {});

const BlogListPage = ({
  blog,
  topbarList,
  brokerComparable,
  author,
  topBroker,
  category,
  mostRead,
  featuredBrokers,
  forexSchool,
  forexStrategy,
  promotion,
  navigation,
  categoryFooter,
}) => {
  const router = useRouter();
  const [rows, setRows] = useState(blog.rows);
  const [count, setCount] = useState(blog.count);

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const paginationChange = {
    current: current,
    pageSize: pageSize,
    total: count,
  };

  const doChangePagination = async (paginationChange) => {
    setCurrent(paginationChange.current);
    setPageSize(paginationChange.pageSize);

    const params = {
      limit: paginationChange.pageSize,
      offset: (paginationChange.current - 1) * paginationChange.pageSize,
    };
    const blogRes = await axios.get(`${config.backendUrl}/blog`, { params });
    const blogData = blogRes.data;
    setRows(blogData.rows);
    setCount(blogData.count);
  };

  return (
    <>
      {topbarList && topbarList.count > 0 && (
        <Topbar topbar={topbarList} slug={"blog"} />
      )}
      <Layout
        title="Broker-Bewertungen Blog"
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
      >
        <PageContent id="list-top-4-pagination">
          <MDBox display="none">
            <Breadcrumb
              navigation={navigation}
              items={[
                {
                  name: i18n.entities.blog.title,
                  route: "/blog",
                },
              ]}
            />
          </MDBox>
          <MDTypography variant="h1" pb={5}>
            {i18n.entities.blog.title}
          </MDTypography>
          {rows && (
            <>
              <MDBox display="flex" flexDirection="column" gap={5}>
                {rows.map((record) => (
                  // <LazyLoad key={record.id}>
                  <MDBox
                    key={record.id}
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="start"
                    gap={5}
                  >
                    {record.blog_image[0] &&
                      record.blog_image[0].downloadUrl && (
                        <ImageView
                          value={record.blog_image}
                          sx={{
                            objectFit: "contain",
                            width: "150px",
                          }}
                        />
                      )}

                    <MDBox color="text">
                      <MDTypography variant="body1" fontWeight="bold">
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
    </>
  );
};

export async function getStaticProps() {
  const [baseRes, blogRes] = await Promise.all([
    axios.get(`${config.backendUrl}/base`),
    axios.get(`${config.backendUrl}/blog?limit=10&offset=0`),
  ]);
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
  const topbarList = baseRes.data.topbarList;
  const blog = blogRes.data;

  return {
    props: {
      blog,
      topbarList,
      brokerComparable,
      author,
      topBroker,
      category,
      mostRead,
      featuredBrokers,
      forexSchool,
      forexStrategy,
      promotion,
      navigation,
      categoryFooter,
    },
    revalidate: 10,
  };
}

export default BlogListPage;
