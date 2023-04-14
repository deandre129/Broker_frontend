import { Grid } from '@mui/material';
import i18n from '@/i18n';
import BrokerCheckbox from '../shared/BrokerCheckbox';
import BrokerSection from '../components/BrokerSection';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazy-load';

function SingleCheckbox({ record, fields }) {
  return (
    <>
      {(fields || []).map((field) => {
        const tooltipKey = `entities.broker.comparison.checkbox.tooltip.${field.toUpperCase()}`;
        const tooltip = i18n.entities.broker.comparison.checkbox.tooltip[field.toUpperCase()];

        return (
          // <LazyLoad>
          <Grid key={field} container>
            <BrokerSection
              tooltip={
                tooltip === tooltipKey ? null : (
                  <>{tooltip}</>
                )
              }
            >
              {i18n.entities.broker.comparison.checkbox.name[field.toUpperCase()]}
            </BrokerSection>
            <Grid md={8} xs={12} item>
              <BrokerCheckbox
                record={record}
                field={field}
              />
            </Grid>
          </Grid>
          // </LazyLoad>
        );
      })}
    </>
  );
}

SingleCheckbox.propTypes = {
  record: PropTypes.any.isRequired,
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SingleCheckbox;
