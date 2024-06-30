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

const Topbar = ({ topbar, slug, topBroker }) => {
  const [showTopbar, setShowTopbar] = useState(true);
  const [topbarData, setTopbarData] = useState(null);
  const [topbarBrokerData, setTopbarBrokerData] = useState(null);
  const [topbarLogo, setTopbarLogo] = useState(null);
  const [topbarRating, setTopbarRating] = useState(null);
  const [topbarLink, setTopbarLink] = useState(null);

  // let topbarData;
  // let topbarBrokerData;
  // let topbarLogo;
  // let topbarRating;
  // let topbarLink;
  useEffect(() => {
    for (let i = 0; i < topbar.count; i++) {
      if (slug === topbar.rows[i].name_normalized) {
        setTopbarData(topbar.rows[i].data);
        setTopbarLogo(topbar.rows[i].detailLogo);
        setTopbarRating(topbar.rows[i].rating);
        setTopbarBrokerData(topbar.rows[i].broker);
        setTopbarLink(slug);
      }
    }
  }, []);

  useEffect(() => {
    if (!topbarData) {
      for (let i = 0; i < topbar.count; i++) {
        if (
          topBroker.rows[0].name_normalized === topbar.rows[i].name_normalized
        ) {
          setTopbarData(topbar.rows[i].data);
          setTopbarLogo(topbar.rows[i].detailLogo);
          setTopbarRating(topbar.rows[i].rating);
          setTopbarBrokerData(topbar.rows[i].broker);
          setTopbarLink(topBroker.rows[0].name_normalized);
        }
      }
    }
  }, [topbarData]);
  const [ratingStarSize, setRatingStarSize] = useState("extra2");
  const [isFeatureShow, setFeatureShow] = useState(true);
  const [topbarPaddingX, setTopbarPaddingX] = useState(100);
  const [buttonPaddingX, setbuttonPaddingX] = useState("30px");

  useEffect(() => {
    const handleMobileResponsive = () => {
      if (window.innerWidth > 1400) {
        setRatingStarSize("extra2");
        setTopbarPaddingX(100);
        setbuttonPaddingX("50px");
      } else if (window.innerWidth > 1200) {
        setRatingStarSize("large1");
        setTopbarPaddingX(50);
        setbuttonPaddingX("30px");
      } else if (window.innerWidth > 990) {
        setRatingStarSize("large1");
        setTopbarPaddingX(20);
        setbuttonPaddingX("20px");
      } else if (window.innerWidth > 700) {
        setRatingStarSize("large");
        setTopbarPaddingX(20);
        setbuttonPaddingX("30px");
      } else if (window.innerWidth > 600) {
        setRatingStarSize("large");
        setTopbarPaddingX(20);
        setbuttonPaddingX("20px");
      } else {
        setRatingStarSize("medium");
        setTopbarPaddingX(10);
        setbuttonPaddingX("10px");
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
      } else {
        setFeatureShow(false);
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
    <MDBox
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
      flexDirection="row"
      sx={{
        width: "100%",
        height: "fit",
        paddingY: "10px",
        paddingX: topbarPaddingX + "px",
      }}
    >
      <MDBox
        display="flex"
        flexDirection="column"
        justifyContent="start"
        alignItems="center"
        sx={{
          height: "100%",
          width: "50%",
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
            height: "50px",
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
          width: "100%",
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
          {topbarBrokerData?.name + ": " + topbarData?.title}
        </MDTypography>
        <MDBox
          display="flex"
          flexWrap={"wrap"}
          flex={"1"}
          justifyContent="center"
          alignItems="center"
          sx={{
            height: "100%",
            width: "80%",
          }}
        >
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
        </MDBox>
      </MDBox>
      <MDBox
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          height: "100%",
          width: "fit",
        }}
      >
        <MDButton
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          variant="contained"
          color="warning"
          flexWrap={1}
          href={topbarData?.account}
          sx={{
            paddingX: buttonPaddingX,
          }}
        >
          <TrendingFlatIcon style={{ fill: "#ffffff" }} />
          <MDTypography
            variant="body2"
            fontSize={14}
            color="text"
            fontWeight="bold"
            flexGrow={1}
            lineHeight={1}
            sx={{ color: "#fff" }}
          >
            Test now
          </MDTypography>
        </MDButton>
        <MDTypography
          variant="body2"
          fontSize={12}
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
        onClick={() => setShowTopbar(false)}
      >
        <CloseIcon sx={{ width: "25px", height: "25px" }} />
      </MDBox>
    </MDBox>
  );
};

export default Topbar;
