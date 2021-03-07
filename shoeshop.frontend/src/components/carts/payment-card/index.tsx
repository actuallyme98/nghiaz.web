import React from 'react';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// components
import Button from 'antd/lib/button';
import Link from 'next/link';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';

// enums
import { AppRouteEnums } from '../../../enums/app-route.enum';

interface Props {
  className?: string;
  data: {
    buyMore: number;
    totalMoney: number;
  };
}

const PaymentCard: React.FC<Props> = (props) => {
  const { data, className } = props;
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);

  return (
    <div className={clsx(isMobile ? css.contentMobile : css.contentDesktop, className)}>
      <div className={css.money}>
        <div className={css.contentMoney}>
          <div className={css.textContentTotal}>Tổng cộng</div>
          <div className={css.moneyContentTotal}>{data.totalMoney.toLocaleString('vi-VN')} đ</div>
        </div>
      </div>
      <Link href={AppRouteEnums.CHECKOUT_PAYMENT}>
        <Button type="ghost" disabled={data.totalMoney <= 0} className={css.pay}>
          TIẾN HÀNH THANH TOÁN
        </Button>
      </Link>
      {isMobile && (
        <Button ghost className={css.buyMoreMobile}>
          MUA THÊM
        </Button>
      )}
    </div>
  );
};

export default PaymentCard;
