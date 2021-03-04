import React, { useMemo } from 'react';
import clsx from 'clsx';

// styles
import css from './style.scss';

// components
import Slider, { Settings } from 'react-slick';

interface IProps {}

const SliderBanner: React.FC<IProps> = () => {
  return (
    <div className={css.root}>
      <Slider {...settings}>
        <a href="/" target="_blank">
          <img alt="" className={css.image} src="/assets/banners/banner1.jpg" />
        </a>
        <a href="/" target="_blank">
          <img alt="" className={css.image} src="/assets/banners/banner2.jpg" />
        </a>
      </Slider>
    </div>
  );
};

export default SliderBanner;

const NextArrow: React.FC<any> = (props) => {
  const { className, style, onClick } = props;
  return (
    <img
      className={clsx(className, css.nextArrow)}
      style={style}
      onClick={onClick}
      src="/assets/banners/slider-next-arrow.svg"
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
      src="/assets/banners/slider-prev-arrow.svg"
    />
  );
};

const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 10000,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};
