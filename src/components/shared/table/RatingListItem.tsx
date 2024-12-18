import MDBox from '@/mui/components/MDBox';
import StyledRating from '../styles/StyledRating';
import PropTypes from 'prop-types';

function RatingListItem(props) {
  const {
    allowHalf,
    color,
    count,
    defaultValue,
    emptyIcon,
    hiddenLabel,
    icon,
    label,
    precision,
    size,
    value,
  } = props;

  const SIZES = {
    SMALL: {
      key: "small",
      size: 10
    },
    MEDIUM: {
      key: "medium",
      size: 18
    },
    LARGE: {
      key: "large",
      size: 28
    }
  };

  const iconSize =
    size === SIZES.SMALL.key
      ? SIZES.SMALL.size
      : size === SIZES.MEDIUM.key
      ? SIZES.MEDIUM.size
      : SIZES.LARGE.size;

  const numberOfStar = 5;
  const nonFraction = Math.trunc(value);
  const fraction = Number((value - nonFraction).toFixed(2));
  const fractionPercent = fraction * 100;

  let isShow = true;
  const getStar = (index) => {
    if (index <= nonFraction - 1) {
      isShow = true;
      return "100%";
    } else if (fractionPercent > 0 && isShow) {
      isShow = false;
      return `${fractionPercent}%`;
    } else {
      return "0%";
    }
  };

  const withoutUserInteraction = (index) => {
    return (
      <div style={{ position: "relative", alignItems:"center" }} key={index}>
        <div
          style={{
            width: getStar(index),
            overflow: "hidden",
            position: "absolute"
          }}
        >
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
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
        </div>
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
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
      </div>
    )
  };
  return (
    <MDBox lineHeight={0}>
      {/* <StyledRating
        defaultValue={defaultValue}
        value={value}
        icon={icon}
        emptyIcon={emptyIcon || icon}
        max={count}
        precision={precision || (allowHalf ? 0.5 : 1)}
        ownerState={{
          color,
        }}
        size={size}
        readOnly
      /> */}
      <MDBox display="flex" alignItems="center" justifyContent={'center'}>
        {[...new Array(numberOfStar)].map((arr, index) =>
          withoutUserInteraction(index)
        )}
      </MDBox>
      
    </MDBox>
  );
}

RatingListItem.defaultProps = {
  allowHalf: false,
  color: null,
  count: 5,
  defaultValue: 0,
  precision: 0,
  size: 'small',
};

RatingListItem.propTypes = {
  allowHalf: PropTypes.bool,
  color: PropTypes.oneOf([
    null,
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
  ]),
  count: PropTypes.number,
  defaultValue: PropTypes.number,
  emptyIcon: PropTypes.any,
  icon: PropTypes.any,
  label: PropTypes.string,
  precision: PropTypes.number,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  value: PropTypes.number,
};

export default RatingListItem;
