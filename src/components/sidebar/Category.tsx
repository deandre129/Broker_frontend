import { Card, CardHeader, Grid } from '@mui/material';
import Link from 'next/link';
import MaterialLink from '@mui/material/Link';
import dynamic from 'next/dynamic';
// import MDBox from '@/mui/components/MDBox';
// import MDTypography from '@/mui/components/MDTypography'

const MDBox = dynamic(() => import('@/mui/components/MDBox'));
const MDTypography = dynamic(() => import('@/mui/components/MDTypography'));

function Category({category}) {
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
              Broker-Kategorien
            </MDTypography>
          }
          sx={{ pb: 1, px: 3, pt: 2 }}
        />
        
        <MDBox sx={{ pt: 0, px: 3, pb: 2 }}>
          {category.rows.map((cat) => (
            <MDTypography
              key={cat.id}
              variant="body2"
              color={'info'}
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
      </Card>
    </Grid>
  );
}

Category.propTypes = {};

export default Category;
