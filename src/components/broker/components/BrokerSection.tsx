import i18n from '@/i18n';
import Help from '@mui/icons-material/Help';
import MDTypography from '@/mui/components/MDTypography';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';

function BrokerSection({ children, name, tooltip }) {
  return (
    <Grid md={4} xs={12} item>
      <div className='title'>
        {Boolean(children) && children}
        {!children &&
          Boolean(name) &&
          i18n.entities.broker.comparison[name]}
        {Boolean(tooltip) && (
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
      </div>
      <style jsx>{`
        .title {
          color: rgb(52,71,103);
          font-size: 20px;
          padding-top: 8px;
          padding-bottom: 8px;
          display: flex;
          line-height: 1.25;
          font-family: Roboto, Helvetica, Arial, sans-serif;
          font-weight: 700;
          opacity: 1;
          text-transform: none;
          vertical-align: unset;
          text-decoration: none;
        }
      `}</style>
    </Grid>
  );
}

BrokerSection.defaultProps = {
  children: null,
  name: null,
  tooltip: null,
};

BrokerSection.propTypes = {
  children: PropTypes.any,
  name: PropTypes.string,
  tooltip: PropTypes.any,
};

export default BrokerSection;
