import { Icon } from '@mui/material';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
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
import RatingView from './RatingView';
import listItemText from '@/mui/assets/theme/components/list/listItemText';
import LazyLoad from 'react-lazyload'
import pxToRem from '@/mui/assets/theme/functions/pxToRem';

const Topbar = ({topbar, slug, topBroker}) => {
  const [showTopbar, setShowTopbar] = useState(false);

  let topbarData;
  let topbarLogo;
  let topbarRating;
  let topbarLink;
  for(let i = 0; i< topbar.count;i++) {
    if(slug === topbar.rows[i].name_normalized) {
      topbarData = topbar.rows[i].data;
      topbarLogo = topbar.rows[i].detailLogo;
      topbarRating = topbar.rows[i].rating;
      topbarLink = slug;
    } 
  }

  if(!topbarData) {
    for(let i = 0; i< topbar.count;i++) {
      if(topBroker.rows[0].name_normalized  === topbar.rows[i].name_normalized){
        topbarData = topbar.rows[i].data;
        topbarLogo = topbar.rows[i].detailLogo;
        topbarRating = topbar.rows[i].rating;
        topbarLink = topBroker.rows[0].name_normalized;
      }
    }
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
      zIndex={99}
      position="fixed"
      left="0rem"
      bottom="0rem"
      href={topbarData.account}
      sx={{
        width:'100%', 
        height:"90px"
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
      left="0rem"
      bottom="0rem"
      flexDirection="row"
      sx={{
        width:'100%', 
        height:"70px"
      }}
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
              <div className='title'>
                {`${topbarData.title}`}
              </div>
              <div className='subtitle'>
                {`${topbarData.subtitle}`}
              </div>
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
                    <RatingView value={topbarRating.overall_rating} width={36} height={32} size={ratingStarSize}/>
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
          text-align: center;
        },
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
          text-align: center;
        }
      `}</style>
    </MaterialLink>
  );
};

export default Topbar;
