import React, { useCallback } from 'react';
import moment from 'moment';

// formiks
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';

// styles
import css from './style.module.scss';

// components
import SubmitButton from '../../../../components/submit-button';
import InputField from '../../../../components/input-field';
import DatePickerField from '../../../../components/date-picker-field';
import SelectField from '../../../../components/select-field';
import notification from 'antd/lib/notification';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/stores/configure-store';

interface Props {}

const UpdateInfo: React.FC<Props> = () => {
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const profile = useSelector((store: RootState) => store.appState.Profile);

  const updateProfileSubmit = useCallback(
    async (
      values: UpdateProfileFormValues,
      formikHelpers: FormikHelpers<UpdateProfileFormValues>,
    ) => {
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
      // update Profile

      formikHelpers.setSubmitting(false);
    },
    [],
  );

  return (
    <div className={css.updateInfo}>
      <Formik<UpdateProfileFormValues>
        initialValues={{
          firstName: '',
          lastName: '',
          phoneNumber: '',
          email: '',
          birthday: new Date(),
          gender: 'UNDEFINED',
        }}
        validationSchema={validateUpdateProfileSchema}
        onSubmit={updateProfileSubmit}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form>
            <div className={css.formField}>
              <Field name="lastName">
                {({ field, form, meta }: FieldProps) => (
                  <InputField
                    label="Họ"
                    input={{ ...field }}
                    error={meta.touched && meta.error}
                    classes={{ input: css.inputFieldInput }}
                  />
                )}
              </Field>
            </div>
            <div className={css.formField}>
              <Field name="firstName">
                {({ field, form, meta }: FieldProps) => (
                  <InputField
                    label="Tên"
                    input={{ ...field }}
                    error={meta.touched && meta.error}
                    classes={{ input: css.inputFieldInput }}
                  />
                )}
              </Field>
            </div>
            <div className={css.formField}>
              <Field name="phoneNumber">
                {({ field, form, meta }: FieldProps) => (
                  <InputField
                    label="Số điện thoại"
                    input={{ ...field }}
                    error={meta.touched && meta.error}
                    classes={{ input: css.inputFieldInput }}
                  />
                )}
              </Field>
            </div>
            <div className={css.formField}>
              <Field name="email">
                {({ field, form, meta }: FieldProps) => (
                  <InputField
                    label="Email"
                    input={{ ...field }}
                    error={meta.touched && meta.error}
                    classes={{ input: css.inputFieldInput }}
                  />
                )}
              </Field>
            </div>
            <div className={css.formField}>
              <Field name="birthday">
                {({ field, form, meta }: FieldProps) => (
                  <DatePickerField
                    label="Ngày sinh"
                    input={{
                      ...field,
                      onChange: (date: any) => form.setFieldValue(field.name, date),
                    }}
                    error={meta.touched && meta.error}
                    classes={{ picker: css.inputFieldInput }}
                  />
                )}
              </Field>
            </div>
            <div className={css.formField}>
              <Field name="gender">
                {({ field, form, meta }: FieldProps) => (
                  <SelectField
                    label="Giới tính"
                    selectItems={genderSelectItems}
                    input={{
                      ...field,
                      onChange: (value: string) => form.setFieldValue(field.name, value),
                    }}
                    error={meta.touched && meta.error}
                    classes={{ select: css.inputFieldInput }}
                  />
                )}
              </Field>
            </div>
            <SubmitButton
              disabled={!isValid || isSubmitting || !dirty}
              onClick={handleSubmit as any}
              className={isMobile ? css.updateBtnMobile : css.updateBtn}
            >
              CẬP NHẬT THÔNG TIN
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateInfo;

interface UpdateProfileFormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  birthday: Date;
  gender: string;
}

const today = new Date();
const oneHundredYearsAgo = moment().subtract(100, 'years').toDate();
const validateUpdateProfileSchema = Yup.object().shape({
  firstName: Yup.string().required('Trường Bắt Buộc'),
  lastName: Yup.string().required('Trường Bắt Buộc'),
  phoneNumber: Yup.string().required('Trường Bắt Buộc'),
  email: Yup.string().required('Trường Bắt Buộc').email('Email không hợp lệ'),
  birthday: Yup.date()
    .required('Trường Bắt Buộc')
    .min(oneHundredYearsAgo, 'Ngày sinh không hợp lệ')
    .max(today, 'Ngày sinh không hợp lệ'),
  gender: Yup.string().required('Trường Bắt Buộc'),
});

const genderSelectItems = [
  { label: 'Không công khai', value: 'UNDEFINED' },
  { label: 'Nam', value: 'MAN' },
  { label: 'Nữ', value: 'WOMAN' },
];
