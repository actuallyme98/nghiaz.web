import React, { useCallback, useRef, useMemo, useEffect, useState } from 'react';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// components
import Button from 'antd/lib/button';
import notification from 'antd/lib/notification';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';
import * as AppActions from '@actions/app-action';

import { renderVoucherText } from '@helpers/app-util';
import { getKeyCategory } from '@helpers/local-storage-util';

interface Props {
  className?: string;
  data: {
    cartId?: number;
    totalPrice: number;
    totalMoney: number;
    shipFee: number;
    discount: number;
  };
  voucherCode?: REDUX_STORE.VoucherCode;
}

const PaymentCard: React.FC<Props> = (props) => {
  const { data, className, voucherCode } = props;
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const profile = useSelector((store: RootState) => store.appState.profile);
  const loading = useSelector((store: RootState) => AppActions.applyVoucherAction.isPending(store));

  const [isChangeVoucher, setChangeVoucher] = useState<boolean>(false);
  const [code, setCode] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    setChangeVoucher(!Boolean(voucherCode));
  }, [voucherCode]);

  const onChangeCode = useCallback((event: any) => {
    setCode(event.target.value);
  }, []);

  const onClickChangeVoucher = useCallback(() => {
    setChangeVoucher(true);
  }, []);

  const onClickUpdateVoucher = useCallback(async () => {
    try {
      await dispatch(
        AppActions.applyVoucherAction({
          clientId: profile?.client.id || getKeyCategory(),
          cartId: data.cartId,
          code,
          price: data.totalPrice,
        }),
      );
      notification.success({
        message: 'Sử dụng mã thành công',
        placement: 'bottomRight',
      });
    } catch (err) {
      notification.error({
        message: String(err).replace(/Error: /g, ''),
        placement: 'bottomRight',
      });
    }
  }, [profile, data, code]);

  const handleGetVoucher = useCallback(async () => {
    try {
      const data = await dispatch(AppActions.getVoucherAction());
      if (data) {
        setCode(data.code.trim());
      }
    } catch (err) {
      notification.error({
        message: String(err).replace(/Error: /g, ''),
        placement: 'bottomRight',
      });
    }
  }, []);

  return (
    <div className={clsx(isMobile ? css.contentMobile : css.contentDesktop, className)}>
      <div className={css.top}>
        <div className={css.crossBar}>
          <div className={css.crossBarAbsolute} />
        </div>
        <div className={css.border} />
        {isChangeVoucher && (
          <>
            <div className={css.voucher}>
              <div className={css.textVoucher}>
                <img src="/assets/icons/logo-voucher.svg" />
                <div className={css.textCodeVoucher}>Lấy Voucher</div>
              </div>
              <Button
                loading={loading}
                className={clsx(css.btbOk, { [css.btnOkNotLoading]: !loading })}
                onClick={handleGetVoucher}
              >
                OK
              </Button>
            </div>
            <div className={css.border} />
          </>
        )}
        {isChangeVoucher ? (
          <div className={css.voucher}>
            <div className={css.logo} />
            <div className={css.textVoucher}>
              <img src="/assets/icons/logo-voucher.svg" />
              <div className={css.textCodeVoucher}>Nhập mã Voucher</div>
            </div>
            <div className={css.inputBtnOk}>
              <input
                disabled={loading}
                className={css.vcInput}
                value={code}
                onChange={onChangeCode}
                placeholder={isMobile ? 'Nhập tại đây…' : ''}
                onKeyDown={(e) => e.key === 'Enter' && onClickUpdateVoucher()}
              />
              <Button
                loading={loading}
                className={clsx(css.btbOk, { [css.btnOkNotLoading]: !loading })}
                onClick={onClickUpdateVoucher}
              >
                OK
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className={css.hasVoucher}>
              <div className={css.code}>#{voucherCode?.code}</div>
              <Button
                className={css.changeCodeBtn}
                onClick={onClickChangeVoucher}
                loading={loading}
              >
                Đổi mã
              </Button>
            </div>
            <div>{renderVoucherText(voucherCode?.voucher)}</div>
          </>
        )}
      </div>
      <div className={css.money}>
        <div className={css.contentMoney}>
          <div className={css.textContent}>Tổng tiền</div>
          <div className={css.moneyContent}>{data.totalPrice.toLocaleString('vi-VN')} đ</div>
        </div>

        {Boolean(data.discount) && (
          <>
            <div className={css.borderContent} />
            <div className={css.contentMoney}>
              <div className={css.textContent}>Giảm giá</div>
              <div className={css.moneyContent}>-{data.discount.toLocaleString('vi-VN')} đ</div>
            </div>
          </>
        )}

        <div className={css.borderContent} />

        <div className={css.contentMoney}>
          <div className={css.textContent}>Phí vận chuyển (tạm tính)</div>
          <div className={css.moneyContent}>{data.shipFee.toLocaleString('vi-VN')} đ</div>
        </div>

        <div className={css.borderContent} />

        <div className={css.contentMoney}>
          <div className={css.textContentTotal}>Tổng cộng</div>
          <div className={css.moneyContentTotal}>{data.totalMoney.toLocaleString('vi-VN')} đ</div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
