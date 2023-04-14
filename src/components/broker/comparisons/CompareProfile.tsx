import BrokerAddress from '../shared/BrokerAddress';
import BrokerContact from '../shared/BrokerContact';
import CompareDetail from '../comparisons/CompareDetail';
import CompareRegion from '../comparisons/CompareRegion';
import CompareSection from '../comparisons/CompareSection';
import HtmlView from '../../shared/view/HtmlView';
import MDBox from '@/mui/components/MDBox';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';

function CompareProfile({ recordA, recordB }) {
  return (
    <>
      <CompareRegion name="region.profileAndContact" />
      <Grid spacing={2} container>
        <CompareSection name="profile" />
        <CompareDetail
          childrenA={
            <MDBox position="relative" my={1} pl={3}>
              <HtmlView value={recordA.meta?.teaser} />
            </MDBox>
          }
          childrenB={
            <MDBox position="relative" my={1} pl={3}>
              <HtmlView value={recordB.meta?.teaser} />
            </MDBox>
          }
        />
      </Grid>
      <Grid spacing={2} container>
        <CompareSection name="address" />
        <CompareDetail
          childrenA={<BrokerAddress record={recordA} />}
          childrenB={<BrokerAddress record={recordB} />}
        />
      </Grid>
      <Grid spacing={2} container>
        <CompareSection name="contact" />
        <CompareDetail
          childrenA={<BrokerContact record={recordA} />}
          childrenB={<BrokerContact record={recordB} />}
        />
      </Grid>
    </>
  );
}

CompareProfile.propTypes = {
  recordA: PropTypes.any.isRequired,
  recordB: PropTypes.any.isRequired,
};

export default CompareProfile;
