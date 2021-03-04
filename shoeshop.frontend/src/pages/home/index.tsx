import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RouteConfigComponentProps } from 'react-router-config';

// components
import Container from '@material-ui/core/Container';
import Layout from '../../components/layout';
import SliderBanner from '../../components/home/slider-banner';
import TopCampaign from '../../components/home/top-campaign';
import TopNewestProduct from '../../components/home/top-newest-product';
import TopListSeller from '../../components/home/top-list-seller';
import BlogHome from '../../components/home/blog-home';
import BrandHome from '../../components/home/brand-home';

const Home: React.FC<RouteConfigComponentProps<any>> = (props) => {
  const classes = useStyles();

  return (
    <Layout>
      <SliderBanner />
      <Container maxWidth="lg" className={classes.content}>
        <TopCampaign />
        <TopNewestProduct />
        <TopListSeller />
        <BlogHome />
        <BrandHome />
      </Container>
    </Layout>
  );
};

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: 50,
  },
}));

export default Home;
