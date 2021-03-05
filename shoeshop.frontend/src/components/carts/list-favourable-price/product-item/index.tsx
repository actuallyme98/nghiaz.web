import React from 'react';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// components
import Button from 'antd/lib/button';
import notification from 'antd/lib/notification';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';

interface IProps {
  className?: string;
  data: {
    category: string;
    currentPrice: number;
    originalPrice: number;
    id: string;
    pk: number;
    thumbnail: string;
    title: string;
  };
}

const ProductItem: React.FC<IProps> = (props) => {
  const { data, className } = props;
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);

  const handleAddToCart = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    // pending
  };
  return (
    <div className={clsx(isMobile ? css.productMobile : css.productDesktop, className)}>
      <div className={css.category}>{data.category}</div>

      <img alt={data.title} src={data.thumbnail} className={css.imgProduct} />

      <div className={css.titleAndCart}>
        <div className={css.title}>{data.title}</div>
      </div>
      <div className={css.price}>
        <div className={css.currentPrice}>{data.currentPrice.toLocaleString('vi-VN')} đ</div>
        {data.currentPrice != data.originalPrice ? (
          <div className={css.originalPrice}>{data.originalPrice.toLocaleString('vi-VN')} đ</div>
        ) : (
          ''
        )}
      </div>
      <Button className={css.buyNow} type="ghost" onClick={handleAddToCart} loading={true}>
        Mua ngay
      </Button>
    </div>
  );
};

export default ProductItem;
