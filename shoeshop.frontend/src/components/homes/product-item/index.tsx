import React from 'react';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// components
import IconButton from 'antd/lib/button';

// types
import { IProductItem } from '../../../types/gtypes';

interface IProps {
  className?: string;
  product: IProductItem;
}

const ProductItem: React.FC<IProps> = (props) => {
  const { className, product } = props;

  return (
    <div className={clsx(className, css.container)}>
      <img alt={product.title} src={product.thumbnail} className={css.imgProduct} />
      <div className={css.titleAndCart}>
        <div className={css.title}>{product.title}</div>
        <IconButton shape="circle" className={css.btnAddToCart} />
      </div>
      <div className={css.price}>
        <div className={css.currentPrice}>{product.currentPrice.toLocaleString('vi-VN')} đ</div>
        {product.currentPrice !== product.originalPrice && (
          <div className={css.originalPrice}>{product.originalPrice.toLocaleString('vi-VN')} đ</div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
