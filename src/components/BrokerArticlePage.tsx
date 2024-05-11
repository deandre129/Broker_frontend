import i18n from '@/i18n';
//import MDBox from '@/mui/components/MDBox';
// import MDTypography from '@/mui/components/MDTypography';
import TopBrokersView from './broker/components/TopBrokersView';
// import Breadcrumb from './Breadcrumb';
// import HtmlView from './shared/view/HtmlView';
// import PageContent from './shared/view/PageContent';
import AuthorView from './shared/view/AuthorView';
import dynamic from 'next/dynamic';
import LazyLoad from 'react-lazyload'
import Spinner from "@/components/shared/Spinner";

const MDBox = dynamic(() => import('@/mui/components/MDBox'));
const MDTypography = dynamic(() => import('@/mui/components/MDTypography'));
const Breadcrumb = dynamic(() => import('./Breadcrumb'), { loading: () => <Spinner />});
const HtmlView = dynamic(() => import('./shared/view/HtmlView'), { loading: () => <Spinner />});
const PageContent = dynamic(() => import('./shared/view/PageContent'), { loading: () => <Spinner />});

function BrokerArticlePage({ brokerArticle, topBroker, navigation, author }) {
  return (
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
              name: brokerArticle.broker.name,
              route: `/erfahrungsberichte/${brokerArticle.broker.name_normalized}`,
            },
            {
              name: brokerArticle.name,
              route: `/${brokerArticle.broker.name_normalized}/${brokerArticle.name_normalized}`,
            },
          ]}
        />
        {brokerArticle.content2 && brokerArticle.content2 !== null && brokerArticle.content2 !== "" && (
          <>
            <HtmlView value={brokerArticle.content2} />
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
        <HtmlView value={brokerArticle.content} />
      </PageContent>
      <AuthorView author={author} />
      <PageContent
        display={{
          xs: 'none',
          lg: 'block',
        }}
      >
        <MDTypography display="block" variant="h3" mb={2}>
          {i18n.entities.home.top_brokers}
        </MDTypography>
        <TopBrokersView topBrokers = { topBroker }/>
      </PageContent>
    </MDBox>
  );
}

export default BrokerArticlePage;
