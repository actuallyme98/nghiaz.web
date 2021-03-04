import React, { useCallback } from 'react';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// components
import Button from 'antd/lib/button';
import notification from 'antd/lib/notification';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';
import * as AppActions from '@actions/app-action';

// types
import { IProductItem } from '../../../types/gtypes';

interface IProps {
  className?: string;
  product: IProductItem;
}

// mocks
const loading = false;

const ProductItem: React.FC<IProps> = ({ product, className }) => {
  const dispatch = useDispatch();
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const handleAddToCart = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      dispatch(AppActions.openCartDrawer(true));
    },
    [product],
  );

  return (
    <div className={clsx(className, isMobile ? css.productMobile : css.productDesktop)}>
      {/* <div className={css.category}>{product.category}</div> */}
      <div className={css.titleAndCart}>
        <div className={css.title}>{product.title}</div>
        <Button
          className={css.btnAddToCart}
          onClick={handleAddToCart}
          loading={loading}
          shape="circle"
        />
      </div>
      <img alt={product.title} src={product.thumbnail} className={css.imgProduct} />
      <div className={css.price}>
        <div className={css.currentPrice}>{product.currentPrice.toLocaleString('vi-VN')} đ</div>
        {product.currentPrice != product.originalPrice ? (
          <div className={css.originalPrice}>{product.originalPrice.toLocaleString('vi-VN')} đ</div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default ProductItem;
