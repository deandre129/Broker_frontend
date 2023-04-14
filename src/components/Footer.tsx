import i18n from '@/i18n';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import categoryFooterSelectors from '@/modules/category/footer/categoryFooterSelectors';
import config from '@/config';
import Container from '@mui/material/Container';
import MaterialLink from '@mui/material/Link';
import MDBox from '@/mui/components/MDBox';
import MDTypography from '@/mui/components/MDTypography';
import PageContent from './shared/view/PageContent';
import TopBrokersView from './broker/components/TopBrokersView';
import { selectMuiSettings } from '@/modules/mui/muiSelectors';
import { useTranslation } from 'next-i18next';

function Footer({categoryFooter}) {
  return (
    <Container>
      <MDBox
        display="flex"
        flexDirection="column"
        gap={2}
        my={2}
      >
        <PageContent
          display={{
            xs: 'block',
            lg: 'none',
          }}
        >
          <MDTypography display="block" variant="h3" mb={2}>
            {i18n.entities.home.top_brokers}
          </MDTypography>
          {/* <TopBrokersView /> */}
        </PageContent>
        <MDBox py={5}>
          <MDTypography
            variant="body2"
            fontWeight="regular"
            color="text"
          >
            {i18n.footer.description(config.frontendUrl.host)}
          </MDTypography>

          {categoryFooter.count && (
            <>
              <MDBox
                display="inline-flex"
                flexWrap="wrap"
                mt={3}
                gap={2}
              >
                {categoryFooter.rows.map((cat) => (
                  <MDTypography
                    key={cat.id}
                    variant="body2"
                    color={'info'}
                    lineHeight={1}
                    fontWeight="regular"
                  >
                    <MaterialLink
                      component={Link}
                      href={cat.link}
                      underline="hover"
                    >
                      {cat.name}
                    </MaterialLink>
                  </MDTypography>
                ))}
              </MDBox>
              <br />
            </>
          )}

          <MDBox
            display="inline-flex"
            flexWrap="wrap"
            mt={3}
            gap={2}
          >
            {[
              'Kontakt',
              'Nutzungsbedingungen',
              'Risikobelehrung',
              'Impressum',
            ].map((cat) => (
              <MDTypography
                key={cat}
                variant="body2"
                color={'info'}
                lineHeight={1}
                fontWeight="regular"
              >
                <MaterialLink
                  component={Link}
                  href={`/${cat.toLowerCase()}`}
                  underline="hover"
                >
                  {cat}
                </MaterialLink>
              </MDTypography>
            ))}
          </MDBox>
        </MDBox>
      </MDBox>
    </Container>
  );
}

export default Footer;
