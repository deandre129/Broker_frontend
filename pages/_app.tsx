/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
// @mui material components
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { Provider } from 'react-redux'
import { useStore } from '@/modules/store';
import GlobalDndContext from '@/components/dnd-context';
import { useEffect } from 'react';

// Material Dashboard 2 PRO React TS themes
import theme from '@/mui/assets/theme';
import ScrollTop from '@/components/ScrollTop';
import 'typeface-roboto';
import '@/assets/scrollbar.css';

function MyApp({Component, pageProps}) {
  const store = useStore({});

  useEffect(() => {
    document.documentElement.className = `${'info'}-scrollbar`;
  },[]);

  return (
    <GlobalDndContext>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
          <ScrollTop />
        </ThemeProvider>
      </Provider>
    </GlobalDndContext>
  )
}

export default MyApp;