import React from 'react';
import clsx from 'clsx';

// styles
import css from './style.scss';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';

interface IProps {
  className?: string;
  data: {
    category: string;
    title: string;
    originalPrice: number;
    currentPrice: number;
    thumbnail: string;
  };
}

const ProductItem: React.FC<IProps> = (props) => {
  const { data, className } = props;
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  return (
    <div className={clsx(isMobile ? css.productMobile : css.productDesktop, className)}>
      <div className={css.category}>{data.category}</div>

      <img alt={data.title} src={data.thumbnail} className={css.imgProduct}></img>

      <div className={css.titleAndCart}>
        <div className={css.title}> {data.title} </div>
      </div>

      <div className={css.price}>
        <div className={css.currentPrice}>{data.currentPrice.toLocaleString('vi-VN')} đ</div>
        {data.currentPrice !== data.originalPrice && (
          <div className={css.originalPrice}>{data.originalPrice.toLocaleString('vi-VN')} đ</div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
