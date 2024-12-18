/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { DEFAULT_MOMENT_FORMAT_DATE_ONLY } from "@/config/common";
import { Alert, Grid, Snackbar, TextField } from "@mui/material";
import i18n from "@/i18n";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
// import MDBox from '@/mui/components/MDBox';
// import MDButton from '@/mui/components/MDButton';
// import MDTypography from '@/mui/components/MDTypography';
import moment from "moment";
import Pagination from "@/components/shared/table/Pagination";
import TopBrokersView from "@/components/broker/components/TopBrokersView";
import lColors from "@/mui/assets/theme/base/colors";
// import FieldSetViewItem from '@/components/shared/view/FieldSetViewItem';
// import RatingViewItem from './shared/view/RatingViewItem';
import config from "@/config";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import AuthCurrentTenant from "@/modules/auth/authCurrentTenant";
import { CKEditor } from "ckeditor4-react";
import { AuthToken } from "@/modules/auth/authToken";
import StyledRating from "./shared/styles/StyledRating";
import dynamic from "next/dynamic";
import LazyLoad from "react-lazyload";
import Spinner from "@/components/shared/Spinner";
import "react-quill/dist/quill.snow.css";

const QuillEditor = dynamic(import("react-quill"), { ssr: false });
const Image = dynamic(() => import("next/image"), {});
const MDBox = dynamic(() => import("@/mui/components/MDBox"), {});
const MDButton = dynamic(() => import("@/mui/components/MDButton"), {});
const MDTypography = dynamic(() => import("@/mui/components/MDTypography"), {});
const SaveIcon = dynamic(() => import("@mui/icons-material/Save"), {});
const HtmlView = dynamic(() => import("@/components/shared/view/HtmlView"), {
  loading: () => <Spinner />,
});
const FieldSetViewItem = dynamic(
  () => import("@/components/shared/view/FieldSetViewItem"),
  {},
);
const RatingViewItem = dynamic(
  () => import("./shared/view/RatingViewItem"),
  {},
);
const RatingView = dynamic(() => import("./RatingView"), {});

