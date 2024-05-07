import { Card, CardHeader, Grid } from '@mui/material';
import Link from 'next/link';
import MaterialLink from '@mui/material/Link';
// import MDBox from '@/mui/components/MDBox';
// import MDTypography from '@/mui/components/MDTypography';
import dynamic from 'next/dynamic';

const MDBox = dynamic(() => import('@/mui/components/MDBox'));
const MDTypography = dynamic(() => import('@/mui/components/MDTypography'));

function Advisors({ record }) {
  if (
    !record ||
    ((!record.blogs || !record.blogs.length) &&
      (!record.articles || !record.articles.length))
  ) {
    return null;
  }
  return (
    <Grid xs={12} item>
      <Card>
        <CardHeader
          title={
            <MDTypography
              variant="body1"
              fontWeight="bold"
              lineHeight={1.35}
            >
              {`${record.name.replace(/\([\w\d\s]+\)/g, '')
                .trim()} Ratgeber`}
            </MDTypography>
          }
          sx={{ pb: 1, px: 3, pt: 2 }}
        />
        <MDBox sx={{ pt: 0, px: 3, pb: 2 }}>
          {record.blogs.map((row, idx) => (
            <MDTypography
              key={idx}
              variant="body2"
              fontWeight="regular"
              color={'info'}
            >
              <MaterialLink
                component={Link}
                href={`/blog/${row.name_normalized}`}
                underline="hover"
              >
                {row.name}
              </MaterialLink>
            </MDTypography>
          ))}
          {record.articles.map((row, idx) => (
            <MDTypography
              key={idx}
              variant="body2"
              fontWeight="regular"
              color={'info'}
            >
              <MaterialLink
                component={Link}
                href={`/${record.name_normalized}/${row.name_normalized}`}
                underline="hover"
              >
                {row.name}
              </MaterialLink>
            </MDTypography>
          ))}
        </MDBox>
      </Card>
    </Grid>
  );
}

Advisors.propTypes = {};

export default Advisors;
