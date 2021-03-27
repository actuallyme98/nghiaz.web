import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

// styles
import css from './style.module.scss';

// components
import Layout from '../../../components/layout';
import UpdatePassword from '../../../components/users/edit-profile/update-password';
import Loading from '../../../components/loading';

// redux
import { RootState } from '@redux/stores/configure-store';
import { useSelector } from 'react-redux';
import * as AppActions from '@actions/app-action';
import { initializeStore } from '@redux/with-redux';

// enums
import { AppRouteEnums } from '../../../enums/app-route.enum';

interface Props {}

const UpdatePasswordMobile: NextPage<Props> = () => {
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
    <Layout loading={false} backUrl={AppRouteEnums.USER} title="Cập nhật mật khẩu">
      <div className={css.rootMobile}>
        <div className={css.title}>
          <img src="/assets/icons/a-edit.svg" alt="" />
          Đổi mật khẩu
        </div>
        <div className={css.updatePassword}>
          <UpdatePassword />
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

export default UpdatePasswordMobile;
