/* eslint-disable @next/next/no-img-element */
import { Grid } from '@mui/material';
import Link from 'next/link';
import CircleNumber from '../../shared/CircleNumber';
import ImageView from '../../ImageView';
import MaterialLink from '@mui/material/Link';
import MDBox from '@/mui/components/MDBox';
import MDTypography from '@/mui/components/MDTypography';
import PropTypes from 'prop-types';
import RatingView from '../../RatingView';
import Image from 'next/image';
import LazyLoad from 'react-lazyload'

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
                  ml: {
                    xs: 0,
                    md: 2,
                  },
                  my: 1,
                },
              }}
            >
              <MDBox 
                display={"flex"} 
                flexGrow={1}
                flexDirection="column"
                flexWrap="wrap"
                alignItems="center"
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
                <div className='text-desc'>
                  {row.desc}
                </div>
                <style jsx>{`
                  .text-desc {
                    color: #939393;
                    margin-right: auto;
                    margin-left: auto;
                    text-transform: none;
                    font-weight: 400;
                    font-size: 0.625rem;
                    line-height: 1;
                    text-align: center;
                    margin-top: 8px;
                    font-family: "Roboto","Helvetica","Arial",sans-serif;
                  }
                `}</style>
              </MDBox>
              
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
                justifyContent="center"
                alignItems='center'
                flexDirection="column"
                // sx={{
                //   '& > * + *': {
                //     mt: 1,
                //   },
                // }}
              >
                <LazyLoad>
                  <RatingView value={row.rating?.overall_rating} width={36} height={32} size={"extra2"}/>
                </LazyLoad>
                <MDTypography
                  variant="button"
                  color="text"
                  fontWeight="regular"
                  mt={1}
                  lineHeight={1}
                  alignItems='center'
                  display="flex"
                  justifyContent={'center'}
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
