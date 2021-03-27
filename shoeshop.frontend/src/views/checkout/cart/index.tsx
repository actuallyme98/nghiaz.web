import React, { useMemo } from 'react';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';

// styles
import css from './style.module.scss';

// Components
import Layout from '../../../components/layout';
import ListCartItem from '../../../components/carts/list-cart-item';
import ListFavourablePrice from '../../../components/carts/list-favourable-price';
import PaymentCard from '../../../components/carts/payment-card';
import Stepper from '../../../components/stepper';
import LoadingIcon from '../../../components/loading-icon';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';
import * as AppActions from '@actions/app-action';
import { initializeStore } from '@redux/with-redux';

interface IProps {}

// mocks
const loading = false;

const Cart: NextPage<IProps> = () => {
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);

  const cartItems = useMemo(() => [], []);
  const totalPrice = useMemo(() => 0, []);
  return (
    <Layout title="Giỏ hàng">
      <div className={!isMobile ? css.background : ''}>
        <div className={isMobile ? css.contentMobile : css.contentDesktop}>
          {!isMobile && <Stepper step={1} className={css.stepper} />}
          <div className={css.title}>{isMobile ? 'Giỏ hàng' : 'Giỏ hàng của bạn'}</div>
          <div className={css.wrap}>
            <div className={css.col1}>
              {loading ? (
                <LoadingIcon classes={{ root: css.loading }} />
              ) : cartItems.length ? (
                <ListCartItem className={css.listCartItem} items={cartItems} />
              ) : (
                <div className={css.noProduct}>Chưa có sản phẩm nào</div>
              )}

              {isMobile && (
                <PaymentCard
                  data={{
                    buyMore: 538000,
                    totalMoney: totalPrice,
                  }}
                />
              )}
              <ListFavourablePrice className={css.listRelated} />
            </div>
            {!isMobile && (
              <div className={css.col2}>
                <PaymentCard
                  data={{
                    buyMore: 538000,
                    totalMoney: totalPrice,
                  }}
                />
              </div>
            )}
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

export default Cart;
