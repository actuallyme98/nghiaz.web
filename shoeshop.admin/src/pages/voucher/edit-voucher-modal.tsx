import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// components
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormikTextField from '../../components/formik-textfield';

// formik
import { Formik, FormikHelpers, Form } from 'formik';
import * as Yup from 'yup';

import { useSnackbar } from 'notistack';

// redux
import * as AppActions from '../../redux/actions/app-action';
import { useDispatch } from 'react-redux';

interface IProps {
  open: boolean;
  onClose: () => void;
  voucher: REDUX_STORE.Voucher;
}

interface FormikValues {
  title: string;
  percentDiscount: number;
  amount: number;
  maxAmount: number;
  quantity: number;
  requireMinPrice: number;
  startDate: string;
  endDate: string;
}

const EditVoucherModal: React.FC<IProps> = (props) => {
  const { open, onClose, voucher } = props;
  const [typeSelected, setTypeSelected] = useState<REDUX_STORE.VoucherType>('discount_percentage');
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleChangeType = useCallback((event: any) => {
    setTypeSelected(event.target.value);
  }, []);

  const onFormSubmit = useCallback(
    async (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
      formikHelpers.setSubmitting(true);
      try {
        await dispatch(
          AppActions.updateVoucherAction({
            id: voucher.id,
            ...values,
            type: typeSelected,
          }),
        );
        onClose();
        enqueueSnackbar('Cập nhật thành công', {
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
    [typeSelected, voucher],
  );

  return (
    <Modal open={open} onClose={onClose} className={classes.modal}>
      <div className={classes.paper}>
        <Formik
          initialValues={{
            title: voucher.title.trim(),
            amount: voucher.amount,
            endDate: voucher.endDate.trim(),
            startDate: voucher.startDate.trim(),
            maxAmount: voucher.maxAmount,
            percentDiscount: voucher.percentDiscount,
            quantity: voucher.quantity,
            requireMinPrice: voucher.requireMinPrice,
          }}
          onSubmit={onFormSubmit}
          validationSchema={validateForm}
        >
          {({ isSubmitting }) => (
            <Form className={classes.form}>
              <FormikTextField
                name="title"
                textFieldProps={{
                  variant: 'outlined',
                  margin: 'normal',
                  fullWidth: true,
                  label: 'Tên (*)',
                  InputLabelProps: {
                    shrink: true,
                    focused: true,
                  },
                }}
              />
              <FormControl className={classes.formControl}>
                <InputLabel>Loại</InputLabel>
                <Select value={typeSelected} onChange={handleChangeType}>
                  <MenuItem value={'discount_percentage'}>Giảm theo %</MenuItem>
                  <MenuItem value={'discount_price'}>Giảm trực tiếp</MenuItem>
                  <MenuItem value={'free_ship'}>Free ship</MenuItem>
                </Select>
              </FormControl>
              {typeSelected === 'discount_percentage' && (
                <>
                  <FormikTextField
                    name="percentDiscount"
                    textFieldProps={{
                      variant: 'outlined',
                      margin: 'normal',
                      fullWidth: true,
                      label: '% giảm giá',
                      type: 'number',
                      InputLabelProps: {
                        shrink: true,
                        focused: true,
                      },
                    }}
                  />
                  <FormikTextField
                    name="maxAmount"
                    textFieldProps={{
                      variant: 'outlined',
                      margin: 'normal',
                      fullWidth: true,
                      label: 'giảm tối đa',
                      type: 'number',
                      InputLabelProps: {
                        shrink: true,
                        focused: true,
                      },
                    }}
                  />
                </>
              )}
              {typeSelected === 'discount_price' && (
                <FormikTextField
                  name="amount"
                  textFieldProps={{
                    variant: 'outlined',
                    margin: 'normal',
                    fullWidth: true,
                    label: '- giá',
                    type: 'number',
                    InputLabelProps: {
                      shrink: true,
                      focused: true,
                    },
                  }}
                />
              )}

              <FormikTextField
                name="quantity"
                textFieldProps={{
                  variant: 'outlined',
                  margin: 'normal',
                  fullWidth: true,
                  label: 'Số lượng mã (*)',
                  type: 'number',
                  InputLabelProps: {
                    shrink: true,
                    focused: true,
                  },
                }}
              />
              <FormikTextField
                name="requireMinPrice"
                textFieldProps={{
                  variant: 'outlined',
                  margin: 'normal',
                  fullWidth: true,
                  label: 'giá áp dụng (*)',
                  type: 'number',
                  InputLabelProps: {
                    shrink: true,
                    focused: true,
                  },
                }}
              />
              <FormikTextField
                name="startDate"
                textFieldProps={{
                  variant: 'outlined',
                  margin: 'normal',
                  fullWidth: true,
                  label: 'Ngày áp dụng (*)',
                  type: 'date',
                  InputLabelProps: {
                    shrink: true,
                    focused: true,
                  },
                }}
              />
              <FormikTextField
                name="endDate"
                textFieldProps={{
                  variant: 'outlined',
                  margin: 'normal',
                  fullWidth: true,
                  label: 'Ngày hết hạn (*)',
                  type: 'date',
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
  title: Yup.string().required('Trường Bắt Buộc'),
  percentDiscount: Yup.number().required('Trường Bắt Buộc'),
  amount: Yup.number().required('Trường Bắt Buộc'),
  maxAmount: Yup.number().required('Trường Bắt Buộc'),
  quantity: Yup.number().required('Trường Bắt Buộc'),
  requireMinPrice: Yup.number().required('Trường Bắt Buộc'),
  startDate: Yup.string().required('Trường Bắt Buộc'),
  endDate: Yup.string().required('Trường Bắt Buộc'),
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
    width: '30%',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default EditVoucherModal;
