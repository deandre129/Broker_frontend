import { Grid } from '@mui/material';
import i18n from '@/i18n';
import Help from '@mui/icons-material/Help';
import LazyLoad from 'react-lazy-load';
import MDTypography from '@/mui/components/MDTypography';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';

function CompareSection({ children, name, tooltip }) {

  return (
    <Grid xs={12} lg={3} item>
      {/* <LazyLoad> */}
      <MDTypography
        variant="body1"
        color="warning"
        fontWeight="bold"
        lineHeight="1.25"
        my={{
          lg: 1,
          xs: 0,
        }}
      >
        {Boolean(children) && children}
        {!children &&
          Boolean(name) &&
          i18n.entities.broker.comparison[name]}
        {Boolean(tooltip)  &&(
          <Tooltip
            title={
              typeof tooltip === 'string' && tooltip.indexOf('tooltip.') >= 0
              ? i18n.entities.broker.comparison.tooltip[tooltip.slice(tooltip.indexOf('.')+1,tooltip.length)]
              : tooltip
            }
          > 
            <Help color="secondary">help</Help>
          </Tooltip>
        )}
      </MDTypography>
      {/* </LazyLoad> */}
    </Grid>
  );
}

CompareSection.defaultProps = {
  children: null,
  name: null,
  tooltip: null,
};

CompareSection.propTypes = {
  children: PropTypes.any,
  name: PropTypes.string,
  tooltip: PropTypes.any,
};

export default CompareSection;
