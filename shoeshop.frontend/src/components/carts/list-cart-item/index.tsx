import React, { useMemo, useCallback } from 'react';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// components
import CartItem from './cart-item';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';

interface IProps {
  className?: string;
  items: any[];
}

const ListCartItem: React.FC<IProps> = (props) => {
  const { items, className } = props;
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);

  const handleChangeAmount = useCallback(
    (cartLineId: string) => (amount: number) => {
      // update cart
    },
    [items],
  );

  const handleDelete = useCallback(
    (cartLineId: string) => () => {
      // delete cart
    },
    [items],
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
