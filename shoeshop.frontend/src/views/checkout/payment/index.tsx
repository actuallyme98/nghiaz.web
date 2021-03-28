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

// enums
import { AppRouteEnums } from '../../../enums/app-route.enum';

interface IProps {}

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
  const [openDeliveryAddressModal, setOpenDeliveryAddressModal] = useState(false);
  const onOpenDeliveryAddressModal = useCallback(() => setOpenDeliveryAddressModal(true), []);
  const onCloseDeliveryAddressModal = useCallback(() => setOpenDeliveryAddressModal(false), []);

  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const profile = useSelector((store: RootState) => store.appState.profile);
  const cartline = useSelector((store: RootState) => store.appState.cartline);
  const addresses = useSelector((store: RootState) => store.appState.deliveryAddresses);
  const carriers = useSelector((store: RootState) => store.appState.carriers);

  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const route = useRouter();

  const cartItems = useMemo(() => (cartline?.cartItems || []).map((edge) => edge) || [], [
    cartline,
  ]);
  const deliveryAddresses = useMemo(
    () => addresses.map((e) => e).sort((a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0)),
    [addresses],
  );
  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + (item.product.currentPrice || 0) * item.amount, 0),
    [cartItems],
  );

  const shipFee = useMemo(() => carriers[selectedShipFee]?.fee || 0, [carriers]);
  const discount = useMemo(() => caculateDiscount(discountCode, totalPrice, shipFee), [
    discountCode,
    totalPrice,
    shipFee,
  ]);
  const totalAll = useMemo(() => Math.max(totalPrice + shipFee - discount, 0), [
    totalPrice,
    shipFee,
    discount,
  ]);

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
    try {
      route.push(AppRouteEnums.CHECKOUT_CART);
    } catch (err) {
      notification.error({
        message: String(err).replace(/Error: /g, ''),
        placement: 'bottomRight',
      });
    }
  }, []);

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

  const renderCaculateShipFee = useMemo(
    () =>
      carriers.map((ship, index) => (
        <div className={css.btnRadio} key={index}>
          <Radio value={ship.id} />
          <div className={css.fast}>
            <div className={css.name}>{ship.name}</div>
            <div className={css.deliveryDetails}>
              <div>Phí vận chuyển: {ship.fee.toLocaleString('vi-VN')} đ</div>
              {!isMobile && <div className={css.dash}>-</div>}
              <div>Dự kiến thời gian: {ship.description}</div>
            </div>
          </div>
        </div>
      )),
    [carriers],
  );

  return (
    <Layout loading={false} backUrl={AppRouteEnums.CHECKOUT_CART} title="Payment - ">
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
                      <Radio.Group onChange={handleChangeDelivery} value={selectedShipFee}>
                        {renderCaculateShipFee}
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
                disabled={!!deliveryAddressData}
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
