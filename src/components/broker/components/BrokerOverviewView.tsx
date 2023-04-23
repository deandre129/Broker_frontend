import { Grid } from '@mui/material';
import i18n from '@/i18n';
import AttrTypography from '../shared/AttrTypography';
import BrokerAttrs from '../shared/BrokerAttrs';
import BrokerImages from '../shared/BrokerImages';
import BrokerUpsides from '../shared/BrokerUpsides';
import CheckboxViewItem from '../../shared/view/CheckboxViewItem';
import HtmlView from '../../shared/view/HtmlView';
import MDBox from '@/mui/components/MDBox';
import MDTypography from '@/mui/components/MDTypography';

function BrokerOverviewView({ record }) {
  return (
    <>
      <Grid container>
        <Grid xs={12} item>
          <HtmlView value={record.meta?.teaser} />
        </Grid>
        <Grid md={6} xs={12} item>
          <MDTypography variant="h4" mt={2}>
            {i18n.entities.broker.text.upsides}
          </MDTypography>
          <BrokerUpsides record={record} />

          <MDTypography variant="h4" mt={2}>
            {i18n.entities.broker.fields.minimum_deposit}
          </MDTypography>
          <AttrTypography noIndent>
            {record.meta?.minimum_deposit}
          </AttrTypography>

          <MDTypography variant="h4" mt={2}>
            {i18n.entities.broker.fields.scalping_allowed}
          </MDTypography>
          <MDBox position="relative" my={1}>
            <CheckboxViewItem
              checked={record.meta?.scalping_allowed}
            />
          </MDBox>

          <MDTypography variant="h4" mt={2}>
            {i18n.entities.broker.fields.regulation}
          </MDTypography>
          <BrokerAttrs
            records={record.regulatory_authorities}
            noIndent
          />

          <MDTypography variant="h4" mt={2}>
            {i18n.entities.broker.fields.deposit_guarantees}
          </MDTypography>
          <BrokerAttrs
            records={record.deposit_guarantees}
            renderFn={(v) => `${v.name} ${v.text}`}
            noIndent
          />
        </Grid>
        <Grid md={6} xs={12} item>
          <MDTypography variant="h4" mt={2}>
            {i18n.entities.broker.fields.broker_type}
          </MDTypography>
          <AttrTypography noIndent>
            {i18n.entities.broker.enumerators.meta.broker_type[record.meta?.broker_type]}
          </AttrTypography>

          <MDTypography variant="h4" mt={2}>
            {i18n.entities.broker.fields.certificates}
          </MDTypography>
          <BrokerImages
            records={record.certificates}
            noIndent
          />

          <MDTypography variant="h4" mt={2}>
            {i18n.entities.broker.fields.spreads}
          </MDTypography>
          <BrokerAttrs
            records={record.spreads}
            attrs={{
              link: 'url',
              title: 'spread',
            }}
            filterFn={(v) => v.primary}
            noIndent
          />

          <MDTypography variant="h4" mt={2}>
            {i18n.entities.broker.fields.specialties}
          </MDTypography>
          <BrokerAttrs
            records={record.features}
            attrs={{ link: 'url', title: 'feature' }}
            noIndent
          />
        </Grid>
      </Grid>
    </>
  );
}

export default BrokerOverviewView;
