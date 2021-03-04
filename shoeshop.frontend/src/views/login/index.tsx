import React from 'react';
import { GetServerSideProps } from 'next';

// styles
import css from './style.module.scss';

// components
import Layout from '../../components/layout';

// redux
import * as AppActions from '@actions/app-action';
import { initializeStore } from '@redux/with-redux';

interface Props {}

const Login: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className={css.formLogin}>
        <div>
          <h1 className={css.sgn1}>Đăng Nhập</h1>
          <div>
            <ul className={css.ulForm}>
              <li className={css.formLink}>
                <input className={css.inputSelect} type="text" placeholder="Email" />
              </li>
              <li className={css.formLink}>
                <input className={css.inputSelect} type="password" placeholder="Mật Khẩu" />
              </li>
              <li className={css.formLink}>
                <button className={css.inputSubmit}>Đăng Nhập</button>
              </li>
            </ul>
            <a href="/" className={css.forgotPass}>
              Quên Mật Khẩu ?
            </a>
            <a href="/" className={css.signUp}>
              Đăng Ký
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;
  dispatch(AppActions.detectMobile(userAgent));

  return {
    props: {
      title: 'Shoes shop',
    },
  };
};

export default Login;
