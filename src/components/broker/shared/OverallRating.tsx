/* eslint-disable @next/next/no-img-element */
import i18n from '@/i18n';
import MDBox from '@/mui/components/MDBox';
import MDTypography from '@/mui/components/MDTypography';
import BrokerRatingPercent from './BrokerRatingPercent';
import RatingViewItem from '../../shared/view/RatingViewItem';
import PropTypes from 'prop-types';
import Image from 'next/image';

function OverallRating({
  record,
  hideDescription,
  hidePercent,
  size,
  gap,
  compare,
}) {
  return (
    <>
      <MDBox
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        flexGrow={1}
        justifyContent={
          compare
            ? 'center'
            : {
                xs: 'space-between',
                lg: 'flex-end',
              }
        }
        gap={1}
      >
        {!hidePercent && (
          <BrokerRatingPercent
            value={record.rating?.overall_rating}
            size={size}
          />
        )}
        <RatingViewItem
          value={record.rating?.overall_rating}
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
          size={size}
        />
      </MDBox>
      {!hideDescription && (
        <MDTypography
          variant="body2"
          fontSize={size * 0.375}
          color="text"
          fontWeight="regular"
          flexGrow={1}
          lineHeight={1}
          textAlign={
            compare
              ? 'center'
              : {
                  xs: 'center',
                  lg: 'right',
                }
          }
          mt={gap}
        >
          {i18n.entities.broker.text.rating(
            record.rating?.overall_rating?.toFixed(2) ?? 0,
            5,
            record.rating?.overall_reviews ?? 0,
          )}
        </MDTypography>
      )}
    </>
  );
}

OverallRating.defaultProps = {
  hideDescription: false,
  hidePercent: false,
  size: 'large',
  gap: 0,
  compare: false,
};

OverallRating.propTypes = {
  record: PropTypes.any.isRequired,
  hideDescription: PropTypes.bool,
  hidePercent: PropTypes.bool,
  size: PropTypes.any,
  gap: PropTypes.number,
  compare: PropTypes.bool,
};

export default OverallRating;
