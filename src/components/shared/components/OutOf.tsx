import i18n from '@/i18n';
import MDTypography from '@/mui/components/MDTypography';
import PropTypes from 'prop-types';

function OutOf({ value, total }) {
  return (
    <MDTypography variant="body2" fontWeight="bold">
      {value}
      <MDTypography
        color="text"
        component="span"
        fontWeight="regular"
        variant="body2"
      >
        von
      </MDTypography>
      {total}
    </MDTypography>
  );
}

OutOf.propTypes = {
  value: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default OutOf;
