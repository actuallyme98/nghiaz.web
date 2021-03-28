import React, { useState, useMemo, useCallback } from 'react';

// styles
import css from './style.module.scss';

// components
import Button from 'antd/lib/button';
import InputNumberSpinner from '../../../components/input-number-spinner';
import notification from 'antd/lib/notification';

// redux
import * as AppActions from '@actions/app-action';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';
import { getKeyCategory } from '@helpers/local-storage-util';

interface Props {
  data: {
    id: number;
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

// mocks
const loading = false;

const ProductInformation: React.FC<Props> = (props) => {
  const { data } = props;
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const [amount, setAmount] = useState(1);
  const cartline = useSelector((store: RootState) => store.appState.cartline);
  const profile = useSelector((store: RootState) => store.appState.profile);
  // const [isFavorite, setIsFavorite] = useState(data.isFavorite);
  const dispatch = useDispatch();

  // const handleClickUnLike = useCallback(async () => {
  //   setIsFavorite(!isFavorite);
  // }, [isFavorite, data.isFavorite]);

  // const handleClickLike = useCallback(async () => {
  //   setIsFavorite(!isFavorite);
  // }, [isFavorite, data.isFavorite]);

  const copyToClipboard = useCallback(() => {
    // pending
  }, []);

  const handleAddToCart = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      try {
        if (!cartline) {
          return;
        }
        await dispatch(
          AppActions.addCartLineAction({
            cartId: cartline?.id,
            productId: data.id,
            clientId: profile?.client.id || getKeyCategory(),
            amount,
          }),
        );
        dispatch(AppActions.openCartDrawer(true));
      } catch (err) {
        notification.error({
          message: String(err).replace(/Error: /g, ''),
          placement: 'bottomRight',
        });
      }
    },
    [data],
  );

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
      <Button key={index} color="primary">
        {color}
      </Button>
    ));
  }, []);

  const sizesMemo = useMemo(() => {
    if (!data.sizes) {
      return '';
    }
    return data.sizes.map((size, index) => (
      <Button key={index} color="primary">
        {size}
      </Button>
    ));
  }, []);

  return (
    <div className={isMobile ? css.contentMobile : css.contentDesktop}>
      <div className={css.title}>{data.name}</div>
      <div className={css.sumTwo}>
        <div className={css.priceCurent}>{data.currentPrice.toLocaleString('vi-VN')} đ </div>
        {data.currentPrice !== data.price && (
          <>
            <div className={css.price}>{data.price.toLocaleString('vi-VN')} đ </div>
            <div className={css.discount}>
              <div className={css.discountText}>{`Giảm ${discountPercent}%`}</div>
            </div>
          </>
        )}
      </div>
      {/* <div className={css.promotionCodeWrap}>
        <Dropdown overlay={detailVoucher} trigger={['click']}>
          <div className={css.promotionCode}>
            <div className={css.promotionCodeLeft}>Nhập mã khuyến mại</div>
            <div className={css.promotionCodeRight}>{voucher}</div>
            <img src="/assets/icons/down-arrow.svg"></img>
          </div>
        </Dropdown>
      </div> */}

      <div className={css.table}>
        {data.colors && (
          <div className={css.elementTd}>
            {/* <img src="/assets/icon-product-detail/multiple-19.svg" /> */}
            <div>
              <div className={css.textTopTd}>Màu sắc</div>
              <div className={css.textBottomTd}>{colorsMemo}</div>
            </div>
          </div>
        )}
        {data.sizes && (
          <div className={css.elementTd}>
            {/* <img src="/assets/icon-product-detail/time-alarm.svg" /> */}
            <div>
              <div>
                <div className={css.textTopTd}>Kích cỡ</div>
                <div className={css.textBottomTd}>{sizesMemo}</div>
              </div>
            </div>
          </div>
        )}
      </div>
      {data.shortDescription && (
        <div
          className={css.description}
          dangerouslySetInnerHTML={{ __html: data.shortDescription }}
        />
      )}
      <div className={css.salaryAmount}>
        Số lượng
        <InputNumberSpinner
          className={css.buttonAddSub}
          value={amount}
          onChange={handleChangeAmount}
          min={1}
          max={100}
        />
      </div>
      <div className={css.buyLike}>
        <Button className={css.buy} type="ghost" onClick={handleAddToCart} loading={loading}>
          <div className={css.icon} />
          {isMobile ? 'MUA NGAY' : 'CHỌN MUA'}
        </Button>
      </div>
      <div className={css.borderFour} />
      <div className={css.deliveryTime}>Thời gian giao hàng dự kiến</div>
      <div className={css.textDeliveryTime}>
        <li>Hà Nội & HCM: 1 - 2 ngày. Miễn phí vận chuyển với đơn hàng trên 500.000đ</li>
        <li>Các tỉnh thành khác: 3 - 5 ngày</li>
        <li>Trường hợp cần giao hàng gấp, liên hệ trực tiếp với hotline 0364589229.</li>
      </div>
      <div className={css.borderThree}></div>
      <div className={css.promotionRelated}>Khuyến mãi liên quan</div>
      <img className={css.imgSale} src="/assets/mocks/products/img-sale-product-detail.jpg"></img>
    </div>
  );
};

export default ProductInformation;
