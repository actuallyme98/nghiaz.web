import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

// styles
import css from './style.module.scss';

// components
import Layout from '../../components/layout';
import Loading from '../../components/loading';

// redux
import { useSelector } from 'react-redux';
import * as AppActions from '@actions/app-action';
import { initializeStore } from '@redux/with-redux';
import { RootState } from '@redux/stores/configure-store';

// enums
import { AppRouteEnums } from '../../enums/app-route.enum';

// utils
import { pathUrl, toDateTime } from '../../helpers/app-util';

interface Props {}

const defaultAvatar = process.env.DEFAULT_AVATAR_URL || '';

const User: NextPage<Props> = () => {
  const route = useRouter();
  const profile = useSelector((store: RootState) => store.appState.profile);
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);

  useEffect(() => {
    if (!profile) {
      route.push(AppRouteEnums.SIGNIN);
    }
  }, [profile]);

  useEffect(() => {
    if (!isMobile) {
      route.push(AppRouteEnums.USER_EDIT_PROFILE);
    }
  }, [isMobile]);

  if (!profile || !isMobile) {
    return <Loading />;
  }

  return (
    <Layout loading={false} title="Trang cá nhân" backUrl={AppRouteEnums.HOME}>
      <div className={css.rootMobile}>
        <div className={css.title}>
          <img src="/assets/icons/a-edit.svg" alt="" />
          Trang cá nhân
        </div>
        <div className={css.top}>
          <div className={css.left}>
            <img src={pathUrl(profile.client?.avatar)} />
            <div className={css.nameWrap}>
              <div className={css.name}>
                {profile.lastName} {profile.firstName}
              </div>
              <div className={css.level}>
                <img src="/assets/icons/crown.svg" alt="" />
              </div>
            </div>
          </div>
          <div className={css.right}>
            <div className={css.accumulatedPoints}>Cập nhật lúc: </div>
            <div className={css.point}>
              <span>{toDateTime(profile.updatedAt)}</span>
            </div>
          </div>
        </div>
        <div className={css.middle}>
          <Link href="/user/edit-profile">
            <a>
              <div className={css.middleItem}>
                <img src="/assets/icons/profile.svg" alt="" />
                <div>Chỉnh sửa Thông tin</div>
              </div>
            </a>
          </Link>
          <Link href="/user/delivery-address">
            <a>
              <div className={css.middleItem}>
                <img src="/assets/icons/delivery-fast.svg" alt="" />
                <div>Địa chỉ Nhận hàng</div>
              </div>
            </a>
          </Link>
          <Link href="/user/manage-notification">
            <a>
              <div className={css.middleItem}>
                <img src="/assets/icons/alarm-user.svg" alt="" />
                <div>Quản lý Thông báo</div>
              </div>
            </a>
          </Link>
        </div>
        <div className={css.bottom}>
          <Link href="/user/order-history">
            <a>
              <div className={css.bottomItem}>
                <img src="/assets/icons/bag-delivery-user.svg" alt="" />
                <span>Lịch sử đơn hàng</span>
              </div>
            </a>
          </Link>
          <Link href="/user/favorite-list">
            <a>
              <div className={css.bottomItem}>
                <img src="/assets/icons/favorite-user.svg" alt="" />
                <span>Danh sách yêu thích</span>
              </div>
            </a>
          </Link>
          {/* <Link href="/user/share">
            <a>
              <div className={css.bottomItem}>
                <img src="/assets/icons/a-add-user.svg" alt="" />
                <span>Giới thiệu bạn bè</span>
              </div>
            </a>
          </Link> */}
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;
  await dispatch(AppActions.initializeAuthPage({ req }));
  return {
    props: {
      initialReduxState: reduxStore.getState(),
    },
  };
};

export default User;
