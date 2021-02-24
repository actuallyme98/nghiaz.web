import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RouteConfigComponentProps } from 'react-router-config';

// components
import Layout from '../../components/layout';
import SliderBanner from '../../components/slider-banner';

const Home: React.FC<RouteConfigComponentProps<any>> = (props) => {
  const classes = useStyles();

  return (
    <Layout>
      <SliderBanner />
    </Layout>
  );
};

const useStyles = makeStyles((theme) => ({}));

export default Home;
