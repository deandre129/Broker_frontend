import { CardMedia } from '@mui/material';
import PropTypes from 'prop-types';
import Image from 'next/image';

function ImageView({ value, sx, alt: originalAlt }) {
  const url = value && value[0] && value[0].downloadUrl;
  console.log(url);
  const alt =
    originalAlt || (value && value[0] && value[0].name);
  return (
    <CardMedia
      component={"img"}
      src={url}
      alt={alt}
      title={alt}
      sx={{
        margin: 0,
        borderRadius: 0,
        maxWidth: '100%',
        ...sx,
      }}
    />
    // <CardMedia title={alt}>
    //   <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    //     <Image
    //       src={url} alt={alt}
    //       layout="fill"
    //       objectFit="contain" // or objectFit="cover"
    //     />
    //   </div>
    // </CardMedia>
  );
  
}

ImageView.propTypes = {
  value: PropTypes.any.isRequired,
  sx: PropTypes.any,
  alt: PropTypes.string,
};

export default ImageView;
