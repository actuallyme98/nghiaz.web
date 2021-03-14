import React, { useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RouteConfigComponentProps } from 'react-router-config';
import { useHistory } from 'react-router-dom';

// formik
import { Formik, FormikHelpers, Form } from 'formik';
import * as Yup from 'yup';

// components
import FormikTextField from '../../components/formik-textfield';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

// redux
import * as AppActions from '../../redux/actions/app-action';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../redux/stores/configure-store';

import { useSnackbar } from 'notistack';

interface SignInFormValues {
  username: string;
  password: string;
}

const Login: React.FC<RouteConfigComponentProps<any>> = (props) => {
  const profile = useSelector((store: IStore) => store.appState.profile);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    document.title = 'Đăng nhập';
  }, []);

  useEffect(() => {
    dispatch(AppActions.getProfileAction());
  }, []);

  useEffect(() => {
    if (profile) {
      history.push('/');
    }
  }, [profile]);

  const onFormSubmit = useCallback(
    async (values: SignInFormValues, formikHelpers: FormikHelpers<SignInFormValues>) => {
      formikHelpers.setSubmitting(true);
      try {
        await dispatch(AppActions.loginAction(values));
        history.push('/');
      } catch (err) {
        const message = String(err).replace(/Error: /g, '');
        enqueueSnackbar(message, {
          variant: 'error',
        });
      }
      formikHelpers.setSubmitting(false);
    },
    [dispatch, enqueueSnackbar, history],
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Đăng nhập
        </Typography>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          onSubmit={onFormSubmit}
          validationSchema={validateSignInForm}
        >
          {({ isSubmitting }) => (
            <Form className={classes.form}>
              <FormikTextField
                name="username"
                textFieldProps={{
                  variant: 'outlined',
                  margin: 'normal',
                  fullWidth: true,
                  label: 'Tên tài khoản (*)',
                  placeholder: 'Nhập tài khoản',
                  name: 'username',
                  type: 'username',
                  InputLabelProps: {
                    shrink: true,
                    focused: true,
                  },
                }}
              />
              <FormikTextField
                name="password"
                textFieldProps={{
                  variant: 'outlined',
                  margin: 'normal',
                  fullWidth: true,
                  label: 'Mật khẩu (*)',
                  autoComplete: 'password',
                  placeholder: 'Nhập mật khẩu',
                  name: 'password',
                  type: 'password',
                  InputLabelProps: {
                    shrink: true,
                    focused: true,
                  },
                }}
              />
              <Box textAlign="center">
                <Box position="relative">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Đăng nhập
                  </Button>
                  {isSubmitting && (
                    <Box
                      component={CircularProgress}
                      {...{ size: 30 }}
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      margin="auto"
                    />
                  )}
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

const validateSignInForm = Yup.object().shape({
  username: Yup.string().required('Trường Bắt Buộc'),
  password: Yup.string().required('Trường Bắt Buộc'),
});

export default Login;
