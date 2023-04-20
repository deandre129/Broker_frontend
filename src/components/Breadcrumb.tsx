import Link from 'next/link';
import { useRouter } from 'next/router';
import { selectMuiSettings } from '@/modules/mui/muiSelectors';
// import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import config from '@/config';
import MaterialLink from '@mui/material/Link';
// import MDBox from '@/mui/components/MDBox';
// import MDTypography from '@/mui/components/MDTypography';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

const MDBox = dynamic(() => import('@/mui/components/MDBox'));
const MDTypography = dynamic(() => import('@/mui/components/MDTypography'));
const ArrowRightIcon = dynamic(() => import('@mui/icons-material/ArrowRight'));

function Breadcrumb({ items, navigation }) {

  const router = useRouter();
  const replaceFn = (item) =>
    item.route.replace(/\/*$/, '') ===
    '/expert-advisors-vergleich'
      ? { name: 'Expert Advisor Vergleich' }
      : {};
  const navItems = [];
  const currentRoute = router.asPath;

  const selectNavigationItemFn = (item) => {
    if (
      currentRoute.indexOf(
        item.route.replace(/\/*$/, ''),
      ) === 0
    ) {
      navItems.push({
        ...item,
        ...replaceFn(item),
      });
      (item.children || [])
        .filter(({ type }) => !type)
        .forEach(selectNavigationItemFn);
    }
  };
  navigation && navigation.forEach(selectNavigationItemFn)
  const result =
    items?.map((item) => ({
      ...item,
      ...replaceFn(item),
    })) || navItems.filter(({ route }) => route !== '/');
  return (
    <MDBox
      display="inline-flex"
      flexWrap="wrap"
      gap={1}
      mb={2}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: (result || []).map(
              (item, idx, arr) => ({
                '@type': 'ListItem',
                position: idx + 1,
                name: item.name,
                ...(idx + 1 < arr.length
                  ? {
                      item: `${
                        config.frontendUrl.protocol
                      }://${
                        config.frontendUrl.host
                      }${item.route.replace(/\/*$/, '')}`,
                    }
                  : {}),
              }),
            ),
          }),
        }}
      />
      {Boolean(result.length) &&
        result.map((item, idx, arr) => (
          <MDBox
            key={item.route}
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            gap={1}
          >
            {Boolean(idx) && (
              <ArrowRightIcon color="secondary" />
            )}
            <MDTypography
              variant="body2"
              color={
                idx + 1 !== arr.length
                  ? 'info'
                  : 'text'
              }
              fontWeight="regular"
            >
              <MaterialLink
                component={Link}
                href={item.route.replace(/\/*$/, '')}
                underline="hover"
                sx={{
                  color: 'inherit !important',
                }}
              >
                {item.name}
              </MaterialLink>
            </MDTypography>
          </MDBox>
        ))}
    </MDBox>
  );
}

Breadcrumb.defaultValues = {
  items: null,
};

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      route: PropTypes.string,
    }),
  ),
  navigation: PropTypes.any,
};

export default Breadcrumb;
