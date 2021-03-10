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

interface Iprops {
  data: any;
  open: boolean;
}

// mocks
const orderItems: any[] = [];

export const getOrderStatus = (
  status: any,
): { value: 'CONFIRMING' | 'PREPARING' | 'SHIPPING' | 'SUCCESS' | 'FAILED'; label: string } => {
  if (['NEW', 'CONFIRMING', 'CUSTOMERCONFIRMING'].includes(status)) {
    return { value: 'CONFIRMING', label: 'Đang xác nhận' };
  }
  if (['CONFIRMED', 'PACKING', 'CHANGEDEPOT', 'PICKUP', 'PICKINGUP', 'PICKEDUP'].includes(status)) {
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
    () => orderItems.reduce((s, i) => s + (i?.node?.price || 0) * (i?.node?.amount || 0), 0),
    [data],
  );
  const discountPrice = data.price - data.shippingFee - totalProductPrice;
  const contentBody = (
    <div className={isMobile ? css.costMobile : css.cost}>
      <div className={css.costDetail}>
        <div className={css.text}>Giá bán:</div>
        <div className={css.price}>{totalProductPrice.toLocaleString('vi')} đ</div>
      </div>
      <div className={css.costDetail}>
        <div className={css.text}>Phí vận chuyển:</div>
        <div className={css.price}>{data.shippingFee.toLocaleString('vi')} đ</div>
      </div>
      {Boolean(discountPrice) && (
        <div className={css.costDetail}>
          <div className={css.text}>Giảm giá:</div>
          <div className={css.price}>{discountPrice.toLocaleString('vi')} đ</div>
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
            #{data.pk}
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
              ? orderItems.map((edge, index) => {
                  const orderItemMobile = edge!.node!;
                  return (
                    <div className={css.boxProductMobile} key={index}>
                      <div className={css.imgOrderItemMobile}>
                        <Badge count={orderItemMobile.amount > 1 ? orderItemMobile.amount : 0}>
                          <img
                            src={orderItemMobile.product?.thumbnail}
                            alt={orderItemMobile.product?.name}
                          />
                        </Badge>
                      </div>
                      <Link
                        href={'/shop/[...slug]'}
                        as={`/shop/${edge?.node?.product?.slug}/${edge?.node?.product?.id}`}
                      >
                        <a>
                          <div className={css.nameMobile}>{orderItemMobile.product?.name}</div>
                        </a>
                      </Link>
                    </div>
                  );
                })
              : orderItems.slice(0, 4).map((edge, index) => {
                  const orderItem = edge!.node!;
                  return data.orderItems.edges.length > 4 && index === 3 ? (
                    <div
                      className={css.boxHidden}
                      onClick={() => setOpenItemOrderHistory(true)}
                      key={index}
                    >
                      +{data.orderItems.edges.length - 3}
                    </div>
                  ) : (
                    <div className={css.boxProduct} key={orderItem.id}>
                      <Badge count={orderItem.amount > 1 ? orderItem.amount : 0}>
                        <img src={orderItem.product?.thumbnail} alt={orderItem.product?.name} />
                      </Badge>
                      <Link
                        href={'/shop/[...slug]'}
                        as={`/shop/${edge?.node?.product?.slug}/${edge?.node?.product?.id}`}
                      >
                        <a>
                          <div className={css.name}>{orderItem.product?.name}</div>
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
