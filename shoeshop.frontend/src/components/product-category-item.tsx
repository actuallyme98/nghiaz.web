import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

interface IProps {
  className?: string;
  data: {
    category: string;
    title: string;
    originalPrice: number;
    currentPrice: number;
    thumbnail: string;
  };
}

const ProductItem: React.FC<IProps> = (props) => {
  const { data, className } = props;
  const classes = useStyles();
  return (
    <div className={clsx(classes.productDesktop, className)}>
      <div className={classes.category}>{data.category}</div>

      <img alt={data.title} src={data.thumbnail} className={classes.imgProduct}></img>

      <div className={classes.titleAndCart}>
        <div className={classes.title}> {data.title} </div>
      </div>

      <div className={classes.price}>
        <div className={classes.currentPrice}>{data.currentPrice.toLocaleString('vi-VN')} đ</div>
        {data.currentPrice !== data.originalPrice && (
          <div className={classes.originalPrice}>
            {data.originalPrice.toLocaleString('vi-VN')} đ
          </div>
        )}
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  productDesktop: {
    backgroundColor: '#ffffff',
    padding: 20,
    cursor: 'pointer',
    transition: '0.3s',
    '&:hover': {
      boxShadow: '0 2px 11px 0 rgba(0, 0, 0, 0.11)',
      zIndex: 2,
    },
    [theme.breakpoints.down('xs')]: {
      border: '1px solid #d9d9d9',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 10px',
      height: 256,
    },
  },
  category: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      order: 2,
      fontSize: 12,
      color: '#848484',
      paddingTop: 0,
    },
  },
  imgProduct: {
    width: 200,
    height: 200,
    margin: '10px auto',
    objectFit: 'contain',
    display: 'block',
    [theme.breakpoints.down('xs')]: {
      order: 1,
      height: 120,
      width: 120,
      margin: '0 auto 15px auto',
    },
  },
  titleAndCart: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 25,
    [theme.breakpoints.down('xs')]: {
      order: 3,
      paddingTop: 0,
    },
  },
  title: {
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.25,
    color: '#4a4a4a',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      fontSize: 14,
      fontWeight: 600,
      color: '#384650',
      height: 'auto',
    },
  },
  price: {
    paddingTop: 7,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    [theme.breakpoints.down('xs')]: {
      order: 4,
    },
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: 500,
    color: '#f16728',
    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
      fontWeight: 'normal',
      color: '#f16728',
    },
  },
  originalPrice: {
    textDecoration: 'line-through',
    fontSize: 14,
    fontWeight: 'normal',
    color: '#848484',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  imgCart: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}));

export default ProductItem;
