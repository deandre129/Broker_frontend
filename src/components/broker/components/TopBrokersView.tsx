/* eslint-disable @next/next/no-img-element */
import { Grid } from '@mui/material';
import Link from 'next/link';
import CircleNumber from '../../shared/CircleNumber';
import ImageView from '../../ImageView';
import MaterialLink from '@mui/material/Link';
import MDBox from '@/mui/components/MDBox';
import MDTypography from '@/mui/components/MDTypography';
import PropTypes from 'prop-types';
import RatingViewItem from '../../shared/view/RatingViewItem';
import Image from 'next/image';

function TopBrokersView({ topBrokers }) {
  return (
    <Grid spacing={2} container>
      {topBrokers.rows.map((row, idx) => (
        <Grid key={row.id} xs={12} item>
          <MDBox
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            sx={{
              '& > * + *': {
                ml: 2,
              },
            }}
          >
            <CircleNumber>{idx + 1}</CircleNumber>
            <MDBox
              display="flex"
              flexGrow={1}
              flexDirection="row"
              flexWrap="wrap"
              alignItems="center"
              sx={{
                '& > * + *': {
                  ml: 2,
                  my: 1,
                },
              }}
            >
              <MaterialLink
                display="block"
                flexShrink={0}
                href={row.meta?.homepage}
                target="_blank"
              >
                <ImageView
                  value={
                    row.broker_image_broker_detail_logo
                  }
                  alt={row.name}
                  sx={{
                    height: '70px',
                    objectFit: 'contain',
                  }}
                />
              </MaterialLink>
              <ImageView
                value={
                  row.broker_image_broker_regulation_image
                }
                alt={row.name}
                sx={{
                  display: {
                    xs: 'none',
                    md: 'block',
                  },
                  height: '60px',
                  objectFit: 'contain',
                  ml: 2,
                }}
              />
              <MDBox
                display="flex"
                flexDirection="column"
                justifyContent="center"
                sx={{
                  '& > * + *': {
                    mt: 1,
                  },
                }}
              >
                <RatingViewItem
                  value={row.rating?.overall_rating}
                  precision={0.1}
                  emptyIcon={
                    <svg
                      width={36}
                      height={32}
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
                      width={36}
                      height={32}
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
                  size="extra1"
                />
                <MDTypography
                  variant="button"
                  color="text"
                  fontWeight="regular"
                  mt={1}
                  lineHeight={1}
                >
                  <MaterialLink
                    component={Link}
                    href={`/erfahrungsberichte/${row.name_normalized}`}
                    underline="hover"
                  >
                    {`${row.rating?.overall_reviews} Erfahrungsberichte lesen`}
                  </MaterialLink>
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
        </Grid>
      ))}
    </Grid>
  );
}

TopBrokersView.propTypes = {
  brokers: PropTypes.array,
};

export default TopBrokersView;
