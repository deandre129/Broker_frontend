import { Card, CardHeader, Grid } from '@mui/material';
import Link from 'next/link';
import MaterialLink from '@mui/material/Link';
import dynamic from 'next/dynamic';
// import MDBox from '@/mui/components/MDBox';
// import MDTypography from '@/mui/components/MDTypography';

const MDBox = dynamic(() => import('@/mui/components/MDBox'));
const MDTypography = dynamic(() => import('@/mui/components/MDTypography'));

function MostRead({mostRead}) {
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
              Meist gelesen
            </MDTypography>
          }
          sx={{ pb: 1, px: 3, pt: 2 }}
        />
        <MDBox sx={{ pt: 0, px: 3, pb: 2 }}>
          {mostRead.rows.map((row) => (
            <MDTypography
              key={row.id}
              variant="body2"
              color={'info'}
              fontWeight="regular"
            >
              <MaterialLink
                component={Link}
                href={row.link}
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

MostRead.propTypes = {};

export default MostRead;
