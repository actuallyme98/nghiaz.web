import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RouteConfigComponentProps } from 'react-router-config';

// components
import Container from '@material-ui/core/Container';
import Layout from '../../components/layout';
import ListProduct from './list-product';
import ProductSize from './product-size';
import ProductColor from './product-color';
import Categories from './categories';
import TabLink, { ITabs } from '../../components/tab-link';

const tabItems: ITabs[] = [
  {
    title: 'Danh sách',
    component: <ListProduct />,
    tabName: undefined,
    url: '/products',
  },
  {
    title: 'Kích cỡ',
    component: <ProductSize />,
    tabName: 'size',
    url: '/products/size',
  },
  {
    title: 'Màu sắc',
    component: <ProductColor />,
    tabName: 'color',
    url: '/products/color',
  },
  {
    title: 'Thể loại',
    component: <Categories />,
    tabName: 'category',
    url: '/products/category',
  },
];

const Product: React.FC<RouteConfigComponentProps<any>> = (props) => {
  const classes = useStyles();

  return (
    <Layout title="Quản lí sản phẩm">
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

export default Product;
