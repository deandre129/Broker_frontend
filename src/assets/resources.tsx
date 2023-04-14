import { CardMedia } from '@mui/material';
import { useSelector } from 'react-redux';
import i18n from '@/i18n';
import MDTypography from '@/mui/components/MDTypography';

export function BrandLogo(props) {
  const brand = resources.brand.white;
  return (
    <>
      <MDTypography
        variant="h4"
        fontWeight="regular"
        color="white"
      >
        {i18n.app.title}
      </MDTypography>
      {/* <CardMedia
        src={logoUrl ? logoUrl : brand}
        component="img"
        sx={{
          maxWidth: '100%',
          width: props.width ? props.width : 'auto',
          margin: 0,
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      /> */}
    </>
  );
}

const resources = {
  brand: {
    white: '/images/vor-dark.svg',
    dark: '/images/vor-dark.svg',
  },
};
