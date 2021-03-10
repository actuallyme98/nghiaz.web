import React from 'react';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';

interface Props {
  className?: string;
  step: number;
}

const Stepper: React.FC<Props> = (props) => {
  const { step, className } = props;
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  return (
    <div className={clsx(isMobile ? css.contentMobile : css.contentDesktop, className)}>
      <div className={css.cart}>
        <img src="/assets/icons/cart-in-cart.svg" />
        <div className={css.text}>Giỏ hàng</div>
      </div>

      <div className={css.crossBar} />

      <div className={css.cart}>
        <img
          src={step > 1 ? '/assets/icons/pay-in-cart-red.svg' : '/assets/icons/pay-in-cart.svg'}
        />
        <div className={css.text}>Thanh toán</div>
      </div>

      <div className={css.crossBar} />

      <div className={css.cart}>
        <img
          src={
            step > 2
              ? '/assets/icons/completed-in-cart-red.svg'
              : '/assets/icons/completed-in-cart.svg'
          }
        />
        <div className={css.text}>Hoàn tất</div>
      </div>
    </div>
  );
};

export default Stepper;
