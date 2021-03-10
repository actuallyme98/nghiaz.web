import React, { useCallback, useState } from 'react';
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';

// styles
import css from './style.module.scss';

// components
import SubmitButton from '../../../components/submit-button';
import InputField from '../../../components/input-field';
import SelectField from '../../../components/select-field';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';

interface Props {
  onSave: (values: AddDeliveryFormValues) => void;
}

// mocks
const cities: any[] = [];
const districts: any[] = [];
const wards: any[] = [];
const loadingCities = false;
const loadingCity = false;
const loadingDistrict = false;

const DeliveryAddressForm: React.FC<Props> = (props) => {
  const { onSave } = props;
  const [initValues, setInitValues] = useState<AddDeliveryFormValues>({
    name: '',
    phone: '',
    address: '',
    cityId: '',
    districtId: '',
    wardId: '',
  });

  const onSelectCity = useCallback(
    (cityId: string) => {
      const city = cities.find((city) => city.id === cityId);
      if (city) {
        // startGetCity({
        //   variables: {
        //     pk: city.id,
        //   },
        // });
      }
    },
    [cities],
  );
  const onSelectDistrict = useCallback((districtId: number) => {
    const district = districts.find((district) => district.id === String(districtId));
    if (district) {
      // startGetDistrict({
      //   variables: {
      //     pk: district.id,
      //   },
      // });
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
      setInitValues(values);
      onSave(values);
    },
    [onSave],
  );
  return (
    <Formik<AddDeliveryFormValues>
      initialValues={initValues}
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
            <Field name="cityId">
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
                      form.setFieldValue('districtId', '');
                      form.setFieldValue('wardId', '');
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
            <Field name="districtId">
              {({ field, form, meta }: FieldProps) => (
                <SelectField
                  label="Quận/ Huyện"
                  selectItems={
                    (formikValues.cityId &&
                      districts.map((d) => ({ label: d.name, value: d.id }))) ||
                    []
                  }
                  input={{
                    ...field,
                    value: loadingCity ? 'Đang tải' : field.value,
                    disabled: loadingCity,
                    onChange: (value: string) => {
                      form.setFieldValue(field.name, value);
                      form.setFieldValue('wardId', '');
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
            <Field name="wardId">
              {({ field, form, meta }: FieldProps) => (
                <SelectField
                  label="Phường/Xã"
                  selectItems={
                    (formikValues.districtId &&
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
            <Field name="address">
              {({ field, form, meta }: FieldProps) => (
                <InputField
                  label="Tòa nhà, tên đường..."
                  input={{ ...field }}
                  error={meta.touched && meta.error}
                  classes={{ input: css.inputFieldInput }}
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
            Xác nhận
          </SubmitButton>
        </Form>
      )}
    </Formik>
  );
};

export default DeliveryAddressForm;

export interface AddDeliveryFormValues {
  name: string;
  phone: string;
  cityId: string;
  districtId: string;
  wardId: string;
  address: string;
}

const validateAddDeliverySchema = Yup.object().shape({
  name: Yup.string().required('Trường Bắt Buộc').max(255, 'Tối đa 255 ký tự'),
  phone: Yup.string().required('Trường Bắt Buộc').matches(/\d+/, 'Sai dịnh dạng'),
  address: Yup.string().required('Trường Bắt Buộc').max(255, 'Tối đa 255 ký tự'),
  cityId: Yup.string().required('Trường Bắt Buộc'),
  districtId: Yup.string().required('Trường Bắt Buộc'),
  wardId: Yup.string().required('Trường Bắt Buộc'),
});

export interface SelectItem {
  value: string;
  label: string;
}
