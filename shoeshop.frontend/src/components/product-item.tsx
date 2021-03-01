import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

// components
import IconButton from '@material-ui/core/IconButton';

// redux
import * as AppActions from '../redux/actions/app-action';
import { useDispatch } from 'react-redux';
import { IStore } from '../redux/stores/configure-store';

// types
import { IProductItem } from '../types/gtypes';

interface IProps {
  className?: string;
  product: IProductItem;
}

const ProductItem: React.FC<IProps> = (props) => {
  const { className, product } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleAddToCart = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      dispatch(AppActions.openCartDrawer(true));
    },
    [product],
  );

  return (
    <div className={clsx(className, classes.container)}>
      <img alt={product.title} src={product.thumbnail} className={classes.imgProduct} />
      <div className={classes.titleAndCart}>
        <div className={classes.title}>{product.title}</div>
        <IconButton onClick={handleAddToCart} className={classes.btnAddToCart} />
      </div>
      <div className={classes.price}>
        <div className={classes.currentPrice}>{product.currentPrice.toLocaleString('vi-VN')} đ</div>
        {product.currentPrice !== product.originalPrice && (
          <div className={classes.originalPrice}>
            {product.originalPrice.toLocaleString('vi-VN')} đ
          </div>
        )}
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#fff',
    border: '1px solid #d9d9d9',
    padding: 20,
    transition: '0.3s',
    '&:hover': {
      boxShadow: '0 2px 11px 0 rgba(0, 0, 0, 0.11)',
      border: '1px solid transparent',
    },
  },
  category: {
    fontSize: 16,
    fontWeight: 500,
    color: '#848484',
  },
  titleAndCart: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 14,
  },
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    width: 164,
    height: 42,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  btnAddToCart: {
    width: 38,
    height: 38,
    border: 0,
    backgroundColor: 'transparent',
    backgroundImage: 'url("/assets/icons/cart-grey.svg")',
    '&:hover': {
      backgroundImage: 'url("/assets/icons/cart-red.svg")',
    },
  },
  imgProduct: {
    width: '100%',
    margin: '20px auto',
    objectFit: 'contain',
  },
  price: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 10,
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  originalPrice: {
    color: '#848484',
    fontSize: 18,
    textDecoration: 'line-through',
  },
}));

export default ProductItem;
