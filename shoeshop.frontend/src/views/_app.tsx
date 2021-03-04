import 'antd/dist/antd.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-image-gallery/styles/css/image-gallery.css';

import React from 'react';
import { Provider } from 'react-redux';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { initializeStore } from '@redux/with-redux';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const store = initializeStore();

  return (
    <React.Fragment>
      <Head>
        <title>{pageProps.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="/fonts/SFUIDisplay/styles.css" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </React.Fragment>
  );
};

export default MyApp;
