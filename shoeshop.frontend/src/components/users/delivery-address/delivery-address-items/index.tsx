import React, { useState, useCallback } from 'react';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// components
import Button from 'antd/lib/button';
import UpdateDeliveryAddressModal from '../../../../components/update-delivery';
import notification from 'antd/lib/notification';

// redux
import * as AppActions from '@actions/app-action';
import { useDispatch } from 'react-redux';

// types
import { GDeliveryAddress } from '../../../../types/gtypes';

interface Iprops {
  address: GDeliveryAddress;
  index: number;
  isMobile: boolean;
  onUpdateSuccess?: () => void;
}

const DeliveryAddressItem: React.FC<Iprops> = ({ isMobile, address, index, onUpdateSuccess }) => {
  const [open, setOpenEditModal] = useState(false);
  const onOpenEditDeliveryAddress = useCallback(() => setOpenEditModal(true), []);
  const onCloseEditDeliveryAddress = useCallback(() => setOpenEditModal(false), []);

  const dispatch = useDispatch();

  const onSetDefaultBtnClick = useCallback(async () => {
    try {
      await dispatch(AppActions.setDefaultDeliveryAddressAction(address.id));
      notification.success({
        message: 'Địa chỉ mặc định đã thay đổi',
        placement: 'bottomRight',
      });
    } catch (err) {
      notification.error({
        message: String(err).replace(/Error: /g, ''),
        placement: 'bottomRight',
      });
    }
  }, [address, onUpdateSuccess]);

  const onRemoveAddress = useCallback(async () => {
    try {
      await dispatch(AppActions.deleteDeliveryAddressAction(address.id));
      notification.success({
        message: 'Đã xóa địa chỉ',
        placement: 'bottomRight',
      });
    } catch (err) {
      notification.error({
        message: String(err).replace(/Error: /g, ''),
        placement: 'bottomRight',
      });
    }
  }, [address, onUpdateSuccess]);
  return (
    <div className={isMobile ? css.rootMobile : css.rootDesktop}>
      <div className={css.heading}>
        <div className={css.textH}>Địa chỉ {index + 1}</div>
        <div className={css.buttonsH}>
          <Button className={clsx(css.button, css.delete)} onClick={onRemoveAddress}>
            {isMobile && 'Xóa'}
          </Button>
          <Button className={clsx(css.button, css.edit)} onClick={onOpenEditDeliveryAddress}>
            {isMobile && 'Sửa'}
          </Button>
          <UpdateDeliveryAddressModal
            open={open}
            onClose={onCloseEditDeliveryAddress}
            address={address}
            onSuccess={onUpdateSuccess}
          />
        </div>
      </div>

      <div className={css.body}>
        <div className={css.textName}>
          <img src="/assets/icons/user-delivery-address.svg" alt="" />
          <div className={css.name}>{address.fullName}</div>
          <div className={css.boxButton}>
            <Button
              className={clsx(css.defaultButton, !address.isDefault && css.selected)}
              onClick={onSetDefaultBtnClick}
              disabled={address.isDefault}
            >
              {address.isDefault ? 'Mặc định' : 'Đặt làm mặc định'}
            </Button>
          </div>
        </div>
        <div className={css.phone}>
          <img src="/assets/icons/phone-delivery-address.svg" alt="" />
          <div className={css.textPhone}>{address.phone}</div>
        </div>
        <div className={css.address}>
          <img src="/assets/icons/location-delivery-address.svg" alt="" />
          <div className={css.textAddress}>
            {[address.address, address.ward?.name, address.district?.name, address.city?.name].join(
              ', ',
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddressItem;
