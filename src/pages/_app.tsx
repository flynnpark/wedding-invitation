import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '../libs/firebase';
import { GoogleAnalytics, usePageViews } from 'nextjs-google-analytics';

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
