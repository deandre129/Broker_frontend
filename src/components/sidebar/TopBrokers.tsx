/* eslint-disable @next/next/no-img-element */
import { Card, CardHeader, Grid } from '@mui/material';
import Link from 'next/link';
import CircleNumber from '../shared/CircleNumber';
import ImageView from '../ImageView';
import MaterialLink from '@mui/material/Link';
import MDBox from '@/mui/components/MDBox';
import MDTypography from '@/mui/components/MDTypography';
import RatingViewItem from '../shared/view/RatingViewItem';

function TopBrokers({topBroker}) {
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
              Von Tradern am besten bewertet
            </MDTypography>
          }
          sx={{ pb: 1, px: 3, pt: 2 }}
        />
        <MDBox sx={{ pt: 0, px: 3, pb: 2 }}>
          <Grid spacing={2} container>
            {topBroker.rows.map((row, idx) => (
              <Grid key={row.id} xs={12} item>
                <MDBox
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                  sx={{
                    '& > * + *': {
                      ml: 1.5,
                    },
                  }}
                  mb={1}
                  mr={1.5}
                >
                  <CircleNumber size={45}>
                    {idx + 1}
                  </CircleNumber>
                  <MDBox flexGrow={1}>
                    <MaterialLink
                      href={row.meta?.homepage}
                      target="_blank"
                    >
                      <MDBox
                        position="relative"
                        width="100%"
                        pb="46.67%"
                      >
                        <ImageView
                          value={
                            row.broker_image_top_broker_logo
                          }
                          alt={row.name}
                          sx={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: '100%',
                            height: '100%',
                          }}
                        />
                      </MDBox>
                    </MaterialLink>
                  </MDBox>
                </MDBox>
                <MDBox
                  display="flex"
                  justifyContent="flex-start"
                  sx={{
                    '& > * + *': {
                      ml: 1.5,
                    },
                  }}
                  mr={1.5}
                >
                  <MDBox
                    width="45px"
                    flexShrink={0}
                  ></MDBox>
                  <MDBox
                    display="flex"
                    flexGrow={1}
                    flexDirection="column"
                    sx={{
                      '& > * + *': {
                        mt: 1,
                      },
                    }}
                  >
                    <MDBox mx="auto">
                      <RatingViewItem
                        value={row.rating?.overall_rating}
                        precision={0.1}
                        emptyIcon={
                          <img
                            src="/images/star-grey.png"
                            alt="star-grey"
                            height="24px"
                          />
                        }
                        icon={
                          <img
                            src="/images/star-fill.png"
                            alt="star-fill"
                            height="24px"
                          />
                        }
                        size="large"
                      />
                    </MDBox>
                    <MDTypography
                      variant="body2"
                      fontWeight="regular"
                      lineHeight={1}
                      color={'info'}
                      mx="auto"
                      mt={1}
                    >
                      <MaterialLink
                        component={Link}
                        href={`/erfahrungsberichte/${row.name_normalized}`}
                        underline="hover"
                      >
                        {`${row.name
                          .replace(/\([\w\d\s]+\)/g, '')
                          .trim()} Erfahrungen`}
                      </MaterialLink>
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </Grid>
            ))}
          </Grid>
        </MDBox>
      </Card>
    </Grid>
  );
}

export default TopBrokers;
