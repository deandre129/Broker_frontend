import { Icon } from '@mui/material';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { selectMuiSettings } from '@/modules/mui/muiSelectors';
import lightColors from '@/mui/assets/theme/base/colors';
import i18n from '@/i18n';
import { CardMedia } from '@mui/material';
import dynamic from 'next/dynamic';
import ImageView from './ImageView';
import MaterialLink from '@mui/material/Link';
import SendIcon from '@mui/icons-material/Send';
const MDBox = dynamic(() => import('@/mui/components/MDBox'));
const MDButton = dynamic(() => import('@/mui/components/MDButton'));
const MDTypography = dynamic(() => import('@/mui/components/MDTypography'));
import OverallRating from './broker/shared/OverallRating';
import BrokerRatingPercent from './broker/shared/BrokerRatingPercent';
import RatingViewItem from './shared/view/RatingViewItem';
import listItemText from '@/mui/assets/theme/components/list/listItemText';
import LazyLoad from 'react-lazyload'
import pxToRem from '@/mui/assets/theme/functions/pxToRem';

const Topbar = ({topbar, slug}) => {
  const [showTopbar, setShowTopbar] = useState(false);

  let topbarData;
  let topbarLogo;
  let topbarRating;
  let topbarLink;
  for(let i = 1; i< topbar.count;i++) {
    if(slug && slug === topbar.rows[i].name_normalized) {
      topbarData = topbar.rows[i].data;
      topbarLogo = topbar.rows[i].detailLogo;
      topbarRating = topbar.rows[i].rating;
      topbarLink = slug;
    }
  }
  if(!topbarData) {
    topbarData = topbar.rows[0].data;
    topbarLogo = topbar.rows[0].detailLogo;
    topbarRating = topbar.rows[0].rating;
    topbarLink = topbar.rows[0].name_normalized;
  }

  const [titleTextSize, setTitleTextSize] = useState({
    fontSize: pxToRem(20),
    lineHeight: 1.375,
  });
  const [subtitleTextSize, setSubtitleTextSize] = useState({
    fontSize: pxToRem(16),
    lineHeight: 1.625,
  });
  const [ratingPercent, setRatingPercent] = useState(24);
  const [fontSize, setFontSize] = useState(14);
  const [ratingStarSize, setRatingStarSize] = useState("extra2");
  const [isShow, SetIsShow] = useState('true');
  useEffect(() => {
    const handleRatingSize = () => {
      if (window.innerWidth > 1400) {
        setTitleTextSize({
          fontSize: pxToRem(24),
          lineHeight: 1.375,
        });
        setSubtitleTextSize({
          fontSize: pxToRem(14),
          lineHeight: 1.625,
        });
        setRatingPercent(20);
        setRatingStarSize("extra2");
        SetIsShow('true');
        setFontSize(14);
      } else if (window.innerWidth > 1200) {
        setTitleTextSize({
          fontSize: pxToRem(20),
          lineHeight: 1.375,
        });
        setSubtitleTextSize({
          fontSize: pxToRem(14),
          lineHeight: 1.625,
        });
        setRatingPercent(16);
        setRatingStarSize("large1");
        SetIsShow('true');
        setFontSize(14);
      } else if (window.innerWidth > 990) {
        setTitleTextSize({
          fontSize: pxToRem(16),
          lineHeight: 1.625,
        });
        setSubtitleTextSize({
          fontSize: pxToRem(13),
          lineHeight: 1.625,
        });
        setRatingPercent(20);
        setRatingStarSize("large1");
        SetIsShow('true');
        setFontSize(14);
      } else if (window.innerWidth > 700) {
        setTitleTextSize({
          fontSize: pxToRem(15),
          lineHeight: 1.625,
        });
        setSubtitleTextSize({
          fontSize: pxToRem(12),
          lineHeight: 1.625,
        });
        setRatingPercent(16);
        setRatingStarSize("large");
        SetIsShow('false');
        setFontSize(14);
      } else if (window.innerWidth > 600) {
        setTitleTextSize({
          fontSize: pxToRem(14),
          lineHeight: 1.625,
        });
        setSubtitleTextSize({
          fontSize: pxToRem(12),
          lineHeight: 1.625,
        });
        setRatingPercent(16);
        setRatingStarSize("large");
        SetIsShow('false');
        setFontSize(14);
      } else {
        setTitleTextSize({
          fontSize: pxToRem(16),
          lineHeight: 1.625,
        });
        setSubtitleTextSize({
          fontSize: pxToRem(12),
          lineHeight: 1.625,
        });
        setRatingPercent(14);
        setRatingStarSize("medium");
        SetIsShow('false');
        setFontSize(12);
      }
    };
    window.addEventListener('resize', handleRatingSize);
    handleRatingSize();
    return () =>
      window.removeEventListener(
        'resize',
        handleRatingSize,
      );
  }, []);

  useEffect(() => {
    const checkScrollTop = () => {
      if (window.pageYOffset > 400) {
        setShowTopbar(true);
      } else {
        setShowTopbar(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);

    return () =>
      window.removeEventListener('scroll', checkScrollTop);
  }, []);

  return (
    <MaterialLink
      display={showTopbar ? 'block' : 'none'}
      target="_blank"
      justifyContent="center"
      alignItems='center'
      flexShrink={0}
      href={topbarData.account}
      sx={{
        width:'100%', 
        height:"70px"
      }}
    >
    <MDBox
      display={showTopbar ? 'flex' : 'none'}
      justifyContent="center"
      alignItems="center"
      bgColor={topbarData.backgroundColor==='white1'?lightColors.white.main:topbarData.backgroundColor}
      shadow="sm"
      position="fixed"
      zIndex={99}
      flexDirection="row"
      sx={{
        width:'100%', 
        height:"70px"}}
    >
      
        <Grid spacing={0} container sx={{ justifyContent:"center", alignItems:"center", width:'100%'}}>
          <Grid md={5} item>
            <MDBox 
              flexDirection="column"
              justifyContent="center"
              alignItems='center'
              sx= {{
                display: {
                  xs: 'none',
                  md: 'block',
                },
                height: '100%',
                pl:7,
                py:1
              }}>
              {/* <MDTypography
                variant={titleTextSize}
                color="text"
                fontWeight="regular"
                lineHeight={1}
                alignItems='center'
                display="flex"
                justifyContent={'center'}
              >
                {`${topbarData.title}`}
              </MDTypography> */}
              <div className='title'>
                {`${topbarData.title}`}
              </div>
              <style jsx>{`
                .title {
                  color: rgb(52,71,103);
                  font-size: ${titleTextSize.fontSize};
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  line-height: 1;
                  font-family: Roboto, Helvetica, Arial, sans-serif;
                  font-weight: 700;
                  opacity: 1;
                  text-transform: none;
                  vertical-align: unset;
                  text-decoration: none;
                }
              `}</style>
              {/* <MDTypography
                variant={subtitleTextSize}
                color="text"
                fontWeight="regular"
                mt={1}
                lineHeight={1}
                alignItems='center' 
                display="flex"
                justifyContent={'center'}
              >
                {`${topbarData.subtitle}`}
              </MDTypography> */}
              <div className='subtitle'>
                {`${topbarData.subtitle}`}
              </div>
              <style jsx>{`
                .subtitle {
                  margin-top: 8px;
                  color: rgb(52,71,103);
                  font-size: ${subtitleTextSize.fontSize};
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  line-height: 1;
                  font-family: Roboto, Helvetica, Arial, sans-serif;
                  font-weight: 700;
                  opacity: 1;
                  text-transform: none;
                  vertical-align: unset;
                  text-decoration: none;
                }
              `}</style>
            </MDBox>
          </Grid>

          <Grid xs={4} sm={4} md={2} item sx={{justifyContent:"center", alignItems:"center"}}>
            <MDBox 
              flexDirection="row"
              justifyContent="center"
              alignItems='center'
              sx={{
                height: '100%',
                py: 1,
                pl: {
                  xs: 0,
                  md: 5,
                }
              }}
            >
                {/* <ImageView
                  value={`https://broker-bewertungen.de/api/file/download?privateUrl=${topbarLogo.privateUrl}`}
                  alt={topbar.name}
                  sx={{
                    height: '60px',
                    objectFit: 'contain',
                  }}
                /> */}
                <CardMedia
                  component={"img"}
                  src={`https://broker-bewertungen.de/api/file/download?privateUrl=${topbarLogo.privateUrl}`}
                  alt={topbarData.name}
                  title={topbarData.name}
                  loading="lazy"
                  sx={{
                    margin: 0,
                    borderRadius: 0,
                    maxWidth: '100%',
                    height: '60px',
                    width: 'auto',
                    loading: 'lazy',
                    objectFit: 'contain',
                  }}
                />
              
            </MDBox>
          </Grid>

          <Grid xs={7} sm={7} md={5} lg={5} item >
            <MaterialLink
              href={`/erfahrungsberichte/${topbarLink}`}
              display="flex"
              alignItems="center"
              flexWrap="wrap"
              flexGrow={1}
            >
            <MDBox 
              flexDirection="column"
              justifyContent="flex-start"
              alignItems='center'
              sx={{
                height: '100%',
                width: {
                  xs: '100%',
                  md: '90%',
                  lg: '80%',
                  xl: '70%',
                },
                py:1,
                pl: {
                  xs: 2,
                  sm: 3,
                  md: 3,
                }
              }}
            >
              <MDBox
                flexDirection="column"
                display="flex"
                alignItems="center"
                flexWrap="wrap"
                flexGrow={1}
                gap={{
                  xs: 1,
                  md: '5px',
                  lg: '5px',
                  xl: '2px'
                }}
              >
                
                <MDBox
                  flexDirection="row"
                  display="flex"
                  alignItems="center"
                  flexWrap="wrap"
                  flexGrow={1}
                  gap={1}
                >
                  <BrokerRatingPercent
                    value={topbarRating.overall_rating}
                    size={ratingPercent}
                  />
                  <LazyLoad>
                  <RatingViewItem
                    value={topbarRating.overall_rating}
                    precision={0.1}
                    emptyIcon={
                      <svg
                        width={36}
                        height={32}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.1053 3.68421L14.7074 8.95579L20.5263 9.80632L16.3158 13.9074L17.3095 19.7011L12.1053 16.9642L6.90105 19.7011L7.89473 13.9074L3.6842 9.80632L9.50315 8.95579L12.1053 3.68421Z"
                          fill="#FCFBF8"
                          stroke="#E2E0DA"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                    icon={
                      <svg
                        width={36}
                        height={32}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 4.5L14.3175 9.195L19.5 9.9525L15.75 13.605L16.635 18.765L12 16.3275L7.365 18.765L8.25 13.605L4.5 9.9525L9.6825 9.195L12 4.5Z"
                          fill="#EBC03F"
                          stroke="#EBC03F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                    size={ratingStarSize}
                  />
                  </LazyLoad>
                </MDBox>
                  <MDTypography
                    variant="body2"
                    fontSize={14}
                    color="text"
                    fontWeight="regular"
                    flexGrow={1}
                    lineHeight={1}
                  >
                    Kundenbewertungen lesen
                  </MDTypography>
              </MDBox>
              
            </MDBox> 
            </MaterialLink>
          </Grid>
        </Grid> 
      </MDBox>
    </MaterialLink>
  );
};

export default Topbar;
