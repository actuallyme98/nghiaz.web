import React, { useCallback } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

// formik
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';

// styles
import css from './style.module.scss';

// components
import Layout from '../../components/layout';
import InputField from '../../components/input-field';
import SubmitButton from '../../components/submit-button';
import notification from 'antd/lib/notification';

// redux
import { useDispatch } from 'react-redux';
import * as AppActions from '@actions/app-action';
import { initializeStore } from '@redux/with-redux';

// enums
import { AppRouteEnums } from '../../enums/app-route.enum';

interface Props {}

const SignUp: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const signUpFromSubmit = useCallback(
    async (values: SignUpFormValues, formikHelpers: FormikHelpers<SignUpFormValues>) => {
      try {
        const { phone, firstName, lastName, password } = values;
        formikHelpers.setSubmitting(true);
        await dispatch(
          AppActions.registerAction({
            username: phone.trim(),
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            password,
          }),
        );
        notification.success({
          message: 'Đăng ký thành công, xin mời đăng nhập',
          placement: 'bottomRight',
        });
      } catch (err) {
        notification.error({
          message: String(err),
          placement: 'bottomRight',
        });
      }
      formikHelpers.setSubmitting(true);
    },
    [],
  );

  return (
    <Layout>
      <div className={css.formLogin}>
        <div>
          <h1 className={css.sgn1}>Đăng Ký</h1>
          <Formik<SignUpFormValues>
            initialValues={{
              phone: '',
              firstName: '',
              lastName: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validateSignUpSchema}
            onSubmit={signUpFromSubmit}
          >
            {({ handleSubmit, isValid, isSubmitting, dirty, values: formikValues }) => (
              <Form>
                <ul className={css.ulForm}>
                  <li className={css.formLink}>
                    <Field name="phone">
                      {({ field, meta }: FieldProps) => (
                        <InputField
                          label="Số điện thoại"
                          input={{ ...field, type: 'text' }}
                          error={meta.touched && meta.error}
                          classes={{ input: css.inputSelect }}
                        />
                      )}
                    </Field>
                  </li>
                  <li className={css.formLink}>
                    <Field name="firstName">
                      {({ field, meta }: FieldProps) => (
                        <InputField
                          label="Họ"
                          input={{ ...field, type: 'text' }}
                          error={meta.touched && meta.error}
                          classes={{ input: css.inputSelect }}
                        />
                      )}
                    </Field>
                  </li>
                  <li className={css.formLink}>
                    <Field name="lastName">
                      {({ field, meta }: FieldProps) => (
                        <InputField
                          label="Tên"
                          input={{ ...field, type: 'text' }}
                          error={meta.touched && meta.error}
                          classes={{ input: css.inputSelect }}
                        />
                      )}
                    </Field>
                  </li>
                  <li className={css.formLink}>
                    <Field name="password">
                      {({ field, meta }: FieldProps) => (
                        <InputField
                          label="Mật khẩu"
                          input={{ ...field, type: 'password' }}
                          error={meta.touched && meta.error}
                          classes={{ input: css.inputSelect }}
                        />
                      )}
                    </Field>
                  </li>
                  <li className={css.formLink}>
                    <Field name="confirmPassword">
                      {({ field, meta }: FieldProps) => (
                        <InputField
                          label="Nhập lại mật khẩu"
                          input={{ ...field, type: 'password' }}
                          error={meta.touched && meta.error}
                          classes={{ input: css.inputSelect }}
                        />
                      )}
                    </Field>
                  </li>
                  <li className={css.formLink}>
                    <SubmitButton
                      disabled={!isValid || isSubmitting || !dirty}
                      onClick={handleSubmit as any}
                      className={css.inputSubmit}
                      loading={isSubmitting}
                    >
                      Đăng kí
                    </SubmitButton>
                  </li>
                </ul>
                <Link href={AppRouteEnums.SIGNIN}>
                  <a className={css.forgotPass}>Bạn đã có tài khoản? Đăng nhập ngay.</a>
                </Link>
              </Form>
            )}
          </Formik>
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
      title: 'Tạo tài khoản',
      initialReduxState: reduxStore.getState(),
    },
  };
};

interface SignUpFormValues {
  phone: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

const validateSignUpSchema = Yup.object().shape({
  phone: Yup.string().required('Trường Bắt Buộc').matches(/\d+/, 'Sai dịnh dạng'),
  firstName: Yup.string().required('Trường Bắt Buộc').max(255, 'Tối đa 255 ký tự'),
  lastName: Yup.string().required('Trường Bắt Buộc').max(255, 'Tối đa 255 ký tự'),
  password: Yup.string().required('Trường Bắt Buộc').max(255, 'Tối đa 255 ký tự'),
  confirmPassword: Yup.string()
    .required('Trường Bắt Buộc')
    .max(255, 'Tối đa 255 ký tự')
    .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp'),
});

export default SignUp;
