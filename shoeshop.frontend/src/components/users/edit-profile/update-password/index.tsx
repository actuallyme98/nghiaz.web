// React, Next
import React, { useCallback } from 'react';

// formik
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';

// styles
import css from './style.module.scss';

// components
import SubmitButton from '../../../../components/submit-button';
import InputField from '../../../../components/input-field';
import notification from 'antd/lib/notification';

// redux
import { RootState } from '../../../../redux/stores/configure-store';
import { useSelector, useDispatch } from 'react-redux';
import * as AppActions from '@actions/app-action';

interface Props {}

const UpdatePassword: React.FC<Props> = () => {
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const dispatch = useDispatch();

  const updatePasswordSubmit = useCallback(
    async (
      values: UpdatePasswordFormValues,
      formikHelpers: FormikHelpers<UpdatePasswordFormValues>,
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
        const { oldPassword, newPassword } = values;
        formikHelpers.setSubmitting(true);
        await dispatch(AppActions.updatePasswordAction({ oldPassword, newPassword }));
        notification.success({
          message: 'Mật khẩu đã được thay đổi',
          placement: 'bottomRight',
        });
      } catch (err) {
        notification.error({
          message: String(err).replace(/Error: /g, ''),
          placement: 'bottomRight',
        });
      }
      formikHelpers.setValues({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
      formikHelpers.setSubmitting(false);
    },
    [],
  );

  return (
    <div className={css.updatePassword}>
      <Formik<UpdatePasswordFormValues>
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        }}
        validationSchema={validateUpdatePasswordSchema}
        onSubmit={updatePasswordSubmit}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form>
            <div className={css.formField}>
              <Field name="oldPassword">
                {({ field, form, meta }: FieldProps) => (
                  <InputField
                    label="Mật khẩu cũ"
                    input={{ ...field, type: 'password' }}
                    error={meta.touched && meta.error}
                    classes={{ input: css.inputFieldInput }}
                  />
                )}
              </Field>
            </div>
            <div className={css.formField}>
              <Field name="newPassword">
                {({ field, form, meta }: FieldProps) => (
                  <InputField
                    label="Mật khẩu mới"
                    input={{ ...field, type: 'password' }}
                    error={meta.touched && meta.error}
                    classes={{ input: css.inputFieldInput }}
                  />
                )}
              </Field>
            </div>
            <div className={css.formField}>
              <Field name="confirmNewPassword">
                {({ field, form, meta }: FieldProps) => (
                  <InputField
                    label="Xác nhận mật khẩu"
                    input={{ ...field, type: 'password' }}
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
            >
              CẬP NHẬT MẬT KHẨU
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdatePassword;

interface UpdatePasswordFormValues {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const validateUpdatePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Trường Bắt Buộc'),
  newPassword: Yup.string().required('Trường Bắt Buộc').min(6, 'Mật khẩu không hợp lệ'),
  confirmNewPassword: Yup.string()
    .required('Trường Bắt Buộc')
    .oneOf([Yup.ref('newPassword')], 'Mật khẩu không khớp')
    .min(6, 'Mật khẩu không hợp lệ'),
});
