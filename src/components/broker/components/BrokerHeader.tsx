/* eslint-disable jsx-a11y/alt-text */
import { Grid } from "@mui/material";
import i18n from "@/i18n";
import { useEffect, useState } from "react";
import ImageView from "../../ImageView";
import lColors from "@/mui/assets/theme/base/colors";
import MaterialLink from "@mui/material/Link";
import MDBox from "@/mui/components/MDBox";
import MDButton from "@/mui/components/MDButton";
import MDTypography from "@/mui/components/MDTypography";
import OverallRating from "../shared/OverallRating";
import SendIcon from "@mui/icons-material/Send";
import dynamic from "next/dynamic";
import ScrollTo from "@/components/ScrollTo";
import RatingView from "@/components/RatingView";
import LazyLoad from "react-lazyload";

function BrokerHeader({ record }) {
  const colors = lColors;
  const [ratingSize, setRatingSize] = useState("large1");
  const [fontSize, setFontSize] = useState(18);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleRatingSize = () => {
      if (window.innerWidth > 1400) {
        setRatingSize("extra1");
      } else if (window.innerWidth > 1200) {
        setRatingSize("extra1");
      } else if (window.innerWidth > 990) {
        setRatingSize("extra1");
      } else if (window.innerWidth > 700) {
        setRatingSize("extra1");
      } else if (window.innerWidth >= 600) {
        setRatingSize("extra1");
      } else if (window.innerWidth >= 425) {
        setRatingSize("extra1");
      } else if (window.innerWidth >= 375) {
        setRatingSize("large2");
        setFontSize(18);
      } else {
        setRatingSize("large1");
        setFontSize(16);
      }
    };
    window.addEventListener("resize", handleRatingSize);
    handleRatingSize();
    return () => window.removeEventListener("resize", handleRatingSize);
  }, []);

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
    <MDBox
      pt={2}
      pb={record.expert_advisor ? 0 : 2}
      borderTop={`1px dashed ${colors.inputBorderColor}`}
      borderBottom={
        record.expert_advisor ? null : `1px dashed ${colors.inputBorderColor}`
      }
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: record.name,
            brand: record.name,
            logo: record.broker_image_broker_detail_logo[0].downloadUrl,
            image: record.broker_image_broker_detail_logo[0].downloadUrl,
            review: {
              "@type": "Review",
              reviewBody: record.meta?.teaser || "",
              author: [
                {
                  "@type": "Person",
                  name: record.author?.name,
                  url: record.author?.link,
                },
              ],
            },
            sku: record.name_normalized,
            offers: { "@type": "Demand" },
            description:
              record.meta?.teaser || `Erfahrungen von ${record.name}`,
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: Number(record.rating?.overall_rating || 0).toFixed(
                2,
              ),
              worstRating: 1,
              bestRating: 5,
              ratingCount: record.rating?.overall_reviews,
            },
          }),
        }}
      />
      <MDTypography variant="h1" mb={2}>
        {`${record.name} Erfahrungen und Test`}
      </MDTypography>
      <Grid spacing={3} alignItems="stretch" container>
        <Grid lg={6} xs={12} item>
          <MaterialLink href={record.meta?.homepage} target="_blank">
            <ImageView
              value={record.broker_image_broker_detail_logo}
              alt={record.name}
              sx={{
                width: {
                  xs: "100%",
                  sm: undefined,
                },
                height: {
                  xs: undefined,
                  sm: "100%",
                },
              }}
            />
          </MaterialLink>
        </Grid>
        <Grid lg={6} xs={12} item>
          <MDBox
            display="flex"
            flexWrap="wrap"
            justifyContent="flex-end"
            gap={1.25}
          >
            <MDBox sx={{ display: isMobile ? "none" : "flex", width: "100%" }}>
              <OverallRating
                record={record}
                size={"extra1"}
                hideDescription={undefined}
                hidePercent={undefined}
                gap={undefined}
                compare={undefined}
              />
            </MDBox>
            <MDBox
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              sx={{ display: isMobile ? "flex" : "none", width: "100%" }}
            >
              <MDBox
                display={"flex"}
                flexDirection="row"
                alignItems="center"
                justifyContent={"center"}
                sx={{
                  width: "100%",
                }}
              >
                <LazyLoad>
                  <RatingView
                    value={record.rating?.overall_rating}
                    width={32}
                    height={32}
                    size={ratingSize}
                  />
                </LazyLoad>
                <MDTypography
                  variant="body2"
                  fontSize={fontSize}
                  color="text"
                  fontWeight="bold"
                  lineHeight={1}
                >
                  {record.rating?.overall_rating.toFixed(1) + " / 5"}
                </MDTypography>
              </MDBox>
              <MDTypography
                variant="body2"
                fontSize={14}
                color="text"
                fontWeight="regular"
                flexGrow={1}
                lineHeight={1}
                textAlign={"center"}
                mt={1}
              >
                {i18n.entities.broker.text.rating(
                  record.rating?.overall_rating?.toFixed(2) ?? 0,
                  5,
                  record.rating?.overall_reviews ?? 0,
                )}
              </MDTypography>
            </MDBox>
            <MDButton
              variant="contained"
              // target="_blank"
              // href={record.meta?.homepage}
              fullWidth
              sx={{
                backgroundColor: "#fff",
                border: "1px solid #959cB5",
                borderRadius: "10px",
                marginTop: "20px",
                fontSize: "14px",
                textTransform: "none",
                display: isMobile ? "flex" : "none",
              }}
              onClick={() => ScrollTo("write-review")}
            >
              {i18n.entities.broker.text.shareYourExperience}
            </MDButton>
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
            <div className="text-desc">{record.desc}</div>
          </MDBox>
        </Grid>
      </Grid>
      <style jsx>{`
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
        ,
        .white-color {
          color: white;
        }
      `}</style>
    </MDBox>
  );
}

export default BrokerHeader;
