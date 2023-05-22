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

const MDBox = dynamic(() => import('@/mui/components/MDBox'));
const MDTypography = dynamic(() => import('@/mui/components/MDTypography'));
const RatingViewItem = dynamic(() => import('../shared/view/RatingViewItem'));


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
                    <RatingViewItem
                      value={row.rating?.overall_rating}
                      precision={0.1}
                      emptyIcon={
                        <svg
                          width={27}
                          height={24}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.1053 3.68421L14.7074 8.95579L20.5263 9.80632L16.3158 13.9074L17.3095 19.7011L12.1053 16.9642L6.90105 19.7011L7.89473 13.9074L3.6842 9.80632L9.50315 8.95579L12.1053 3.68421Z"
                            fill="#FCFBF8"
                            stroke="#E2E0DA"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      }
                      icon={
                        <svg
                          width={27}
                          height={24}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 4.5L14.3175 9.195L19.5 9.9525L15.75 13.605L16.635 18.765L12 16.3275L7.365 18.765L8.25 13.605L4.5 9.9525L9.6825 9.195L12 4.5Z"
                            fill="#EBC03F"
                            stroke="#EBC03F"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      }
                      size="large1"
                    />
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
