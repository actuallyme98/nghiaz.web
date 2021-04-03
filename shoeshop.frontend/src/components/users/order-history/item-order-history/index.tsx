import React, { useState, useMemo, useCallback } from 'react';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// components
import ModalItemOrdered from './item-order-history-modal';
import Link from 'next/link';
import Badge from 'antd/lib/badge';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/stores/configure-store';

// utils
import { pathAvatar } from '@helpers/app-util';

interface Iprops {
  data: REDUX_STORE.IOrder;
  open: boolean;
}

export const getOrderStatus = (
  status: string,
): { value: 'CONFIRMING' | 'PREPARING' | 'SHIPPING' | 'SUCCESS' | 'FAILED'; label: string } => {
  status = status.trim();
  if (['NEW', 'CONFIRMING', 'CUSTOMERCONFIRMING'].includes(status)) {
    return { value: 'CONFIRMING', label: 'Đang xác nhận' };
  }
  if (['CONFIRMED', 'PACKING', 'PREPARING'].includes(status)) {
    return { value: 'PREPARING', label: 'Đang chuẩn bị' };
  }
  if (status === 'SHIPPING') {
    return { value: 'SHIPPING', label: 'Đang vận chuyển' };
  }
  if (status === 'SUCCESS') {
    return { value: 'SUCCESS', label: 'Giao thành công' };
  }
  return { value: 'FAILED', label: 'Đã hủy' };
};

const ItemOrdered: React.FC<Iprops> = (props) => {
  const { data } = props;
  const [open, setOpenItemOrderHistory] = useState(props.open);
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const status = getOrderStatus(data.status);
  const onOpenModal = useCallback(() => {
    setOpenItemOrderHistory(true);
  }, []);
  const onCloseModal = useCallback(() => {
    setOpenItemOrderHistory(false);
  }, []);

  const totalProductPrice = useMemo(
    () => data.orderItems.reduce((s, i) => s + (i.product.currentPrice || 0) * (i.amount || 0), 0),
    [data],
  );
  const contentBody = (
    <div className={isMobile ? css.costMobile : css.cost}>
      <div className={css.costDetail}>
        <div className={css.text}>Giá bán:</div>
        <div className={css.price}>{totalProductPrice.toLocaleString('vi')} đ</div>
      </div>
      <div className={css.costDetail}>
        <div className={css.text}>Phí vận chuyển:</div>
        <div className={css.price}>{data.carrier.fee.toLocaleString('vi')} đ</div>
      </div>
      {Boolean(data.discountPrice) && (
        <div className={css.costDetail}>
          <div className={css.text}>Giảm giá:</div>
          <div className={css.price}>{data.discountPrice.toLocaleString('vi')} đ</div>
        </div>
      )}
      <div className={css.totalCost}>
        <div className={css.text}>Tổng cộng:</div>
        <div className={css.price}>{data.price.toLocaleString('vi')} đ</div>
      </div>
    </div>
  );
  return (
    <>
      <div className={isMobile ? css.boxMobile : css.box}>
        <div className={css.heading}>
          <div className={isMobile ? css.codeMobile : css.codeX} onClick={onOpenModal}>
            #{data.code}
          </div>
          <ModalItemOrdered data={data} open={open} onClose={onCloseModal} />

          <div className={css.status}>
            <div
              className={clsx(css.icon, {
                [css.success]: status.value === 'SUCCESS',
                [css.pending]:
                  status.value === 'CONFIRMING' ||
                  status.value === 'PREPARING' ||
                  status.value === 'SHIPPING',
                [css.cancel]: status.value === 'FAILED',
              })}
            />
            {status.label}
          </div>
        </div>

        <div className={css.body}>
          <div className={css.products}>
            {isMobile
              ? data.orderItems.map((edge, index) => {
                  return (
                    <div className={css.boxProductMobile} key={index}>
                      <div className={css.imgOrderItemMobile}>
                        <Badge count={edge.amount > 1 ? edge.amount : 0}>
                          <img src={pathAvatar(edge.product?.thumbnail)} alt={edge.product?.name} />
                        </Badge>
                      </div>
                      <Link href={`/shop/${edge.product.slug}/${edge.product.id}`}>
                        <a>
                          <div className={css.nameMobile}>{edge.product?.name}</div>
                        </a>
                      </Link>
                    </div>
                  );
                })
              : data.orderItems.slice(0, 4).map((edge, index) => {
                  return data.orderItems.length > 4 && index === 3 ? (
                    <div
                      className={css.boxHidden}
                      onClick={() => setOpenItemOrderHistory(true)}
                      key={index}
                    >
                      +{data.orderItems.length - 3}
                    </div>
                  ) : (
                    <div className={css.boxProduct} key={edge.id}>
                      <Badge count={edge.amount > 1 ? edge.amount : 0}>
                        <img src={pathAvatar(edge.product?.thumbnail)} alt={edge.product?.name} />
                      </Badge>
                      <Link href={`/shop/${edge.product.slug}/${edge.product.id}`}>
                        <a>
                          <div className={css.name}>{edge.product?.name}</div>
                        </a>
                      </Link>
                    </div>
                  );
                })}
          </div>
          {!isMobile && <div className={css.lineDotted}></div>}
          {!isMobile && contentBody}
        </div>
      </div>
      {isMobile && contentBody}
    </>
  );
};

export default ItemOrdered;
