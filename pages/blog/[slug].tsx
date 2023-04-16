import i18n from '@/i18n';
import { DEFAULT_MOMENT_FORMAT_DATE_ONLY } from '@/config/common';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { CKEditor } from 'ckeditor4-react';
import { useRouter } from 'next/router';
import AuthorView from '@/components/shared/view/AuthorView';
import blogFindActions from '@/modules/blog/find/blogFindActions';
import blogFindSelectors from '@/modules/blog/find/blogFindSelectors';
import HtmlView from '@/components/shared/view/HtmlView';
import Layout from '@/components/Layout';
import MDBox from '@/mui/components/MDBox';
import PageContent from '@/components/shared/view/PageContent';
import Spinner from '@/components/shared/Spinner';
import TopBrokersView from '@/components/broker/components/TopBrokersView';
import Breadcrumb from '@/components/Breadcrumb';
import urlParse from 'url-parse';
import ScrollTo from '@/components/ScrollTo';
import MDTypography from '@/mui/components/MDTypography';
import axios from 'axios';
import config from '@/config';
import authAxios from '@/modules/shared/axios/authAxios';
import Message from '@/components/shared/message';
import MDButton from '@/mui/components/MDButton';
import { Alert, Grid, Snackbar, TextField, useStepContext } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import moment from 'moment';
import Pagination from '@/components/shared/table/Pagination';
import { AuthToken } from '@/modules/auth/authToken';
import AuthCurrentTenant from '@/modules/auth/authCurrentTenant';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import { connect } from 'http2';

