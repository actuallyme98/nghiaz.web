import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// components
import Layout from '../../../components/layout';
import Stepper from '../../../components/stepper';
import OrderInfo from '../../../components/order/order-info';

import OrderCreateAcc from '../../../components/order/order-create';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';
import * as AppActions from '@actions/app-action';
import { initializeStore } from '@redux/with-redux';

// enums
import { AppRouteEnums } from '../../../enums/app-route.enum';

interface IProps {}

// mocks
const loading = false;
const data: {
  id: string;
  status: string;
  reason?: string;
  description?: string;
  shippingFee: number;
  paymentMethod?: any;
  price: number;
  client?: any;
  name?: string;
  phone?: string;
  address?: string;
  city?: any;
  district?: any;
  ward?: any;
  createdAt: string;
  updatedAt: string;
  orderItems: any;
  onlinepayment?: any;
  pk: number;
} = {
  id: '1',
  createdAt: '',
  updatedAt: '',
  status: '',
  shippingFee: 1,
  pk: 1,
  orderItems: [],
  price: 1000,
};

const Order: NextPage<IProps> = () => {
  const route = useRouter();
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);

  return (
    <Layout
      loading={String(route.query.id) !== 'error' && loading}
      backUrl={AppRouteEnums.CHECKOUT_PAYMENT}
      title="Order - "
    >
      <div className={!isMobile ? css.background : ''}>
        <div
          className={
            isMobile
              ? css.contentMobile
              : clsx(css.contentDesktop, data && css.contentDesktopBackground)
          }
        >
          {!isMobile && <Stepper step={3} className={css.stepper} />}
          <div className={css.wrap}>
            {isMobile ? (
              <div className={css.payMobile}>
                <img src="/assets/checkout/wallet-43.svg" className={css.imgPayMoblile} />
                <div className={css.payMobileText}>Thanh toán</div>
              </div>
            ) : (
              ''
            )}
            <OrderInfo
              data={{
                pk: data?.pk || '',
                phoneNumber: data?.phone || '',
                pay: 'Thanh toán khi nhận hàng',
                address: data
                  ? [data.address, data.ward?.name, data.district?.name, data.city?.name].join(', ')
                  : '',
                note: data?.description || '',
                id: data?.id || '',
                isClient: Boolean(data?.client),
              }}
            />

            {!data?.client && <OrderCreateAcc />}
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

export default Order;
