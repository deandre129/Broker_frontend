/* eslint-disable react-hooks/exhaustive-deps */
import i18n from "@/i18n";
import { useState, useEffect } from "react";
import AuthorView from "@/components/shared/view/AuthorView";
// import Breadcrumb from "@/components/Breadcrumb";
// import BrokerCharacteristicsView from "@/components/broker/components/BrokerCharacteristicsView";
// import BrokerHeader from "@/components/broker/components/BrokerHeader";
// import BrokerHomepageUrls from "@/components/broker/components/BrokerHomepageUrls";
// import BrokerMarketsView from "@/components/broker/components/BrokerMarketsView";
// import BrokerOverviewView from "@/components/broker/components/BrokerOverviewView";
// import BrokerPlatformView from "@/components/broker/components/BrokerPlatformView";
// import BrokerServiceView from "@/components/broker/components/BrokerServiceView";
// import BrokerSpreadsView from "@/components/broker/components/BrokerSpreadsView";
import BrokerTabs from "@/components/broker/BrokerTabs";
//import HtmlView from "@/components/shared/view/HtmlView";
//import Layout from "@/components/Layout";
// import MDBox from "@/mui/components/MDBox";
// import PageContent from "@/components/shared/view/PageContent";
// import TabPanel from "@/components/shared/tab/TabPanel";
import TopBrokersView from "@/components/broker/components/TopBrokersView";
//import MDTypography from "@/mui/components/MDTypography";
import moment from "moment";
import ScrollTo from "@/components/ScrollTo";
//import BrokerForexSignaleView from "@/components/broker/components/BrokerForexSignaleView";
import axios from "axios";
import config from "@/config";
//import BrokerPostPage from "@/components/BrokerPostPage";
import dynamic from "next/dynamic";
import Spinner from "@/components/shared/Spinner";
import LazyLoad from 'react-lazyload'
import { initPiwik } from '@/utils/piwik';

const Layout = dynamic(() => import('@/components/Layout'));
const Breadcrumb = dynamic(() => import('@/components/Breadcrumb'));
const BrokerCharacteristicsView = dynamic(() => import('@/components/broker/components/BrokerCharacteristicsView'), { loading: () => <Spinner />});
const BrokerHeader = dynamic(() => import('@/components/broker/components/BrokerHeader'), { loading: () => <Spinner />});
const BrokerHomepageUrls = dynamic(() => import('@/components/broker/components/BrokerHomepageUrls'), { loading: () => <Spinner />});
const BrokerMarketsView = dynamic(() => import('@/components/broker/components/BrokerMarketsView'), { loading: () => <Spinner />});
const BrokerOverviewView = dynamic(() => import('@/components/broker/components/BrokerOverviewView'), { loading: () => <Spinner />});
const BrokerPlatformView = dynamic(() => import('@/components/broker/components/BrokerPlatformView'), { loading: () => <Spinner />});
const BrokerServiceView = dynamic(() => import('@/components/broker/components/BrokerServiceView'), { loading: () => <Spinner />});
const BrokerSpreadsView = dynamic(() => import('@/components/broker/components/BrokerSpreadsView'), { loading: () => <Spinner />});
const MDBox = dynamic(() => import('@/mui/components/MDBox'));
const MDTypography = dynamic(() => import('@/mui/components/MDTypography'));
const PageContent = dynamic(() => import('@/components/shared/view/PageContent'), { loading: () => <Spinner />});
const HtmlView = dynamic(() => import('@/components/shared/view/HtmlView'), { loading: () => <Spinner />});
const TabPanel = dynamic(() => import('@/components/shared/tab/TabPanel'));
const BrokerPostPage = dynamic(() => import('@/components/BrokerPostPage'), { loading: () => <Spinner />});
const BrokerForexSignaleView = dynamic(() => import('@/components/broker/components/BrokerForexSignaleView'));

const BrokerViewPage = ({
  brokerComparable,
  slug,
  author,
  page,
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
  const record = page;

  let title = "";
  let keywords = ["erfahrungen", "bewertungen", "test"];
  let description = null;

  useEffect(() => {
    initPiwik();
  }, []);

  if (record) {
    keywords.unshift(record.name);
    const stars = [];
    for (
      let i = 0;
      i < Number((record.rating?.overall_rating ?? 0).toFixed(0));
      i++, stars.push("✪")
    );
    title = `${record.name} Erfahrungen ${moment().year()} » unabhängiger Test`;
    description = record.is_broker
      ? `${record.name} Erfahrungen » Fazit von Tradern: ${stars.join(
          ""
        )} aus ${
          record.rating?.overall_reviews ?? 0
        } Bewertungen » Unser Test zu Spreads ✚ Plattform ✚ Service ➔ Jetzt lesen!`
      : `${record.name} Erfahrungen & Test » Fazit von Tradern: ${stars.join(
          ""
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
      ScrollTo("list-top-4-pagination");
    }
    setTabValue(newValue);
  };

  const isBrowser = typeof window !== "undefined";

  return (
    <Layout
      title={title}
      keywords={keywords}
      description={description}
      record={record}
      noArticle
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
                Boolean(record.categories[0]?.category) && {
                  name: record.categories[0]?.category?.name,
                  route: record.categories[0]?.category?.link,
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
                      "overview",
                      {
                        raw: true,
                        label: `${record.name} Erfahrungen`,
                      },
                      "characteristics",
                      "platform",
                      "markets",
                      "spreads",
                      "service",
                    ]}
                    value={tabValue}
                    onChange={handleSetTabValue}
                  />
                </MDBox>
                {tabValue !== 1 && (
                  <MDBox py={2}>
                    <TabPanel value={tabValue} index={0} hideOnly>
                      <BrokerOverviewView record={record} />
                    </TabPanel>
                    <TabPanel value={tabValue} index={2} hideOnly>
                      <BrokerCharacteristicsView record={record} />
                    </TabPanel>
                    <TabPanel value={tabValue} index={3} hideOnly>
                      <BrokerPlatformView record={record} />
                    </TabPanel>
                    <TabPanel value={tabValue} index={4} hideOnly>
                      <BrokerMarketsView record={record} />
                    </TabPanel>
                    <TabPanel value={tabValue} index={5} hideOnly>
                      <BrokerSpreadsView record={record} />
                    </TabPanel>
                    <TabPanel value={tabValue} index={6} hideOnly>
                      <BrokerServiceView record={record} />
                    </TabPanel>
                  </MDBox>
                )}
                <BrokerHomepageUrls record={record} />
              </>
            )}
          </PageContent>
          {isBrowser && (
            <>
                <PageContent pt={4}>
                  <BrokerPostPage
                    brokerId={record.id}
                    name={record.name}
                    middle={<BrokerHomepageUrls record={record} />}
                    topBrokers={topBroker}
                    slug={slug}
                  />
                </PageContent>
              {Boolean(record.creteria) && Boolean(record.creteria.body) && (
                <PageContent>
                  <MDBox fontSize="1rem">
                    <HtmlView value={record.creteria?.body} />
                  </MDBox>
                </PageContent>
              )}
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
            </>
          )}
        </MDBox>
      )}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { query } = context;
  const { slug } = query;
  const url = slug;

  const [
    pageRes,
    baseRes,
  ] = await Promise.all([
    axios.post(`${config.backendUrl}/broker`, { url }),
    axios.get(`${config.backendUrl}/base`),
  ]);
  const page = pageRes.data;
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

  return {
    props: {
      brokerComparable,
      slug,
      author,
      page,
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
  };
}

export default BrokerViewPage;
