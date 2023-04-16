/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';

// Material Dashboard 2 PRO React TS components
import MDBox from '@/mui/components/MDBox';

// for MUI 2 Dashboard
import muiActions from '@/modules/mui/muiActions';
import navigationHomeSelectors from '@/modules/navigation/home/navigationHomeSelectors';
import DefaultNavbar from '@/mui/shared/Navbars/DefaultNavbar';
import Footer from '@/components/Footer';

// Declaring props types for PageLayout
interface Props {
  background?: 'white' | 'light' | 'default';
  children?: ReactNode;
  fixedNavBar?: boolean;
  hideNavbar?: boolean;
  hideFooter?: boolean;
  navigation?: any;
  categoryFooter?: any;
  topBroker?: any;
}

function PageLayout({
  background,
  children,
  navigation,
  topBroker,
  categoryFooter,
  fixedNavBar = true,
  hideNavbar,
  hideFooter,
}: Props): JSX.Element {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <MDBox
      height="100%"
      minHeight="100vh"
      bgColor={background}
      sx={{ overflowX: 'hidden' }}
    >
      {!hideNavbar && (
        <DefaultNavbar
          routes={navigation}
          transparent={fixedNavBar}
          light={background === 'light'}
          fixed={fixedNavBar}
        />
      )}
      {children}
      {!hideFooter && <Footer categoryFooter = { categoryFooter } topBroker={topBroker}/>}
    </MDBox>
  );
}

// Declaring default props for PageLayout
PageLayout.defaultProps = {
  background: 'default',
  hideNavbar: false,
  hideFooter: false,
};

export default PageLayout;
