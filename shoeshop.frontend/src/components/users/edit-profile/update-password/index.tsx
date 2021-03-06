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
import { useSelector } from 'react-redux';

interface Props {}

const UpdatePassword: React.FC<Props> = () => {
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
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
      formikHelpers.setSubmitting(true);
      // update password api
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
  newPassword: Yup.string().required('Trường Bắt Buộc').min(8, 'Mật khẩu không hợp lệ'),
  confirmNewPassword: Yup.string()
    .required('Trường Bắt Buộc')
    .oneOf([Yup.ref('newPassword')], 'Mật khẩu không khớp')
    .min(8, 'Mật khẩu không hợp lệ'),
});
