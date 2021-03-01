import React, { useState, useMemo, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// components
import Button from '@material-ui/core/Button';
import InputNumberSpinner from '../../components/input-number-spinner';

// redux
import { useSelector } from 'react-redux';
import { IStore } from '../../redux/stores/configure-store';

interface Props {
  data: {
    id: string;
    name: string;
    currentPrice: number;
    price: number;
    colors?: string[];
    remain: number;
    sizes?: number[];
    shortDescription?: string;
    thumbnail: string;
    isFavorite: boolean;
  };
  voucher?: string;
}

const ProductInformation: React.FC<Props> = (props) => {
  const { data } = props;
  const isMobile = useSelector((store: IStore) => store.appState.isMobile);
  const [amount, setAmount] = useState(1);
  // const [isFavorite, setIsFavorite] = useState(data.isFavorite);
  const classes = useStyles();

  // const handleClickUnLike = useCallback(async () => {
  //   setIsFavorite(!isFavorite);
  // }, [isFavorite, data.isFavorite]);

  // const handleClickLike = useCallback(async () => {
  //   setIsFavorite(!isFavorite);
  // }, [isFavorite, data.isFavorite]);

  const copyToClipboard = useCallback(() => {
    // pending
  }, []);

  const handleAddToCart = useCallback(async () => {
    // pending
  }, []);

  const handleChangeAmount = useCallback((value: number) => {
    setAmount(value);
  }, []);

  const discountPercent = useMemo(
    () => Math.ceil(((data.price - data.currentPrice) * 100) / data.price),
    [data],
  );

  const colorsMemo = useMemo(() => {
    if (!data.colors) {
      return '';
    }
    return data.colors.map((color, index) => (
      <Button key={index} className={classes.funcBtn} variant="outlined" color="primary">
        {color}
      </Button>
    ));
  }, []);

  const sizesMemo = useMemo(() => {
    if (!data.sizes) {
      return '';
    }
    return data.sizes.map((size, index) => (
      <Button key={index} className={classes.funcBtn} variant="outlined" color="primary">
        {size}
      </Button>
    ));
  }, []);

  return (
    <div className={classes.contentDesktop}>
      <div className={classes.title}>{data.name}</div>
      <div className={classes.sumTwo}>
        <div className={classes.priceCurent}>{data.currentPrice.toLocaleString('vi-VN')} đ </div>
        {data.currentPrice !== data.price && (
          <>
            <div className={classes.price}>{data.price.toLocaleString('vi-VN')} đ </div>
            <div className={classes.discount}>
              <div className={classes.discountText}>{`Giảm ${discountPercent}%`}</div>
            </div>
          </>
        )}
      </div>

      <div className={classes.table}>
        {data.colors && (
          <div className={classes.elementTd}>
            {/* <img src="/images/icon-product-detail/multiple-19.svg" /> */}
            <div>
              <div className={classes.textTopTd}>Màu sắc</div>
              <div className={classes.textBottomTd}>{colorsMemo}</div>
            </div>
          </div>
        )}
        {data.sizes && (
          <div className={classes.elementTd}>
            {/* <img src="/images/icon-product-detail/time-alarm.svg" /> */}
            <div>
              <div>
                <div className={classes.textTopTd}>Kích cỡ</div>
                <div className={classes.textBottomTd}>{sizesMemo}</div>
              </div>
            </div>
          </div>
        )}
      </div>
      {data.shortDescription && (
        <div
          className={classes.description}
          dangerouslySetInnerHTML={{ __html: data.shortDescription }}
        />
      )}
      <div className={classes.salaryAmount}>
        Số lượng
        <InputNumberSpinner
          className={classes.buttonAddSub}
          value={amount}
          onChange={handleChangeAmount}
          min={1}
          max={100}
        />
      </div>
      <div className={classes.buyLike}>
        <Button className={classes.buy} onClick={handleAddToCart}>
          <div className={classes.icon} />
          {isMobile ? 'MUA NGAY' : 'CHỌN MUA'}
        </Button>
        {/* {profile ? (
          data.isFavorite == true ? (
            <Button className={classes.like} onClick={handleClickUnLike}>
              <img src="/images/icons/heart-red.svg" className={classes.image2} />
              <span className={classes.textLikeUnLike}>ĐÃ THÍCH</span>
            </Button>
          ) : (
            <Button className={classes.like} onClick={handleClickLike}>
              <img src="/images/icon-product-detail/heartbeat.svg" className={classes.image2} />
              <span className={classes.textLikeUnLike}>YÊU THÍCH</span>
            </Button>
          )
        ) : (
          ''
        )} */}
      </div>
      <div className={classes.borderFour} />
      <div className={classes.deliveryTime}>Thời gian giao hàng dự kiến</div>
      <div className={classes.textDeliveryTime}>
        <li>Hà Nội & HCM: 1 - 2 ngày. Miễn phí vận chuyển với đơn hàng trên 500.000đ</li>
        <li>Các tỉnh thành khác: 3 - 5 ngày</li>
        <li>Trường hợp cần giao hàng gấp, liên hệ trực tiếp với hotline 111111111.</li>
      </div>
      <div className={classes.borderThree}></div>
      <div className={classes.promotionRelated}>Khuyến mãi liên quan</div>
      <img className={classes.imgSale} src="/assets/mocks/banners/banner3.png" />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  contentDesktop: {},
  title: {
    backgroundColor: 'white',
    fontsize: 26,
    fontWeight: 500,
    color: '#4a4a4a',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 15,
      paddingTop: 14,
      paddingRight: 7,
      fontSize: 24,
      color: '#384650',

      display: '-webkit-box',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      '-webkit-line-clamp': 2,
      '-webkit-box-orient': 'vertical',
    },
  },
  sumTwo: {
    flexWrap: 'wrap',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 11,
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 15,
      alignItems: 'center',
      paddingTop: 9,
      display: 'flex',
      paddingRight: 15,
      justifyContent: 'space-between',
    },
  },
  priceCurent: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4a4a4a',
  },
  price: {
    marginLeft: 25,
    textDecoration: 'line-through',
    fontSize: 20,
    color: '#848484',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 15,
    },
  },
  discount: {
    marginLeft: 20,
    alignItems: 'center',
    textAlign: 'center',
    width: 70,
    height: 24,
    borderRadius: 8,
    backgroundColor: '#f16728',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      width: 65,
      height: 24,
    },
  },
  discountText: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: 600,
    color: '#ffffff',
  },
  promotionCodeWrap: {
    width: '100%',
    backgroundColor: 'white',
    cursor: 'pointer',
    '& img': {
      paddingLeft: 8,
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: 16,
    },
  },
  promotionCode: {
    alignItems: 'center',
    display: 'flex',
    width: 270,
    height: 33,
    borderRadius: 3,
    border: 'solid 1px #ebebeb',
    backgroundColor: '#f6f6f6',
    '&::before': {
      marginLeft: 10,
      marginRight: 5,
      content: '""',
      display: 'inline-block',
      width: 12,
      height: 12,
      backgroundImage: 'url("/assets/mocks/products/tags-stack.svg")',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      alignItems: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      margin: 'auto',
      textAlign: 'center',
      width: 293,
    },
  },
  funcBtn: {
    marginRight: 5,
  },
  promotionCodeLeft: {
    fontSize: 12,
    color: '#4a4a4a',
  },
  promotionCodeRight: {
    paddingLeft: 6,
    fontSize: 12,
    fontWeight: 600,
    color: '#323232',
  },
  table: {
    marginTop: 20,
    backgroundColor: 'white',
    [theme.breakpoints.down('xs')]: {
      marginTop: 0,
      border: 'none',
    },
  },
  tableChild: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'space-evenly',
    },
  },
  borderBetween: {
    [theme.breakpoints.down('xs')]: {
      margin: 'auto',
      width: '100%',
      height: 1,
      borderBottom: 'dashed 1px #d1d1d1',
    },
  },
  borderOne: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  elementTd: {
    borderTop: 'dashed 1px #d1d1d1',
    borderBottom: 'dashed 1px #d1d1d1',
    height: 100,
    display: 'flex',
    alignItems: 'center',
    minWidth: 145,
    paddingLeft: 15,
    '& img': {
      marginRight: 6,
      display: 'inline-block',
      width: 16,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      alignItems: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      flexGrow: 1,
      border: 'none',
    },
  },
  textTopTd: {
    fontSize: 14,
    color: '#848484',
    marginBottom: 10,
  },
  textBottomTd: {
    fontSize: 16,
    fontWeight: 600,
    color: '#4a4a4a',
  },
  borderTwo: {
    marginTop: 14,
    height: 2,
    border: 'dashed 1px #d1d1d1',
  },
  deliveryTime: {
    backgroundColor: 'white',
    fontSize: 14,
    fontWeight: 600,
    color: '#4a4a4a',
    '&::before': {
      marginRight: 10,
      content: '""',
      display: 'inline-block',
      width: 22,
      height: 16,
      backgroundImage: 'url("/assets/mocks/products/ic-local-shipping-24-px.svg")',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: 10,
      paddingLeft: 15,
      paddingTop: 10,
      fontSize: 14,
      fontWeight: 600,
      color: '#4a4a4a',
    },
  },
  textDeliveryTime: {
    backgroundColor: 'white',
    paddingTop: 8,
    fontSize: 12,
    color: '#4a4a4a',
    [theme.breakpoints.down('xs')]: {
      paddingBottom: 15,
      paddingLeft: 15,
      paddingRight: 15,
      fontSize: 14,
      color: '#788995',
    },
  },
  borderThree: {
    marginTop: 15,
    height: 2,
    borderBottom: 'dashed 1px #d1d1d1',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  promotionRelated: {
    paddingTop: 10,
    fontSize: 14,
    fontWeight: 600,
    color: '#4a4a4a',
    '&::before': {
      marginRight: 10,
      content: '""',
      display: 'inline-block',
      width: 16,
      height: 12,
      backgroundImage: 'url("/assets/mocks/products/coupon.svg")',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    },
  },
  imgSale: {
    paddingTop: 13,
    width: 440,
    height: 120,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  description: {
    marginTop: 20,
    color: '#4a4a4a',
    fontSize: 12,
    [theme.breakpoints.down('xs')]: {
      backgroundColor: 'white',
      padding: 15,
      margin: '10px 0 0 0',
    },
  },
  salaryAmount: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
    fontSize: 14,
    color: '#848484',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  buttonAddSub: {
    marginLeft: 25,
    marginRight: 15,
  },
  buyLike: {
    paddingTop: 20,
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      paddingTop: 0,
    },
  },
  buy: {
    textAlign: 'center',
    width: 180,
    height: 41,
    borderRadius: 2,
    border: 'solid 1px #d05922',
    backgroundColor: '#f16728',
    fontsize: 15,
    fontWeight: 600,
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#f16728',
    },
    [theme.breakpoints.down('xs')]: {
      zIndex: 10,
      width: '50%',
      height: 47,
      position: 'fixed',
      bottom: 0,
      right: 0,
    },
  },
  icon: {
    marginRight: 10,
    content: '""',
    display: 'inline-block',
    width: 16,
    height: 16,
    backgroundImage: 'url("/assets/mocks/products/add-to-cart-2.svg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  like: {
    textAlign: 'center',
    marginLeft: 10,
    width: 180,
    height: 41,
    borderRadius: 2,
    boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.08)',
    border: 'solid 1px #e9e9e9',
    backgroundColor: '#fafafa',
    [theme.breakpoints.down('xs')]: {
      zIndex: 10,
      backgroundColor: 'white',
      marginLeft: 0,
      height: 47,
      width: '50%',
      position: 'fixed',
      bottom: 0,
      left: 0,
    },
  },
  image2: {
    width: 16,
    height: 16,
  },
  textLikeUnLike: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: 600,
    color: '#384650',
  },
  borderFour: {
    marginTop: 18,
    marginBottom: 17,
    height: 2,
    borderBottom: 'dashed 1px #d1d1d1',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  detailContainer: {
    width: 357,
    height: 163,
    borderRadius: 5,
    boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.08)',
    border: 'solid 1px #e1e1e1',
    backgroundColor: '#ffffff',
    padding: '13px 26px',
  },
  detailTitle: {
    fontSize: 14,
    color: '#575757',
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: 14,
    color: '#575757',
    marginBottom: 10,
    '& p': {
      marginBottom: 0,
    },
  },
  btnCopy: {
    width: 90,
    height: 33,
    borderRadius: 2,
    backgroundColor: '#f4dbd0',
    border: 'none',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f16728',
  },
}));

export default ProductInformation;
