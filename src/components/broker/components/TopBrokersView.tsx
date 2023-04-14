/* eslint-disable @next/next/no-img-element */
import { Grid } from '@mui/material';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import brokerTopSelectors from '@/modules/broker/top/brokerTopSelectors';
import CircleNumber from '../../shared/CircleNumber';
import ImageView from '../../ImageView';
import MaterialLink from '@mui/material/Link';
import MDBox from '@/mui/components/MDBox';
import MDTypography from '@/mui/components/MDTypography';
import PropTypes from 'prop-types';
import RatingViewItem from '../../shared/view/RatingViewItem';
import { selectMuiSettings } from '@/modules/mui/muiSelectors';

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
                    <img
                      src="/images/star-grey.png"
                      alt="star-grey"
                      height="32px"
                    />
                  }
                  icon={
                    <img
                      src="/images/star-fill.png"
                      alt="star-fill"
                      height="32px"
                    />
                  }
                  size="large"
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
