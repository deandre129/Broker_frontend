import React, { useState, useEffect, useRef } from "react";
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
import LazyLoad from "react-lazyload";
import CheckIcon from "@mui/icons-material/Check";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from 'next/router'
import config from "@/config";

const KeyboardArrowUpIcon = dynamic(
  () => import("@mui/icons-material/KeyboardArrowUp"),
);

const Topbar = ({ topbar, slug, topBroker, excludingURLs }) => {
  const topbarContainer = useRef(null);
  const [topbarData, setTopbarData] = useState(null);
  const [topbarBrokerData, setTopbarBrokerData] = useState(null);
  const [topbarLogo, setTopbarLogo] = useState(null);
  const [topbarRating, setTopbarRating] = useState(null);
  const [mobileView, setMobileView] = useState(false);
  const [isClosed, setClosed] = useState(false);
  const [ratingStarSize, setRatingStarSize] = useState("large");
  const [topbarPaddingX, setTopbarPaddingX] = useState(100);
  const [showTopbar, setShowTopbar] = useState(false);
  const [height, setHeight] = useState(null);
  const router = useRouter();

  useEffect(() => {
    let projectURL = config.frontendUrl.protocol + "://" + config.frontendUrl.host;
    
    let index = 0;
    for (let i = 0; i < topbar.count; i++) {
      if (excludingURLs?.rows?.length > 0) {
        for (const excludingURL of excludingURLs.rows) {
          let url = projectURL + router.asPath;
          if (excludingURL.name === topbar.rows[i].data.name && excludingURL.url === url) {
            setClosed(true);
            index = -1;
            break;
          }
        }
      }

      if (index !== -1) {
        if (slug?.includes(topbar.rows[i].broker.name_normalized)) {
          index = i;
          break;
        } else if (
          topbar.rows[i].broker.name_normalized === 
          topBroker?.rows?.[0]?.name_normalized
        ) {
          index = i;
        }
      } else {
        break;
      }
    }

    if (index !== -1) {
      setTopbarData(topbar.rows[index].data);
      setTopbarLogo(topbar.rows[index].detailLogo); 
      setTopbarRating(topbar.rows[index].rating);
      setTopbarBrokerData(topbar.rows[index].broker);
      setClosed(false);
    }
  }, [slug, topbar, topBroker, excludingURLs]);

  useEffect(() => {
    const handleMobileResponsive = () => {
      if (topbarContainer.current) {
        setHeight(topbarContainer.current.clientHeight);
      }
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
        setRatingStarSize("large1");
        setTopbarPaddingX(10);
      }
    };
    window.addEventListener("resize", handleMobileResponsive);
    handleMobileResponsive();
    return () => window.removeEventListener("resize", handleMobileResponsive);
  }, []);

  useEffect(() => {
    const handleMobileView = () => {
      if (window.innerWidth >= 768) {
        setMobileView(false);
      } else {
        setMobileView(true);
      }
    };
    window.addEventListener("resize", handleMobileView);
    handleMobileView();
    return () => window.removeEventListener("resize", handleMobileView);
  }, []);

  useEffect(() => {
    const checkScrollTop = () => {
      if (window.scrollY > 400) {
        setShowTopbar(true);
      } else {
        setShowTopbar(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);

    return () => window.removeEventListener("scroll", checkScrollTop);
  }, []);

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (showTopbar && topbarContainer.current) {
      setHeight(topbarContainer.current.clientHeight);
    }
  }, [showTopbar, topbarContainer.current]);

  return (
    <MDBox
      zIndex={99}
      position="fixed"
      justifyContent="center"
      alignItems="center"
      bottom="0rem"
      sx={{ width: "100%" }}
    >
      {showTopbar && (
        <MDBox position={"relative"} sx={{ width: "100%" }}>
          {height !== null && (
            <MDBox
              display={"flex"}
              position={"absolute"}
              justifyContent="center"
              alignItems="center"
              width="3.25rem"
              height="3.25rem"
              bgColor={lightColors.white.main}
              shadow="md"
              borderRadius="50%"
              color="text"
              sx={{
                cursor: "pointer",
              }}
              onClick={scrollTop}
              bottom={isClosed ? "30px" : height + 15 + "px"}
              right={mobileView ? "10px" : "75px"}
            >
              <KeyboardArrowUpIcon fontSize="medium" color="inherit">
                keyboard_arrow_up
              </KeyboardArrowUpIcon>
            </MDBox>
          )}
          {!isClosed && (
            <MDBox
              display={"flex"}
              justifyContent="center"
              alignItems="center"
              position={"relative"}
              bgColor={
                topbarData?.backgroundColor === "white1"
                  ? lightColors.white.main
                  : topbarData?.backgroundColor
              }
              shadow="sm"
              sx={{
                width: "100%",
                height: "fit",
              }}
            >
              <div ref={topbarContainer} style={{ width: "100%" }}>
                <MaterialLink
                  href={topbarData?.account}
                  target="_blank"
                  sx={{ width: "100%" }}
                >
                  <MDBox
                    display={"flex"}
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    sx={{
                      width: "100%",
                      height: "100%",
                      paddingY: "10px",
                      paddingX: topbarPaddingX + "px",
                    }}
                  >
                    <MDBox
                      display={mobileView ? "flex" : "none"}
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
                        {topbarData?.title}
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
                        width={{ xs: "60%", md: "30%" }}
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
                            display={mobileView ? "none" : "flex"}
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
                        display={mobileView ? "none" : "flex"}
                        flexDirection="column"
                        justifyContent="start"
                        alignItems="start"
                        sx={{
                          height: "100%",
                          width: "80%",
                          paddingX: "5px",
                        }}
                      >
                        <MDTypography
                          variant="body2"
                          fontSize={18}
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
                              <CheckIcon
                                style={{ color: "#FB8C00", marginRight: "5px" }}
                              />
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
                              <CheckIcon
                                style={{ color: "#FB8C00", marginRight: "5px" }}
                              />
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
                              <CheckIcon
                                style={{ color: "#FB8C00", marginRight: "5px" }}
                              />
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
                              <CheckIcon
                                style={{ color: "#FB8C00", marginRight: "5px" }}
                              />
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
                              <CheckIcon
                                style={{ color: "#FB8C00", marginRight: "5px" }}
                              />
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
                              <CheckIcon
                                style={{ color: "#FB8C00", marginRight: "5px" }}
                              />
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
                          width: mobileView ? "fit" : "25%",
                          paddingRight: mobileView ? "0px" : "10px",
                          minWidth: "250px",
                        }}
                      >
                        <MDButton
                          variant="contained"
                          color="warning"
                          flexWrap={1}
                          sx={{
                            width: mobileView ? "fit" : "100%",
                            paddingY: "15px",
                            paddingX: "50px",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open = topbarData?.account;
                          }}
                        >
                          <MDTypography
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="center"
                            variant="body2"
                            fontSize={18}
                            color="text"
                            fontWeight="bold"
                            flexGrow={1}
                            lineHeight={1}
                            sx={{ color: "#fff" }}
                          >
                            <SendIcon
                              style={{ fill: "#ffffff", marginRight: "8px" }}
                            />
                            Jetzt testen!
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
                    </MDBox>
                  </MDBox>
                </MaterialLink>
                <MDBox
                  justifyContent="start"
                  alignItems="start"
                  top={10}
                  right={Math.abs(topbarPaddingX - 20) + "px"}
                  position={"absolute"}
                  onClick={(e) => {
                    setClosed(true);
                  }}
                >
                  <CloseIcon sx={{ width: "25px", height: "25px" }} />
                </MDBox>
              </div>
            </MDBox>
          )}
        </MDBox>
      )}
    </MDBox>
  );
};

export default Topbar;
