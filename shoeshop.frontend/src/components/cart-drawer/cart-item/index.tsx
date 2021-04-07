import React, { useRef } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// components
import Button from 'antd/lib/button';
import InputNumberSpinner from '../../input-number-spinner';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';

import { pathUrl } from '@helpers/app-util';

interface IProps {
  className?: string;
  onChangeAmount?: (amount: number) => Promise<any>;
  onDelete?: () => void;
  data: REDUX_STORE.CartItem;
}

const CartItem: React.FC<IProps> = (props) => {
  const { data, className, onChangeAmount, onDelete } = props;
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const inputRef = useRef<InputNumberSpinner>(null);
  const onChange = async (amount: number) => {
    if (onChangeAmount) {
      try {
        await onChangeAmount(amount);
      } catch {
        inputRef.current?.setValue(data.amount);
      }
    }
  };
  return (
    <div className={clsx(className, isMobile ? css.rootMobile : css.rootDesktop)}>
      <div className={css.divThumbnail}>
        <img
          className={css.thumbnail}
          src={pathUrl(data.product.thumbnail)}
          alt={data.product.name}
        />
      </div>
      <div className={css.grow}>
        <Link
          href={'/shop/[...slug]'}
          as={`/shop/${data.product.slug.trim()}/${data.product.code}`}
        >
          <a className={css.title}>{data.product.name}</a>
        </Link>
        <div className={css.price}>
          {data.color.name} - {data.size.name}
        </div>
        <div className={css.price}>
          {(data.product.discountPrice || data.product.currentPrice).toLocaleString('vi-VN')} đ
        </div>
        <InputNumberSpinner
          ref={inputRef}
          value={data.amount}
          min={1}
          max={100}
          onChange={onChange}
        />
      </div>
      <Button className={css.btnDelete} shape="circle" onClick={onDelete} />
    </div>
  );
};

export default CartItem;
