import React from 'react';

// styles
import css from './style.module.scss';

// components
import Button from 'antd/lib/button';
import Link from 'next/link';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';

interface Props {}

const OrderCreateAcc: React.FC<Props> = (props) => {
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);

  return (
    <div className={isMobile ? css.contentMobile : css.contentDesktop}>
      <div className={css.titleCreate}>Tạo tài khoản ngay</div>
      <div className={css.content}>
        Hãy tạo tài khoản để mua sắm tại Board Game VN và theo dõi đơn hàng dễ dàng hơn.
      </div>

      <Link href={'/signup'}>
        <a>
          <Button type="ghost" className={css.signupClick}>
            Bấm vào đây để đăng ký
          </Button>
        </a>
      </Link>
    </div>
  );
};

export default OrderCreateAcc;
