import React, { useMemo, useCallback } from 'react';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// components
import CartItem from './cart-item';
import notification from 'antd/lib/notification';

// redux
import * as AppActions from '@actions/app-action';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';

// utils
import { getKeyCategory } from '@helpers/local-storage-util';

interface IProps {
  className?: string;
  items: REDUX_STORE.CartItem[];
}

const ListCartItem: React.FC<IProps> = (props) => {
  const { items, className } = props;
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const profile = useSelector((store: RootState) => store.appState.profile);

  const dispatch = useDispatch();

  const handleChangeAmount = useCallback(
    (cartItemId: number) => async (amount: number) => {
      try {
        await dispatch(
          AppActions.updateCartLineItemAction({
            clientId: profile?.client.id || getKeyCategory(),
            cartItemId,
            amount,
          }),
        );
      } catch (err) {
        notification.error({
          message: String(err).replace(/Error: /g, ''),
          placement: 'bottomRight',
        });
      }
    },
    [items, profile],
  );

  const handleDelete = useCallback(
    (id: number) => async () => {
      try {
        await dispatch(
          AppActions.delteCartLineItemAction({
            clientId: profile?.client.id || getKeyCategory(),
            itemId: id,
          }),
        );
        notification.error({
          message: String('deleted').replace(/Error: /g, ''),
          placement: 'bottomRight',
        });
      } catch (err) {
        notification.error({
          message: String(err).replace(/Error: /g, ''),
          placement: 'bottomRight',
        });
      }
    },
    [items, profile],
  );

  const listProduct = useMemo(
    () =>
      items.map((item, index) => (
        <CartItem
          key={index}
          className={css.slideItem}
          data={item}
          onChangeAmount={handleChangeAmount(item.id)}
          onDelete={handleDelete(item.id)}
        />
      )),
    [items, handleChangeAmount, handleDelete],
  );
  return (
    <div className={clsx(isMobile ? css.rootMobile : css.rootDesktop, className)}>
      {listProduct}
    </div>
  );
};

export default ListCartItem;
