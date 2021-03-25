import React, { useCallback, useMemo } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../redux/stores/configure-store';
import * as AppActions from '@actions/app-action';

interface Props {
  profile: REDUX_STORE.Profile;
}

const UpdateInfo: React.FC<Props> = ({ profile }) => {
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const dispatch = useDispatch();

  const initialValues = useMemo(() => {
    const { firstName, lastName, username, email, client } = profile;
    return {
      firstName: firstName || '',
      lastName: lastName || '',
      phoneNumber: username || '',
      email: email?.trim() || '',
      birthday: client?.dob?.trim() ? moment(client?.dob.trim()).toDate() : new Date(),
      gender: client?.gender.trim() || 'UNDEFINED',
    };
  }, [profile]);

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
      try {
        formikHelpers.setSubmitting(true);
        if (profile) {
          await dispatch(
            AppActions.updateUserInfoAction({
              id: profile.client.id,
              ...values,
              dob: moment(values.birthday).format('YYYY-MM-DD HH:mm'),
            }),
          );
        }
        formikHelpers.setSubmitting(false);
        notification.success({
          message: 'Cập nhật thông tin thành công',
          placement: 'bottomRight',
        });
      } catch (err) {
        notification.error({
          message: String(err).replace(/Error: /g, ''),
          placement: 'bottomRight',
        });
      }
    },
    [],
  );

  return (
    <div className={css.updateInfo}>
      <Formik<UpdateProfileFormValues>
        initialValues={initialValues}
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
              loading={isSubmitting}
              onClick={handleSubmit}
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