const BrokerPostPage = (props) => {
  let rows = props.brokerPostList.rows;
  let count = props.brokerPostList.count;
  const colors = lColors;

  const recaptchaRef = useRef(null);

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

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({
    type: null,
    content: "",
  });

  const [name, setName] = useState("");
  const [editor, setEditor] = useState(null);
  const [email, setEmail] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [recaptcha, setRecaptcha] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorReview, setErrorReview] = useState("");
  const [errorRecaptcha, setErrorRecaptcha] = useState("");

  const [hover, setHover] = useState(-1);

  const tenantId = AuthCurrentTenant.get();

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
    if (review == "") {
      setErrorReview("Review is required");
    } else {
      setErrorReview("");
    }
    if (recaptcha == "") {
      setErrorRecaptcha("ReCAPTCHA is required");
    } else {
      setErrorRecaptcha("");
    }

    if (name !== "" && email !== "" && review !== "" && recaptcha !== "") {
      const data = {
        broker_id: props.brokerId,
        name: name,
        email: email,
        review: review.slice(0, review.length - 1),
        rating: rating,
        recaptcha: recaptcha,
      };
      const response = axios
        .post(`${config.backendUrl}/tenant/${tenantId}/broker-post`, { data })
        .then((res) => {
          setOpen(true);
          setMessage({
            type: "success",
            content: i18n.entities.brokerPost.create.success(props.name),
          });
          setName("");
          setEmail("");
          // editor.setData("");
          setEditor(null);
          setReview("");
          setRating(0);
          setRecaptcha("");
        })
        .catch((error) => {
          setMessage({ type: "error", content: error });
          setMessage(error);
        });

      recaptchaRef?.current?.reset();
    }
  }

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setCurrent(1);
    setPageSize(10);
  }, [props.slug]);

  let pagination = {
    current: current,
    pageSize: pageSize,
    total: count,
  };

  const doChangePagination = async (paginationChange) => {
    setCurrent(paginationChange.current);
    setPageSize(paginationChange.pageSize);
    pagination = {
      current: paginationChange.current,
      pageSize: paginationChange.pageSize,
      total: count,
    };
    // localStorage.setItem("pageSize", pagination.pageSize);
    // localStorage.setItem("current", pagination.current);
    // props.onChange(paginationChange.current, paginationChange.pageSize);
    // const params = {
    //   filter: {
    //     spam: false,
    //     review_required: false,
    //     deleted: false,
    //     broker: props.brokerId,
    //   },
    //   orderBy: "created_desc",
    //   offset: (current - 1) * pageSize,
    //   limit: pageSize,
    // }

    // const brokerPostRes = await axios.get(`${config.backendUrl}/brokerPost-list`, {params});
    // const brokerPostData = brokerPostRes.data;
    // rows = brokerPostData.rows;
    // count = brokerPostData.count;
  };

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
      ],
    },
    clipboard: {
      matchVisual: true,
    },
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "color",
    "background",
    "align",
  ];

  const [editorMarginBottom, setEditorMarginBottom] = useState("50px");

  useEffect(() => {
    const handleMobileView = () => {
      if (window.innerWidth >= 1200) {
        setEditorMarginBottom("50px");
      } else if (window.innerWidth >= 992) {
        setEditorMarginBottom("80px");
      } else if (window.innerWidth >= 768) {
        setEditorMarginBottom("50px");
      } else {
        setEditorMarginBottom("80px");
      }
    };
    window.addEventListener("resize", handleMobileView);
    handleMobileView();
    return () => window.removeEventListener("resize", handleMobileView);
  }, []);

  return (
    <>
      <MDTypography id="list-top-4-pagination" variant="h2" pb={3}>
        {`${props.name} Erfahrungen von Tradern`}
      </MDTypography>
      <MDBox
        display="flex"
        flexDirection="column"
        position="relative"
        color="text"
      >
        {rows &&
          rows
            .slice((current - 1) * pageSize, current * pageSize)
            .map((post, idx, arr) => (
              // <LazyLoad key={post.id}>
              <MDBox
                key={post.id}
                py={2}
                borderTop={`1px dashed ${colors.inputBorderColor}`}
              >
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems={{
                    md: "center",
                    xs: "flex-start",
                  }}
                >
                  <MDBox>
                    {/* <MDTypography
                    variant="h5"
                    color="warning"
                    fontSize={{
                      lg: '1.25rem',
                      xs: '1rem',
                    }}
                  >
                    {`${props.name} Erfahrungen von: ${post.name}`}
                  </MDTypography> */}

                    <div className="post-name">
                      {`${props.name} Erfahrungen von: ${post.name}`}
                    </div>
                    <style jsx>{`
                      .post-name {
                        color: rgb(251, 140, 0);
                        font-size: 20px;
                        display: flex;
                        line-height: 1.625;
                        font-family: Roboto, Helvetica, Arial, sans-serif;
                        font-weight: 700;
                        opacity: 1;
                        letter-spacing: 0em;
                        text-transform: none;
                        vertical-align: unset;
                        text-decoration: none;
                      }
                    `}</style>
                    <MDTypography
                      variant="button"
                      color="info"
                      fontWeight="bold"
                    >
                      {`Verfasst am: ${moment(post.created).format(
                        DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                      )}`}
                    </MDTypography>
                  </MDBox>
                  <MDBox
                    display="inline-flex"
                    flexWrap="wrap"
                    justifyContent="flex-end"
                    lineHeight={0}
                    gap={1}
                  >
                    <LazyLoad>
                      <RatingView
                        value={post.rating}
                        width={27}
                        height={24}
                        size={"large"}
                      />
                    </LazyLoad>
                  </MDBox>
                </MDBox>
                <MDBox color="text" fontSize="1rem" fontWeight="regular" pt={1}>
                  <HtmlView value={post.review} />
                </MDBox>
                {post.children && post.children.length > 0 && (
                  <MDBox
                    sx={{
                      "& > * + *": {
                        mt: 2,
                      },
                    }}
                  >
                    {post.children.map((subPost) => (
                      <FieldSetViewItem key={subPost.id}>
                        <MDBox
                          mb={2}
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <MDTypography variant="body1" fontWeight="regular">
                            Kommentar von: {subPost.name}
                          </MDTypography>
                        </MDBox>
                        <MDBox>
                          <HtmlView value={subPost.review} />
                        </MDBox>
                      </FieldSetViewItem>
                    ))}
                  </MDBox>
                )}
                {idx + 1 === Number((arr.length / 2).toFixed(0)) && (
                  <MDBox
                    mt={2}
                    pb={1}
                    borderTop={`1px dashed ${colors.inputBorderColor}`}
                  >
                    {props.middle}
                  </MDBox>
                )}
              </MDBox>
              // </LazyLoad>
            ))}
        {!rows && (
          <MDTypography variant="body2" fontWeight="regular" mb={2}>
            {i18n.common.noReviews(props.name)}
          </MDTypography>
        )}
      </MDBox>

      {rows && (
        <MDBox borderTop={`1px dashed ${colors.inputBorderColor}`} py={2}>
          <Pagination
            onChange={doChangePagination}
            pagination={pagination}
            noPadding
            entriesPerPage
            showTotalEntries
          />
        </MDBox>
      )}

      <MDBox pb={2} borderTop={`1px dashed ${colors.inputBorderColor}`}>
        <MDTypography display="block" variant="h3" my={2}>
          {i18n.entities.home.top_brokers}
        </MDTypography>
        <TopBrokersView topBrokers={props.topBrokers} />
      </MDBox>
      <MDBox
        pt={2}
        id="write-review"
        borderTop={`1px dashed ${colors.inputBorderColor}`}
      >
        <MDTypography variant="body1" fontWeight="bold" pb={2}>
          {i18n.common.writeReview}
        </MDTypography>
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
                {i18n.common.rating}
              </MDTypography>
              <MDBox pt={0} position="relative" lineHeight={0}>
                <MDBox display="flex" alignItems="center" gap={1}>
                  <StyledRating
                    name={name}
                    defaultValue={0}
                    value={rating}
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
                    max={5}
                    precision={1}
                    onChange={(evt, newVal) => {
                      setRating(newVal);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    ownerState={{ color: "info" }}
                    disabled={false}
                    readOnly={false}
                    size={"medium"}
                  />
                </MDBox>
              </MDBox>
            </Grid>
            <Grid item xs={12}>
              <MDTypography variant="body2" fontWeight="regular">
                {i18n.common.review} *
              </MDTypography>
              <MDBox pt={0} position="relative">
                {/* <CKEditor
                  initData={review}
                  config={ckeditorConfig}
                  onChange={(evt) => {
                    setEditor(evt.editor);
                    let data = evt.editor?.getData();
                    if (data.includes("<img ")) {
                      data = data.replace("<img ", `<img loading="lazy" `);
                    }
                    if (data.includes("<iframe ")) {
                      data = data.replace(
                        "<iframe ",
                        `<iframe loading="lazy" `,
                      );
                    }
                    setReview(data);
                  }}
                /> */}
                <QuillEditor
                  style={{
                    height: "300px",
                    marginBottom: editorMarginBottom,
                  }}
                  theme="snow"
                  value={review}
                  formats={formats}
                  modules={modules}
                  onChange={(value) => {
                    setReview(value);
                  }}
                />
                {errorReview != "" && (
                  <MDBox mt={0.75}>
                    <MDTypography
                      component="div"
                      variant="caption"
                      color="error"
                      fontWeight="regular"
                    >
                      {errorReview}
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
        <MDBox display="flex" justifyContent="center" width="100%">
          <MDButton
            variant="gradient"
            color={"info"}
            type="button"
            onClick={onSubmit}
            startIcon={<SaveIcon />}
            size="small"
          >
            Erfahrungsbericht speichern
          </MDButton>
        </MDBox>
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
      </MDBox>
    </>
  );
};

export default BrokerPostPage;
