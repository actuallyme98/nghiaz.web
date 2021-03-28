import React, { useMemo } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import Link from 'next/link';

// styles
import css from './style.module.scss';

// components
import Modal from 'antd/lib/modal';
import Badge from 'antd/lib/badge';
import { getOrderStatus } from '..';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/stores/configure-store';

// utils
import { pathAvatar } from '@helpers/app-util';

interface Iprops {
  data: REDUX_STORE.IOrder;
  open: boolean;
  onClose: () => void;
}

const ModalItemOrdered: React.FC<Iprops> = (props) => {
  const { data, open, onClose } = props;
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const status = getOrderStatus(data.status);
  const totalProductPrice = useMemo(
    () => data.orderItems.reduce((s, i) => s + (i.product.currentPrice || 0) * (i.amount || 0), 0),
    [data],
  );
  const discountPrice = data.price - data.carrier.fee - totalProductPrice;
  const step = useMemo(() => {
    switch (status.value) {
      case 'CONFIRMING':
        return 1;
      case 'PREPARING':
        return 2;
      case 'SHIPPING':
        return 3;
      case 'SUCCESS':
        return 4;
      default:
        return 0;
    }
  }, [status]);

  return isMobile ? (
    <div className={css.modalMobileContent}>
      <Modal
        centered={true}
        className={css.modalMobile}
        title={
          <div className={css.headingMobile}>
            <div className={css.codeMobile}>
              Đơn hàng
              <div className={css.idOrderMobile}>&nbsp;#{data.code}</div>
            </div>
            <div className={css.statusMobile}>
              <div
                className={clsx(css.iconMobile, {
                  [css.successMobile]: status.value === 'SUCCESS',
                  [css.pendingMobile]:
                    status.value === 'CONFIRMING' ||
                    status.value === 'PREPARING' ||
                    status.value === 'SHIPPING',
                  [css.cancelMobile]: status.value === 'FAILED',
                })}
              />
              {status.label}
            </div>
          </div>
        }
        onCancel={onClose}
        closeIcon={
          <img src="/assets/icons/closeModal.svg" style={{ marginBottom: '7px' }} alt="" />
        }
        visible={open}
        footer={null}
      >
        <div className={css.bodyMobile}>
          <div
            className={clsx(css.productsMobile, data.orderItems.length > 8 ? css.scrollMobile : '')}
          >
            {data.orderItems.map((edge, index) => {
              const totalPrice = edge.amount * edge.product.currentPrice;
              return (
                <div className={css.boxProductMobile} key={index}>
                  <Badge count={edge.amount > 1 ? edge.amount : 0}>
                    <img src={edge.product?.thumbnail} alt={edge.product?.name} />
                  </Badge>
                  <Link href={`/shop/${edge.product?.slug}/${edge.product?.id}`}>
                    <a>
                      <div className={css.nameMobile}>{edge.product?.name}</div>
                    </a>
                  </Link>
                  <div className={css.priceMobile}>{totalPrice.toLocaleString('vi')} đ</div>
                </div>
              );
            })}
          </div>

          <div className={css.lineDottedMobile}></div>

          <div className={css.detailMobile}>
            <div className={css.leftMobile}>
              <table>
                <tbody>
                  <tr>
                    <td className={css.labelMobile}>Mã đơn hàng:</td>
                    <td className={css.valueMobile}>{data.code}</td>
                  </tr>
                  <tr>
                    <td className={css.labelMobile}>Người nhận hàng:</td>
                    <td className={css.valueMobile}>{data.name}</td>
                  </tr>
                  <tr>
                    <td className={css.labelMobile}>Thanh toán:</td>
                    <td className={css.valueMobile}>{data.paymentMethod}</td>
                  </tr>
                  <tr>
                    <td className={css.labelMobile}>Ngày tạo:</td>
                    <td className={css.valueMobile}>
                      {moment(data.createdAt).format('HH:mm DD/MM/YYYY')}
                    </td>
                  </tr>
                  <tr>
                    <td className={css.labelMobile}>Số điện thoại:</td>
                    <td className={css.valueMobile}>{data.phone}</td>
                  </tr>
                  <tr>
                    <td className={css.labelMobile}>Địa chỉ:</td>
                    <td className={css.valueMobile}>
                      {[data.address, data.ward?.name, data.district?.name, data.city?.name].join(
                        ', ',
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className={css.labelMobile}>Gói giao hàng:</td>
                    <td className={css.valueMobile}>
                      {data.carrier?.name} - {data.carrier?.name}
                    </td>
                  </tr>
                  <tr>
                    <td className={css.labelMobile}>Lưu ý:</td>
                    <td className={css.valueMobile}>{data.description}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={css.rightMobile}>
              <div className={css.boxCostMobile}>
                <div className={css.flexTextMobile}>
                  <div className={css.textMobilePayment}>Giá bán: </div>
                  <div className={css.priceMobile}>{totalProductPrice.toLocaleString('vi')} đ</div>
                </div>

                <div className={css.flexTextMobile}>
                  <div className={css.textMobilePayment}>Phí vận chuyển: </div>
                  <div className={css.priceMobile}>{data.carrier.fee.toLocaleString('vi')} đ</div>
                </div>

                {Boolean(discountPrice) && (
                  <div className={css.flexTextMobile}>
                    <div className={css.textMobilePayment}>Giảm giá: </div>
                    <div className={css.priceMobile}>{discountPrice.toLocaleString('vi')} đ</div>
                  </div>
                )}

                <div className={css.lineDottedMobile}></div>

                <div className={css.flexTextMobile}>
                  <div className={css.textMobilePayment} style={{ fontWeight: 600 }}>
                    Tổng cộng:{' '}
                  </div>
                  <div className={css.priceMobile}>{data.price.toLocaleString('vi')} đ</div>
                </div>
              </div>
            </div>
          </div>

          <div className={css.lineDottedMobile}></div>

          <div className={css.footerMobile}>
            <div className={css.titleMobile}>Trạng thái đơn hàng</div>
            {step === 0 ? (
              <div className={css.processMobile}>
                <div className={css.stepSuccessMobile}>
                  <img src="/assets/icons/cancel.svg" />
                  <div className={css.textMobile}>Đã hủy</div>
                </div>
                {data.reason && <div className={css.reasonMobile}>Lý do: {data.reason}</div>}
              </div>
            ) : (
              <div className={css.processMobile}>
                <div className={step < 1 ? css.stepCancelMobile : css.stepSuccessMobile}>
                  <img src="/assets/icons/cart-orange.svg" />
                  <div className={css.textMobile}>Đang xác nhận</div>
                </div>
                <div
                  className={step < 2 ? css.stepperCancelMobile : css.stepperSusscessMobile}
                ></div>
                <div className={step < 2 ? css.stepCancelMobile : css.stepSuccessMobile}>
                  <img src="/assets/icons/box-orange.svg" />
                  <div className={css.textMobile}>Đang chuẩn bị hàng</div>
                </div>
                <div
                  className={step < 3 ? css.stepperCancelMobile : css.stepperSusscessMobile}
                ></div>
                <div className={step < 3 ? css.stepCancelMobile : css.stepSuccessMobile}>
                  <img src="/assets/icons/transport-orange.svg" />
                  <div className={css.textMobile}>Đang vận chuyển</div>
                </div>
                <div
                  className={step > 3 ? css.stepperSusscessMobile : css.stepperCancelMobile}
                ></div>
                <div className={step > 3 ? css.stepSuccessMobile : css.stepCancelMobile}>
                  <img src="/assets/icons/completed-in-cart-red.svg" />
                  <div className={css.textMobile}>Giao hàng thành công</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  ) : (
    <div className={css.codeX}>
      <Modal
        title={
          <div className={css.heading}>
            <div className={css.code}>Đơn hàng #{data.code}</div>
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
        }
        onCancel={onClose}
        closeIcon={
          <img src="/assets/icons/closeModal.svg" style={{ marginBottom: '7px' }} alt="" />
        }
        visible={open}
        footer={null}
        width={900}
      >
        <div className={css.body}>
          <div className={clsx(css.products, data.orderItems.length > 8 ? css.scroll : '')}>
            {data.orderItems.map((edge, index) => {
              const totalPrice = edge.amount * edge.product.currentPrice;
              return (
                <div className={css.boxProduct} key={edge.id}>
                  <Badge count={edge.amount > 1 ? edge.amount : 0}>
                    <img src={pathAvatar(edge.product?.thumbnail)} alt={edge.product?.name} />
                  </Badge>
                  <Link href={`/shop/${edge.product?.slug}/${edge.product?.id}`}>
                    <a>
                      <div className={css.name}>{edge.product?.name}</div>
                    </a>
                  </Link>
                  <div className={css.price}>{totalPrice.toLocaleString('vi')} đ</div>
                </div>
              );
            })}
          </div>

          <div className={css.lineDotted}></div>

          <div className={css.detail}>
            <div className={css.left}>
              <table>
                <tbody>
                  <tr>
                    <td className={css.label}>Mã đơn hàng:</td>
                    <td className={css.value}>{data.code}</td>
                  </tr>
                  <tr>
                    <td className={css.label}>Người nhận hàng:</td>
                    <td className={css.value}>{data.name}</td>
                  </tr>
                  <tr>
                    <td className={css.label}>Thanh toán:</td>
                    <td className={css.value}>{data.paymentMethod}</td>
                  </tr>
                  <tr>
                    <td className={css.label}>Ngày tạo:</td>
                    <td className={css.value}>
                      {moment(data.createdAt).format('HH:mm DD/MM/YYYY')}
                    </td>
                  </tr>
                  <tr>
                    <td className={css.label}>Số điện thoại:</td>
                    <td className={css.value}>{data.phone}</td>
                  </tr>
                  <tr>
                    <td className={css.label}>Địa chỉ:</td>
                    <td className={css.value}>
                      {[data.address, data.ward?.name, data.district?.name, data.city?.name].join(
                        ', ',
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className={css.label}>Gói giao hàng:</td>
                    <td className={css.value}>
                      {data.carrier?.name} - {data.carrier.name}
                    </td>
                  </tr>
                  <tr>
                    <td className={css.label}>Ghi chú:</td>
                    <td className={css.value}>{data.description}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={css.right}>
              <div className={css.boxCost}>
                <div className={css.flexText}>
                  <div className={css.text}>Giá bán: </div>
                  <div className={css.price}>{totalProductPrice.toLocaleString('vi')} đ</div>
                </div>

                <div className={css.flexText}>
                  <div className={css.text}>Phí vận chuyển: </div>
                  <div className={css.price}>{data.carrier.fee.toLocaleString('vi')} đ</div>
                </div>

                {Boolean(discountPrice) && (
                  <div className={css.flexText}>
                    <div className={css.text}>Giảm giá: </div>
                    <div className={css.price}>{discountPrice.toLocaleString('vi')} đ</div>
                  </div>
                )}

                <div className={css.lineDotted}></div>

                <div className={css.flexText}>
                  <div className={css.text} style={{ fontWeight: 600 }}>
                    Tổng cộng:{' '}
                  </div>
                  <div className={css.price}>{data.price.toLocaleString('vi')} đ</div>
                </div>
              </div>
            </div>
          </div>

          <div className={css.lineDotted}></div>

          <div className={css.footer}>
            <div className={css.title}>Trạng thái đơn hàng</div>
            {step === 0 ? (
              <div className={css.process}>
                <div className={css.stepSuccess}>
                  <img src="/assets/icons/cancel.svg" />
                  <div className={css.text}>Đã hủy</div>
                  {data.reason && <div className={css.reason}>Lý do: {data.reason}</div>}
                </div>
              </div>
            ) : (
              <div className={css.process}>
                <div className={step < 1 ? css.stepCancel : css.stepSuccess}>
                  <img src="/assets/icons/cart-orange.svg" />
                  <div className={css.text}>Đang xác nhận</div>
                </div>
                <div className={step < 2 ? css.stepperCancel : css.stepperSusscess}></div>
                <div className={step < 2 ? css.stepCancel : css.stepSuccess}>
                  <img src="/assets/icons/box-orange.svg" />
                  <div className={css.text}>Đang chuẩn bị hàng</div>
                </div>
                <div className={step < 3 ? css.stepperCancel : css.stepperSusscess}></div>
                <div className={step < 3 ? css.stepCancel : css.stepSuccess}>
                  <img src="/assets/icons/transport-orange.svg" />
                  <div className={css.text}>Đang vận chuyển</div>
                </div>
                <div className={step > 3 ? css.stepperSusscess : css.stepperCancel}></div>
                <div className={step > 3 ? css.stepSuccess : css.stepCancel}>
                  <img src="/assets/icons/completed-in-cart-red.svg" />
                  <div className={css.text}>Giao hàng thành công</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalItemOrdered;
