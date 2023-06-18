import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import MDBox from '@/mui/components/MDBox';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import MDButton from '@/mui/components/MDButton';

function BrokerRatingPercent({ value, size }) {
  const percent = Number(((value / 5) * 100).toFixed(0));
  return (
    <MDBox
      display="flex"
      bgColor={
        percent >= 80
          ? 'success'
          : percent >= 50
          ? 'info'
          : 'error'
      }
      color="white"
      fontSize={size}
      borderRadius="md"
      alignItems="center"
      fontWeight="bold"
      lineHeight={1}
      gap={1}
      p={1}
    >
      {percent >= 50 ? <ThumbUpIcon /> : <ThumbDownIcon />}
      {`${percent}%`}
    </MDBox>
  );
}

BrokerRatingPercent.defaultProps = {
  value: 0,
  size: 32,
};

BrokerRatingPercent.propTypes = {
  value: PropTypes.number,
  size: PropTypes.number,
};

export default BrokerRatingPercent;
