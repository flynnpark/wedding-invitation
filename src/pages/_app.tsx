import type { AppProps } from 'next/app';
import { GoogleAnalytics, usePageViews } from 'nextjs-google-analytics';

import '../styles/globals.css';
import '../libs/firebase';

function MyApp({ Component, pageProps }: AppProps) {
  usePageViews();

  return (
    <>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
