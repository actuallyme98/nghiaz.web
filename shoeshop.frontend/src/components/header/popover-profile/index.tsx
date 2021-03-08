import React, { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// styles
import css from './style.module.scss';

// components
import Popover from 'antd/lib/popover';

// redux
import { useDispatch } from 'react-redux';
import * as AppActions from '@actions/app-action';

// enums
import { AppRouteEnums } from '../../../enums/app-route.enum';

interface Iprops {
  data: {
    avatar?: string;
  };
}

const defaultAvatar = process.env.DEFAULT_AVATAR_URL || '';

const Content: React.FC = () => {
  const route = useRouter();
  const dispatch = useDispatch();

  const handleSignOut = useCallback(async () => {
    await dispatch(AppActions.logOutAction());
  }, []);

  return (
    <div className={css.containerPopup}>
      <Link href={AppRouteEnums.USER}>
        <div className={css.title}>Tài khoản của tôi</div>
      </Link>
      <Link href={AppRouteEnums.USER_ORER_HISTORY}>
        <div className={css.title}>Tra cứu đơn hàng</div>
      </Link>
      <div onClick={handleSignOut} className={css.title}>
        Đăng xuất
      </div>
    </div>
  );
};

const PopoverUserProfile: React.FC<Iprops> = (props) => {
  const { data } = props;

  return (
    <Popover
      overlayClassName={css.popoverUserProfile}
      content={<Content />}
      placement="bottomRight"
      trigger="click"
    >
      <div className={css.container}>
        <div className={css.avatar}>
          <img src={data.avatar?.trim() || defaultAvatar} alt="" />
        </div>
      </div>
    </Popover>
  );
};

export default PopoverUserProfile;
