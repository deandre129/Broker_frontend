/* eslint-disable react-hooks/exhaustive-deps */
import i18n from "@/i18n";
import { DEFAULT_MOMENT_FORMAT_DATE_ONLY } from "@/config/common";
import { useEffect, useRef, useState } from "react";
import { CKEditor } from "ckeditor4-react";
import { useRouter } from "next/router";
import AuthorView from "@/components/shared/view/AuthorView";
// import HtmlView from '@/components/shared/view/HtmlView';
import Layout from "@/components/Layout";
// import MDBox from '@/mui/components/MDBox';
// import PageContent from '@/components/shared/view/PageContent';
import TopBrokersView from "@/components/broker/components/TopBrokersView";
// import Breadcrumb from '@/components/Breadcrumb';
import urlParse from "url-parse";
import ScrollTo from "@/components/ScrollTo";
// import MDTypography from '@/mui/components/MDTypography';
import axios from "axios";
import config from "@/config";
// import MDButton from '@/mui/components/MDButton';
import { Alert, Grid, Snackbar, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import moment from "moment";
// import Pagination from '@/components/shared/table/Pagination';
import { AuthToken } from "@/modules/auth/authToken";
import AuthCurrentTenant from "@/modules/auth/authCurrentTenant";
import ReCAPTCHA from "react-google-recaptcha";
import dynamic from "next/dynamic";
import Spinner from "@/components/shared/Spinner";
import LazyLoad from "react-lazyload";
import { initPiwik } from "@/utils/piwik";

const HtmlView = dynamic(() => import("@/components/shared/view/HtmlView"), {
  loading: () => <Spinner />,
});
const PageContent = dynamic(
  () => import("@/components/shared/view/PageContent"),
  { loading: () => <Spinner /> },
);
const Breadcrumb = dynamic(() => import("@/components/Breadcrumb"));
const Pagination = dynamic(
  () => import("@/components/shared/table/Pagination"),
);
const MDBox = dynamic(() => import("@/mui/components/MDBox"));
const MDButton = dynamic(() => import("@/mui/components/MDButton"));
const MDTypography = dynamic(() => import("@/mui/components/MDTypography"));
const Topbar = dynamic(() => import("@/components/Topbar"), {});

const BlogDetailPage = ({
  commentList,
  topbarList,
  brokerComparable,
  slug,
  author,
  blog,
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
  const record = blog;

  const [rows, setRows] = useState(commentList.rows ? commentList.rows : []);
  const [count, setCount] = useState(commentList.count ? commentList.count : 0);

  useEffect(() => {
    if (!blog) {
      router.push("/404");
    }
  }, [blog, router]);

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const pagination = {
    current: current,
    pageSize: pageSize,
    total: count,
  };

  const doChangePagination = async (paginationChange) => {
    setCurrent(pagination.current);
    setPageSize(pagination.pageSize);

    const params = {
      filter: {
        spam: false,
        review_required: false,
        deleted: false,
        blog_entry_id: blog.id,
      },
      orderBy: "id_desc",
      offset: (paginationChange.current - 1) * paginationChange.pageSize,
      limit: paginationChange.pageSize,
    };

    const commentListRes = await axios.get(
      `${config.backendUrl}/comment-list`,
      { params },
    );
    const commentList = commentListRes.data;
    setRows(commentList.rows);
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({
    type: null,
    content: "",
  });

  const [name, setName] = useState("");
  const [editor, setEditor] = useState(null);
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [recaptcha, setRecaptcha] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorContent, setErrorContent] = useState("");
  const [errorRecaptcha, setErrorRecaptcha] = useState("");

  const recaptchaRef = useRef(null);

  async function onSubmit() {
    if (name == "") {
      setErrorName("Name is required");
    } else {
      setErrorName("");
    }
    if (email == "") {
      setErrorEmail("Email is required");
    } else if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false
    ) {
      setErrorEmail("Email must be a valid email");
    } else {
      setErrorEmail("");
    }
    if (content == "") {
      setErrorContent("Content is required");
    } else {
      setErrorContent("");
    }
    if (recaptcha == "") {
      setErrorRecaptcha("ReCAPTCHA is required");
    } else {
      setErrorRecaptcha("");
    }
    if (name !== "" && email !== "" && content !== "" && recaptcha !== "") {
      const data = {
        blog_entry_id: record.id,
        name: name,
        email: email,
        content: content.slice(0, content.length - 1),
        recaptcha: recaptcha,
      };

      const response = axios
        .post(`${config.backendUrl}/blog-comment`, { data })
        .then((res) => {
          setOpen(true);
          setMessage({
            type: "success",
            content: i18n.entities.blogComment.create.success,
          });
          setName("");
          setEmail("");
          editor.setData("");
          setEditor(null);
          setContent("");
          setRecaptcha("");
        })
        .catch((error) => {
          setMessage({ type: "error", content: error });
          setMessage(error);
        });

      recaptchaRef?.current?.reset();
    }
  }

  const token = AuthToken.get();

  const ckeditorConfig: any = {
    extraPlugins: [
      "iframe",
      "image2",
      "uploadimage",
      "colorbutton",
      "colordialog",
    ],
    extraAllowedContent: "iframe[*]",
    filebrowserUploadUrl: [
      config.backendUrl,
      "/tenant/",
      AuthCurrentTenant.get(),
      "/file/ckeditor",
    ].join(""),
    fileTools_requestHeaders: {
      Authorization: `Bearer ${token}`,
      "Accept-Language": "de",
    },
  };

  const toolbars = [
    {
      name: "basicstyles",
      groups: ["basicstyles"],
    },
    {
      name: "paragraph",
      groups: ["list"],
    },
    { name: "colors" },
  ];

  ckeditorConfig.toolbarGroups = toolbars;

  useEffect(() => {
    const handleOnClickA = (evt) => {
      if (evt.target.tagName.toLowerCase() === "a") {
        const parsedUrl = urlParse(evt.target.href);
        if (parsedUrl.pathname === "/" + slug && parsedUrl.hash !== "") {
          evt.preventDefault();
          evt.stopPropagation();
          evt.stopImmediatePropagation();
          ScrollTo(
            decodeURI(parsedUrl.hash.substring(1).replace(/\%\%/g, "%25%")),
          );
        }
      }
    };
    window.addEventListener("click", handleOnClickA);
    return () => window.removeEventListener("click", handleOnClickA);
  }, [router.asPath]);

  return (
    <>
      {topbarList && topbarList.count > 0 && (
        <Topbar topbar={topbarList} slug={slug} topBroker={topBroker} />
      )}
      <Layout
        title={record?.name}
        keywords={[record?.metakeywords]}
        description={record?.metadescription}
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
        {record && (
          <MDBox
            display="flex"
            flexDirection="column"
            sx={{
              "& > * + *": {
                mt: 2,
              },
            }}
          >
            <PageContent>
              <Breadcrumb
                navigation={navigation}
                items={[
                  {
                    name: "Broker Blog",
                    route: "/blog",
                  },
                  {
                    name: record.name,
                    route: `/blog/${record.name_normalized}`,
                  },
                ]}
              />
              {record.content2 !== null && record.content2 !== "" && (
                <>
                  <HtmlView value={record.content2} />
                  <MDBox
                    py={5}
                    my={5}
                    sx={{
                      borderTop: "1px dotted rgba(128,128,128,.5)",
                      borderBottom: "1px dotted rgba(128,128,128,.5)",
                      width: "100%",
                    }}
                  >
                    <MDTypography display="block" variant="h3" mb={2}>
                      {i18n.entities.home.top_brokers}
                    </MDTypography>
                    <TopBrokersView topBrokers={topBroker} />
                  </MDBox>
                </>
              )}
              <HtmlView value={record.content} />
              <MDBox py={4}>
                <MDTypography
                  id="list-top-4-pagination"
                  variant="body1"
                  fontWeight="bold"
                >
                  {i18n.common.comment + "(" + rows.length + ")"}
                </MDTypography>
              </MDBox>
              <LazyLoad>
                <MDBox
                  display="flex"
                  flexDirection="column"
                  color="text"
                  gap={2}
                >
                  {rows &&
                    rows.map((comment) => (
                      // <LazyLoad key={comment.id}>
                      <MDBox
                        key={comment.id}
                        display="flex"
                        flexDirection="column"
                        color="text"
                        gap={1}
                      >
                        <MDBox display="flex" justifyContent="space-between">
                          <MDBox display="flex" justifyContent="flex-start">
                            <MDTypography variant="body1" fontWeight="bold">
                              {`${comment.name} (${moment(
                                comment.modified,
                              ).format(DEFAULT_MOMENT_FORMAT_DATE_ONLY)})`}
                            </MDTypography>
                          </MDBox>
                        </MDBox>
                        <MDBox
                          color="text"
                          fontSize="1rem"
                          fontWeight="regular"
                          pt={1}
                          pl={5}
                        >
                          <HtmlView value={comment.content} />
                        </MDBox>
                      </MDBox>
                      // </LazyLoad>
                    ))}
                  {count == 0 && (
                    <MDTypography variant="body2" fontWeight="regular">
                      {i18n.common.noCommit}
                    </MDTypography>
                  )}
                </MDBox>
              </LazyLoad>
              <LazyLoad>
                {rows && (
                  <MDBox mt={2}>
                    <Pagination
                      onChange={doChangePagination}
                      pagination={pagination}
                      noPadding
                      entriesPerPage
                      showTotalEntries
                    />
                  </MDBox>
                )}
              </LazyLoad>
              <MDBox color="text" py={4}>
                <MDTypography variant="body1" fontWeight="bold">
                  {i18n.common.toComment}
                </MDTypography>
              </MDBox>
              <LazyLoad>
                <Grid spacing={2} container>
                  <Grid item md={6} xs={12}>
                    <MDTypography variant="body2" fontWeight="regular">
                      {i18n.common.name} *
                    </MDTypography>
                    <>
                      <TextField
                        id={"name"}
                        name={"name"}
                        required={true}
                        onChange={(event) => {
                          setName(event.target.value);
                        }}
                        fullWidth
                        variant={"standard"}
                        placeholder={undefined}
                        autoFocus={undefined}
                        autoComplete={undefined}
                        value={name}
                      />
                      {errorName != "" && (
                        <MDBox mt={0.75}>
                          <MDTypography
                            component="div"
                            variant="caption"
                            color="error"
                            fontWeight="regular"
                          >
                            {errorName}
                          </MDTypography>
                        </MDBox>
                      )}
                    </>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <MDTypography variant="body2" fontWeight="regular">
                      {i18n.common.email} *
                    </MDTypography>
                    <>
                      <TextField
                        id={"email"}
                        name={"email"}
                        type={"email"}
                        required={true}
                        onChange={(event) => {
                          setEmail(event.target.value);
                        }}
                        fullWidth
                        variant={"standard"}
                        placeholder={undefined}
                        autoFocus={undefined}
                        autoComplete={undefined}
                        value={email}
                      />
                      {errorEmail != "" && (
                        <MDBox mt={0.75}>
                          <MDTypography
                            component="div"
                            variant="caption"
                            color="error"
                            fontWeight="regular"
                          >
                            {errorEmail}
                          </MDTypography>
                        </MDBox>
                      )}
                    </>
                  </Grid>
                  <Grid item xs={12}>
                    <MDTypography variant="body2" fontWeight="regular">
                      {i18n.common.content} *
                    </MDTypography>
                    <MDBox pt={2} position="relative">
                      <CKEditor
                        initData={content}
                        config={ckeditorConfig}
                        onChange={(evt) => {
                          setEditor(evt.editor);
                          let data = evt.editor?.getData();
                          if (data.includes("<img ")) {
                            data = data.replace(
                              "<img ",
                              `<img loading="lazy" `,
                            );
                          }
                          if (data.includes("<iframe ")) {
                            data = data.replace(
                              "<iframe ",
                              `<iframe loading="lazy" `,
                            );
                          }
                          setContent(data);
                        }}
                      />
                      {errorContent != "" && (
                        <MDBox mt={0.75}>
                          <MDTypography
                            component="div"
                            variant="caption"
                            color="error"
                            fontWeight="regular"
                          >
                            {errorContent}
                          </MDTypography>
                        </MDBox>
                      )}
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} mb={2}>
                    <MDBox display="flex" justifyContent="center" width="100%">
                      <ReCAPTCHA
                        onChange={(value) => {
                          setRecaptcha(value);
                        }}
                        ref={recaptchaRef}
                        sitekey={config.reCaptchaV2SiteKey}
                        theme={"light"}
                      />
                    </MDBox>
                    {errorRecaptcha != "" && (
                      <MDBox mt={0.75}>
                        <MDTypography
                          component="div"
                          variant="caption"
                          color="error"
                          fontWeight="regular"
                          textAlign="center"
                        >
                          {errorRecaptcha}
                        </MDTypography>
                      </MDBox>
                    )}
                  </Grid>
                </Grid>
              </LazyLoad>
              <MDButton
                variant="gradient"
                color={"info"}
                type="button"
                onClick={onSubmit}
                startIcon={<SaveIcon style={{ fill: "#ffffff" }} />}
                size="small"
              >
                <div className="white-color">
                  {i18n.common.toComment.toUpperCase()}
                </div>
                <style jsx>{`
                  .white-color {
                    color: white;
                  }
                `}</style>
              </MDButton>
            </PageContent>
            <AuthorView author={author} />
            <PageContent
              display={{
                xs: "none",
                lg: "block",
              }}
            >
              <MDTypography display="block" variant="h3" mb={2}>
                {i18n.entities.home.top_brokers}
              </MDTypography>
              <TopBrokersView topBrokers={topBroker} />
            </PageContent>
          </MDBox>
        )}
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={(event: React.SyntheticEvent | Event, reason?: string) => {
            setOpen(false);
          }}
        >
          <Alert
            onClose={(event: React.SyntheticEvent | Event, reason?: string) => {
              setOpen(false);
            }}
            severity={message.type}
            sx={{ width: "100%" }}
          >
            {message.content}
          </Alert>
        </Snackbar>
      </Layout>
    </>
  );
};

