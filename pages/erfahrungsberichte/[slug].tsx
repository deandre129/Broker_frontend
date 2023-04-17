/* eslint-disable react-hooks/exhaustive-deps */
import i18n from '@/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import AuthorView from '@/components/shared/view/AuthorView';
import Breadcrumb from '@/components/Breadcrumb';
import BrokerCharacteristicsView from '@/components/broker/components/BrokerCharacteristicsView';
import BrokerHeader from '@/components/broker/components/BrokerHeader';
import BrokerHomepageUrls from '@/components/broker/components/BrokerHomepageUrls';
import BrokerMarketsView from '@/components/broker/components/BrokerMarketsView';
import BrokerOverviewView from '@/components/broker/components/BrokerOverviewView';
import BrokerPlatformView from '@/components/broker/components/BrokerPlatformView';
// import BrokerPostPage from './BrokerPostPage';
import BrokerServiceView from '@/components/broker/components/BrokerServiceView';
import BrokerSpreadsView from '@/components/broker/components/BrokerSpreadsView';
import BrokerTabs from '@/components/broker/BrokerTabs';
import brokerViewActions from '@/modules/broker/view/brokerViewActions';
import brokerViewSelectors from '@/modules/broker/view/brokerViewSelectors';
import HtmlView from '@/components/shared/view/HtmlView';
import Layout from '@/components/Layout';
import MDBox from '@/mui/components/MDBox';
import PageContent from '@/components/shared/view/PageContent';
import Spinner from '@/components/shared/Spinner';
import TabPanel from '@/components/shared/tab/TabPanel';
import TopBrokersView from '@/components/broker/components/TopBrokersView';
import MDTypography from '@/mui/components/MDTypography';
import moment from 'moment';
import ScrollTo from '@/components/ScrollTo';
import urlParse from 'url-parse';
import BrokerForexSignaleView from '@/components/broker/components/BrokerForexSignaleView';
import axios from 'axios';
import config from '@/config';
import yupFormSchemas from '@/modules/shared/yup/yupFormSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import BrokerPostPage from '@/components/BrokerPostPage';

const schema = yup.object().shape({
  name: yupFormSchemas.string(i18n.common.name, {
    required: true,
    min: 1,
    max: 255,
  }),
  email: yupFormSchemas.email(i18n.common.email, {
    required: true,
  }),
  review: yupFormSchemas.string(i18n.common.review, {
    required: true,
  }),
  rating: yupFormSchemas.integer(i18n.common.rating, {}),
  recaptcha: yupFormSchemas.string(
    i18n.common.recaptcha,
    { required: true },
  ),
});

const BrokerViewPage = ({ slug, author, page, topBroker, category, mostRead, featuredBrokers, forexSchool, forexStrategy, promotion, navigation, categoryFooter }) => {
  const router = useRouter();

  const record = page;

  let title = '';
  let keywords = ['erfahrungen', 'bewertungen', 'test'];
  let description = null;

  if (record) {
    keywords.unshift(record.name);
    const stars = [];
    for (
      let i = 0;
      i <
      Number(
        (record.rating?.overall_rating ?? 0).toFixed(0),
      );
      i++, stars.push('✪')
    );
    title = `${
      record.name
    } Erfahrungen ${moment().year()} » unabhängiger Test`;
    description = record.is_broker
      ? `${
          record.name
        } Erfahrungen » Fazit von Tradern: ${stars.join(
          '',
        )} aus ${
          record.rating?.overall_reviews ?? 0
        } Bewertungen » Unser Test zu Spreads ✚ Plattform ✚ Service ➔ Jetzt lesen!`
      : `${
          record.name
        } Erfahrungen & Test » Fazit von Tradern: ${stars.join(
          '',
        )} aus ${
          record.rating?.overall_reviews ?? 0
        } Bewertungen ➔ Jetzt lesen!`;
  }

  const [tabValue, setTabValue] = useState(0);
  const [gotoPosts, setGotoPosts] = useState(false);

  const handleSetTabValue = (event: any, newValue: any) => {
    if (newValue === 1) {
      newValue = 0;
      setTabValue(newValue);
      setGotoPosts(!gotoPosts);
      ScrollTo('list-top-4-pagination');
    }
    setTabValue(newValue);
  };

  return (
    <Layout
      title={title}
      keywords={keywords}
      description={description}
      record={record}
      noArticle

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
                Boolean(record.categories[0]?.category) && {
                  name: record.categories[0]?.category
                    ?.name,
                  route:
                    record.categories[0]?.category?.link,
                },
                {
                  name: record.name,
                  route: slug,
                },
              ].filter(Boolean)}
            />
            <BrokerHeader record={record} />
            {record.expert_advisor ? null : record.forex_signale ? (
              <BrokerForexSignaleView record={record} />
            ) : (
              <>
                <MDBox py={2}>
                  <BrokerTabs
                    labels={[
                      'overview',
                      {
                        raw: true,
                        label: `${record.name} Erfahrungen`,
                      },
                      'characteristics',
                      'platform',
                      'markets',
                      'spreads',
                      'service',
                    ]}
                    value={tabValue}
                    onChange={handleSetTabValue}
                  />
                </MDBox>
                {tabValue !== 1 && (
                  <MDBox py={2}>
                    <TabPanel
                      value={tabValue}
                      index={0}
                      hideOnly
                    >
                      <BrokerOverviewView record={record} />
                    </TabPanel>
                    <TabPanel
                      value={tabValue}
                      index={2}
                      hideOnly
                    >
                      <BrokerCharacteristicsView
                        record={record}
                      />
                    </TabPanel>
                    <TabPanel
                      value={tabValue}
                      index={3}
                      hideOnly
                    >
                      <BrokerPlatformView record={record} />
                    </TabPanel>
                    <TabPanel
                      value={tabValue}
                      index={4}
                      hideOnly
                    >
                      <BrokerMarketsView record={record} />
                    </TabPanel>
                    <TabPanel
                      value={tabValue}
                      index={5}
                      hideOnly
                    >
                      <BrokerSpreadsView record={record} />
                    </TabPanel>
                    <TabPanel
                      value={tabValue}
                      index={6}
                      hideOnly
                    >
                      <BrokerServiceView record={record} />
                    </TabPanel>
                  </MDBox>
                )}
                <BrokerHomepageUrls record={record} />
              </>
            )}
          </PageContent>
          <PageContent pt={4}>
            <BrokerPostPage
              brokerId={record.id}
              name={record.name}
              middle={
                <BrokerHomepageUrls record={record} />
              }
              topBrokers = {topBroker}
              slug={slug}
            />
          </PageContent>
          {Boolean(record.creteria) &&
            Boolean(record.creteria.body) && (
              <PageContent>
                <MDBox fontSize="1rem">
                  <HtmlView value={record.creteria?.body} />
                </MDBox>
              </PageContent>
            )}
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
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { query } = context
  const { slug } = query;
  const url = slug

  const [
    pageRes,
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
    axios.post(`${config.backendUrl}/broker`,{url}),
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
  const page = pageRes.data;
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

  return { props: { slug, author, page, topBroker, category, mostRead, featuredBrokers, forexSchool, forexStrategy, promotion, navigation, categoryFooter } };
};

export default BrokerViewPage;
