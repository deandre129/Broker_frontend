/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import dynamic from 'next/dynamic';
import '@/styles/globals.css'
// @mui material components
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { Provider } from 'react-redux'
import { useStore } from '@/modules/store';
import GlobalDndContext from '@/components/dnd-context';
import { useEffect } from 'react';
import { Router, useRouter } from 'next/router';

// Material Dashboard 2 PRO React TS themes
import theme from '@/mui/assets/theme';
import ScrollTop from '@/components/ScrollTop';
import 'typeface-roboto';
import '@/assets/scrollbar.css';

import {initPiwik} from '@/utils/piwik';
//import { trackMatomo } from '@/utils/matomo';
import MatomoImageTracker from '@/utils/MatomoImageTracker';

function MyApp({Component, pageProps}) {
  const store = useStore({});
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", url => {
      if (window && window._paq) {
        window._paq.push(["setCustomUrl", url]);
        window._paq.push(["setDocumentTitle", document.title]);
        window._paq.push(["trackPageView"]);
      }
    });
   // trackMatomo();
    document.documentElement.className = `${'info'}-scrollbar`;
  },[]);

  return (
    <GlobalDndContext>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
          <ScrollTop />
          <MatomoImageTracker/>
        </ThemeProvider>
      </Provider>
    </GlobalDndContext>
  )
}

export default MyApp;