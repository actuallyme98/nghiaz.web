import 'antd/dist/antd.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-image-gallery/styles/css/image-gallery.css';

import React from 'react';
import Head from 'next/head';
// styles
import css from './style.scss';

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
