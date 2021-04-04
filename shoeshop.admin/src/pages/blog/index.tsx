import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RouteConfigComponentProps } from 'react-router-config';

// components
import Container from '@material-ui/core/Container';
import Layout from '../../components/layout';
import ListBlog from './list-blog';
import ListBlogCategory from './blog-category';
import TabLink, { ITabs } from '../../components/tab-link';

const tabItems: ITabs[] = [
  {
    title: 'Danh sách',
    component: <ListBlog />,
    tabName: undefined,
    url: '/blog',
  },
  {
    title: 'Loại',
    component: <ListBlogCategory />,
    tabName: 'category',
    url: '/blog/category',
  },
];

const Blog: React.FC<RouteConfigComponentProps<any>> = (props) => {
  const classes = useStyles();

  return (
    <Layout title="Quản lí bài viết">
      <Container maxWidth="lg" className={classes.container}>
        <TabLink tabs={tabItems} />
      </Container>
    </Layout>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '50px 0',
  },
}));

export default Blog;
