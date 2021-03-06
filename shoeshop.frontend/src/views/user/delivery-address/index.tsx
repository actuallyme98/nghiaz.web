import React, { useMemo, useState, useCallback } from 'react';
import { NextPage } from 'next';
import clsx from 'clsx';
import { GetServerSideProps } from 'next';

// styles
import css from './style.module.scss';

// components
import Button from 'antd/lib/button';
import DeliveryAddressItem from '../../../components/users/delivery-address/delivery-address-items';
import UserLayout from '../../../components/users/user-layout';
import Layout from '../../../components/layout';
import AddDeliveryAddressModal from '../../../components/add-delivery';
import { useRouter } from 'next/router';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/stores/configure-store';
import * as AppActions from '@actions/app-action';
import { initializeStore } from '@redux/with-redux';

interface Props {}

// mocks
const loading = false;
const loadingDelivery = false;

const DeliveryAddress: NextPage<Props> = () => {
  const backURL = '/user';
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const profile = useSelector((store: RootState) => store.appState.Profile);

  const deliveryAddresses = useMemo(() => [], []);
  const [openDeliveryAddressModal, setOpenDeliveryAddressModal] = useState(false);
  const onOpenDeliveryAddressModal = useCallback(() => setOpenDeliveryAddressModal(true), []);
  const onCloseDeliveryAddressModal = useCallback(() => setOpenDeliveryAddressModal(false), []);

  const deliveryAddressItem = useMemo(() => {
    return (
      <div className={css.containerDeliveryAddress}>
        {deliveryAddresses.map((address, index) => (
          <DeliveryAddressItem isMobile={isMobile} key={index} address={address} index={index} />
        ))}
      </div>
    );
  }, [deliveryAddresses]);

  return isMobile ? (
    <Layout title="Địa chỉ nhận hàng" loading={loading || loadingDelivery}>
      <div className={css.rootMobile}>
        <div className={css.title}>
          <img src="/assets/icons/red-delivery-fast.svg" alt="" />
          Địa chỉ nhận hàng
        </div>
        <div>{deliveryAddressItem}</div>
      </div>
    </Layout>
  ) : (
    <UserLayout
      breadcumb={[{ title: 'Địa chỉ nhận hàng', url: '' }]}
      loading={loading || loadingDelivery}
    >
      <div className={isMobile ? css.rootMobile : css.rootDesktop}>
        <div className={css.heading}>
          <img src="/assets/icons/delivery-fast.svg" alt="" />
          <span>Địa chỉ nhận hàng</span>
        </div>
        <div className={clsx(css.body, deliveryAddresses.length > 2 && css.scroll)}>
          <div className={css.containerDeliveryAddress}>{deliveryAddressItem}</div>
          <div className={css.addButtonBox}>
            <Button className={css.addButton} shape="circle" onClick={onOpenDeliveryAddressModal} />
            <AddDeliveryAddressModal
              open={openDeliveryAddressModal}
              onClose={onCloseDeliveryAddressModal}
            />
          </div>
        </div>
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
      title: 'Địa chỉ giao hàng',
      initialReduxState: reduxStore.getState(),
    },
  };
};

export default DeliveryAddress;
