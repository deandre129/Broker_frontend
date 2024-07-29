import i18n from "@/i18n";
import MDBox from "@/mui/components/MDBox";
import MDButton from "@/mui/components/MDButton";
import MonitorIcon from "@mui/icons-material/Monitor";
import PropTypes from "prop-types";
import SendIcon from "@mui/icons-material/Send";
import MDTypography from "@/mui/components/MDTypography";

function BrokerLinks({ record }) {
  return (
    <MDBox display="flex" flexDirection="column" gap={1}>
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
        fullWidth
      >
        <div
          className="white-color"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <SendIcon style={{ fill: "#ffffff" }} />
          {i18n.entities.broker.text.nowTo(record.name).toUpperCase()}
        </div>
      </MDButton>
      <div className="text-desc">{record.desc}</div>
      <style jsx>{`
        .white-color {
          color: white;
          font-size: 1rem;
          font-weight: 700;
          font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        }
        ,
        .text-desc {
          color: #939393;
          margin-right: auto;
          margin-left: auto;
          text-transform: none;
          font-weight: 400;
          font-size: 0.625rem;
          line-height: 1;
          text-align: center;
          font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        }
      `}</style>
    </MDBox>
  );
}

BrokerLinks.propTypes = {
  record: PropTypes.any.isRequired,
};

export default BrokerLinks;
