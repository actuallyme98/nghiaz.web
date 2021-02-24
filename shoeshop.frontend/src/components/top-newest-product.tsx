import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ProductItem from './product-item';

// types
import { IProductItem } from '../types/gtypes';

interface IProps {}

const TopNewestProduct: React.FC<IProps> = (props) => {
  const classes = useStyles();

  const listProducts = useMemo(() => {
    return products.map((product, index) => (
      <Grid className={classes.listItem} xs={12} sm={6} md={3} item>
        <ProductItem key={index} product={product} />
      </Grid>
    ));
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.heading}>SẢN PHẨM MỚI NHẤT</div>
      <Grid className={classes.listArea} container>
        {listProducts}
      </Grid>
      <div className={classes.loadMoreArea}>
        <Button className={classes.loadMoreBtn}>Xem thêm</Button>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 50,
  },
  heading: {
    fontSize: 26,
    textAlign: 'center',
  },
  listArea: {},
  listItem: {
    padding: 10,
  },
  loadMoreArea: {
    textAlign: 'center',
    margin: 20,
  },
  loadMoreBtn: {
    border: '1px solid #e8bba7',
    color: '#f16728',
    backgroundColor: '#fff5f0',
    boxShadow: '0 2px 0 rgb(0 0 0 / 2%)',
    padding: '0 15px',
    height: 36,
  },
}));

export default TopNewestProduct;

const products: IProductItem[] = Array.from({ length: 8 }, () => ({
  id: '1',
  category: '/',
  currentPrice: 1000,
  originalPrice: 100000,
  pk: 1,
  thumbnail: '/assets/mocks/products/product1.jpg',
  title: 'GIÀY VẢI DỆT NỮ 68742 GIÀY THỂ THAO NỮ 68741 ĐỘN ĐẾ',
}));
