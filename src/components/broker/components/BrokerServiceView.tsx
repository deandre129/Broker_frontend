import { Grid } from '@mui/material';
import i18n from '@/i18n';
import AttachLink from '../shared/AttachLink';
import AttrTypography from '../shared/AttrTypography';
import BrokerAddress from '../shared/BrokerAddress';
import BrokerContact from '../shared/BrokerContact';
import BrokerSection from '../components/BrokerSection';
import MDTypography from '@/mui/components/MDTypography';
import SingleCheckbox from '../components/SingleCheckbox';

function BrokerServiceView({ record }) {
  return (
    <>
      <MDTypography variant="h3" pb={2}>
        {i18n.entities.broker.service.title(record.name)}
      </MDTypography>
      <Grid container>
        <BrokerSection>
          {i18n.entities.broker.service.homepage}
        </BrokerSection>
        <Grid md={8} xs={12} item>
          <AttrTypography>
            <AttachLink link={record.meta?.homepage}>
              {record.meta?.homepage}
            </AttachLink>
          </AttrTypography>
        </Grid>
        <BrokerSection>
          {i18n.entities.broker.service.contact}
        </BrokerSection>
        <Grid md={8} xs={12} item>
          <BrokerContact record={record} />
        </Grid>
        <BrokerSection>
          {i18n.entities.broker.service.address}
        </BrokerSection>
        <Grid md={8} xs={12} item>
          <BrokerAddress record={record} />
        </Grid>
      </Grid>
      <SingleCheckbox
        record={record}
        fields={[
          'GERMAN_SUPPORT',
          'CONTACT',
          'DAILY_TRADE_HELP',
        ]}
      />
      <MDTypography variant="h3" py={2}>
        {i18n.entities.broker.service.training_opportunities}
      </MDTypography>
      <SingleCheckbox
        record={record}
        fields={[
          'GERMAN_WEBINAR',
          'GERMAN_SEMINAR',
          'COACHINGS_AVAILABLE',
          'KNOWLEDGE_BASE',
        ]}
      />
    </>
  );
}

export default BrokerServiceView;
