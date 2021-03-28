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
import Loading from '../../../components/loading';

// redux
import { RootState } from '../../../redux/stores/configure-store';
import { useSelector, useDispatch } from 'react-redux';
import * as AppActions from '@actions/app-action';
import { initializeStore } from '@redux/with-redux';

// enums
import { AppRouteEnums } from '../../../enums/app-route.enum';

interface IProps {}

const OrderHistory: NextPage<IProps> = () => {
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const profile = useSelector((store: RootState) => store.appState.profile);
  const orders = useSelector((store: RootState) => store.appState.orders);
  const [selected, setSelected] = useState(0);
  const route = useRouter();
  const dispatch = useDispatch();
  const orderId = useMemo(() => route.query.order, [route]);

  useEffect(() => {
    if (!profile) {
      route.push(AppRouteEnums.SIGNIN);
    }
  }, [profile]);

  useEffect(() => {
    if (profile) {
      dispatch(AppActions.listOrdersAction(profile.client.id));
    }
  }, [profile]);

  if (!profile) {
    return <Loading />;
  }

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
      orders.map((order) => {
        return <ItemOrdered data={order} key={order.id} open={orderId === order.code.trim()} />;
      }) || [],
    [orderId, orders],
  );

  const onLoadMore = useCallback(() => {
    // pending
  }, []);

  if (isMobile) {
    return (
      <Layout loading={false} backUrl={AppRouteEnums.USER} title="Lịch sử đơn hàng">
        <div className={css.rootMobile}>
          <div className={css.title}>
            <img src="/assets/icons/bag-delivery.svg" alt="" />
            Lịch sử đơn hàng
          </div>
          <InfinityScroll
            isLoading={false}
            loadMore={onLoadMore}
            // hasMore={orderData?.user.client?.orderSet.pageInfo.hasNextPage}
          >
            {renderProductsList}
          </InfinityScroll>
          {false && (
            <div className={css.center}>
              <LoadingIcon />
            </div>
          )}
        </div>
      </Layout>
    );
  }

  return (
    <UserLayout
      title="Lịch sử đơn hàng"
      breadcumb={[{ title: 'Lịch sử đơn hàng', url: '' }]}
      profile={profile}
    >
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
        {false && (
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

export default OrderHistory;
