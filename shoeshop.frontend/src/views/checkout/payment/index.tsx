import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

// styles
import css from './style.module.scss';

// components
import Layout from '../../../components/layout';
import Stepper from '../../../components/stepper';
import Radio, { RadioChangeEvent } from 'antd/lib/radio';
import Link from 'next/dist/client/link';
import Button from 'antd/lib/button';
import AddDeliveryAddressModal from '../../../components/add-delivery';
import LoadingIcon from '../../../components/loading-icon';
import SelectField from '../../../components/select-field';
import PaymentCard from '../../../components/payments/payment-card';
import notification from 'antd/lib/notification';
import DeliveryAddressForm, {
  AddDeliveryFormValues,
} from '../../../components/payments/delivery-address-form';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';
import * as AppActions from '@actions/app-action';
import { initializeStore } from '@redux/with-redux';

// utils
import { caculateDiscount } from '@helpers/app-util';

interface IProps {}

// mocks
const carts: any[] = [];
const addresses: any[] = [];
const discountCode: {
  id?: number;
  code?: string;
  title?: string;
  start?: string;
  end?: string;
  isCoupon?: boolean;
  discountType?: string;
  amount?: number;
  percent?: number;
  maxAmount?: number;
  description?: string;
} = {
  amount: 10,
  percent: 10,
  maxAmount: 20,
};

