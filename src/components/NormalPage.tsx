import i18n from '@/i18n';
// import Breadcrumb from './Breadcrumb';
// import HtmlView from './shared/view/HtmlView';
import lColors from '@/mui/assets/theme/base/colors';
import MaterialLink from '@mui/material/Link';
// import MDBox from '@/mui/components/MDBox';
// import MDTypography from '@/mui/components/MDTypography';
// import PageContent from '@/components/shared/view/PageContent';
import TopBrokersView from './broker/components/TopBrokersView';
import AuthorView from '@/components/shared/view/AuthorView';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Spinner from "@/components/shared/Spinner";
import LazyLoad from 'react-lazyload'

const MDBox = dynamic(() => import('@/mui/components/MDBox'));
const MDTypography = dynamic(() => import('@/mui/components/MDTypography'));
const PageContent = dynamic(() => import('@/components/shared/view/PageContent'), { loading: () => <Spinner />});
const HtmlView = dynamic(() => import('./shared/view/HtmlView'), { loading: () => <Spinner />});
const Breadcrumb = dynamic(() => import('./Breadcrumb'), { loading: () => <Spinner />});

function NormalPage({ downloadPdf, page, topBroker, navigation, author }) {
  const colors = lColors;

  const handleDownloadPagePDF = () => {
    if (page?.navigation || page.link !== '') {
      if(downloadPdf.downloadPdf){
        window.open(downloadPdf.downloadUrl);
      }
    }
  };

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
        <Breadcrumb navigation={navigation} items={undefined}/>
        {(page.link.includes("/forex-schule/") ||
          page.link.includes("/forex-strategien/")) &&
          (page.body2 !== null && page.body2 !== "") && (
            <>
              <HtmlView value={page.body2} />
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
        <HtmlView value={page.body} />
        {Boolean(page.related_links.length) && (
          <MDBox
            py={2}
            my={2}
            borderTop={`1px dashed ${colors.inputBorderColor}`}
            borderBottom={`1px dashed ${colors.inputBorderColor}`}
          >
            <MDTypography variant="h3">
              {page.navigation.type === 'FOREX_STRATEGY'
                ? 'Weitere Forex Strategien'
                : page.navigation.type === 'DOWNLOADS'
                ? 'Weitere MetaTrader Indikatoren'
                : 'Weiterführende Links'}
            </MDTypography>
            {page.related_links.map(
              ({ name, url }, idx) => (
                <MDTypography
                  key={idx}
                  variant="body2"
                  color={'info'}
                  fontWeight="regular"
                >
                  <MaterialLink href={url}>
                    {name}
                  </MaterialLink>
                </MDTypography>
              ),
            )}
          </MDBox>
        )}
        {Boolean(page.page_warning) && (
          <>
            <MDTypography variant="h3">
              Warnung
            </MDTypography>
            <HtmlView value={page.page_warning.body} />
          </>
        )}
        <LazyLoad>
        {Boolean(page.pdf) && (
          <MDTypography
            variant="body2"
            color={'info'}
            fontWeight="regular"
            mt={2}
            display="flex"
            alignItems="center"
            gap={1}
          >
            <Image 
              src="/images/files/pdf.png"
              width="16"
              height="16"
              alt="pdf" 
            />
            <MaterialLink
              onClick={handleDownloadPagePDF}
              underline="hover"
              style={{ cursor: 'pointer' }}
            >
              {`${page.name} als PDF speichern`}
            </MaterialLink>
            
          </MDTypography>
        )}
        </LazyLoad>
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
          <TopBrokersView topBrokers={topBroker}/>
        </PageContent>
    </MDBox>
  );
}

export default NormalPage;
