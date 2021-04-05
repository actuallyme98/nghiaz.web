import React from 'react';
import css from './style.module.scss';
import clsx from 'clsx';
import Link from 'next/link';

// components
import Slider, { Settings } from 'react-slick';
import ProductItem from '../product-item';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/stores/configure-store';

interface IProps {
  products: REDUX_STORE.Product[];
}

const ListRelatedProduct: React.FC<IProps> = ({ products }) => {
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  if (products.length === 0) {
    return null;
  }
  return (
    <div className={isMobile ? css.rootMobile : css.root}>
      <div className={css.block}>
        <div className={css.title}>Sản phẩm thường được mua cùng</div>
      </div>
      <div className={css.scroll}>
        <Slider {...settings} slidesToShow={Math.min(products.length, 5)}>
          {products.map((product) => (
            <div key={product.id}>
              <Link href={`/shop/${product.slug.trim()}/${product.code.trim()}`}>
                <a>
                  <ProductItem className={css.slideItem} product={product} />
                </a>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ListRelatedProduct;

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

const settings: Settings = {
  infinite: true,
  variableWidth: true,
  className: 'slider variable-width ' + css.slide,
  swipeToSlide: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  autoplay: true,
};
