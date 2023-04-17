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
            <Image
              src="/images/star-grey.png"
              alt="star-grey"
              height={size}
              width={size*1.125}
            />
          }
          icon={
            <Image
              src="/images/star-fill.png"
              alt="star-fill"
              height={size}
              width={size*1.125}
            />
          }
          size="large"
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
  size: 32,
  gap: 0,
  compare: false,
};

OverallRating.propTypes = {
  record: PropTypes.any.isRequired,
  hideDescription: PropTypes.bool,
  hidePercent: PropTypes.bool,
  size: PropTypes.number,
  gap: PropTypes.number,
  compare: PropTypes.bool,
};

export default OverallRating;
