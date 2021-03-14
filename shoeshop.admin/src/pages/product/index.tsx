import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RouteConfigComponentProps } from 'react-router-config';

// components
import Layout from '../../components/layout';

const Product: React.FC<RouteConfigComponentProps<any>> = (props) => {
  const classes = useStyles();

  return <Layout title="Quản lí sản phẩm"></Layout>;
};

const useStyles = makeStyles((theme) => ({}));

export default Product;
