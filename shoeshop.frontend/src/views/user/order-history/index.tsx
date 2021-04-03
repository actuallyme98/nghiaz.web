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
import notification from 'antd/lib/notification';

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
  const ordersLoading = useSelector((store: RootState) =>
    AppActions.listOrdersAction.isPending(store),
  );

  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<SHOES_API.OrderStatusEnums>();

  const route = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!profile) {
      route.push(AppRouteEnums.SIGNIN);
    }
  }, [profile]);

  useEffect(() => {
    if (profile) {
      dispatch(
        AppActions.listOrdersAction({
          clientId: profile.client.id,
          page,
          filters: {},
        }),
      );
    }
  }, [profile]);

  const onLoadMore = useCallback(async () => {
    try {
      if (profile) {
        await dispatch(
          AppActions.listOrdersAction({
            clientId: profile.client.id,
            page: page + 1,
            filters: {
              status,
            },
          }),
        );
        setPage(page + 1);
      }
    } catch (err) {
      notification.error({
        message: String(err).replace(/Error: /g, ''),
        placement: 'bottomRight',
      });
    }
  }, [profile, page, status]);

  const orderId = useMemo(() => route.query.order, [route]);
  const hasMore = useMemo(() => orders.meta.totalPages > 1, [orders]);

  if (!profile) {
    return <Loading />;
  }

  const onSelect = useCallback(
    async (nextSelect) => {
      setStatus(nextSelect);
      try {
        if (profile) {
          await dispatch(
            AppActions.listOrdersAction({
              clientId: profile.client.id,
              page,
              filters: {
                status: nextSelect,
              },
            }),
          );
        }
      } catch (err) {
        notification.error({
          message: String(err).replace(/Error: /g, ''),
          placement: 'bottomRight',
        });
      }
    },
    [status, page],
  );

  const renderProductsList = useMemo(
    () =>
      orders.items.map((order) => {
        return <ItemOrdered data={order} key={order.id} open={orderId === order.code.trim()} />;
      }) || [],
    [orderId, orders],
  );

  const filterMenu = useMemo(() => {
    return headingData.map((menu, index) => (
      <div
        key={index}
        className={clsx({
          [css.option]: true,
          [css.active]: menu.status === status,
        })}
        onClick={() => onSelect(menu.status)}
      >
        {menu.title}
      </div>
    ));
  }, [status]);

  if (isMobile) {
    return (
      <Layout loading={false} backUrl={AppRouteEnums.USER} title="Lịch sử đơn hàng">
        <div className={css.rootMobile}>
          <div className={css.title}>
            <img src="/assets/icons/bag-delivery.svg" alt="" />
            Lịch sử đơn hàng
          </div>
          <InfinityScroll isLoading={ordersLoading} loadMore={onLoadMore} hasMore={hasMore}>
            {renderProductsList}
          </InfinityScroll>
          {ordersLoading && (
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
          <div className={css.optionsBox}>{filterMenu}</div>
        </div>
        <div className={css.body}>{renderProductsList}</div>
        {ordersLoading && (
          <div className={css.center}>
            <LoadingIcon />
          </div>
        )}
        {hasMore && (
          <Button type="ghost" className={css.loadMoreBtn} onClick={onLoadMore}>
            Xem thêm
          </Button>
        )}
      </div>
    </UserLayout>
  );
};

const headingData: {
  status?: SHOES_API.OrderStatusEnums;
  title: string;
}[] = [
  { status: undefined, title: 'TẤT CẢ' },
  { status: 'CONFIRMING', title: 'ĐANG XÁC NHẬN' },
  { status: 'SHIPPING', title: 'ĐANG GIAO HÀNG' },
  { status: 'SUCCESS', title: 'HOÀN THÀNH' },
  { status: 'FAILED', title: 'ĐÃ HỦY' },
];

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
