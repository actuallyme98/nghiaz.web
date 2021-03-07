import React, { useState, useCallback, useMemo, useEffect } from 'react';
import clsx from 'clsx';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

// styles
import css from './style.module.scss';

// components
import ItemOrdered from '../../../components/users/order-history/item-order-history';
import UserLayout from '../../../components/users/user-layout';
import Layout from '../../../components/layout';
import LoadingIcon from '../../../components/loading-icon';
import Button from 'antd/lib/button';
import InfinityScroll from '../../../components/infinity-scroll';

// redux
import { RootState } from '../../../redux/stores/configure-store';
import { useSelector } from 'react-redux';
import * as AppActions from '@actions/app-action';
import { initializeStore } from '@redux/with-redux';

interface IProps {}

// mocks
const loading = false;
const loadingOrder = false;

const OrderHistory: NextPage<IProps> = () => {
  const route = useRouter();
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const profile = useSelector((store: RootState) => store.appState.profile);
  const orderId = useMemo(() => route.query.order, [route]);
  const [selected, setSelected] = useState(0);
  const onSelect = useCallback(
    (nextSelect) => {
      setSelected(nextSelect);
      let status = '';
      switch (nextSelect) {
        case 2:
          status =
            'New,Confirming,CustomerConfirming,Confirmed,Packing,ChangeDepot,Pickup,Pickingup,Pickedup,Shipping,Returning';
          break;
        case 1:
          status = 'Success';
          break;
        case 3:
          status = 'Failed,Canceled,CarrierCanceled,SoldOut,Returned';
      }
    },
    [selected],
  );

  const renderProductsList = useMemo(
    () =>
      ([] as any[]).map((edge) => {
        const order = edge;
        return <ItemOrdered data={order} key={order.id} open={orderId === order.id} />;
      }) || [],
    [orderId],
  );

  const onLoadMore = useCallback(() => {
    // pending
  }, []);

  useEffect(() => {
    if (!loading && !profile) {
      // route.push('/signin');
    }
  }, [loading, profile]);

  if (isMobile) {
    return (
      <Layout loading={loading}>
        <div className={css.rootMobile}>
          <div className={css.title}>
            <img src="/assets/icons/bag-delivery.svg" alt="" />
            Lịch sử đơn hàng
          </div>
          <InfinityScroll
            isLoading={loadingOrder}
            loadMore={onLoadMore}
            // hasMore={orderData?.user.client?.orderSet.pageInfo.hasNextPage}
          >
            {renderProductsList}
          </InfinityScroll>
          {loadingOrder && (
            <div className={css.center}>
              <LoadingIcon />
            </div>
          )}
        </div>
      </Layout>
    );
  }

  return (
    <UserLayout title="Lịch sử đơn hàng" breadcumb={[{ title: 'Lịch sử đơn hàng', url: '' }]}>
      <div className={css.container}>
        <div className={css.heading}>
          <div className={css.title}>
            <img src="/assets/icons/bag-delivery-black.svg" alt="" />
            <span>Lịch sử đơn hàng</span>
          </div>
          <div className={css.optionsBox}>
            <div
              className={clsx(css.option, selected === 0 && css.active)}
              onClick={() => onSelect(0)}
            >
              TẤT CẢ
            </div>
            <div
              className={clsx(css.option, selected === 2 && css.active)}
              onClick={() => onSelect(2)}
            >
              ĐANG XỬ LÝ
            </div>
            <div
              className={clsx(css.option, selected === 1 && css.active)}
              onClick={() => onSelect(1)}
            >
              HOÀN THÀNH
            </div>
            <div
              className={clsx(css.option, selected === 3 && css.active)}
              onClick={() => onSelect(3)}
            >
              ĐÃ HỦY
            </div>
          </div>
        </div>
        <div className={css.body}>{renderProductsList}</div>
        {loadingOrder && (
          <div className={css.center}>
            <LoadingIcon />
          </div>
        )}
        <Button type="ghost" className={css.loadMoreBtn} onClick={onLoadMore}>
          Xem thêm
        </Button>
      </div>
    </UserLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;
  dispatch(AppActions.detectMobile(userAgent));

  return {
    props: {
      title: 'Trang cá nhân',
      initialReduxState: reduxStore.getState(),
    },
  };
};

export default OrderHistory;
