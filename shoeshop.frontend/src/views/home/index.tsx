import React from 'react';
import { GetServerSideProps } from 'next';

// styles
import css from './style.module.scss';

// components
import Layout from '../../components/layout';
import SliderBanner from '../../components/homes/slider-banner';
import TopCampaign from '../../components/homes/top-campaign';
import TopNewestProducts from '../../components/homes/top-newest-products';
import TopListSeller from '../../components/homes/top-list-seller';
import BlogHome from '../../components/homes/blog-home';
import BrandHome from '../../components/homes/brand-home';

// redux
import * as AppActions from '@actions/app-action';
import { initializeStore } from '@redux/with-redux';

interface Props {}

const Home: React.FC<Props> = (props) => {
  return (
    <Layout>
      <SliderBanner />
      <div className="container">
        <TopCampaign />
        <TopNewestProducts />
        <TopListSeller />
        <BlogHome />
        <BrandHome />
      </div>
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
      title: 'Trang chủ',
      initialReduxState: reduxStore.getState(),
    },
  };
};

export default Home;
