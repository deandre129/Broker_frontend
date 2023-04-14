import { Card, CardHeader, Grid } from '@mui/material';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import MaterialLink from '@mui/material/Link';
import MDBox from '@/mui/components/MDBox';
import MDTypography from '@/mui/components/MDTypography';
import navigationForexStrategySelectors from '@/modules/navigation/forexStrategy/navigationForexStrategySelectors';
import { selectMuiSettings } from '@/modules/mui/muiSelectors';

function ForexStrategy({forexStrategy}) {
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
              Forex-Strategien
            </MDTypography>
          }
          sx={{ pb: 1, px: 3, pt: 2 }}
        />
        <MDBox sx={{ pt: 0, px: 3, pb: 2 }}>
          {forexStrategy.rows.map((row) => (
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

ForexStrategy.propTypes = {};

export default ForexStrategy;
