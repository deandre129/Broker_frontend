import i18n from "@/i18n";
import MDBox from "@/mui/components/MDBox";
import MDButton from "@/mui/components/MDButton";
import MonitorIcon from "@mui/icons-material/Monitor";
import PropTypes from "prop-types";
import SendIcon from "@mui/icons-material/Send";
import MDTypography from "@/mui/components/MDTypography";

function BrokerLinks({ record }) {
  return (
    <MDBox display="flex" flexDirection="column" gap={2}>
      {/* <MDButton
        variant="contained"
        href={record.meta?.demo_url}
        color="success"
        startIcon={<MonitorIcon style={{fill: '#ffffff'}}/>}
        target="_blank"
        fullWidth
      >
        <div className='white-color'>
          DEMO-KONTO
        </div>
      </MDButton>
      <MDButton
        variant="contained"
        href={record.meta?.homepage}
        color="warning"
        startIcon={<SendIcon style={{ fill: "#ffffff" }} />}
        target="_blank"
        fullWidth
      >
        <div className="white-color">ZUM BROKER</div>
      </MDButton> */}
      <MDButton
        variant="contained"
        target="_blank"
        href={record.meta?.homepage}
        color="warning"
        startIcon={<SendIcon style={{ fill: "#ffffff" }} />}
        fullWidth
      >
        <div className="white-color">
          {i18n.entities.broker.text.nowTo(record.name).toUpperCase()}
        </div>
      </MDButton>
      <style jsx>{`
        .white-color {
          color: white;
        }
      `}</style>
    </MDBox>
  );
}

BrokerLinks.propTypes = {
  record: PropTypes.any.isRequired,
};

export default BrokerLinks;
