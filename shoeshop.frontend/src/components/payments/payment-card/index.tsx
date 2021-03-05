import React, { useState, useCallback, useRef, useEffect } from 'react';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// components
import Button from 'antd/lib/button';
import notification from 'antd/lib/notification';
import Popover from 'antd/lib/popover';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';

interface Props {
  className?: string;
  data: {
    buyMore: number;
    totalMoney: number;
    shipFee: number;
    discount: number;
  };
  voucher?: any;
}

// mocks
const loading = false;

const PaymentCard: React.FC<Props> = (props) => {
  const { data, className, voucher } = props;
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const totalAll = data.totalMoney - data.discount + data.shipFee;
  const [isChangeVoucher, setChangeVoucher] = useState<boolean>(!Boolean(voucher));
  const vcInputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setChangeVoucher(!Boolean(voucher));
  }, [voucher]);

  const onClickChangeVoucher = useCallback(async () => {
    // pending
  }, []);

  const onClickUpdateVoucher = useCallback(async () => {
    const code = vcInputEl.current?.value;
    // pending
  }, []);

  useEffect(() => {
    if (isChangeVoucher) {
      vcInputEl.current?.focus();
    }
  }, [isChangeVoucher]);

  return (
    <div className={clsx(isMobile ? css.contentMobile : css.contentDesktop, className)}>
      <div className={css.top}>
        <div className={css.textTop}>
          Mua thêm
          <span className={css.buyMore}> {data.buyMore.toLocaleString('vi-VN')} </span>
          để được nhận ưu đãi cho thành viên Vàng cho đơn hàng từ 1.000.000
        </div>
        <div className={css.seeDetails}>Xem chi tiết</div>
        <div className={css.crossBar}>
          <div className={css.crossBarAbsolute} />
        </div>
        <div className={css.border} />
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
                ref={vcInputEl}
                placeholder={isMobile ? 'Nhập tại đây…' : ''}
                onKeyDown={(e) => e.key === 'Enter' && onClickUpdateVoucher()}
              />
              <Button
                loading={loading}
                type="ghost"
                className={clsx(css.btbOk, { [css.btnOkNotLoading]: !loading })}
                onClick={onClickUpdateVoucher}
              >
                OK
              </Button>
            </div>
          </div>
        ) : (
          <div className={css.hasVoucher}>
            <div className={css.code}>
              {voucher?.code}
              {Boolean(voucher?.description) && (
                <Popover
                  trigger="click"
                  content={<div className={css.discountInfo}>{voucher?.description}</div>}
                  title="Thông tin mã giảm giá"
                >
                  <div className={css.infoIcon} />
                </Popover>
              )}
            </div>
            <Button
              className={css.changeCodeBtn}
              onClick={onClickChangeVoucher}
              // loading={loadingRemoveCode}
            >
              Đổi mã
            </Button>
          </div>
        )}
      </div>
      <div className={css.money}>
        <div className={css.contentMoney}>
          <div className={css.textContent}>Tổng tiền</div>
          <div className={css.moneyContent}>{data.totalMoney.toLocaleString('vi-VN')} đ</div>
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
          <div className={css.moneyContentTotal}>{totalAll.toLocaleString('vi-VN')} đ</div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
