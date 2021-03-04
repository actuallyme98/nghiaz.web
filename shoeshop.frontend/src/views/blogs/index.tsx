import React from 'react';
import { GetServerSideProps } from 'next';

// styles
import css from './style.module.scss';

// components
import Layout from '../../components/layout';
import BlogFirst from '../../components/blogs/blogs-highlight/index';
import BlogNew from '../../components/blogs/blog-news/index';
import BlogLogist from '../../components/blogs/blog-logist/index';
import BlogBrand from '../../components/blogs/blog-brand/index';
import BlogCom from '../../components/blogs/blog-community/index';
import BlogGift from '../../components/blogs/blog-gift/index';
import BlogRecruit from '../../components/blogs/blog-recruit/index';

// redux
import * as AppActions from '@actions/app-action';
import { initializeStore } from '@redux/with-redux';

interface Props {}

const Blogs: React.FC<Props> = (props) => {
  return (
    <Layout>
      <BlogFirst />
      <BlogNew />
      <BlogLogist />
      <BlogBrand />
      <BlogCom />
      <BlogGift />
      <BlogRecruit />
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
      title: 'Bài viết',
    },
  };
};

export default Blogs;
