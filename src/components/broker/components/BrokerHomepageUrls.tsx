import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import i18n from "@/i18n";
import MDButton from "@/mui/components/MDButton";
import PropTypes from "prop-types";
import SendIcon from "@mui/icons-material/Send";
import MDBox from "@/mui/components/MDBox";
import MDTypography from "@/mui/components/MDTypography";
import ScrollTo from "@/components/ScrollTo";
function BrokerHomepageUrls({ record, showShareExperience }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleMobileView = () => {
      if (window.innerWidth > 768) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    };
    window.addEventListener("resize", handleMobileView);
    handleMobileView();
    return () => window.removeEventListener("resize", handleMobileView);
  }, []);

  return (
    <>
      <Grid spacing={2} container pt={3}>
        {record.forex_signale || record.expert_advisor ? (
          <Grid xs={12} item>
            <MDButton
              variant="contained"
              href={record.meta?.homepage}
              target="_blank"
              color="warning"
              startIcon={<SendIcon style={{ fill: "#ffffff" }} />}
              fullWidth
            >
              <div className="white-color">
                {i18n.entities.broker.text.nowTo(record.name).toUpperCase()}
              </div>
            </MDButton>
          </Grid>
        ) : (
          <>
            <Grid md={6} xs={12} item>
              <MDBox
                display={"flex"}
                flexGrow={1}
                flexDirection="column"
                flexWrap="wrap"
                alignItems="center"
              >
                <MDButton
                  variant="contained"
                  href={record.meta?.homepage}
                  target="_blank"
                  color="warning"
                  startIcon={<SendIcon style={{ fill: "#ffffff" }} />}
                  fullWidth
                >
                  <div className="white-color">
                    {i18n.entities.broker.text.nowTo(record.name).toUpperCase()}
                  </div>
                </MDButton>
                <div className="text-desc">{record.desc}</div>
              </MDBox>
            </Grid>
            <Grid md={6} xs={12} item>
              <MDBox
                display={"flex"}
                flexGrow={1}
                flexDirection="column"
                flexWrap="wrap"
                alignItems="center"
              >
                <MDButton
                  variant="contained"
                  fullWidth
                  sx={{
                    display: showShareExperience && !isMobile ? "flex" : "none",
                    backgroundColor: "#fff",
                    border: "1px solid #959cB5",
                    textTransform: "none",
                  }}
                  onClick={() => ScrollTo("write-review")}
                >
                  {i18n.entities.broker.text.shareYourExperience}
                </MDButton>
                <MDButton
                  variant="contained"
                  target="_blank"
                  href={record.meta?.demo_url}
                  color="info"
                  startIcon={<SendIcon style={{ fill: "#ffffff" }} />}
                  fullWidth
                  sx={{
                    display: isMobile || !showShareExperience ? "flex" : "none",
                  }}
                >
                  <div className="white-color">
                    {i18n.entities.broker.text.freeDemoAccount.toUpperCase()}
                  </div>
                </MDButton>
                <div className="text-desc">{record.desc}</div>
              </MDBox>
            </Grid>
          </>
        )}
        <style jsx>{`
          .text-desc {
            color: #939393;
            margin-right: auto;
            margin-left: auto;
            text-transform: none;
            font-weight: 400;
            font-size: 0.625rem;
            line-height: 1;
            margin-top: 8px;
            text-align: center;
            font-family: "Roboto", "Helvetica", "Arial", sans-serif;
          }
          ,
          .white-color {
            color: white;
          }
        `}</style>
      </Grid>
    </>
  );
}

BrokerHomepageUrls.propTypes = {
  record: PropTypes.any.isRequired,
};

export default BrokerHomepageUrls;
