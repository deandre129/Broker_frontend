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
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';

function BrokerOverviewView({ record }) {
  return (
    <>
      <Grid container>
        <Grid xs={12} item>
          <HtmlView value={record.meta?.teaser} />
        </Grid>
        <Grid md={6} xs={12} item>
          <div className='title'>
            {i18n.entities.broker.text.upsides}
          </div>
          <BrokerUpsides record={record} />

          <div className='title'>
            {i18n.entities.broker.fields.minimum_deposit}
          </div>
          <AttrTypography noIndent>
            {record.meta?.minimum_deposit}
          </AttrTypography>

          <div className='title'>
            {i18n.entities.broker.fields.scalping_allowed}
          </div>
          <MDBox position="relative" my={1}>
            <CheckboxViewItem
              checked={record.meta?.scalping_allowed}
            />
          </MDBox>


          <div className='title'>
            {i18n.entities.broker.fields.regulation}
          </div>
          <BrokerAttrs
            records={record.regulatory_authorities}
            noIndent
          />

          <div className='title'>
            {i18n.entities.broker.fields.deposit_guarantees}
          </div>
          <BrokerAttrs
            records={record.deposit_guarantees}
            renderFn={(v) => `${v.name} ${v.text}`}
            noIndent
          />
        </Grid>
        <Grid md={6} xs={12} item>
          <div className='title'>
            {i18n.entities.broker.fields.broker_type}
          </div>
          <AttrTypography noIndent>
            {i18n.entities.broker.enumerators.meta.broker_type[record.meta?.broker_type]}
          </AttrTypography>

          <div className='title'>
            {i18n.entities.broker.fields.certificates}
          </div>
          <BrokerImages
            records={record.certificates}
            noIndent
          />

          <div className='title'>
            {i18n.entities.broker.fields.spreads}
          </div>
          <BrokerAttrs
            records={record.spreads}
            attrs={{
              link: 'url',
              title: 'spread',
            }}
            filterFn={(v) => v.primary}
            noIndent
          />

          <div className='title'>
            {i18n.entities.broker.fields.specialties}
          </div>
          
          { record.features.length != 0 ?
            <BrokerAttrs
              records={record.features}
              attrs={{ link: 'url', title: 'feature' }}
              noIndent
            />
            : <RemoveSharpIcon
              fontSize="medium"
              color="secondary"
              fontWeight="regular"
              sx={{
                opacity: 0.5,
              }}
            />
          }
        </Grid>
      </Grid>
      <style jsx>{`
        .title {
          color: rgb(52,71,103);
          font-size: 20px;
          display: flex;
          line-height: 1.375;
          font-family: Roboto, Helvetica, Arial, sans-serif;
          font-weight: 700;
          opacity: 1;
          margin-top: 16px;
          text-transform: none;
          vertical-align: unset;
          text-decoration: none;
        }
      `}</style>
    </>
  );
}

export default BrokerOverviewView;
