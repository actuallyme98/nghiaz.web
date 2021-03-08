import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// styles
import css from './style.module.scss';

interface Iprops {
  data: {
    avatar: string;
    name: string;
  };
}

const defaultAvatar = process.env.DEFAULT_AVATAR_URL || '';

const ProfileMenu: React.FC<Iprops> = (props) => {
  const { pathname } = useRouter();
  const isEditProfile = useMemo(() => pathname.includes('edit-profile'), [pathname]);
  const isDeliveryAddress = useMemo(() => pathname.includes('delivery-address'), [pathname]);
  const isManageNotification = useMemo(() => pathname.includes('manage-notification'), [pathname]);
  const isOrderHistory = useMemo(() => pathname.includes('order-history'), [pathname]);
  const isFavoriteList = useMemo(() => pathname.includes('favorite-list'), [pathname]);
  const isShareFacebook = useMemo(() => pathname.includes('share'), [pathname]);
  const { data } = props;
  return (
    <div className={css.rootDesktop}>
      <div className={css.flexHead}>
        <div className={css.avatar}>
          <img src={data.avatar.trim() || defaultAvatar} alt={data.name} />
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
        <p className={css.textP}>Welcome back!</p>
        <p className={css.pointValue}></p>
      </div>
      <div className={css.flexBody}>
        <Link href="/user/edit-profile">
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
        <Link href="/user/delivery-address">
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
        <Link href="/user/manage-notification">
          <a className={css.select}>
            <div>
              {isManageNotification ? (
                <img src="/assets/icons/alarm_orange.svg" alt="" />
              ) : (
                <img src="/assets/icons/alarm-user.svg" alt="" />
              )}
              <div className={isManageNotification ? css.textSSelected : css.textS}>
                Quản lý Thông báo
              </div>
            </div>
          </a>
        </Link>
      </div>
      <div className={css.lineDotted} />
      <ul className={css.list}>
        <li>
          <Link href="/user/order-history">
            <a>
              {isOrderHistory ? (
                <img src="/assets/icons/bag-delivery.svg" alt="" />
              ) : (
                <img src="/assets/icons/bag-delivery-user.svg" alt="" />
              )}
              <span className={isOrderHistory ? css.textSSelected : css.textS}>
                Lịch sử đơn hàng
              </span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/user/favorite-list">
            <a>
              {isFavoriteList ? (
                <img src="/assets/icons/favorite-user-focus.svg" alt="" />
              ) : (
                <img src="/assets/icons/favorite-user.svg" alt="" />
              )}
              <span className={isFavoriteList ? css.textSSelected : css.textS}>
                Danh sách yêu thích
              </span>
            </a>
          </Link>
        </li>
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
