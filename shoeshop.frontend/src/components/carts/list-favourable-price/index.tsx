import React, { useMemo } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

// styles
import css from './style.module.scss';

// components
import Slider, { Settings } from 'react-slick';
import ProductItem from './product-item';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';

const NextArrow: React.FC<any> = (props) => {
  const { className, style, onClick } = props;
  return (
    <img
      className={clsx(className, css.nextArrow)}
      style={style}
      onClick={onClick}
      src="/assets/icons/slider-next-arrow.svg"
    />
  );
};

const PrevArrow: React.FC<any> = (props) => {
  const { className, style, onClick } = props;
  return (
    <img
      className={clsx(className, css.preArrow)}
      style={style}
      onClick={onClick}
      src="/assets/icons/slider-prev-arrow.svg"
    />
  );
};

interface IProps {
  className?: string;
}

const settings: Settings = {
  infinite: true,
  variableWidth: true,
  className: 'slider variable-width ' + css.slide,
  swipeToSlide: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

// mocks
const dealToday: any[] = [];

const ListFavourablePrice: React.FC<IProps> = (props) => {
  const { className } = props;
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);

  const listProduct = useMemo(
    () =>
      dealToday.map((product) => (
        <span key={product.id}>
          <Link href={'/shop/[...slug]'} as={`/shop/${product.slug}/${product.id}`}>
            <a>
              <ProductItem
                className={css.slideItem}
                data={{
                  category: '',
                  currentPrice: Number(product.currentPrice),
                  originalPrice: Number(product.price),
                  id: product.id,
                  pk: product.pk,
                  thumbnail: String(product.thumbnail),
                  title: product.name,
                }}
              />
            </a>
          </Link>
        </span>
      )),
    [dealToday],
  );

  if (listProduct.length == 0) {
    return null;
  }

  return (
    <div className={clsx(isMobile ? css.rootMobile : css.root, className)}>
      <div className={css.title}>Ưu đãi hôm nay</div>
      {isMobile ? (
        <div className={css.listProductSlide}>{listProduct}</div>
      ) : (
        <div className={css.scroll}>
          <Slider {...settings}>{listProduct}</Slider>
        </div>
      )}
    </div>
  );
};

export default ListFavourablePrice;