const Payment: NextPage<IProps> = () => {
  const [selectedCarrier, setSelectedCarrier] = useState(0);
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState('');
  const [selectedShipFee, setSelectedShipFree] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('COD');
  const [deliveryAddressData, setDeliveryAddressData] = useState<AddDeliveryFormValues>();

  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const profile = useSelector((store: RootState) => store.appState.Profile);

  const cartItems = useMemo(() => carts.map((edge) => edge) || [], [carts]);

  const deliveryAddresses = useMemo(
    () => addresses.map((e) => e).sort((a, b) => (b.default ? 1 : 0) - (a.default ? 1 : 0)),
    [addresses],
  );

  const [openDeliveryAddressModal, setOpenDeliveryAddressModal] = useState(false);
  const onOpenDeliveryAddressModal = useCallback(() => setOpenDeliveryAddressModal(true), []);
  const onCloseDeliveryAddressModal = useCallback(() => setOpenDeliveryAddressModal(false), []);

  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const totalPrice = useMemo(
    () =>
      cartItems.reduce((sum, item) => sum + (item.product.currentPrice || 0) * item.quantity, 0),
    [cartItems],
  );
  const shipFee = 0;
  const discount = caculateDiscount(discountCode, totalPrice, shipFee);
  const totalAll = Math.max(totalPrice + shipFee - discount, 0);
  const handleChange = useCallback((event: RadioChangeEvent) => {
    setSelectedDeliveryAddress(event.target.value);
  }, []);

  const handleChangeDelivery = useCallback((event: RadioChangeEvent) => {
    setSelectedShipFree(event.target.value);
  }, []);

  const handleChangePayment = useCallback((event: RadioChangeEvent) => {
    setSelectedPaymentMethod(event.target.value);
  }, []);

  const handleConfirmOrder = useCallback(async () => {
    // pending
  }, []);

  // useEffect(() => {
  //   if (userData) {
  //     if (selectedDeliveryAddress) {
  //       if (cartItems.length > 0) {
  //         const delivery = deliveryAddresses.find((d) => d.id === selectedDeliveryAddress);
  //         if (delivery && delivery.address && delivery.address.district) {
  //           addCityToCart({
  //             variables: {
  //               cityId: delivery.address.city.id,
  //             },
  //           });
  //           caculateShipFee({
  //             variables: {
  //               toCityId: delivery.address.city.id,
  //               toDistrictId: delivery.address.district.id,
  //               products: cartItems.map((cart) => ({
  //                 id: cart.product.id,
  //                 quantity: cart.quantity,
  //               })),
  //             },
  //           });
  //         }
  //       }
  //     } else {
  //       if (deliveryAddresses.length > 0) {
  //         if (deliveryAddresses[0].address?.city.id) {
  //           addCityToCart({
  //             variables: {
  //               cityId: deliveryAddresses[0].address.city.id,
  //             },
  //           });
  //         }
  //         setSelectedDeliveryAddress(deliveryAddresses[0].id);
  //       }
  //     }
  //   } else {
  //     if (deliveryAddressData && cartItems.length > 0) {
  //       addCityToCart({
  //         variables: {
  //           cityId: deliveryAddressData.cityId,
  //         },
  //       });
  //       caculateShipFee({
  //         variables: {
  //           toCityId: deliveryAddressData.cityId,
  //           toDistrictId: deliveryAddressData.districtId,
  //           products: cartItems.map((cart) => ({ id: cart.product.id, quantity: cart.quantity })),
  //         },
  //       });
  //     }
  //   }
  // }, [
  //   deliveryAddresses,
  //   selectedDeliveryAddress,
  //   JSON.stringify(cartItems),
  //   deliveryAddressData,
  //   userData,
  //   caculateShipFee,
  //   addCityToCart,
  // ]);

  const renderDeliveryAddress = useMemo(
    () =>
      deliveryAddresses.map((deliveryAddress, index) => (
        <div key={index} className={css.addressDetails}>
          <div className={css.btnRadio}>
            <Radio value={deliveryAddress.id} />
            <div className={css.namePhoneNumber}>
              <div className={css.name}>
                {deliveryAddress.fullName}
                {isMobile && <div className={css.borderColNamePhone}>|</div>}
              </div>
              <div className={css.phoneNumber}>{deliveryAddress.phone}</div>
            </div>
          </div>
          <div className={css.addressDetailsRightName}>
            {[
              deliveryAddress.address?.address,
              deliveryAddress.address?.ward?.name,
              deliveryAddress.address?.district?.name,
              deliveryAddress.address?.city?.name,
            ].join(', ')}
          </div>
          {deliveryAddress.default ? <div className={css.default}>Mặc định</div> : ''}
        </div>
      )),
    [deliveryAddresses],
  );

  // useEffect(() => {
  //   if (caculateShipFeeData) {
  //     const x = caculateShipFeeData.caculateShipFee.find((c) => c.carrierId === selectedCarrier);
  //     if (x) {
  //       setSelectedShipFree(x.serviceId);
  //     }
  //   }
  // }, [caculateShipFeeData, selectedCarrier]);

  // const renderCaculateShipFee = useMemo(
  //   () =>
  //     caculateShipFeeData
  //       ? caculateShipFeeData.caculateShipFee
  //           .filter((c) => c.carrierId === selectedCarrier)
  //           .map((ship) => (
  //             <div className={css.btnRadio} key={ship.serviceId}>
  //               <Radio value={ship.serviceId} />
  //               <div className={css.fast}>
  //                 <div className={css.name}>{ship.serviceName}</div>
  //                 <div className={css.deliveryDetails}>
  //                   <div>Phí vận chuyển: {ship.totalFee.toLocaleString('vi-VN')} đ</div>
  //                   {!isMobile && <div className={css.dash}>-</div>}
  //                   <div>Dự kiến thời gian: {ship.serviceDescription}</div>
  //                 </div>
  //               </div>
  //             </div>
  //           ))
  //       : [],
  //   [caculateShipFeeData, selectedCarrier],
  // );

  return (
    <Layout loading={false}>
      <div className={!isMobile ? css.background : ''}>
        <div className={isMobile ? css.contentMobile : css.contentDesktop}>
          {!isMobile && <Stepper step={2} className={css.stepper} />}
          {!isMobile && (
            <div className={css.haveAccDesktop}>
              Bạn đã có tài khoản?{' '}
              <Link href="/signin">
                <a className={css.loginNow}>Đăng nhập ngay</a>
              </Link>
            </div>
          )}
          <div className={css.wrap}>
            <div className={css.col1}>
              {isMobile && (
                <div className={css.payMobile}>
                  <img
                    src="/assets/checkout/logo-payment-mobile.svg"
                    className={css.imgPayMoblile}
                  />
                  <div className={css.payMobileText}>Thanh toán</div>
                </div>
              )}
              {profile ? (
                <div className={css.address}>
                  <div className={css.addressShipAdd}>
                    <div className={css.shippingAddress}>
                      <div className={css.imgTitle}>
                        <img src="/assets/checkout/pin-3.svg" className={css.shippingAddressImg} />
                        <div className={css.shippingAddressText}>ĐỊA CHỈ NHẬN HÀNG</div>
                      </div>
                      <Link href="/user/delivery-address">
                        <a className={css.change}>Thay đổi</a>
                      </Link>
                    </div>

                    <div
                      className={css.onOpenDeliveryAddressModal}
                      onClick={onOpenDeliveryAddressModal}
                    >
                      + THÊM ĐỊA CHỈ MỚI
                    </div>

                    <AddDeliveryAddressModal
                      open={openDeliveryAddressModal}
                      onClose={onCloseDeliveryAddressModal}
                    />
                  </div>
                  <Radio.Group onChange={handleChange} value={selectedDeliveryAddress}>
                    {renderDeliveryAddress}
                  </Radio.Group>
                </div>
              ) : (
                <div className={css.address}>
                  <div className={css.addressShipAdd}>
                    <div className={css.shippingAddress}>
                      <div className={css.imgTitle}>
                        <img src="/assets/checkout/pin-3.svg" className={css.shippingAddressImg} />
                        <div className={css.shippingAddressText}>ĐỊA CHỈ NHẬN HÀNG</div>
                      </div>
                    </div>
                  </div>
                  <DeliveryAddressForm onSave={setDeliveryAddressData} />
                </div>
              )}

              <div className={css.deliveryMethods}>
                <div className={css.titleDeliveryMethods}>
                  <img
                    src="/assets/checkout/delivery-fast.svg"
                    className={css.deliveryMethodsImg}
                  />
                  <div className={css.deliveryMethodsText}>PHƯƠNG THỨC GIAO HÀNG</div>
                </div>
              </div>

              <div className={css.paymentMethods}>
                <div className={css.titlePaymentMethods}>
                  <img src="/assets/checkout/credit-card.svg" className={css.paymentMethodsImg} />
                  <div className={css.paymentMethodsText}>PHƯƠNG THỨC THANH TOÁN</div>
                </div>
                <div className={css.methods}>
                  <Radio.Group onChange={handleChangePayment} value={selectedPaymentMethod}>
                    <div className={css.btnRadio}>
                      <Radio value="COD" />
                      <div className={css.nameMethods}>
                        Thanh toán bằng tiền mặt khi nhận hàng (COD)
                      </div>
                    </div>
                    <div className={css.btnRadio}>
                      <Radio value="Online" />
                      <div className={css.nameMethods}>Thanh toán qua VNPAY</div>
                    </div>
                  </Radio.Group>
                </div>
              </div>

              <div className={css.orderNotes}>
                <div className={css.titleOrderNotes}>
                  <img src="/assets/checkout/single-content-03.svg" className={css.OrderNotesImg} />
                  <div className={css.OrderNotesText}>
                    Ghi chú cho đơn hàng{' '}
                    <span className={isMobile ? css.ifOrderNotesText : ''}>(nếu có)</span>{' '}
                  </div>
                </div>
                <textarea
                  placeholder="Nhập ghi chú…"
                  className={css.inputTextOrderNotes}
                  ref={descriptionRef}
                />
              </div>
            </div>
            <div className={css.col2}>
              <PaymentCard
                data={{
                  buyMore: totalAll,
                  discount: discount,
                  totalMoney: totalPrice,
                  shipFee: shipFee,
                }}
                // voucher={cart?.discountCode}
              />
              <Button
                type="ghost"
                className={css.pay}
                onClick={handleConfirmOrder}
                loading={false}
                disabled={false}
              >
                XÁC NHẬN THANH TOÁN
              </Button>
            </div>
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
      title: 'Payment - ',
      initialReduxState: reduxStore.getState(),
    },
  };
};

export default Payment;
