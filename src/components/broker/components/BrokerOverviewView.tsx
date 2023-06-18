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
          <div className='upsides'>
            {i18n.entities.broker.text.upsides}
          </div>
          <style jsx>{`
            .upsides {
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
          <BrokerUpsides record={record} />

          <div className='minimum_deposit'>
            {i18n.entities.broker.fields.minimum_deposit}
          </div>
          <style jsx>{`
            .minimum_deposit {
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
          <AttrTypography noIndent>
            {record.meta?.minimum_deposit}
          </AttrTypography>

          <div className='scalping_allowed'>
            {i18n.entities.broker.fields.scalping_allowed}
          </div>
          <style jsx>{`
            .scalping_allowed {
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
          <MDBox position="relative" my={1}>
            <CheckboxViewItem
              checked={record.meta?.scalping_allowed}
            />
          </MDBox>


          <div className='regulation'>
            {i18n.entities.broker.fields.regulation}
          </div>
          <style jsx>{`
            .regulation {
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
          <BrokerAttrs
            records={record.regulatory_authorities}
            noIndent
          />

          <div className='deposit_guarantees'>
            {i18n.entities.broker.fields.deposit_guarantees}
          </div>
          <style jsx>{`
            .deposit_guarantees {
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
          <BrokerAttrs
            records={record.deposit_guarantees}
            renderFn={(v) => `${v.name} ${v.text}`}
            noIndent
          />
        </Grid>
        <Grid md={6} xs={12} item>
          <div className='broker_type'>
            {i18n.entities.broker.fields.broker_type}
          </div>
          <style jsx>{`
            .broker_type {
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
          <AttrTypography noIndent>
            {i18n.entities.broker.enumerators.meta.broker_type[record.meta?.broker_type]}
          </AttrTypography>

          <div className='certificates'>
            {i18n.entities.broker.fields.certificates}
          </div>
          <style jsx>{`
            .certificates {
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
          <BrokerImages
            records={record.certificates}
            noIndent
          />

          <div className='spreads'>
            {i18n.entities.broker.fields.spreads}
          </div>
          <style jsx>{`
            .spreads {
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
          <BrokerAttrs
            records={record.spreads}
            attrs={{
              link: 'url',
              title: 'spread',
            }}
            filterFn={(v) => v.primary}
            noIndent
          />

          <div className='specialties'>
            {i18n.entities.broker.fields.specialties}
          </div>
          <style jsx>{`
            .specialties {
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
    </>
  );
}

export default BrokerOverviewView;
