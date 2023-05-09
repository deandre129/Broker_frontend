export const initPiwik = () => {
    if (typeof window !== 'undefined') {
      const _paq = window._paq || [];
      _paq.push(['trackPageView']);
      _paq.push(['enableLinkTracking']);
      (function() {
        const u= 'https://broker-bewertungen.innocraft.cloud/';
        _paq.push(['setTrackerUrl', u+'matomo.php']);
        _paq.push(['setSiteId', '1']);
        const d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.async = true; g.src='//cdn.matomo.cloud/broker-bewertungen.innocraft.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
      })();
    }
}