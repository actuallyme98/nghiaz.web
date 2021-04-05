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
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';
import * as AppActions from '@actions/app-action';
import { initializeStore } from '@redux/with-redux';

// utils
import { caculateDiscount } from '@helpers/app-util';

// enums
import { AppRouteEnums } from '../../../enums/app-route.enum';
import { getKeyCategory } from '~/helpers/local-storage-util';

interface IProps {}

const Payment: NextPage<IProps> = () => {
  const [selectedCarrier, setSelectedCarrier] = useState(1);
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('COD');
  const [deliveryAddressData, setDeliveryAddressData] = useState<AddDeliveryFormValues>();
  const [openDeliveryAddressModal, setOpenDeliveryAddressModal] = useState(false);
  const onOpenDeliveryAddressModal = useCallback(() => setOpenDeliveryAddressModal(true), []);
  const onCloseDeliveryAddressModal = useCallback(() => setOpenDeliveryAddressModal(false), []);

  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const profile = useSelector((store: RootState) => store.appState.profile);
  const cartline = useSelector((store: RootState) => store.appState.cartline);
  const addresses = useSelector((store: RootState) => store.appState.deliveryAddresses);
  const carriers = useSelector((store: RootState) => store.appState.carriers);
  const orderPending = useSelector((store: RootState) => AppActions.createOrder.isPending(store));

  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const route = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AppActions.listCarriersAction());
  }, []);

  useEffect(() => {
    if (profile) {
      dispatch(AppActions.listDeliveryAddressAction());
    }
  }, [profile]);

  useEffect(() => {
    if (addresses) {
      const addressDefault = addresses.find((x) => x.isDefault === 1);
      if (addressDefault) {
        setDeliveryAddressData({
          address: addressDefault.address,
          cityId: addressDefault.city.code,
          districtId: addressDefault.district.code,
          wardId: addressDefault.ward.code,
          name: addressDefault.fullName,
          phone: addressDefault.phone,
        });
      }
    }
  }, [profile, addresses]);

  const cartItems = useMemo(() => (cartline?.cartItems || []).map((edge) => edge) || [], [
    cartline,
  ]);
  const deliveryAddresses = useMemo(
    () => addresses.map((e) => e).sort((a, b) => b.isDefault - a.isDefault),
    [addresses],
  );

  const shipCarrier = useMemo(() => carriers.find((x) => x.id === selectedCarrier), [carriers]);

  // prices
  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) =>
          sum + (item.product.discountPrice || item.product.currentPrice || 0) * item.amount,
        0,
      ),
    [cartItems],
  );
  const shipFee = useMemo(() => shipCarrier?.fee || 0, [shipCarrier]);
  const discount = useMemo(
    () => caculateDiscount(totalPrice, cartline?.voucherCode?.voucher, shipFee),
    [cartline, totalPrice, shipFee],
  );
  const totalAll = useMemo(() => totalPrice - discount + shipFee, [totalPrice, discount, shipFee]);

  const handleChange = useCallback((event: RadioChangeEvent) => {
    setSelectedDeliveryAddress(event.target.value);
  }, []);

  const handleChangeCarrier = useCallback((event: RadioChangeEvent) => {
    setSelectedCarrier(event.target.value);
  }, []);

  const handleChangePayment = useCallback((event: RadioChangeEvent) => {
    setSelectedPaymentMethod(event.target.value);
  }, []);

  const handleConfirmOrder = useCallback(async () => {
    try {
      if (!deliveryAddressData || !shipCarrier) {
        return;
      }
      const { name, cityId, districtId, address, phone, wardId } = deliveryAddressData;
      const orderItems = cartItems.map((item) => ({
        productId: item.product.id,
        amount: item.amount,
        color: item.color.id,
        size: item.size.id,
      }));

      const response: REDUX_STORE.IOrder | undefined = await dispatch(
        AppActions.createOrder({
          name,
          phone,
          cityId: cityId,
          districtId: districtId,
          wardId: wardId,
          address,
          discountPrice: discount,
          status: 'CONFIRMING',
          carrierId: shipCarrier.id,
          clientId: profile?.client.id || getKeyCategory(),
          description: descriptionRef.current?.value || '',
          reason: '',
          paymentMethod: selectedPaymentMethod,
          price: totalAll,
          orderItems,
        }),
      );
      if (!response) {
        return route.push(AppRouteEnums.HOME);
      }
      route.push(`${AppRouteEnums.CHECKOUT_ORDER}/${response.code}`);
    } catch (err) {
      notification.error({
        message: String(err).replace(/Error: /g, ''),
        placement: 'bottomRight',
      });
    }
  }, [
    deliveryAddressData,
    selectedCarrier,
    selectedPaymentMethod,
    totalPrice,
    shipCarrier,
    descriptionRef,
    cartItems,
    discount,
    totalAll,
  ]);

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
              deliveryAddress.address,
              deliveryAddress.ward?.name,
              deliveryAddress.district?.name,
              deliveryAddress.city?.name,
            ].join(', ')}
          </div>
          {deliveryAddress.isDefault ? <div className={css.default}>Mặc định</div> : ''}
        </div>
      )),
    [deliveryAddresses],
  );

  const renderCarriers = useMemo(
    () =>
      carriers.map((carrier, index) => (
        <div className={css.btnRadio} key={index}>
          <Radio value={carrier.id} />
          <div className={css.fast}>
            <div className={css.name}>{carrier.name}</div>
            <div className={css.deliveryDetails}>
              <div>Phí vận chuyển: {carrier.fee.toLocaleString('vi-VN')} đ</div>
              {!isMobile && <div className={css.dash}>-</div>}
              <div>Dự kiến thời gian: {carrier.description}</div>
            </div>
          </div>
        </div>
      )),
    [carriers],
  );

  return (
    <Layout loading={false} backUrl={AppRouteEnums.CHECKOUT_CART} title="Thanh toán">
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
                {false ? (
                  <div className={css.center}>
                    <LoadingIcon />
                  </div>
                ) : carriers.length > 0 ? (
                  <>
                    <SelectField
                      label=""
                      selectItems={carriers.map((c) => ({
                        label: c.name,
                        value: String(c.id),
                      }))}
                      input={{
                        value: String(selectedCarrier),
                        onChange: (value) => setSelectedCarrier(Number(value)),
                      }}
                    />
                    <div className={css.methods}>
                      <Radio.Group onChange={handleChangeCarrier} value={selectedCarrier}>
                        {renderCarriers}
                      </Radio.Group>
                    </div>
                  </>
                ) : (
                  <div>
                    {!profile && !deliveryAddressData
                      ? 'Bạn chưa nhập địa chỉ giao hàng'
                      : 'Không tìm thấy phương thức giao hàng'}
                  </div>
                )}
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
                    {/* <div className={css.btnRadio}>
                      <Radio value="Online" />
                      <div className={css.nameMethods}>Thanh toán qua VNPAY</div>
                    </div> */}
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
                  cartId: cartline?.id,
                  discount,
                  totalPrice,
                  totalMoney: totalAll,
                  shipFee: shipFee,
                }}
                voucherCode={cartline?.voucherCode}
              />
              <Button
                type="ghost"
                className={css.pay}
                onClick={handleConfirmOrder}
                loading={false}
                disabled={
                  !deliveryAddressData || !shipCarrier || orderPending || cartItems.length === 0
                }
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
      initialReduxState: reduxStore.getState(),
    },
  };
};

export default Payment;
