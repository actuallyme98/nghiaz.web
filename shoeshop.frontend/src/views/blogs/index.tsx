import React from 'react';
import { GetServerSideProps } from 'next';

// styles
import css from './style.scss';

// components
import Layout from '../../components/layout';

// redux
import * as AppActions from '@actions/app-action';
import { initializeStore } from '@redux/with-redux';

interface Props {}

const Blogs: React.FC<Props> = (props) => {
  return <Layout>{/* code goes here .... */}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;
  dispatch(AppActions.detectMobile(userAgent));

  return {
    props: {
      title: 'Blog - ',
    },
  };
};

export default Blogs;
