import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { GetServerSideProps } from 'next';

// styles
import css from './style.module.scss';

// Components
import Layout from '../../components/layout';
import Button from 'antd/lib/button';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/stores/configure-store';
import * as AppActions from '@actions/app-action';
import { initializeStore } from '@redux/with-redux';

interface IProps {
  statusCode?: number;
}

const Error: NextPage<IProps> = ({ statusCode }) => {
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);

  return (
    <Layout>
      {statusCode ? (
        <div className={isMobile ? css.contentMobile : css.contentDesktop}>
          <img src="/assets/page-404/404err.jpg" className={css.imgError} />
          <div className={css.textError}>OOPS! Trang bạn tìm kiếm hiện không tồn tại!</div>
          <Link href="/">
            <Button className={css.buttonBackHome}>QUAY VỀ TRANG CHỦ</Button>
          </Link>
        </div>
      ) : (
        'An error occurred on client'
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;
  dispatch(AppActions.detectMobile(userAgent));
  return {
    props: {
      title: 'Page not found 404',
      initialReduxState: reduxStore.getState(),
      statusCode: res.statusCode,
    },
  };
};

export default Error;
