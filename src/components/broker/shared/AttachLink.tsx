import { selectMuiSettings } from '@/modules/mui/muiSelectors';
import MaterialLink from '@mui/material/Link';
import MDTypography from '@/mui/components/MDTypography';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

function AttachLink({ link, children }) {
  const { sidenavColor } = selectMuiSettings();
  return Boolean(link) && link.trim() !== '' ? (
    <MDTypography
      variant="body2"
      fontWeight="regular"
      component="span"
      color={sidenavColor}
      lineHeight={1}
    >
      <MaterialLink
        href={link}
        target="_blank"
        underline="hover"
      >
        {children}
      </MaterialLink>
    </MDTypography>
  ) : (
    children
  );
}

AttachLink.defaultProps = {
  link: null,
};

AttachLink.propTypes = {
  link: PropTypes.string,
  children: PropTypes.any,
};

export default AttachLink;
