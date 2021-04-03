import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// components
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import FormikTextField from '../../../components/formik-textfield';

// formik
import { Formik, FormikHelpers, Form } from 'formik';
import * as Yup from 'yup';

import { useSnackbar } from 'notistack';

// redux
import * as AppActions from '../../../redux/actions/app-action';
import { useDispatch } from 'react-redux';

interface IProps {
  open: boolean;
  color: REDUX_STORE.ProductColor | null;
  onClose: () => void;
}

interface FormikValues {
  name: string;
  code: string;
}

const EditColorModal: React.FC<IProps> = (props) => {
  const { open, onClose, color } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const onFormSubmit = useCallback(
    async (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
      formikHelpers.setSubmitting(true);
      try {
        if (!color) {
          return;
        }
        await dispatch(
          AppActions.updateColorAction({
            ...values,
            id: color.id,
          }),
        );
        onClose();
        enqueueSnackbar('Sửa thành công', {
          variant: 'success',
        });
      } catch (err) {
        const message = String(err).replace(/Error: /g, '');
        enqueueSnackbar(message, {
          variant: 'error',
        });
      }
      formikHelpers.setSubmitting(false);
    },
    [color],
  );

  return (
    <Modal open={open} onClose={onClose} className={classes.modal}>
      <div className={classes.paper}>
        <Formik
          initialValues={{
            name: color?.name.trim() || '',
            code: color?.code.trim() || '',
          }}
          onSubmit={onFormSubmit}
          validationSchema={validateForm}
        >
          {({ isSubmitting }) => (
            <Form className={classes.form}>
              <FormikTextField
                name="name"
                textFieldProps={{
                  variant: 'outlined',
                  margin: 'normal',
                  fullWidth: true,
                  label: 'Tên màu (*)',
                  placeholder: 'EX: White',
                  InputLabelProps: {
                    shrink: true,
                    focused: true,
                  },
                }}
              />
              <FormikTextField
                name="code"
                textFieldProps={{
                  variant: 'outlined',
                  margin: 'normal',
                  fullWidth: true,
                  label: 'Mã màu (*)',
                  placeholder: 'EX: FFFFFF',
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
                    Xác nhận
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

const validateForm = Yup.object().shape({
  name: Yup.string().required('Trường Bắt Buộc'),
  code: Yup.string().required('Trường Bắt Buộc').max(6, 'Tối đa 6 kí tự'),
});

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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

export default EditColorModal;
