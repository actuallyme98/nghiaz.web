// libs
import React, { useMemo } from 'react';
import Slider, { Settings } from 'react-slick';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

interface IProps {}

const SliderBanner: React.FC<IProps> = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Slider {...settings}>
        <a href="/" target="_blank">
          <img alt="" className={classes.image} src="/assets/banners/banner1.jpg" />
        </a>
        <a href="/" target="_blank">
          <img alt="" className={classes.image} src="/assets/banners/banner2.jpg" />
        </a>
      </Slider>
    </div>
  );
};

export default SliderBanner;

const useStyles = makeStyles((theme) => ({
  root: {},
  image: {
    margin: '0 auto',
    width: '100%',
    height: 460,
    objectFit: 'cover',
    [theme.breakpoints.down('xs')]: {
      height: 300,
    },
  },
  preArrow: {
    width: 70,
    height: 70,
    left: 0,
    zIndex: 1,
    [theme.breakpoints.down('xs')]: {
      visibility: 'hidden',
    },
  },
  nextArrow: {
    width: 70,
    height: 70,
    right: 0,
    zIndex: 1,
    [theme.breakpoints.down('xs')]: {
      visibility: 'hidden',
    },
  },
}));

const NextArrow: React.FC<any> = (props) => {
  const { className, style, onClick } = props;
  const classes = useStyles();
  return (
    <img
      className={clsx(className, classes.nextArrow)}
      style={style}
      onClick={onClick}
      src="/assets/banners/slider-next-arrow.svg"
    />
  );
};

const PrevArrow: React.FC<any> = (props) => {
  const { className, style, onClick } = props;
  const classes = useStyles();
  return (
    <img
      className={clsx(className, classes.preArrow)}
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
