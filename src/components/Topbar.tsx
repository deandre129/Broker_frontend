import React, { useState, useEffect } from "react";
import { Icon } from "@mui/material";
import { Grid } from "@mui/material";
import lightColors from "@/mui/assets/theme/base/colors";
import i18n from "@/i18n";
import { CardMedia } from "@mui/material";
import dynamic from "next/dynamic";
import ImageView from "./ImageView";
import MaterialLink from "@mui/material/Link";
import SendIcon from "@mui/icons-material/Send";
const MDBox = dynamic(() => import("@/mui/components/MDBox"));
const MDButton = dynamic(() => import("@/mui/components/MDButton"));
const MDTypography = dynamic(() => import("@/mui/components/MDTypography"));
import OverallRating from "./broker/shared/OverallRating";
import BrokerRatingPercent from "./broker/shared/BrokerRatingPercent";
import RatingView from "./RatingView";
import listItemText from "@/mui/assets/theme/components/list/listItemText";
import LazyLoad from "react-lazyload";
import pxToRem from "@/mui/assets/theme/functions/pxToRem";
import CheckIcon from "@mui/icons-material/Check";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import CloseIcon from "@mui/icons-material/Close";

const Topbar = ({ topbar, slug }) => {
  const [showTopbar, setShowTopbar] = useState(true);
  const [topbarData, setTopbarData] = useState(null);
  const [topbarBrokerData, setTopbarBrokerData] = useState(null);
  const [topbarLogo, setTopbarLogo] = useState(null);
  const [topbarRating, setTopbarRating] = useState(null);
  const [isTopbarTitleShow, setTopbarTitleShow] = useState(false);

  useEffect(() => {
    for (let i = 0; i < topbar.count; i++) {
      if (slug === topbar.rows[i].name_normalized) {
        setTopbarData(topbar.rows[i].data);
        setTopbarLogo(topbar.rows[i].detailLogo);
        setTopbarRating(topbar.rows[i].rating);
        setTopbarBrokerData(topbar.rows[i].broker);
      } else {
        setTopbarData(topbar.rows[0].data);
        setTopbarLogo(topbar.rows[0].detailLogo);
        setTopbarRating(topbar.rows[0].rating);
        setTopbarBrokerData(topbar.rows[0].broker);
      }
    }
  }, [slug]);

  const [ratingStarSize, setRatingStarSize] = useState("large");
  const [isFeatureShow, setFeatureShow] = useState(true);
  const [topbarPaddingX, setTopbarPaddingX] = useState(100);

  useEffect(() => {
    const handleMobileResponsive = () => {
      if (window.innerWidth > 1400) {
        setRatingStarSize("large");
        setTopbarPaddingX(100);
      } else if (window.innerWidth > 1200) {
        setRatingStarSize("large");
        setTopbarPaddingX(50);
      } else if (window.innerWidth > 990) {
        setRatingStarSize("large");
        setTopbarPaddingX(20);
      } else if (window.innerWidth > 700) {
        setRatingStarSize("large");
        setTopbarPaddingX(20);
      } else if (window.innerWidth > 600) {
        setRatingStarSize("large");
        setTopbarPaddingX(20);
      } else {
        setRatingStarSize("medium");
        setTopbarPaddingX(10);
      }
    };
    window.addEventListener("resize", handleMobileResponsive);
    handleMobileResponsive();
    return () => window.removeEventListener("resize", handleMobileResponsive);
  }, []);

  useEffect(() => {
    const handleFeatureContent = () => {
      if (window.innerWidth >= 768) {
        setFeatureShow(true);
        setTopbarTitleShow(false);
      } else {
        setFeatureShow(false);
        setTopbarTitleShow(true);
      }
    };
    window.addEventListener("resize", handleFeatureContent);
    handleFeatureContent();
    return () => window.removeEventListener("resize", handleFeatureContent);
  }, []);

  useEffect(() => {
    const checkScrollTop = () => {
      if (window.pageYOffset > 400) {
        setShowTopbar(true);
      } else {
        setShowTopbar(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);

    return () => window.removeEventListener("scroll", checkScrollTop);
  }, []);

  return (
    <MaterialLink href={topbarData?.account} target="_blank">
      <MDBox
        onClick={() => {
          window.open = topbarData?.account;
        }}
        display={showTopbar ? "flex" : "none"}
        zIndex={99}
        position="fixed"
        justifyContent="center"
        alignItems="center"
        bgColor={
          topbarData?.backgroundColor === "white1"
            ? lightColors.white.main
            : topbarData?.backgroundColor
        }
        shadow="sm"
        left="0rem"
        bottom="0rem"
        flexDirection="column"
        sx={{
          width: "100%",
          height: "fit",
          paddingY: "10px",
          paddingX: topbarPaddingX + "px",
        }}
      >
        <MDBox
          display={isTopbarTitleShow ? "flex" : "none"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ width: "100%", marginBottom: "10px" }}
        >
          <MDTypography
            variant="body2"
            fontSize={16}
            color="text"
            fontWeight="bold"
            flexGrow={1}
            lineHeight={1}
          >
            {topbarBrokerData?.name + ": " + topbarData?.title}
          </MDTypography>
        </MDBox>
        <MDBox
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"row"}
          sx={{ width: "100%", height: "100%" }}
        >
          <MDBox
            display="flex"
            width={{ xs: "50%", md: "30%" }}
            flexDirection="column"
            justifyContent="start"
            alignItems="center"
            sx={{
              height: "100%",
            }}
          >
            <CardMedia
              component={"img"}
              src={`https://broker-bewertungen.de/api/file/download?privateUrl=${topbarLogo?.privateUrl}`}
              alt={topbarData?.name}
              title={topbarData?.name}
              loading="lazy"
              sx={{
                margin: 0,
                borderRadius: 0,
                maxWidth: "100%",
                height: "60px",
                width: "auto",
                loading: "lazy",
                objectFit: "contain",
              }}
            />
            <MDBox
              flexDirection="row"
              display="flex"
              alignItems="center"
              flexGrow={1}
              gap={{
                xs: 1,
                md: "5px",
                lg: "5px",
                xl: "2px",
              }}
              sx={{
                marginTop: "5px",
              }}
            >
              <LazyLoad>
                <RatingView
                  value={topbarRating?.overall_rating}
                  width={36}
                  height={32}
                  size={ratingStarSize}
                />
              </LazyLoad>
              <MDTypography
                variant="body2"
                fontSize={16}
                color="text"
                fontWeight="bold"
                flexGrow={1}
                lineHeight={1}
                sx={{
                  width: "50px",
                }}
              >
                {topbarRating?.overall_rating.toFixed(1) + " / 5"}
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox
            display={isFeatureShow ? "flex" : "none"}
            flexDirection="column"
            justifyContent="start"
            alignItems="start"
            sx={{
              height: "100%",
              width: "90%",
            }}
          >
            <MDTypography
              variant="body2"
              fontSize={16}
              color="text"
              fontWeight="bold"
              flexGrow={1}
              lineHeight={1}
            >
              {topbarData?.title}
            </MDTypography>
            <Grid container>
              <Grid md={6} item>
                <MDTypography
                  variant="body2"
                  fontSize={14}
                  color="text"
                  fontWeight="regular"
                  flexGrow={1}
                  lineHeight={1}
                  sx={{ marginY: "5px" }}
                >
                  <CheckIcon style={{ color: "#FB8C00", marginRight: "5px" }} />
                  {topbarData?.feature1}
                </MDTypography>
                <MDTypography
                  variant="body2"
                  fontSize={14}
                  color="text"
                  fontWeight="regular"
                  flexGrow={1}
                  lineHeight={1}
                  sx={{ marginY: "5px" }}
                >
                  <CheckIcon style={{ color: "#FB8C00", marginRight: "5px" }} />
                  {topbarData?.feature2}
                </MDTypography>
                <MDTypography
                  variant="body2"
                  fontSize={14}
                  color="text"
                  fontWeight="regular"
                  flexGrow={1}
                  lineHeight={1}
                  sx={{ marginY: "5px" }}
                >
                  <CheckIcon style={{ color: "#FB8C00", marginRight: "5px" }} />
                  {topbarData?.feature3}
                </MDTypography>
              </Grid>
              <Grid md={6} item>
                <MDTypography
                  variant="body2"
                  fontSize={14}
                  color="text"
                  fontWeight="regular"
                  flexGrow={1}
                  lineHeight={1}
                  sx={{ marginY: "5px" }}
                >
                  <CheckIcon style={{ color: "#FB8C00", marginRight: "5px" }} />
                  {topbarData?.feature4}
                </MDTypography>
                <MDTypography
                  variant="body2"
                  fontSize={14}
                  color="text"
                  fontWeight="regular"
                  flexGrow={1}
                  lineHeight={1}
                  sx={{ marginY: "5px" }}
                >
                  <CheckIcon style={{ color: "#FB8C00", marginRight: "5px" }} />
                  {topbarData?.feature5}
                </MDTypography>
                <MDTypography
                  variant="body2"
                  fontSize={14}
                  color="text"
                  fontWeight="regular"
                  flexGrow={1}
                  lineHeight={1}
                  sx={{ marginY: "5px" }}
                >
                  <CheckIcon style={{ color: "#FB8C00", marginRight: "5px" }} />
                  {topbarData?.feature6}
                </MDTypography>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              height: "100%",
              width: "fit",
              paddingRight: "10px",
            }}
          >
            <MaterialLink href={topbarData?.account} target="_blank">
              <MDButton
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                variant="contained"
                color="warning"
                flexWrap={1}
                sx={{
                  paddingX: "30px",
                  paddingY: "15px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open = topbarData?.account;
                }}
              >
                <TrendingFlatIcon style={{ fill: "#ffffff" }} />
                <MDTypography
                  variant="body2"
                  fontSize={15}
                  color="text"
                  fontWeight="bold"
                  flexGrow={1}
                  lineHeight={1}
                  sx={{ color: "#fff" }}
                >
                  Jetzt testen!
                </MDTypography>
              </MDButton>
            </MaterialLink>
            <MDTypography
              variant="body2"
              fontSize={11}
              color="text"
              fontWeight="regular"
              flexGrow={1}
              lineHeight={1}
              sx={{ marginTop: "10px", textAlign: "center" }}
            >
              ({topbarBrokerData?.desc})
            </MDTypography>
          </MDBox>
          <MDBox
            justifyContent="start"
            alignItems="start"
            top={10}
            right={Math.abs(topbarPaddingX - 30) + "px"}
            position={"absolute"}
            onClick={(e) => {
              e.stopPropagation();
              setShowTopbar(false);
            }}
          >
            <CloseIcon sx={{ width: "25px", height: "25px" }} />
          </MDBox>
        </MDBox>
      </MDBox>
    </MaterialLink>
  );
};

export default Topbar;
