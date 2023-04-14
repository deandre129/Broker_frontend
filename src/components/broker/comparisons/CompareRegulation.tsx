import BrokerAttrs from '../shared/BrokerAttrs';
import CompareDetail from '../comparisons/CompareDetail';
import CompareRegion from '../comparisons/CompareRegion';
import CompareSection from '../comparisons/CompareSection';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';

function CompareRegulation({ recordA, recordB }) {
  return (
    <>
      <CompareRegion name="region.regulationAndDepositInsurance" />
      <Grid spacing={2} container>
        <CompareSection
          name="regulation"
          tooltip="tooltip.regulation"
        />
        <CompareDetail
          childrenA={
            <BrokerAttrs
              records={recordA.regulatory_authorities}
            />
          }
          childrenB={
            <BrokerAttrs
              records={recordB.regulatory_authorities}
            />
          }
        />
      </Grid>
      <Grid spacing={2} container>
        <CompareSection
          name="depositProtection"
          tooltip="tooltip.depositProtection"
        />
        <CompareDetail
          childrenA={
            <BrokerAttrs
              records={recordA.deposit_guarantees}
              renderFn={(v) => `${v.name} ${v.text}`}
            />
          }
          childrenB={
            <BrokerAttrs
              records={recordB.deposit_guarantees}
              renderFn={(v) => `${v.name} ${v.text}`}
            />
          }
        />
      </Grid>
    </>
  );
}

CompareRegulation.propTypes = {
  recordA: PropTypes.any.isRequired,
  recordB: PropTypes.any.isRequired,
};

export default CompareRegulation;
