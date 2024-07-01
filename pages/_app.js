/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import "@/styles/globals.css";
// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { Provider } from "react-redux";
import GlobalDndContext from "@/components/dnd-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Material Dashboard 2 PRO React TS themes
import theme from "@/mui/assets/theme";
import "typeface-roboto";
import "@/assets/scrollbar.css";

import { initPiwik } from "@/utils/piwik";
//import { trackMatomo } from '@/utils/matomo';
import MatomoImageTracker from "@/utils/MatomoImageTracker";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", (url) => {
      if (window && window._paq) {
        window._paq.push(["setCustomUrl", url]);
        window._paq.push(["setDocumentTitle", document.title]);
        window._paq.push(["trackPageView"]);
      }
    });
    document.documentElement.className = `${"info"}-scrollbar`;
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
      <MatomoImageTracker />
    </ThemeProvider>
  );
}

export default MyApp;
