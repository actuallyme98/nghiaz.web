import React, { useMemo } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// components
import Button from 'antd/lib/button';
import InputNumberSpinner from '../../../../components/input-number-spinner';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';

// utils
import { pathUrl } from '~/helpers/app-util';

interface IProps {
  className?: string;
  onChangeAmount?: (amount: number) => void;
  onDelete?: () => void;
  data: REDUX_STORE.CartItem;
}

const CartItem: React.FC<IProps> = (props) => {
  const { data, className, onChangeAmount, onDelete } = props;
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const discountPercent = useMemo(() => {
    if (!data.product.discountPrice) {
      return 0;
    }
    return Math.ceil(
      ((data.product.discountPrice - (data.product.discountPrice || data.product.currentPrice)) *
        100) /
        data.product.discountPrice,
    );
  }, [data]);
  return (
    <div className={clsx(className, isMobile ? css.rootMobile : css.rootDesktop)}>
      <img
        alt={data.product.name}
        className={css.thumbnail}
        src={pathUrl(data.product.thumbnail)}
      />
      <div className={css.wrap}>
        <div className={css.col1}>
          <Link href={'/shop/[...slug]'} as={`/shop/${data.product.slug}/${data.product.id}`}>
            <a className={css.title}>{data.product.name}</a>
          </Link>
          <div className={css.amount}>Số lượng</div>
          <InputNumberSpinner value={data.amount} onChange={onChangeAmount} min={1} max={100} />
        </div>
        <div className={css.col2}>
          <div className={css.price}>
            {(data.product.discountPrice || data.product.currentPrice).toLocaleString('vi-VN')} đ
          </div>
          {Boolean(discountPercent) && (
            <div className={css.wrapPrice}>
              <div className={css.originalPrice}>
                {data.product.price?.toLocaleString('vi-VN')} đ
              </div>
              <div className={css.percent}>{discountPercent} %</div>
            </div>
          )}
        </div>
      </div>
      <Button className={css.btnDelete} shape="circle" onClick={onDelete} />
    </div>
  );
};

export default CartItem;
