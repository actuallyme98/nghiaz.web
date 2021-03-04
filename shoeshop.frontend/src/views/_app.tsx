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
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </React.Fragment>
  );
};

export default MyApp;
