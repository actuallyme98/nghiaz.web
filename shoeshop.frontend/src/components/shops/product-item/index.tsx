import React, { useCallback } from 'react';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// components
import Button from 'antd/lib/button';
import notification from 'antd/lib/notification';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';
import * as AppActions from '@actions/app-action';

// utils
import { pathUrl } from '../../../helpers/app-util';
import { getKeyCategory } from '@helpers/local-storage-util';

interface IProps {
  className?: string;
  product: REDUX_STORE.Product;
}

const ProductItem: React.FC<IProps> = (props) => {
  const { className, product } = props;
  const cartline = useSelector((store: RootState) => store.appState.cartline);
  const profile = useSelector((store: RootState) => store.appState.profile);
  const dispatch = useDispatch();

  const handleAddToCart = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      try {
        if (!cartline) {
          return;
        }
        await dispatch(
          AppActions.addCartLineAction({
            cartId: cartline.id,
            productId: product.id,
            clientId: profile?.client.id || getKeyCategory(),
            amount: 1,
            color: product.colors[0].id,
            size: product.sizes[0].id,
          }),
        );
        dispatch(AppActions.openCartDrawer(true));
      } catch (err) {
        notification.error({
          message: String(err).replace(/Error: /g, ''),
          placement: 'bottomRight',
        });
      }
    },
    [product, cartline, profile],
  );

  return (
    <div className={clsx(className, css.container)}>
      <img alt={product.name} src={pathUrl(product.thumbnail)} className={css.imgProduct} />
      <div className={css.titleAndCart}>
        <div className={css.title}>{product.name}</div>
        {product.quantity > 0 ? (
          <Button className={css.btnAddToCart} onClick={handleAddToCart} shape="circle" />
        ) : (
          <Button disabled>Sold out</Button>
        )}
      </div>
      <div className={css.price}>
        <div className={css.currentPrice}>{product.currentPrice.toLocaleString('vi-VN')} đ</div>
        {product.currentPrice !== product.currentPrice && (
          <div className={css.originalPrice}>{product.discountPrice.toLocaleString('vi-VN')} đ</div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
