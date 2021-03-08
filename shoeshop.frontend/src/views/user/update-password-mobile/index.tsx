import React from 'react';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';

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

// helpers
import { redirect } from '@helpers/app-util';

interface Props {}

// mocks
const loading = false;

const UpdatePasswordMobile: NextPage<Props> = () => {
  const profile = useSelector((store: RootState) => store.appState.profile);

  if (!profile) {
    return <Loading />;
  }

  return (
    <Layout loading={loading}>
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;
  await dispatch(
    AppActions.initializeAuthPage({ req, res, urlResponseForMobile: '/user/edit-profile' }),
  );
  return {
    props: {
      title: 'Cập nhật mật khẩu',
      initialReduxState: reduxStore.getState(),
    },
  };
};

export default UpdatePasswordMobile;
