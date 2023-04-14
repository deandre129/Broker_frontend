import { Autocomplete, Box, Grid, TextField } from '@mui/material';

import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import i18n from '@/i18n';
import { selectMuiSettings } from '@/modules/mui/muiSelectors';
import brokerComparisonActions from '@/modules/broker/comparison/brokerComparisonActions';
import brokerComparisonSelectors from '@/modules/broker/comparison/brokerComparisonSelectors';
import CompareDetail from '@/components/broker/comparisons/CompareDetail';
import CompareOverview from '@/components/broker/comparisons/CompareOverview';
import CompareProfile from '@/components/broker/comparisons/CompareProfile';
import CompareRegulation from '@/components/broker/comparisons/CompareRegulation';
import CompareSection from '@/components/broker/comparisons/CompareSection';
import CompareService from '@/components/broker/comparisons/CompareService';
import CompareSpreadsAndFees from '@/components/broker/comparisons/CompareSpreadsAndFees';
import CompareTradable from '@/components/broker/comparisons/CompareTradable';
import CompareTradingPlatforms from '@/components/broker/comparisons/CompareTradingPlatforms';
import MDButton from '@/mui/components/MDButton';
import MDTypography from '@/mui/components/MDTypography';
import PageContent from '@/components/shared/view/PageContent';
import Spinner from '@/components/shared/Spinner';
import yupFormSchemas from '@/modules/shared/yup/yupFormSchemas';
import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';
import MDBox from '@/mui/components/MDBox';
import brokerTopSelectors from '@/modules/broker/top/brokerTopSelectors';
import axios from 'axios';
import config from '@/config';

const schema = yup.object().shape({
  brokerA: yupFormSchemas.relationToOne(
    i18n.entities.broker.comparison.brokerA,
    {
      required: true,
    },
  ),
  brokerB: yupFormSchemas.relationToOne(
    i18n.entities.broker.comparison.brokerB,
    {
      required: true,
    },
  ),
});

function BrokerComparePage({ brokerList, author, recordA, recordB, topBroker, category, mostRead, featuredBrokers, forexSchool, forexStrategy, promotion, navigation, categoryFooter}) {
  const dispatch = useDispatch();

  const router = useRouter();

  const extracts =
    /^\/forex-cfd-broker-vergleich\/([\w-]+)-versus-([\w-]+)$/.exec(
      router.asPath,
    );
  const [valueA, setValueA] = useState({
    id: recordA.name_normalized,
    name: recordA.name
  });
  const [valueB, setValueB] = useState({
    id: recordB.name_normalized,
    name: recordB.name
  });

  const recordToValue = (record) =>
    record && {
      id: record.name_normalized,
      name: record.name,
    };

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
      i18n.entities.broker.comparison.vsTitle(recordA?.name || '-',recordB?.name || '-'),
    );
    setDescription(
      i18n.entities.broker.comparison.metaVsDescription(recordA?.name || '-',recordB?.name || '-'),
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
                        value={valueA.name}
                        onChange={(event: any, newValue: any) => {
                          if(newValue) {
                            setValueA({ id:newValue.id , name: newValue.name});
                          }
                          
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
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
                        disablePortal
                        id="brokerB"
                        options={brokerList}
                        value={valueB.name}
                        onChange={(event: any, newValue: any) => {
                          if(newValue) {
                            setValueB({ id:newValue.id , name: newValue.name});
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
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
                          {i18n.entities.broker.comparison.compare}
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
  let index = slug.indexOf("-versus-");
  
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

  const recordAReq = slug.slice(0,index);
  const recordBReq = slug.slice(index+8,slug.length);

  const recordARes = await axios.post(`${config.backendUrl}/broker`,{url: recordAReq});
  const recordA = recordARes.data;

  const recordBRes = await axios.post(`${config.backendUrl}/broker`,{url: recordBReq});
  const recordB = recordBRes.data;

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

  const allBrokerRes = await axios.get(`${config.backendUrl}/broker`, {params});
  const allBroker = allBrokerRes.data;

  let brokerList = [] as Array<any>;
  for(var i = 0; allBroker.rows[i] ; i++) {
    brokerList[i] = { name: allBroker.rows[i].name, id: allBroker.rows[i].name_normalized };
  }

  const authorRes = await axios.get(`${config.backendUrl}/author`);
  const author = authorRes.data;


  return { props: { brokerList, author, recordA, recordB, topBroker, category, mostRead, featuredBrokers, forexSchool, forexStrategy, promotion, navigation, categoryFooter } };
};

export default BrokerComparePage;
