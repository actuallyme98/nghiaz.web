import React, { useMemo, useCallback } from 'react';
import Link from 'next/link';

// styles
import css from './style.module.scss';

// components
import Drawer, { DrawerProps } from 'antd/lib/drawer';
import Badge from 'antd/lib/badge';
import Button from 'antd/lib/button';
import notification from 'antd/lib/notification';
import CartItem from './cart-item';
import LoadingIcon from '../loading-icon';

// redux
import * as AppActions from '@actions/app-action';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';

// enums
import { AppRouteEnums } from '../../enums/app-route.enum';

// utils
import { getKeyCategory } from '@helpers/local-storage-util';

interface IProps extends DrawerProps {}

const CartDrawer: React.FC<IProps> = (props) => {
  const { ...others } = props;
  const dispatch = useDispatch();
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const profile = useSelector((store: RootState) => store.appState.profile);
  const cartline = useSelector((store: RootState) => store.appState.cartline);
  const cartLineLoading = useSelector((store: RootState) =>
    AppActions.getCartAction.isPending(store),
  );

  const cartItems = useMemo(
    () =>
      cartline?.cartItems.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      ) || [],
    [cartline],
  );
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
    [profile],
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
      } catch (err) {
        notification.error({
          message: String(err).replace(/Error: /g, ''),
          placement: 'bottomRight',
        });
      }
    },
    [profile],
  );

  const totalPrice = useMemo(
    () =>
      cartItems
        .reduce((sum, item) => sum + item.product.currentPrice! * item.amount, 0)
        .toLocaleString('vi-VN'),
    [cartItems],
  );
  const totalItem = useMemo(() => cartItems.reduce((sum, item) => sum + item.amount, 0), [
    cartItems,
  ]);
  const handleClickOrder = () => {
    dispatch(AppActions.openCartDrawer(false));
  };

  return (
    <Drawer {...others}>
      <div className={isMobile ? css.rootMobile : css.rootDesktop}>
        {cartLineLoading && (
          <div className={css.wrapLoading}>
            <LoadingIcon />
          </div>
        )}
        <div className={css.head}>
          <div className={css.left}>
            <img src="/assets/icons/bag-red.svg" alt="" />
            <span className={css.text}>Giỏ hàng </span>
            <Badge className={css.badge} count={totalItem} showZero />
          </div>
          <Button className={css.btnClose} shape="circle" onClick={props.onClose as any} />
        </div>
        <div className={css.items}>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              data={item}
              className={css.item}
              onChangeAmount={handleChangeAmount(item.id)}
              onDelete={handleDelete(item.id)}
            />
          ))}
        </div>
        <div className={css.bottom}>
          <Link href={AppRouteEnums.CHECKOUT_CART}>
            <Button
              type="ghost"
              disabled={cartItems.length < 1}
              className={css.btnOrder}
              onClick={handleClickOrder}
            >
              ĐẶT HÀNG NGAY
            </Button>
          </Link>
          <div className={css.total}>
            <span className={css.text}>Tổng tiền:</span>
            <span className={css.price}>{totalPrice} đ</span>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default CartDrawer;