export async function getStaticPaths() {
  const res = await axios.get(`${config.backendUrl}/blogPath`);
  const posts = await res.data;

  // Get the paths we want to pre-render based on posts
  const paths = posts.allPaths.map((post) => ({
    params: { slug: post },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const url = slug;

  const [baseRes, blogRes] = await Promise.all([
    axios.get(`${config.backendUrl}/base`),
    axios.post(`${config.backendUrl}/individual-blog`, { url }),
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
  const blog = blogRes.data;
  const topbarList = baseRes.data.topbarList;
  const commentListRes = await axios.get(`${config.backendUrl}/comment-list`, {
    params: {
      filter: {
        spam: false,
        review_required: false,
        deleted: false,
        blog_entry_id: blog.id,
      },
      orderBy: "id_desc",
      offset: 0,
      limit: 10,
    },
  });

  const commentList = commentListRes.data;

  return {
    props: {
      commentList,
      topbarList,
      brokerComparable,
      slug,
      author,
      blog,
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

// export async function getServerSideProps(context) {
//   const { query } = context
//   const { slug } = query;
//   const url = slug

//   const [
//     baseRes,
//     blogRes,
//     ] = await Promise.all([
//       axios.get(`${config.backendUrl}/base`),
//     axios.post(`${config.backendUrl}/individual-blog`, {url}),
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
//   const brokerComparable = baseRes.data.brokerComparable;
//   const blog = blogRes.data;

//   return { props: { brokerComparable, slug, author, blog, topBroker, category, mostRead, featuredBrokers, forexSchool, forexStrategy, promotion, navigation, categoryFooter } };
// };

export default BlogDetailPage;
