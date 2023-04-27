import { Autocomplete, Box, Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import i18n from '@/i18n';
 import CompareDetail from '@/components/broker/comparisons/CompareDetail';
 import CompareSection from '@/components/broker/comparisons/CompareSection';
// import CompareOverview from '@/components/broker/comparisons/CompareOverview';
// import CompareProfile from '@/components/broker/comparisons/CompareProfile';
// import CompareRegulation from '@/components/broker/comparisons/CompareRegulation';
// import CompareService from '@/components/broker/comparisons/CompareService';
// import CompareSpreadsAndFees from '@/components/broker/comparisons/CompareSpreadsAndFees';
// import CompareTradable from '@/components/broker/comparisons/CompareTradable';
// import CompareTradingPlatforms from '@/components/broker/comparisons/CompareTradingPlatforms';
// import MDButton from '@/mui/components/MDButton';
// import MDTypography from '@/mui/components/MDTypography';
// import PageContent from '@/components/shared/view/PageContent';
// import Layout from '@/components/Layout';
// import Breadcrumb from '@/components/Breadcrumb';
// import MDBox from '@/mui/components/MDBox';
import axios from 'axios';
import config from '@/config';
import dynamic from 'next/dynamic';
import Spinner from '@/components/shared/Spinner';
import LazyLoad from 'react-lazyload';

const CompareOverview = dynamic(() => import('@/components/broker/comparisons/CompareOverview'), { loading: () => <Spinner />});
const CompareProfile = dynamic(() => import('@/components/broker/comparisons/CompareProfile'), { loading: () => <Spinner />});
const CompareRegulation = dynamic(() => import('@/components/broker/comparisons/CompareRegulation'), { loading: () => <Spinner />});
const CompareService = dynamic(() => import('@/components/broker/comparisons/CompareService'), { loading: () => <Spinner />});
const CompareSpreadsAndFees = dynamic(() => import('@/components/broker/comparisons/CompareSpreadsAndFees'), { loading: () => <Spinner />});
const CompareTradable = dynamic(() => import('@/components/broker/comparisons/CompareTradable'), { loading: () => <Spinner />});
const CompareTradingPlatforms = dynamic(() => import('@/components/broker/comparisons/CompareTradingPlatforms'), { loading: () => <Spinner />});
const MDButton = dynamic(() => import('@/mui/components/MDButton'));
const MDBox = dynamic(() => import('@/mui/components/MDBox'));
const MDTypography = dynamic(() => import('@/mui/components/MDTypography'));
const PageContent = dynamic(() => import('@/components/shared/view/PageContent'), { loading: () => <Spinner />});
const Layout = dynamic(() => import('@/components/Layout'));
const Breadcrumb = dynamic(() => import('@/components/Breadcrumb'));

function BrokerComparePage({ brokerComparable, allBroker, author, recordA, recordB, topBroker, category, mostRead, featuredBrokers, forexSchool, forexStrategy, promotion, navigation, categoryFooter}) {

  const router = useRouter();

  let brokerList = [] as Array<any>;
  for(var i = 0; allBroker.rows[i] ; i++) {
    brokerList[i] = { name: allBroker.rows[i].name, id: allBroker.rows[i].name_normalized };
  }

  console.log(brokerList);

  const [valueA, setValueA] = useState({
    id: recordA.name_normalized,
    name: recordA.name
  });
  const [valueB, setValueB] = useState({
    id: recordB.name_normalized,
    name: recordB.name
  });

  console.log(valueB)

  const onSubmit = (values) => {
    router.push(
      `/forex-cfd-broker-vergleich/${valueA.id}-versus-${valueB.id}`,
    );
  };

  const [title, setTitle] = useState(
    i18n.entities.broker.comparison.title,
  );
  const [description, setDescription] = useState(
    i18n.entities.broker.comparison.metaDescription,
  );

  useEffect(() => {
    setTitle(
      i18n.entities.broker.comparison.vsTitle( recordA?.name || '-', recordB?.name || '-' ),
    );
    setDescription(
      i18n.entities.broker.comparison.metaVsDescription(recordA?.name || '-', recordB?.name || '-'),
    );
  }, [recordA, recordB]);

  return (
    <Layout
      title={title}
      keywords={[
        'forex',
        'cfd',
        'broker',
        'vergleich',
        recordA?.name_normalized,
        recordB?.name_normalized,
      ].filter(Boolean)}
      description={description}
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
      record={undefined}
    >
      <PageContent
        px={{
          lg: 5,
          xs: 2,
        }}
      >
        <MDBox display="none">
          <Breadcrumb
          navigation={navigation}
            items={[
              {
                name: i18n.entities.broker.comparison.title,
                route: '/forex-cfd-broker-vergleich',
              },
            ]}
          />
        </MDBox>
        <MDTypography variant="h1">
          {i18n.entities.broker.comparison.title}
        </MDTypography>
        <MDTypography
          color="text"
          fontWeight="regular"
          variant="body2"
          mb={2}
        >
          {i18n.entities.broker.comparison.description}
        </MDTypography>
        <MDBox
          sx={{
            '& > * + *': {
              mt: 2,
            },
            '& > * + *:before': {
              display: 'block',
              content: '""',
              borderTop:
                '1px dotted rgba(128,128,128,.5)',
              width: '100%',
              ml: 2,
            },
          }}
        >
          <Grid container spacing={2} >
            <CompareSection name="selectBrokers" />
            <CompareDetail
              childrenA={
                <Autocomplete
                  disablePortal
                  id="brokerA"
                  options={brokerList}
                  defaultValue={valueA}
                  getOptionLabel={(option) => option.name}
                  onChange={(event: any, newValue: any) => {
                    if(newValue) {
                      setValueA({ id:newValue.id , name: newValue.name});
                    }
                    
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                    />
                  )}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      {option.name}
                    </Box>
                  )}
                />
              }
              childrenB={
                <Autocomplete
                 // disablePortal
                  id="brokerB"
                  options={brokerList}
                  defaultValue={valueB}
                  getOptionLabel={(option) => option.name}
                  onChange={(event: any, newValue: any) => {
                    if(newValue) {
                      setValueB({ id:newValue.id , name: newValue.name});
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      inputProps={{
                        ...params.inputProps
                      }}
                      variant="standard"
                    />
                  )}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      {option.name}
                    </Box>
                  )}
                />
              }
              after={
                <MDButton
                  variant="contained"
                  type="submit"
                  onClick={onSubmit}
                  color={'info'}
                  fullWidth
                >
                  <MDTypography
                    variant="h3"
                    fontSize="inherit"
                    color="inherit"
                  >
                    {i18n.entities.broker.comparison.compare.toUpperCase()}
                  </MDTypography>
                </MDButton>
              }
            />
          </Grid>
          {recordA && recordB && (
            <>
              <CompareOverview
                recordA={recordA}
                recordB={recordB}
              />
              <CompareRegulation
                recordA={recordA}
                recordB={recordB}
              />
              <CompareProfile
                recordA={recordA}
                recordB={recordB}
              />
              <CompareTradable
                recordA={recordA}
                recordB={recordB}
              />
              <CompareSpreadsAndFees
                recordA={recordA}
                recordB={recordB}
              />
              <CompareTradingPlatforms
                recordA={recordA}
                recordB={recordB}
              />
              <CompareService
                recordA={recordA}
                recordB={recordB}
              />
            </>
          )}
        </MDBox>
      </PageContent>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { query } = context
  const { slug } = query;

  const sortField = 'name';
  const sortOrder = "asc";

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

  const [
    baseRes,
    allBrokerRes,
    ] = await Promise.all([
    axios.get(`${config.backendUrl}/base`),
    axios.get(`${config.backendUrl}/broker`, {params}),
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

  const recordAReq = topBroker.rows[0].name_normalized;
  const recordBReq = topBroker.rows[1].name_normalized;

  const [
    recordARes,
    recordBRes,
    ] = await Promise.all([
      axios.post(`${config.backendUrl}/broker`,{url: recordAReq}),
      axios.post(`${config.backendUrl}/broker`,{url: recordBReq})
  ])
  const recordA = recordARes.data;
  const recordB = recordBRes.data;



  return { props: { brokerComparable, allBroker, author, recordA, recordB, topBroker, category, mostRead, featuredBrokers, forexSchool, forexStrategy, promotion, navigation, categoryFooter } };
};

export default BrokerComparePage;
