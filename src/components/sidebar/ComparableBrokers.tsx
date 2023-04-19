import { Card, CardHeader, Grid } from '@mui/material';
import Link from 'next/link';
import MaterialLink from '@mui/material/Link';
// import MDBox from '@/mui/components/MDBox';
// import MDTypography from '@/mui/components/MDTypography';
import { selectMuiSettings } from '@/modules/mui/muiSelectors';
import dynamic from 'next/dynamic';

const MDBox = dynamic(() => import('@/mui/components/MDBox'));
const MDTypography = dynamic(() => import('@/mui/components/MDTypography'));


function ComparableBrokers({ record, brokerComparable }) {
  console.log(record);
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
                .trim()} vergleichen mit`}
            </MDTypography>
          }
          sx={{ pb: 1, px: 3, pt: 2 }}
        />
        <MDBox sx={{ pt: 0, px: 3, pb: 2 }}>
          {brokerComparable.rows
            .filter(({ id }) => id !== record.id)
            .map((row, idx) => (
              <MDTypography
                key={idx}
                variant="body2"
                fontWeight="regular"
                color={'info'}
              >
                <MaterialLink
                  component={Link}
                  href={`/forex-cfd-broker-vergleich/${record.name_normalized}-versus-${row.name_normalized}`}
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

ComparableBrokers.propTypes = {};

export default ComparableBrokers;
