import React, { useCallback } from 'react';

// formik
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';

// components
import SubmitButton from '../submit-button';
import InputField from '../input-field';
import notification from 'antd/lib/notification';
import Modal from 'antd/lib/modal';
import SelectField from '../select-field';
import CheckboxField from '../checkbox-field';

// styles
import css from './style.module.scss';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

// mocks
const cities: any[] = [];
const districts: any[] = [];
const wards: any[] = [];
const loadingCities = false;
const loadingCity = false;
const loadingDistrict = false;

const AddDeliveryAddressModal: React.FC<Props> = (props) => {
  const { open, onClose, ...others } = props;
  return (
    <div className={css.updatePassword}>
      <Modal
        title={<div className={css.titleModal}>Thêm 1 địa chỉ mới</div>}
        closeIcon={<img src="/assets/icons/close-modal-daddress.svg" alt="" />}
        visible={open}
        onCancel={onClose}
        destroyOnClose
        footer={null}
        width={426}
        centered
      >
        <AddDeliveryAddressModalContent onClose={onClose} {...others} />
      </Modal>
    </div>
  );
};

const AddDeliveryAddressModalContent: React.FC<Omit<Props, 'open'>> = (props) => {
  const { onClose, onSuccess } = props;

  const onSelectCity = useCallback(
    (cityId: string) => {
      const city = cities.find((city) => city.id === cityId);
      if (city) {
        // query get city
      }
    },
    [cities],
  );
  const onSelectDistrict = useCallback((districtId: number) => {
    const district = districts.find((district) => district.id === String(districtId));
    if (district) {
      // query get district
    }
  }, []);
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);

  const addDeliveryFormSubmit = useCallback(
    async (values: AddDeliveryFormValues, formikHelpers: FormikHelpers<AddDeliveryFormValues>) => {
      // Trim value
      Object.keys(values).forEach((key) => {
        const v = (values as any)[key];
        if (typeof v === 'string') {
          (values as any)[key] = v.trim();
        }
      });
      formikHelpers.setValues(values);
      // Revalidate
      const validateFormResult: any = await formikHelpers.validateForm();
      if (Object.keys(validateFormResult).some((key) => validateFormResult[key])) {
        return;
      }
      formikHelpers.setSubmitting(true);
      // pending
      formikHelpers.setSubmitting(false);
      onClose();
    },
    [onSuccess],
  );
  return (
    <Formik<AddDeliveryFormValues>
      initialValues={{
        name: '',
        phone: '',
        street: '',
        city: '',
        district: '',
        ward: '',
        isDefault: false,
      }}
      validationSchema={validateAddDeliverySchema}
      onSubmit={addDeliveryFormSubmit}
    >
      {({ handleSubmit, isValid, isSubmitting, dirty, values: formikValues }) => (
        <Form>
          <div className={css.formField}>
            <Field name="name">
              {({ field, form, meta }: FieldProps) => (
                <InputField
                  label="Tên"
                  input={{ ...field, type: 'name' }}
                  error={meta.touched && meta.error}
                  classes={{ input: css.inputFieldInput }}
                />
              )}
            </Field>
          </div>
          <div className={css.formField}>
            <Field name="phone">
              {({ field, form, meta }: FieldProps) => (
                <InputField
                  label="Số điện thoại"
                  input={{ ...field, type: 'phone' }}
                  error={meta.touched && meta.error}
                  classes={{ input: css.inputFieldInput }}
                />
              )}
            </Field>
          </div>
          <div className={css.formField}>
            <Field name="city">
              {({ field, form, meta }: FieldProps) => (
                <SelectField
                  label="Tỉnh/ Thành Phố"
                  selectItems={cities.map((c) => ({ label: c.name, value: c.id })) || []}
                  input={{
                    ...field,
                    value: loadingCities ? 'Đang tải' : field.value,
                    disabled: loadingCities,
                    onChange: (value: string) => {
                      form.setFieldValue(field.name, value);
                      form.setFieldValue('district', '');
                      form.setFieldValue('ward', '');
                      onSelectCity(value);
                    },
                    loading: loadingCities,
                  }}
                  error={meta.touched && meta.error}
                  classes={{ select: css.inputFieldInput }}
                />
              )}
            </Field>
          </div>
          <div className={css.formField}>
            <Field name="district">
              {({ field, form, meta }: FieldProps) => (
                <SelectField
                  label="Quận/ Huyện"
                  selectItems={
                    (formikValues.city && districts.map((d) => ({ label: d.name, value: d.id }))) ||
                    []
                  }
                  input={{
                    ...field,
                    value: loadingCity ? 'Đang tải' : field.value,
                    disabled: loadingCity,
                    onChange: (value: string) => {
                      form.setFieldValue(field.name, value);
                      form.setFieldValue('ward', '');
                      onSelectDistrict(parseInt(value));
                    },
                    loading: loadingCity,
                  }}
                  error={meta.touched && meta.error}
                  classes={{ select: css.inputFieldInput }}
                />
              )}
            </Field>
          </div>
          <div className={css.formField}>
            <Field name="ward">
              {({ field, form, meta }: FieldProps) => (
                <SelectField
                  label="Phường/Xã"
                  selectItems={
                    (formikValues.district &&
                      !loadingDistrict &&
                      wards.map((w) => ({ label: w.name, value: w.id }))) ||
                    []
                  }
                  input={{
                    ...field,
                    value: loadingDistrict ? 'Đang tải' : field.value,
                    disabled: loadingDistrict,
                    onChange: (value: string) => {
                      form.setFieldValue(field.name, value);
                    },
                    loading: loadingDistrict,
                  }}
                  error={meta.touched && meta.error}
                  classes={{ select: css.inputFieldInput }}
                />
              )}
            </Field>
          </div>
          <div className={css.formField}>
            <Field name="street">
              {({ field, form, meta }: FieldProps) => (
                <InputField
                  label="Tòa nhà, tên đường..."
                  input={{ ...field, type: 'street' }}
                  error={meta.touched && meta.error}
                  classes={{ input: css.inputFieldInput }}
                />
              )}
            </Field>
          </div>
          <div className={css.formField}>
            <Field name="isDefault">
              {({ field, form, meta }: FieldProps) => (
                <CheckboxField
                  label="Đặt làm địa chỉ mặc định"
                  input={{ ...field, checked: field.value }}
                />
              )}
            </Field>
          </div>

          <SubmitButton
            disabled={!isValid || isSubmitting || !dirty}
            onClick={handleSubmit as any}
            className={isMobile ? css.updateBtnMobile : css.updateBtn}
            loading={isSubmitting}
          >
            HOÀN THÀNH
          </SubmitButton>
        </Form>
      )}
    </Formik>
  );
};

export default AddDeliveryAddressModal;

interface AddDeliveryFormValues {
  name: string;
  phone: string;
  city: string;
  district: string;
  ward: string;
  street: string;
  isDefault: boolean;
}

const validateAddDeliverySchema = Yup.object().shape({
  name: Yup.string().required('Trường Bắt Buộc').max(255, 'Tối đa 255 ký tự'),
  phone: Yup.string().required('Trường Bắt Buộc').matches(/\d+/, 'Sai dịnh dạng'),
  street: Yup.string().required('Trường Bắt Buộc').max(255, 'Tối đa 255 ký tự'),
  city: Yup.string().required('Trường Bắt Buộc'),
  district: Yup.string().required('Trường Bắt Buộc'),
  ward: Yup.string().required('Trường Bắt Buộc'),
  isDefault: Yup.boolean(),
});

export interface SelectItem {
  value: string;
  label: string;
}