const BlogDetailPage = ({ slug, author, commentList, blog, topBroker, category, mostRead, featuredBrokers, forexSchool, forexStrategy, promotion, navigation, categoryFooter }) => {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [count, setCount] = useState(0);


  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const pagination = {
    current: current ,
    pageSize: pageSize,
    total: commentList.count
  }

  const doChangePagination = async (paginationChange) => {
    setCurrent(pagination.current);
    setPageSize(pagination.pageSize);

    const params = {
      filter: {
        spam: false,
        review_required: false,
        deleted: false,
        blog_entry_id: blog.id
      },
      orderBy: "id_desc",
      offset: (paginationChange.current - 1)*paginationChange.pageSize,
      limit: paginationChange.pageSize,
    }

    const commentListRes = await axios.get(`${config.backendUrl}/comment-list`, {params});
    const commentList = commentListRes.data;
    setRows(commentList.rows);
  };

  useEffect(()=>{
    setCurrent(1);
    setPageSize(10);
    const params = {
      filter: {
        spam: false,
        review_required: false,
        deleted: false,
        blog_entry_id: blog.id
      },
      orderBy: "id_desc",
      offset: 0,
      limit: 10,
    }
    const commentListRes = axios.get(
      `${config.backendUrl}/comment-list`, { params }
    ).then(res => {
      const commentList = res.data;
      console.log(commentList);
      setRows(commentList.rows);
      setCount(commentList.count);
    }).catch(error => {
      console.log(error);
    })
  },[slug]);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({
    type: null,
    content: ""
  });

  const record = blog;

  const [name, setName ] = useState('');
  const [editor, setEditor] = useState(null);
  const [email, setEmail ] = useState('');
  const [content, setContent ] = useState('');
  const [recaptcha, setRecaptcha ] = useState('');
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorContent, setErrorContent] = useState("");
  const [errorRecaptcha, setErrorRecaptcha] = useState("");

  const recaptchaRef = useRef(null);

  async function onSubmit() {
    if(name=='')
    {
      setErrorName("Name is required");
    }else {
      setErrorName("");
    }
    if(email=='')
    {
      setErrorEmail("Email is required");
    }else if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)==false )
    {
      setErrorEmail("Email must be a valid email");
    }else {
      setErrorEmail("");
    }
    if(content=='')
    {
      setErrorContent("Content is required");
    }else {
      setErrorContent('');
    }
    if(recaptcha=='')
    {
      setErrorRecaptcha("ReCAPTCHA is required");
    }else {
      setErrorRecaptcha('');
    }
    if(name!=='' && email!=='' && content!=='' && recaptcha!=='')
    {
      const data ={
        blog_entry_id: record.id,
        name: name,
        email: email,
        content: content.slice(0,content.length-1),
        recaptcha: recaptcha
      }

      console.log(data);

      const response = axios.post(
        `${config.backendUrl}/blog-comment`, {data}
      ).then(res => {
        console.log(res);
        setOpen(true);
        setMessage({type:"success", content: i18n.entities.blogComment.create.success });
        setName('');
        setEmail('');
        editor.setData('');
        setEditor(null);
        setContent('');
        setRecaptcha('');
      }).catch(error => {
        setMessage({type:"error", content: error });
        setMessage(error);
      })

      recaptchaRef?.current?.reset();

    }
  };

  const token = AuthToken.get();

  const ckeditorConfig: any = {
    extraPlugins: [
      'iframe',
      'image2',
      'uploadimage',
      'colorbutton',
      'colordialog',
    ],
    extraAllowedContent: 'iframe[*]',
    filebrowserUploadUrl: [
      config.backendUrl,
      '/tenant/',
      AuthCurrentTenant.get(),
      '/file/ckeditor',
    ].join(''),
    fileTools_requestHeaders: {
      Authorization: `Bearer ${token}`,
      'Accept-Language': "de",
    },
  };

  const toolbars=[
    {
      name: 'basicstyles',
      groups: ['basicstyles'],
    },
    {
      name: 'paragraph',
      groups: ['list'],
    },
    { name: 'colors' },
  ];

  ckeditorConfig.toolbarGroups = toolbars;

  useEffect(() => {
    const handleOnClickA = (evt) => {
      if (evt.target.tagName.toLowerCase() === 'a') {
        const parsedUrl = urlParse(evt.target.href);
        if (
          parsedUrl.pathname === "/"+slug &&
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

  return (
    <>
      <Layout
        title={record?.name}
        keywords={[record?.metakeywords]}
        description={record?.metadescription}

        author = {author}
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
        {record && (
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
                    name: 'Broker Blog',
                    route: '/blog',
                  },
                  {
                    name: record.name,
                    route: `/blog/${record.name_normalized}`,
                  },
                ]}
              />
              <HtmlView value={record.content} />
              <MDBox py={4}>
                <MDTypography
                  id="list-top-4-pagination"
                  variant="body1"
                  fontWeight="bold"
                >
                  {i18n.common.comment + '(' + rows.length + ')'}
                </MDTypography>
              </MDBox>
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
                      <MDBox
                        display="flex"
                        justifyContent="space-between"
                      >
                        <MDBox
                          display="flex"
                          justifyContent="flex-start"
                        >
                          <MDTypography
                            variant="body1"
                            fontWeight="bold"
                          >
                            {`${comment.name} (${moment(
                              comment.modified,
                            ).format(
                              DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                            )})`}
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
                {commentList.count==0 && (
                  <MDTypography
                    variant="body2"
                    fontWeight="regular"
                  >
                    {i18n.common.noCommit}
                  </MDTypography>
                )}
              </MDBox>

              { rows && (
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

              <MDBox color="text" py={4}>
                <MDTypography variant="body1" fontWeight="bold">
                  {i18n.common.toComment}
                </MDTypography>
              </MDBox>
              <Grid spacing={2} container>
                <Grid item md={6} xs={12}>
                  <MDTypography
                    variant="body2"
                    fontWeight="regular"
                  >
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
                    {errorName!='' && (
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
                  <MDTypography
                    variant="body2"
                    fontWeight="regular"
                  >
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
                    {errorEmail!='' && (
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
                  <MDTypography
                    variant="body2"
                    fontWeight="regular"
                  >
                    {i18n.common.content} *
                  </MDTypography>
                  <MDBox
                    pt={2}
                    position="relative"
                  >
                    <CKEditor
                      initData={content}
                      config={ckeditorConfig}
                      onChange={(evt) => { setEditor(evt.editor); setContent(evt.editor?.getData());}}
                    />
                    {errorContent!='' && (
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
                  <MDBox
                    display="flex"
                    justifyContent="center"
                    width="100%"
                  >
                    <ReCAPTCHA
                      onChange={(value) => {
                        setRecaptcha(value);
                      }}
                      ref={recaptchaRef}
                      sitekey={config.reCaptchaV2SiteKey}
                      theme={'light'}
                    />
                  </MDBox>
                  {errorRecaptcha!='' && (
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
              <MDButton
                variant="gradient"
                color={'info'}
                type="button"
                onClick={onSubmit}
                startIcon={<SaveIcon style={{fill: '#ffffff'}}/>}
                size="small"
              >
                <MDTypography
                  variant="h3"
                  fontSize="inherit"
                  color="inherit"
                >
                  {i18n.common.toComment}
                </MDTypography>
              </MDButton>
            </PageContent>
            <AuthorView author={author} />
            <PageContent
              display={{
                xs: 'none',
                lg: 'block',
              }}
            >
              <MDTypography
                display="block"
                variant="h3"
                mb={2}
              >
                {i18n.entities.home.top_brokers}
              </MDTypography>
              <TopBrokersView topBrokers={topBroker}/>
            </PageContent>
          </MDBox>
        )}
        <Snackbar open={open} autoHideDuration={3000} onClose = {(event: React.SyntheticEvent | Event, reason?: string) => {setOpen(false)}}>
          <Alert onClose = {(event: React.SyntheticEvent | Event, reason?: string) => {setOpen(false)}} severity={message.type} sx={{ width: '100%' }}>
            {message.content}
          </Alert>
        </Snackbar>
      </Layout>
    </>
  );
};


export async function getServerSideProps(context) {
  const { query } = context
  const { slug } = query;
  const url = slug

  const blogRes = await axios.post(`${config.backendUrl}/individual-blog`, {url});
  const blog = blogRes.data;
  
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

  return { props: { slug, author, blog, topBroker, category, mostRead, featuredBrokers, forexSchool, forexStrategy, promotion, navigation, categoryFooter } };
};

export default BlogDetailPage;
