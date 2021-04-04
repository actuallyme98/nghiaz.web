import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RouteConfigComponentProps } from 'react-router-config';

// components
import Layout from '../../../components/layout';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormikTextField from '../../../components/formik-textfield';

// formik
import { Formik, FormikHelpers, Form } from 'formik';
import * as Yup from 'yup';

import { useSnackbar } from 'notistack';

// redux
import * as AppActions from '../../../redux/actions/app-action';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../../redux/stores/configure-store';

interface FormikValues {
  title: string;
  shortDescription: string;
  description: string;
  slug: string;
}

const AddModal: React.FC<RouteConfigComponentProps<any>> = (props) => {
  const classes = useStyles();
  const [singleUrl, setSingleUrl] = useState('');
  const [singleFile, setSingleFile] = useState<File>();
  const [category, setCategory] = useState<number>();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const categories = useSelector((store: IStore) => store.appState.blogCategories);

  const onFormSubmit = useCallback(
    async (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
      formikHelpers.setSubmitting(true);
      try {
        if (!singleFile || !category) {
          return;
        }
        const id = await dispatch(
          AppActions.createBlogAction({
            ...values,
            category,
          }),
        );
        const formDataSingle = new FormData();
        formDataSingle.append('thumbnail', singleFile, singleFile.name);
        await dispatch(
          AppActions.updateThumbnailBlogAction({
            id,
            data: formDataSingle,
          }),
        );
        enqueueSnackbar('Tạo thành công', {
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
    [singleFile, category],
  );

  const onChangeSingleFile = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;
    if (files) {
      setSingleUrl(URL.createObjectURL(files[0]));
      setSingleFile(files[0]);
    }
  }, []);

  const handleChangeCategory = (event: React.ChangeEvent<{ value: any }>) => {
    setCategory(event.target.value);
  };

  return (
    <Layout title="Thêm bài viết">
      <div className={classes.paper}>
        <Formik
          initialValues={{
            title: '',
            description: '',
            shortDescription: '',
            slug: '',
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
                  label: 'Tiêu đề (*)',
                  InputLabelProps: {
                    shrink: true,
                    focused: true,
                  },
                }}
              />
              <FormikTextField
                name="slug"
                textFieldProps={{
                  variant: 'outlined',
                  margin: 'normal',
                  fullWidth: true,
                  label: 'slug (*)',
                  InputLabelProps: {
                    shrink: true,
                    focused: true,
                  },
                }}
              />
              <br />
              <br />
              <div>Category</div>
              <Select onChange={handleChangeCategory} value={category}>
                {categories.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              <br />
              <br />
              <div>Thumbnail</div>
              <input id="thumnail" type="file" onChange={onChangeSingleFile} /> <br />
              <img className={classes.prevImg} src={singleUrl} alt="" />
              <FormikTextField
                name="shortDescription"
                textFieldProps={{
                  variant: 'outlined',
                  margin: 'normal',
                  fullWidth: true,
                  label: 'shortDescription',
                  InputLabelProps: {
                    shrink: true,
                    focused: true,
                  },
                }}
              />
              <FormikTextField
                name="description"
                textFieldProps={{
                  variant: 'outlined',
                  margin: 'normal',
                  fullWidth: true,
                  multiline: true,
                  label: 'description (*)',
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
    </Layout>
  );
};

const validateForm = Yup.object().shape({
  title: Yup.string().required('Trường Bắt Buộc'),
  description: Yup.string().required('Trường Bắt Buộc'),
  slug: Yup.string().required('Trường Bắt Buộc'),
});

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    marginTop: 30,
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
  prevImg: {
    width: 150,
    marginTop: 5,
  },
}));

export default AddModal;
