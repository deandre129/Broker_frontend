export const initPiwik = () => {
    if (typeof window !== 'undefined') {
      const _paq = window._paq || [];
      _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
      _paq.push(["setCookieDomain", "*.broker-bewertungen.de"]);
      _paq.push(["setDomains", ["*.broker-bewertungen.de"]]);
      _paq.push(['trackPageView']);
      _paq.push(['enableLinkTracking']);
      (function() {
        const u= 'https://broker-bewertungen.innocraft.cloud';
        _paq.push(['setTrackerUrl', u+'matomo.php']);
        _paq.push(['setSiteId', '1']);
        const d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.type = "text/javascript";
        g.defer = true;
        g.async = true; g.src='//cdn.innocraft.cloud/broker-bewertungen.innocraft.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
      })();
    }
}