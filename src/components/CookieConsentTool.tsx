import { useState } from 'react';
// import CloseIcon from '@mui/icons-material/Close';
import CookieConsent from 'react-cookie-consent';
// import CookieConsentModal from './CookieConsentModal';
import lBorders from '@/mui/assets/theme/base/borders';
import lBoxShadows from '@/mui/assets/theme/base/boxShadows';
import lightColors from '@/mui/assets/theme/base/colors';
// import MDBox from '@/mui/components/MDBox';
// import MDButton from '@/mui/components/MDButton';
// import MDTypography from '@/mui/components/MDTypography';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

const MDBox = dynamic(() => import('@/mui/components/MDBox'));
const MDButton = dynamic(() => import('@/mui/components/MDButton'));
const MDTypography = dynamic(() => import('@/mui/components/MDTypography'));
const CloseIcon = dynamic(() => import('@mui/icons-material/Close'));
const CookieConsentModal = dynamic(() => import('./CookieConsentModal'));

function CookieConsentTool() {
  const [visible, setVisible] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const btnStyle = {
    background: lightColors.info.main,
    color: 'white',
    fontSize: '1rem',
    borderRadius: lBorders.borderRadius.sm,
    display: 'block',
    width: '100%',
    margin: 0,
  };

  const onClose = () => setModalVisible(false);

  if (!visible) {
    return null;
  }
  return (
    <MDBox>
      <CookieConsent
        location="bottom"
        buttonText="Alles akzeptieren"
        declineButtonText="Alles ablehnen"
        cookieName="broker-consent-cookie"
        style={{
          background: lightColors.white.main,
          color: 'inherit',
          boxShadow: lBoxShadows.lg,
          borderRadius: lBorders.borderRadius.md,
          fontSize: '1rem',
          zIndex: '+99999',
          padding: '16px',
          paddingRight: '32px',
        }}
        buttonStyle={btnStyle}
        declineButtonStyle={{
          ...btnStyle,
          marginTop: '16px',
        }}
        expires={150}
        enableDeclineButton
        flipButtons
      >
        <MDTypography variant="body1" fontWeight="bold">
          Datenschutz auf dieser Seite
        </MDTypography>
        <MDTypography variant="body2" fontWeight="regular">
          Wir erheben und verarbeiten Ihre Daten auf dieser
          Website, um besser zu verstehen, wie sie verwendet
          wird. Sie können allen oder ausgewählten
          Verwendungszwecken zustimmen oder alle ablehnen.
          Weitere Informationen finden Sie in unserer
          Datenschutzerklärung.
        </MDTypography>
        <MDButton
          onClick={() => setVisible(false)}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
          size="small"
          iconOnly
        >
          <CloseIcon />
        </MDButton>
        <MDBox display="flex">
          {/* <MDTypography
            variant="body2"
            fontWeight="regular"
            color="info"
            sx={{
              cursor: 'pointer',
            }}
          >
            Einzelheiten der Einwilligung
          </MDTypography> */}
          <MDTypography
            onClick={() => setModalVisible(true)}
            variant="body2"
            fontWeight="regular"
            color="info"
            sx={{
              cursor: 'pointer',
            }}
          >
            Datenschutzerklärung
          </MDTypography>
        </MDBox>
      </CookieConsent>
      {modalVisible && (
        <CookieConsentModal onClose={onClose} />
      )}
    </MDBox>
  );
}

CookieConsentTool.defaultProps = {
  darkMode: false,
};

CookieConsentTool.propTypes = {
  darkMode: PropTypes.bool,
};

export default CookieConsentTool;
