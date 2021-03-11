import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RouteConfigComponentProps } from 'react-router-config';

// components
import Layout from '../../components/layout';

const Home: React.FC<RouteConfigComponentProps<any>> = (props) => {
  const classes = useStyles();

  return <Layout title="Duong ngu">Admin page</Layout>;
};

const useStyles = makeStyles((theme) => ({}));

export default Home;
