import React, { useCallback, useState, useEffect } from 'react';
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';

// styles
import css from './style.module.scss';

// components
import SubmitButton from '../../../components/submit-button';
import InputField from '../../../components/input-field';
import SelectField from '../../../components/select-field';

// redux
import * as AppActions from '@actions/app-action';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';

// types
import { GCity, GDistrict, GWard } from '../../../types/gtypes';

interface Props {
  onSave: (values: AddDeliveryFormValues) => void;
}

const DeliveryAddressForm: React.FC<Props> = (props) => {
  const { onSave } = props;
  const [initValues, setInitValues] = useState<AddDeliveryFormValues>({
    name: '',
    phone: '',
    address: '',
    cityId: '' as any,
    districtId: '' as any,
    wardId: '' as any,
  });
  const [cities, setCities] = useState<GCity[]>([]);
  const [districts, setDistricts] = useState<GDistrict[]>([]);
  const [wards, setWards] = useState<GWard[]>([]);

  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const loadingCities = useSelector((store: RootState) =>
    AppActions.listCitiesAction.isPending(store),
  );
  const loadingCity = useSelector((store: RootState) =>
    AppActions.listDistrictsAction.isPending(store),
  );
  const loadingDistrict = useSelector((store: RootState) =>
    AppActions.listWardsAction.isPending(store),
  );

  const dispatch = useDispatch();

  const loadCities = useCallback(async () => {
    try {
      const response = await dispatch(AppActions.listCitiesAction());
      setCities(response.data);
    } catch (err) {
      //
    }
  }, []);

  useEffect(() => {
    loadCities();
  }, []);

  const onSelectCity = useCallback(async (cityId: string) => {
    try {
      const response = await dispatch(AppActions.listDistrictsAction(parseInt(cityId)));
      setDistricts(response.data);
    } catch (err) {
      //
    }
  }, []);
  const onSelectDistrict = useCallback(async (districtId: string) => {
    try {
      const response = await dispatch(AppActions.listWardsAction(parseInt(districtId)));
      setWards(response.data);
    } catch (err) {
      //
    }
  }, []);

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
                  selectItems={cities.map((c) => ({ label: c.name, value: String(c.code) })) || []}
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
                      districts.map((d) => ({ label: d.name, value: String(d.code) }))) ||
                    []
                  }
                  input={{
                    ...field,
                    value: loadingCity ? 'Đang tải' : field.value,
                    disabled: loadingCity,
                    onChange: (value: string) => {
                      form.setFieldValue(field.name, value);
                      form.setFieldValue('wardId', '');
                      onSelectDistrict(value);
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
                      wards.map((w) => ({ label: w.name, value: String(w.code) }))) ||
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
  id?: number;
  name: string;
  phone: string;
  cityId: number;
  districtId: number;
  wardId: number;
  address: string;
}

const validateAddDeliverySchema = Yup.object().shape({
  name: Yup.string().required('Trường Bắt Buộc').max(255, 'Tối đa 255 ký tự'),
  phone: Yup.string().required('Trường Bắt Buộc').matches(/\d+/, 'Sai dịnh dạng'),
  address: Yup.string().required('Trường Bắt Buộc').max(255, 'Tối đa 255 ký tự'),
  cityId: Yup.number().required('Trường Bắt Buộc'),
  districtId: Yup.number().required('Trường Bắt Buộc'),
  wardId: Yup.number().required('Trường Bắt Buộc'),
});

export interface SelectItem {
  value: string;
  label: string;
}
