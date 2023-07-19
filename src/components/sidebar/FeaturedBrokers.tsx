/* eslint-disable @next/next/no-img-element */
import { Card, CardHeader, Grid } from '@mui/material';
import Link from 'next/link';
import ImageView from '../ImageView';
import MaterialLink from '@mui/material/Link';
// import MDBox from '@/mui/components/MDBox';
// import MDTypography from '@/mui/components/MDTypography';
// import RatingViewItem from '../shared/view/RatingViewItem';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import LazyLoad from 'react-lazyload'

const MDBox = dynamic(() => import('@/mui/components/MDBox'));
const MDTypography = dynamic(() => import('@/mui/components/MDTypography'));
const RatingView = dynamic(() => import('../RatingView'));


function FeaturedBrokers({featuredBrokers}) {

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
              Broker vorgestellt
            </MDTypography>
          }
          sx={{ pb: 1, px: 3, pt: 2 }}
        />
        <MDBox sx={{ pt: 0, px: 3, pb: 2 }}>
          <Grid spacing={2} container>
            {featuredBrokers.rows.map((row, idx) => (
              <Grid key={row.id} xs={12} item>
                <MDBox
                  display="flex"
                  flexDirection="column"
                  sx={{
                    '& > * + *': {
                      mt: 1,
                    },
                  }}
                >
                  <MaterialLink
                    href={row.meta?.homepage}
                    target="_blank"
                  >
                    <ImageView
                      value={
                        row.broker_image_broker_detail_logo
                      }
                      sx={{
                        width: '100%',
                      }}
                    />
                  </MaterialLink>
                  <MDBox mx="auto">
                    <LazyLoad>
                      <RatingView value={row.rating?.overall_rating} width={27} height={24} size={"large1"}/>
                    </LazyLoad>
                  </MDBox>
                  <MDTypography
                    variant="body2"
                    fontWeight="regular"
                    color={'info'}
                    mx="auto"
                    mt={1}
                  >
                    <MaterialLink
                      component={Link}
                      href={`/erfahrungsberichte/${row.name_normalized}`}
                      underline="hover"
                    >
                      {`${row.name} Erfahrungen`}
                    </MaterialLink>
                  </MDTypography>
                </MDBox>
              </Grid>
            ))}
          </Grid>
        </MDBox>
      </Card>
    </Grid>
  );
}

FeaturedBrokers.propTypes = {};

export default FeaturedBrokers;
