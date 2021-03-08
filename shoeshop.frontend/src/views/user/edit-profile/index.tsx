import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

// styles
import css from './style.module.scss';

// components
import UserLayout from '../../../components/users/user-layout';
import Layout from '../../../components/layout';
import UpdateInfo from '../../../components/users/edit-profile/update-info';
import UpdatePassword from '../../../components/users/edit-profile/update-password';
import UpdateAvatar from '../../../components/users/edit-profile/update-avatar';
import Loading from '../../../components/loading';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/stores/configure-store';
import * as AppActions from '@actions/app-action';
import { initializeStore } from '@redux/with-redux';

interface Props {}

const EditProfile: NextPage<Props> = () => {
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const profile = useSelector((store: RootState) => store.appState.profile);
  const route = useRouter();

  useEffect(() => {
    if (!profile) {
      route.push('/signin');
    }
  }, [profile]);

  if (!profile) {
    return <Loading />;
  }

  return isMobile ? (
    <Layout loading={false}>
      <div className={css.rootMobile}>
        <div className={css.title}>
          <img src="/assets/icons/a-edit.svg" alt="" />
          Chỉnh sửa thông tin
        </div>
        <div className={css.contentMobile}>
          <div className={css.updateInfoMobile}>
            <UpdateAvatar />
            <br />
            <UpdateInfo />
          </div>
        </div>
        <Link href="/user/update-password">
          <div className={css.bottomMobile}>
            <div>Đổi mật khẩu</div>
            <img src="/assets/edit-profile/right-arrow-edit-profile.svg"></img>
          </div>
        </Link>
      </div>
    </Layout>
  ) : (
    <UserLayout breadcumb={[{ title: 'Chỉnh sửa thông tin', url: '' }]} profile={profile}>
      <div className={css.root}>
        <div className={css.title}>
          <div className={css.logoImgTitleDesktop}>
            <img
              className={css.logoImgDesktop}
              src="/assets/edit-profile/logo-user.svg"
              alt=""
            ></img>
            <div className={css.text}>Chỉnh sửa thông tin</div>
          </div>
        </div>
        <div className={css.content}>
          <div className={css.updateInfo}>
            <UpdateInfo />
          </div>
          <div className={css.separator} />
          <div className={css.updatePassword}>
            <UpdateAvatar />
            <br />
            <UpdatePassword />
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;
  await dispatch(AppActions.initializeAuthPage({ req, res }));
  return {
    props: {
      title: 'Cập nhật thông tin',
      initialReduxState: reduxStore.getState(),
    },
  };
};

export default EditProfile;
