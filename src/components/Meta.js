import Head from 'next/head';
import {useEffect} from 'react';
import { useRouter } from 'next/router';
import config from '@/config';
import PropTypes from 'prop-types';

import {initPiwik} from '@/utils/piwik';

import MatomoImageTracker from '@/utils/MatomoImageTracker';

function Meta({
  title,
  keywords,
  description,
  noIndex,
  noArticle,
  author,
}) {
  const router = useRouter();

  useEffect(() => {
    // initPiwik();
  }, [])

  return (
    <Head>
      <title>
        {[title, config.frontendUrl.host]
          .filter(Boolean)
          .join(' | ')}
      </title>
      {Boolean(keywords && keywords.length) && (
        <meta
          name="keywords"
          content={keywords.join(', ')}
        />
      )}
      {Boolean(description) && (
        <meta name="description" content={description} />
      )}
      <meta
        name="google-site-verification"
        content="7VJfY7OIcOlKQG6IpURj9rYJhVsDv6v3D1gTdQSChpw"
      />
      {Boolean(noIndex) && (
        <meta name="robots" content="noindex" />
      )}
      {Boolean(noIndex) && (
        <meta name="googlebot" content="noindex" />
      )}
      {!noIndex && (
        <meta name="robots" content="index,follow" />
      )}
      <link
        rel="canonical"
        href={`${config.frontendUrl.protocol}://${config.frontendUrl.host}${router.asPath}`}
      />
      <script type="application/ld+json"
        dangerouslySetInnerHTML= {{
          __html: JSON.stringify({
          '@context': 'http://schema.org',
          '@type': 'WebSite',
          name: 'Broker Bewertungen',
          alternateName: 'Broker-Bewertungen',
          url: `${config.frontendUrl.protocol}://${config.frontendUrl.host}`,
        })}}
      />

      {!noArticle && Boolean(author) && (
        <script type="application/ld+json"
        dangerouslySetInnerHTML= {{
          __html: JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'Article',
            headline: title || '',
            author: [
              {
                '@type': 'Person',
                name: author.name,
                url: author.link,
              },
            ],
          })}}
        />
      )}

      <script dangerouslySetInnerHTML={{ __html: `
        var _paq = window._paq = window._paq || [];
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
          var u="https://broker-bewertungen.innocraft.cloud/";
          _paq.push(['setTrackerUrl', u+'matomo.php']);
          _paq.push(['setSiteId', '1']);
          var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
          g.async=true; g.src='//cdn.innocraft.cloud/broker-bewertungen.innocraft.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
        })();
      ` }} />

      <noscript 
        dangerouslySetInnerHTML={{
          __html: 
          '<img referrerpolicy="no-referrer-when-downgrade" src="https://broker-bewertungen.innocraft.cloud/matomo.php?idsite=1&amp;rec=1" style="border:0" alt="" />' 
      }} />
    </Head>
  );
}

Meta.defaultProps = {
  keywords: null,
  description: null,
  noIndex: false,
  noArticle: false,
};

Meta.propTypes = {
  title: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  noIndex: PropTypes.bool,
  noArticle: PropTypes.bool,
};

export default Meta;
