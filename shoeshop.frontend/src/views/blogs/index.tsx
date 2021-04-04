import React from 'react';
import { GetServerSideProps } from 'next';

// styles
import css from './style.module.scss';

// components
import Layout from '../../components/layout';

// redux
import * as AppActions from '@actions/app-action';
import { initializeStore } from '@redux/with-redux';

// enums
import { AppRouteEnums } from '../../enums/app-route.enum';

interface Props {}

const Blogs: React.FC<Props> = (props) => {
  return (
    <Layout backUrl={AppRouteEnums.HOME} title="Bài viết">
      {/* Tạo 1 component xong map nó ra, map tầm 8 cái */}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;
  dispatch(AppActions.detectMobile(userAgent));

  return {
    props: {
      initialReduxState: reduxStore.getState(),
    },
  };
};

export default Blogs;
