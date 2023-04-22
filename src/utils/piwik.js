export const initPiwik = () => {
    if (typeof window !== 'undefined') {
      window._paq = window._paq || [];
      window._paq.push(['trackPageView']);
      window._paq.push(['enableLinkTracking']);
      (function() {
        const u= 'https://broker-bewertungen.innocraft.cloud';
        window._paq.push(['setTrackerUrl', u+'matomo.php']);
        window._paq.push(['setSiteId', '1']);
        const d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.async=true; g.src='//cdn.innocraft.cloud/broker-bewertungen.innocraft.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
      })();
    }
}