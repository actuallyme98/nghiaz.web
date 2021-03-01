import React, { useCallback, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer, { DrawerProps } from '@material-ui/core/Drawer';
import Badge from '@material-ui/core/Badge';
import { useSelector, useDispatch } from 'react-redux';
import { IStore } from '../../redux/stores/configure-store';
import CartItem from './cart-item';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import * as AppActions from '../../redux/actions/app-action';
import LoadingIcon from '../loading-icon';

interface IProps extends DrawerProps {}

const data: any[] = [];

const loading = false;

const CartDrawer: React.FC<IProps> = (props) => {
  const { ...others } = props;
  const dispatch = useDispatch();
  const isMobile = useSelector((store: IStore) => store.appState.isMobile);
  const classes = useStyles();

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
      <div className={classes.rootDesktop}>
        {loading && (
          <div className={classes.wrapLoading}>
            <LoadingIcon />
          </div>
        )}
        <div className={classes.head}>
          <div className={classes.left}>
            <img src="/assets/icons/bag-red.svg" alt="" />
            <span className={classes.text}>Giỏ hàng </span>
            <Badge className={classes.badge} badgeContent={totalItem} />
          </div>
          <IconButton className={classes.btnClose} onClick={props.onClose as any} />
        </div>
        <div className={classes.items}>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              data={item}
              className={classes.item}
              onChangeAmount={handleChangeAmount(item.id)}
              onDelete={handleDelete(item.id)}
            />
          ))}
        </div>
        <div className={classes.bottom}>
          <Button
            disabled={cartItems.length < 1}
            className={classes.btnOrder}
            onClick={handleClickOrder}
          >
            <Link className={classes.btnLink} to="/checkout/cart">
              ĐẶT HÀNG NGAY
            </Link>
          </Button>
          <div className={classes.total}>
            <span className={classes.textTotal}>Tổng tiền:</span>
            <span className={classes.price}>{totalPrice} đ</span>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

const useStyles = makeStyles((theme) => ({
  wrapLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 11,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  rootDesktop: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      height: '70vh',
    },
  },
  head: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: 'solid 1px #dedede',
    padding: '71px 38px 25px 38px',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      padding: '25px 38px 25px 38px',
    },
  },
  left: {
    display: 'flex',
    alignItems: 'center',
  },
  btnClose: {
    border: 'none',
    minWidth: 14,
    height: 14,
    backgroundImage: 'url("/assets/icons/close.svg")',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
  text: {
    fontSize: 24,
    fontWeight: 500,
    color: '#4a4a4a',
    padding: '0 17px',
  },
  badge: {
    '& sup': {
      width: 24,
      height: 24,
      backgroundColor: '#f16728',
      boxShadow: 'none',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  items: {
    overflow: 'scroll',
    padding: '24px 38px 0px 38px',
    flexGrow: 1,
  },
  item: {
    marginBottom: 24,
  },
  bottom: {
    flexShrink: 0,
    boxShadow: '0 2px 11px 0 rgba(0, 0, 0, 0.14)',
    backgroundColor: '#ffffff',
    padding: '32px 20px 20px 20px',
    [theme.breakpoints.down('xs')]: {
      padding: '20px 20px 10px 20px',
    },
  },
  btnOrder: {
    width: '100%',
    height: 54,
    borderRadius: 5,
    backgroundColor: '#f16728',
    border: 'none',
    display: 'block',
    marginBottom: 18,
    [theme.breakpoints.down('xs')]: {
      height: 40,
      marginBottom: 10,
    },
  },
  total: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  textTotal: {
    fontSize: 16,
    fontWeight: 600,
    color: '#4a4a4a',
  },
  price: {
    fontSize: 20,
    fontWeight: 600,
    color: '#f16728',
  },
  btnLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

export default CartDrawer;
