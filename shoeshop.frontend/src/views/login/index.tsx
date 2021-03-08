import React, { useCallback } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
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

const Login: React.FC<Props> = (props) => {
  const route = useRouter();
  const dispatch = useDispatch();

  const signInFromSubmit = useCallback(
    async (values: SignInFormValues, formikHelpers: FormikHelpers<SignInFormValues>) => {
      try {
        const { phone, password } = values;
        formikHelpers.setSubmitting(true);
        await dispatch(AppActions.loginAction({ username: phone.trim(), password: password }));
        route.push('/user');
      } catch (err) {
        notification.error({
          message: String(err).replace(/Error: /g, ''),
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
          <h1 className={css.sgn1}>Đăng Nhập</h1>
          <Formik<SignInFormValues>
            initialValues={{
              phone: '',
              password: '',
            }}
            validationSchema={validateSignInSchema}
            onSubmit={signInFromSubmit}
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
                    <SubmitButton
                      disabled={!isValid || isSubmitting || !dirty}
                      onClick={handleSubmit as any}
                      className={css.inputSubmit}
                      loading={isSubmitting}
                    >
                      Đăng nhập
                    </SubmitButton>
                  </li>
                </ul>
                <Link href="/forgot-password">
                  <a className={css.forgotPass}>Quên Mật Khẩu ?</a>
                </Link>
                <Link href={AppRouteEnums.SIGNUP}>
                  <a className={css.signUp}>Đăng Ký</a>
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
      title: 'Đăng nhập',
      initialReduxState: reduxStore.getState(),
    },
  };
};

interface SignInFormValues {
  phone: string;
  password: string;
}

const validateSignInSchema = Yup.object().shape({
  phone: Yup.string().required('Trường Bắt Buộc').matches(/\d+/, 'Sai dịnh dạng'),
  password: Yup.string().required('Trường Bắt Buộc').max(255, 'Tối đa 255 ký tự'),
});

export default Login;
