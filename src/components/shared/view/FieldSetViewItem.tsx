import { Grid } from '@mui/material';
import { selectMuiSettings } from '@/modules/mui/muiSelectors';
import MDBox from '@/mui/components/MDBox';
import MDTypography from '@/mui/components/MDTypography';
import PropTypes from 'prop-types';
import lightColors from '@/mui/assets/theme/base/colors';
import darkColors from '@/mui/assets/theme-dark/base/colors';
import rgba from '@/mui/assets/theme-dark/functions/rgba';

function FieldSetViewItem(props) {
  const { children, description, label, noContainer } =
    props;
  const render = () => (
    <Grid spacing={2} container>
      {(label || description) && (
        <Grid item xs={12}>
          <MDBox
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
          >
            <MDTypography
              variant="h6"
              color="text"
              textTransform="capitalize"
              mr={2}
            >
              {label}
            </MDTypography>
            <MDTypography
              variant="caption"
              color="text"
              fontWeight="regular"
            >
              {description}
            </MDTypography>
          </MDBox>
        </Grid>
      )}
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  );
  return noContainer ? (
    render()
  ) : (
    <MDBox
      p={3}
      border={`1px solid ${lightColors.inputBorderColor}`}
      borderRadius="md"
    >
      {render()}
    </MDBox>
  );
}

FieldSetViewItem.defaultProps = {
  noContainer: false,
};

FieldSetViewItem.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  description: PropTypes.string,
  noContainer: PropTypes.bool,
};

export default FieldSetViewItem;
