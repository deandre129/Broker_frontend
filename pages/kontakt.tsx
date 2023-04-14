import { Alert, Grid, Snackbar, TextField } from '@mui/material';
import {useRouter} from 'next/router';
import i18n from '@/i18n';
import { selectMuiSettings } from '@/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import authActions from '@/modules/auth/authActions';
import Layout from '@/components/Layout';
import MDButton from '@/mui/components/MDButton';
import MDTypography from '@/mui/components/MDTypography';
import PageContent from '@/components/shared/view/PageContent';
import SaveIcon from '@mui/icons-material/Save';
import yupFormSchemas from '@/modules/shared/yup/yupFormSchemas';
import formActions from '@/modules/form/formActions';
import axios from 'axios';
import config from '@/config';
import MDBox from '@/mui/components/MDBox';
import Message from '@/components/shared/message';
import authAxios from '@/modules/shared/axios/authAxios';
import { AuthToken } from '@/modules/auth/authToken';
import AuthCurrentTenant from '@/modules/auth/authCurrentTenant';
import { CKEditor } from 'ckeditor4-react';
import ReCAPTCHA from 'react-google-recaptcha';

const schema = yup.object().shape({
  name: yupFormSchemas.string(
    i18n.entities.contact.fields.name,
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  email: yupFormSchemas.email(
    i18n.entities.contact.fields.email,
    {},
  ),
  subject: yupFormSchemas.string(
    i18n.entities.contact.fields.subject,
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  recaptcha: yupFormSchemas.string(
    i18n.common.recaptcha,
    { required: true },
  ),
});

function Contact({ topBroker, author, category, mostRead, featuredBrokers, forexSchool, forexStrategy, promotion, navigation, categoryFooter }) {
  const { sidenavColor } = selectMuiSettings();

  const router = useRouter();

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({
    type: null,
    content: ""
  });

  const [name, setName ] = useState('');
  const [editor, setEditor] = useState(null);
  const [email, setEmail ] = useState('');
  const [content, setContent ] = useState('');
  const [subject, setSubject ] = useState('');
  const [recaptcha, setRecaptcha ] = useState('');
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorContent, setErrorContent] = useState("");
  const [errorSubject, setErrorSubject] = useState("");
  const [errorRecaptcha, setErrorRecaptcha] = useState("");


  const recaptchaRef = useRef(null);

  async function onSubmit() {
    if(name=='')
    {
      console.log(1);
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
    if(subject=='')
    {
      setErrorSubject("Subject is required");
    }else {
      setErrorSubject('');
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
        name: name,
        email: email,
        content: content.slice(0,content.length-1),
        subject: subject,
        recaptcha: recaptcha
      }
      console.log(data);

      const response = axios.post(
        `/auth/send-contact`, data
      ).then(res => {
        console.log(res);
      
        setOpen(true);
        setMessage({type:"success", content: i18n.auth.contactSuccess });
        setName('');
        setEmail('');
        setEditor(null);
        setRecaptcha('');
        setContent('');
        setSubject('');

      }).catch(error => {
        setMessage({type:"error", content: error });
        setMessage(error);
      })

      recaptchaRef?.current?.reset();
    }
  };

  // const onSubmit = (values) => {
  //   dispatch(
  //     authActions.doSendContact(
  //       values.name,
  //       values.email,
  //       values.subject,
  //       values.content,
  //       values.recaptcha,
  //       () => {
  //         Object.keys(initialValues).forEach((key: string) => {
  //           form.register(key);
  //           form.setValue(key, initialValues[key]);
  //         });
  //         dispatch(formActions.doRefresh());
  //       },
  //     ),
  //   );
  //   recaptchaRef?.current?.reset();
  //   form.setValue('recaptcha', '', {
  //     shouldDirty: true,
  //     shouldValidate: false,
  //   });
  // };

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

  return (
    <Layout 
      noIndex
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
      <PageContent>
        <MDTypography variant="h3">
          Kontakt zu broker-bewertungen.de aufnehmen
        </MDTypography>
        <MDTypography
          variant="body2"
          fontWeight="regular"
          my={3}
        >
          Um uns eine Nachricht zukommen zu lassen benutzen
          Sie bitte das Formular.
        </MDTypography>
        <MDTypography
          variant="body1"
          fontWeight="bold"
          my={2}
        >
          Kontakt
        </MDTypography>
        <Grid spacing={2} container>
          <Grid item xs={12}>
            <MDTypography
              variant="body2"
              fontWeight="regular"
            >
              {i18n.entities.contact.fields.name} *
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
          <Grid item xs={12}>
            <MDTypography
              variant="body2"
              fontWeight="regular"
            >
              {i18n.entities.contact.fields.email}{' '}
              *
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
                type={"email"}
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
              {i18n.entities.contact.fields.subject}{' '}
              *
            </MDTypography>
            <>
              <TextField
                id={"subject"}
                name={"subject"}
                required={true}
                onChange={(event) => {
                  setSubject(event.target.value);
                }}
                fullWidth
                variant={"standard"}
                placeholder={undefined}
                autoFocus={undefined}
                autoComplete={undefined}
                value={subject}
              />
              {errorSubject!='' && (
                <MDBox mt={0.75}>
                  <MDTypography
                    component="div"
                    variant="caption"
                    color="error"
                    fontWeight="regular"
                  >
                    {errorSubject}
                  </MDTypography>
                </MDBox>
              )}
            </>
          </Grid>
          <Grid item xs={12}>
            <MDBox
              pt={0}
              position="relative"
            >
              <CKEditor
                initData={email}
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
          color={sidenavColor}
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
            Absenden
          </MDTypography>
        </MDButton>
      </PageContent>
      <Snackbar open={open} autoHideDuration={3000} onClose = {(event: React.SyntheticEvent | Event, reason?: string) => {setOpen(false)}}>
        <Alert onClose = {(event: React.SyntheticEvent | Event, reason?: string) => {setOpen(false)}} severity={message.type} sx={{ width: '100%' }}>
          {message.content}
        </Alert>
      </Snackbar>
    </Layout>
  );
}

export async function getServerSideProps(context) {

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

  return { props: { topBroker, author, category, mostRead, featuredBrokers, forexSchool, forexStrategy, promotion, navigation, categoryFooter } };
} ;

export default Contact;
