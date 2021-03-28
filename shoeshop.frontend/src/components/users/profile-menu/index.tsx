import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// styles
import css from './style.module.scss';

// utils
import { pathAvatar, toDateTime } from '@helpers/app-util';
import { AppRouteEnums } from '../../../enums/app-route.enum';

interface Iprops {
  data: {
    avatar?: string;
    name: string;
    updatedAt?: string;
  };
}

const ProfileMenu: React.FC<Iprops> = (props) => {
  const { pathname } = useRouter();
  const isEditProfile = useMemo(() => pathname.includes('edit-profile'), [pathname]);
  const isDeliveryAddress = useMemo(() => pathname.includes('delivery-address'), [pathname]);
  const isOrderHistory = useMemo(() => pathname.includes('order-history'), [pathname]);
  const isShareFacebook = useMemo(() => pathname.includes('share'), [pathname]);
  const { data } = props;
  return (
    <div className={css.rootDesktop}>
      <div className={css.flexHead}>
        <div className={css.avatar}>
          <img src={pathAvatar(data.avatar)} alt={data.name} />
        </div>
        <div className={css.text}>
          <h4>{data.name}</h4>
          <p>
            <span>Thành viên</span>
            <img src="/assets/icons/crown.svg" alt="Thành viên" />
          </p>
        </div>
      </div>
      <div className={css.pointBox}>
        <p className={css.textP}>Cập nhật lúc: </p>
        <p className={css.pointValue}>{toDateTime(data.updatedAt)}</p>
      </div>
      <div className={css.flexBody}>
        <Link href={AppRouteEnums.USER_EDIT_PROFILE}>
          <a className={css.select}>
            <div>
              {isEditProfile ? (
                <img src="/assets/icons/a-edit.svg" alt="" />
              ) : (
                <img src="/assets/icons/profile.svg" alt="" />
              )}
              <div className={isEditProfile ? css.textSSelected : css.textS}>
                Chỉnh sửa Thông tin
              </div>
            </div>
          </a>
        </Link>
        <Link href={AppRouteEnums.USER_DELIVERY_ADDRESS}>
          <a className={css.select}>
            <div>
              {isDeliveryAddress ? (
                <img src="/assets/icons/red-delivery-fast.svg" alt="" />
              ) : (
                <img src="/assets/icons/delivery-fast.svg" alt="" />
              )}
              <div className={isDeliveryAddress ? css.textSSelected : css.textS}>
                Địa chỉ Nhận hàng
              </div>
            </div>
          </a>
        </Link>
        <Link href={AppRouteEnums.USER_ORER_HISTORY}>
          <a className={css.select}>
            <div>
              {isOrderHistory ? (
                <img src="/assets/icons/alarm_orange.svg" alt="" />
              ) : (
                <img src="/assets/icons/alarm-user.svg" alt="" />
              )}
              <div className={isOrderHistory ? css.textSSelected : css.textS}>Lịch sử đơn hàng</div>
            </div>
          </a>
        </Link>
      </div>
      <div className={css.lineDotted} />
      <ul className={css.list}>
        <li>
          <Link href="/user/share">
            <a>
              {isShareFacebook ? (
                <img src="/assets/icons/a-add-user-focus.svg" alt="" />
              ) : (
                <img src="/assets/icons/a-add-user.svg" alt="" />
              )}
              <span className={isShareFacebook ? css.textSSelected : css.textS}>
                Giới thiệu bạn bè
              </span>
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileMenu;
