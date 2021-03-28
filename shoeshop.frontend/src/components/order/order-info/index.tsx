import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';

// styles
import css from './style.module.scss';

// components
import Button from 'antd/lib/button';
import Link from 'next/link';
import Alert from 'antd/lib/alert';

// redus
import { useSelector } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';

interface Props {
  data: {
    pk: string;
    phoneNumber: string;
    pay: string;
    address: string;
    note: string;
    id?: number;
    isClient: boolean;
  };
}

const OrderInfo: React.FC<Props> = (props) => {
  const { data } = props;
  const route = useRouter();
  const status = route.query.status;
  const message = route.query.message;
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);

  return (
    <div
      className={
        isMobile
          ? css.contentMobile
          : clsx(css.contentDesktop, !data.isClient && css.contentDesktopNotUser)
      }
    >
      {/* <div className={isMobile ? css.logoLeftMobile : css.logoLeft} /> */}
      <div className={css.orderSuccess}>Chi tiết đơn hàng</div>
      <div className={css.thankYou}>Cảm ơn bạn đã lựa chọn Bluewind</div>
      {status === 'fail' && <Alert message={message || 'Có lỗi xảy ra'} type="error" showIcon />}
      <div className={css.table}>
        <div className={css.sum}>
          <div className={css.col1Table}>Mã đơn hàng</div>
          <div className={css.col2Table}>#{data.pk.toUpperCase()}</div>
        </div>
        <div className={css.sum}>
          <div className={css.col1Table}>Số điện thoại</div>
          <div className={css.col2Table}>{data.phoneNumber}</div>
        </div>
        <div className={css.sum}>
          <div className={css.col1Table}>Thanh toán</div>
          <div className={css.col2Table}>{data.pay}</div>
        </div>
        <div className={css.sum}>
          <div className={css.col1Table}>Địa chỉ</div>
          <div className={css.col2Table}>{data.address}</div>
        </div>
        <div className={css.sum}>
          <div className={css.col1Table}>Ghi chú</div>
          <div className={css.col2Table}>{data.note}</div>
        </div>
      </div>
      {data.isClient && (
        <Link href={`/user/order-history?order=${data.id}`}>
          <a>
            <Button type="ghost" className={css.pay}>
              THEO DÕI ĐƠN HÀNG
            </Button>
          </a>
        </Link>
      )}
    </div>
  );
};

export default OrderInfo;
