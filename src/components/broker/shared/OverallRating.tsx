/* eslint-disable @next/next/no-img-element */
import i18n from "@/i18n";
import { useEffect, useState } from "react";
import MDBox from "@/mui/components/MDBox";
import MDTypography from "@/mui/components/MDTypography";
import BrokerRatingPercent from "./BrokerRatingPercent";
import RatingView from "../../RatingView";
import PropTypes from "prop-types";
import Image from "next/image";
import LazyLoad from "react-lazyload";

function OverallRating({
  record,
  hideDescription,
  hidePercent,
  size,
  gap,
  compare,
}) {
  const [fontSize, setFontSize] = useState(28);
  useEffect(() => {
    const handleRatingSize = () => {
      if (window.innerWidth > 1400) {
        setFontSize(16);
      } else if (window.innerWidth > 1200) {
        setFontSize(16);
      } else if (window.innerWidth > 990) {
        setFontSize(16);
      } else if (window.innerWidth > 700) {
        setFontSize(14);
      } else if (window.innerWidth > 600) {
        setFontSize(14);
      } else {
        setFontSize(14);
      }
    };
    window.addEventListener("resize", handleRatingSize);
    handleRatingSize();
    return () => window.removeEventListener("resize", handleRatingSize);
  }, []);
  return (
    <MDBox sx={{ width: "100%" }}>
      <MDBox
        display="flex"
        width={"100%"}
        alignItems="center"
        flexWrap="wrap"
        flexGrow={1}
        justifyContent={
          compare
            ? "center"
            : {
                xs: "space-between",
                lg: "flex-end",
              }
        }
        gap={1}
      >
        {!hidePercent && (
          <BrokerRatingPercent
            value={record.rating?.overall_rating}
            size={24}
          />
        )}
        <LazyLoad>
          <RatingView
            value={record.rating?.overall_rating}
            width={36}
            height={32}
            size={size}
          />
        </LazyLoad>
      </MDBox>
      {!hideDescription && (
        <MDTypography
          variant="body2"
          fontSize={fontSize}
          color="text"
          fontWeight="regular"
          flexGrow={1}
          lineHeight={1}
          textAlign={
            compare
              ? "center"
              : {
                  xs: "center",
                  lg: "right",
                }
          }
          mt={gap}
        >
          {i18n.entities.broker.text.rating(
            record.rating?.overall_rating?.toFixed(2) ?? 0,
            5,
            record.rating?.overall_reviews ?? 0,
          )}
        </MDTypography>
      )}
    </MDBox>
  );
}

OverallRating.defaultProps = {
  hideDescription: false,
  hidePercent: false,
  size: "large",
  gap: 0,
  compare: false,
};

OverallRating.propTypes = {
  record: PropTypes.any.isRequired,
  hideDescription: PropTypes.bool,
  hidePercent: PropTypes.bool,
  size: PropTypes.any,
  gap: PropTypes.number,
  compare: PropTypes.bool,
};

export default OverallRating;
