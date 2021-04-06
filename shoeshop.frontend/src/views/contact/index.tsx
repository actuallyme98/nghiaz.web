import React from 'react';
import { GetServerSideProps } from 'next';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// components
import Layout from '../../components/layout';

// redux
import * as AppActions from '@actions/app-action';
import { initializeStore } from '@redux/with-redux';

// enums
import { AppRouteEnums } from '../../enums/app-route.enum';

interface Props {}

const Contact: React.FC<Props> = (props) => {
  return (
    <Layout backUrl={AppRouteEnums.HOME} title="Liện hệ">
      <div className={clsx(css.container)}>
        <h1>Liên Hệ</h1>
        <div className={css.map}>
          <img src="/assets/banners/banner1.jpg" alt="" />
        </div>

        <div className={css.wrapper}>
          <div>
            <div className={css.titleLeftRight}>
              <img src="/assets/icons/envelope.svg" alt="" />
              <span className={css.mes}>Để lại lời nhắn cho chúng tôi</span>
            </div>
            <div className={css.col}>
              <div>
                <div className={css.inputGroup}>
                  <span className={css.spanIcons}>
                    <img src="/assets/icons/user.svg" alt="" />
                  </span>
                  <input className={css.input} type="text" placeholder="Họ và tên" />
                </div>
                <div className={css.inputGroup}>
                  <span className={css.spanIcons}>
                    <img src="/assets/icons/email.svg" alt="" />
                  </span>
                  <input className={css.input} type="text" placeholder="Email" />
                </div>
                <div className={css.inputGroup}>
                  <span className={css.spanIcons}>
                    <img src="/assets/icons/phone.svg" alt="" />
                  </span>
                  <input className={css.input} type="text" placeholder="Số điện thoại" />
                </div>
                <div className={css.inputGroup}>
                  <span className={css.spanIcons}>
                    <img src="/assets/icons/home.svg" alt="" />
                  </span>
                  <input className={css.input} type="text" placeholder="Địa chỉ" />
                </div>
              </div>

              <div>
                <textarea className={css.inputTexarea} placeholder="Viết lời nhắn"></textarea>
              </div>
            </div>
            <div className={css.colFul}>
              <button className={css.btn}>Gửi lời nhắn</button>
            </div>
          </div>

          <div className={css.right}>
            <div className={css.titleLeftRight}>
              <span>
                Cung cấp giày thể thao nam, giày thể thao nữ, giày sneaker uy tín trên toàn quốc
              </span>
            </div>
            <div className={css.phone}>
              <img src="/assets/icons/building.svg" alt="" />
              <span className={css.spaceSpan}>nghiaphuong.vn</span>
            </div>

            <a className={css.phone} href="tel:0364589229">
              <img src="/assets/icons/phone.svg" alt="" />
              <span className={css.spaceSpanLink}> 19004772</span>
            </a>

            <div className={css.phone}>
              <img src="/assets/icons/pin.svg" alt="" />
              <span className={css.spaceSpan}>
                Số 39 Ngõ 115 Nguyễn Khang, Phường Yên Hòa, Quận Cầu Giấy, Hà Nội
              </span>
            </div>

            <div className={css.phone}>
              <img src="/assets/icons/envelope.svg" alt="" />
              <span className={css.spaceSpanLink}> nghiaphuong@gmail.com</span>
            </div>
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
      initialReduxState: reduxStore.getState(),
    },
  };
};

export default Contact;
