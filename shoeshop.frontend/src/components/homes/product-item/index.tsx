import React, { useCallback } from 'react';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// components
import Button from 'antd/lib/button';

// redux
import { useDispatch } from 'react-redux';
import * as AppActions from '@actions/app-action';

// types
import { IProductItem } from '../../../types/gtypes';

// utils
import { pathAvatar } from '../../../helpers/app-util';

interface IProps {
  className?: string;
  product: IProductItem;
}

const ProductItem: React.FC<IProps> = (props) => {
  const { className, product } = props;
  const dispatch = useDispatch();

  const handleAddToCart = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      dispatch(AppActions.openCartDrawer(true));
    },
    [product],
  );

  return (
    <div className={clsx(className, css.container)}>
      <img alt={product.title} src={pathAvatar(product.thumbnail)} className={css.imgProduct} />
      <div className={css.titleAndCart}>
        <div className={css.title}>{product.title}</div>
        <Button className={css.btnAddToCart} onClick={handleAddToCart} shape="circle" />
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
