import React, { useCallback, useEffect, useState } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';
import * as AppActions from '@actions/app-action';
import { initializeStore } from '@redux/with-redux';

// enums
import { AppRouteEnums } from '../../../enums/app-route.enum';
import { getKeyCategory } from '~/helpers/local-storage-util';

interface IProps {}

const Order: NextPage<IProps> = () => {
  const route = useRouter();
  const dispatch = useDispatch();
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const profile = useSelector((store: RootState) => store.appState.profile);
  const loading = useSelector((store: RootState) => AppActions.getOrderAction.isPending(store));

  const [order, setOrder] = useState<REDUX_STORE.IOrder>();

  const loadOrder = useCallback(async () => {
    const { id }: any = route.query;
    try {
      const response = await dispatch(
        AppActions.getOrderAction({
          clientId: profile?.client.id || getKeyCategory(),
          code: id,
        }),
      );
      // if (!response.id) {
      //   return route.push(AppRouteEnums.HOME);
      // }
      setOrder(response);
    } catch (err) {
      route.push(AppRouteEnums.HOME);
    }
  }, [route, profile]);

  useEffect(() => {
    loadOrder();
  }, [route, profile]);

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
              : clsx(css.contentDesktop, order && css.contentDesktopBackground)
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
                pk: order?.code || '',
                phoneNumber: order?.phone || '',
                pay: 'Thanh toán khi nhận hàng',
                address: order
                  ? [order.address, order.ward?.name, order.district?.name, order.city?.name].join(
                      ', ',
                    )
                  : '',
                note: order?.description || 'Không có ghi chú',
                code: order?.code,
                isClient: Boolean(order?.client.clone),
              }}
            />

            {!order?.client && <OrderCreateAcc />}
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
