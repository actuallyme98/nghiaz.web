import React from 'react';
import Head from 'next/head';
// styles
import css from './style.module.scss';

// components
import Header from '../header';
import Footer from '../footer';

interface IProps {
  title?: string;
}
const Layout: React.FC<IProps> = (props) => {
  const { children, title } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={css.container}>
        <Header />
        <div className={css.content}>{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
