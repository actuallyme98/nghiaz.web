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

interface IProps extends DrawerProps {}

// mocks
const data: any[] = [];
const loading = false;
const loadingDelete = false;
const loadingUpdate = false;

const CartDrawer: React.FC<IProps> = (props) => {
  const { ...others } = props;
  const dispatch = useDispatch();
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);

  const cartItems = useMemo(
    () =>
      data
        .map((edge) => edge!.node!)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) || [],
    [data],
  );
  const handleChangeAmount = useCallback(
    (cartLineId: string) => async (amount: number) => {
      //
    },
    [],
  );

  const handleDelete = useCallback(
    (cartLineId: string) => async () => {
      //
    },
    [],
  );

  const totalPrice = useMemo(
    () =>
      cartItems
        .reduce((sum, item) => sum + item.product.currentPrice! * item.quantity, 0)
        .toLocaleString('vi-VN'),
    [cartItems],
  );
  const totalItem = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [
    cartItems,
  ]);
  const handleClickOrder = () => {
    dispatch(AppActions.openCartDrawer(false));
  };

  return (
    <Drawer {...others}>
      <div className={isMobile ? css.rootMobile : css.rootDesktop}>
        {(loading || loadingDelete || loadingUpdate) && (
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
