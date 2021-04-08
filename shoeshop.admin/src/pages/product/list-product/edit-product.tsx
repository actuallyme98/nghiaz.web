import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RouteConfigComponentProps } from 'react-router-config';

// formik
import { Formik, FormikHelpers, Form } from 'formik';
import * as Yup from 'yup';

// components
import Layout from '../../../components/layout';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormikTextField from '../../../components/formik-textfield';
import CategoryForm from '../../../components/category-form';

import { useSnackbar } from 'notistack';

// redux
import * as AppActions from '../../../redux/actions/app-action';
import { useDispatch } from 'react-redux';
import { pathUrl } from '../../../utils/app-utils';

interface FormikValues {
  name: string;
  slug: string;
  price: number;
  currentPrice: number;
  discountPrice: number;
  shortDescription: string;
  description: string;
  bodyDetail: string;
  soleDetail: string;
  quantity: number;
  priority: number;
}

const EditProduct: React.FC<RouteConfigComponentProps<any>> = (props) => {
  const [singleUrl, setSingleUrl] = useState('');
  const [productEdit, setProductEdit] = useState<REDUX_STORE.IProduct>();
  const [multiUrls, setMultiUrls] = useState<string[]>([]);
  const [singleFile, setSingleFile] = useState<File>();
  const [multiFiles, setMultiFiles] = useState<FileList>();

  const [selectedColors, setSelectedColors] = useState<number[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const [special, setSpecial] = useState(0);
  const [sellWell, setSellWell] = useState(0);

  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const { state }: any = props.location;
    setProductEdit(state);
  }, []);

  useEffect(() => {
    if (productEdit) {
      setSpecial(productEdit.isSpecial);
      setSellWell(productEdit.isSellWell);
      setSelectedColors(productEdit.colors.map((x) => x.id));
      setSelectedSizes(productEdit.sizes.map((x) => x.id));
      setSelectedCategories(productEdit.categories.map((x) => x.id));
    }
  }, [productEdit]);

  const onChangeSingleFile = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;
    if (files) {
      setSingleUrl(URL.createObjectURL(files[0]));
      setSingleFile(files[0]);
    }
  }, []);

  const onChangeMultiFiles = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { files }: any = event.currentTarget;
    if (files) {
      const filesArr = [...files];
      setMultiUrls(filesArr.map((x) => URL.createObjectURL(x)));
      setMultiFiles(files);
    }
  }, []);

  const prevImgsMemo = useMemo(() => {
    if (multiFiles) {
      return multiUrls.map((url, index) => (
        <img key={index} className={classes.prevImg} src={url} alt="" />
      ));
    }
    const images = (productEdit?.images || []).map((image) => image.url);
    return images.map((url, index) => (
      <img key={index} className={classes.prevImg} src={pathUrl(url)} alt="" />
    ));
  }, [multiFiles, productEdit]);

  const handleChangeColors = useCallback((event: React.ChangeEvent<{ value: any }>) => {
    setSelectedColors(event.target.value);
  }, []);

  const handleChangeSizes = useCallback((event: React.ChangeEvent<{ value: any }>) => {
    setSelectedSizes(event.target.value);
  }, []);

  const handleChangeCategories = useCallback((event: React.ChangeEvent<{ value: any }>) => {
    setSelectedCategories(event.target.value);
  }, []);

  const handleChangeSpecial = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSpecial(parseInt(value));
  }, []);

  const handleChangeSellWell = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSellWell(parseInt(value));
  };

  const onFormSubmit = useCallback(
    async (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
      formikHelpers.setSubmitting(true);
      try {
        if (
          selectedColors.length === 0 ||
          selectedSizes.length === 0 ||
          selectedCategories.length === 0
        ) {
          window.alert('Chọn 1 màu || size || thể loại');
          return;
        }
        if (!productEdit) {
          return;
        }
        const { id } = productEdit;
        await dispatch(
          AppActions.updateProductAction({
            id,
            ...values,
            discountPrice: Math.max(0, values.discountPrice),
            categoryIds: selectedCategories,
            colorIds: selectedColors,
            sizeIds: selectedSizes,
            isSellWell: sellWell,
            isSpecial: special,
            thumbnail: '',
            status: 1,
          }),
        );
        if (singleFile) {
          const formDataSingle = new FormData();
          formDataSingle.append('thumbnail', singleFile, singleFile.name);
          await dispatch(AppActions.updateThumbnailProductAction({ data: formDataSingle, id }));
        }
        if (multiFiles) {
          const formDataMulti = new FormData();
          for (const key of Object.keys(multiFiles)) {
            formDataMulti.append('images', multiFiles[key as any]);
          }
          await dispatch(AppActions.updateImagesProductAction({ data: formDataMulti, id }));
        }
        enqueueSnackbar('Cập nhật thành công', {
          variant: 'success',
        });
        props.history.push('/products');
      } catch (err) {
        const message = String(err).replace(/Error: /g, '');
        enqueueSnackbar(message, {
          variant: 'error',
        });
      }
      formikHelpers.setSubmitting(false);
    },
    [
      singleFile,
      multiFiles,
      selectedColors,
      selectedCategories,
      selectedSizes,
      special,
      sellWell,
      productEdit,
    ],
  );

  const initialValues = useMemo(() => {
    if (!productEdit) {
      return {
        name: '',
        slug: '',
        bodyDetail: '',
        currentPrice: '',
        description: '',
        discountPrice: '',
        price: '',
        priority: '',
        quantity: '',
        shortDescription: '',
        soleDetail: '',
      };
    }
    return {
      name: productEdit.name.trim(),
      slug: productEdit.slug.trim(),
      bodyDetail: productEdit.bodyDetail.trim(),
      currentPrice: productEdit.currentPrice,
      description: productEdit.description.trim(),
      discountPrice: productEdit.discountPrice,
      price: productEdit.price,
      priority: productEdit.priority,
      quantity: productEdit.quantity,
      shortDescription: productEdit.shortDescription.trim(),
      soleDetail: productEdit.soleDetail.trim(),
    };
  }, [productEdit]);

  const previewThumbnail = useMemo(() => {
    if (singleUrl) {
      return;
    }
    return <img src={pathUrl(productEdit?.thumbnail)} className={classes.prevImg} alt="" />;
  }, [productEdit, singleUrl]);

  return (
    <Layout title="Thêm sản phẩm">
      <Box padding={5}>
        <Formik
          initialValues={initialValues}
          onSubmit={onFormSubmit as any}
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
                  label: 'Tên sản phẩm (*)',
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
                  label: 'Slug url (*)',
                  placeholder: 'ex: giay-nam-2020',
                  InputLabelProps: {
                    shrink: true,
                    focused: true,
                  },
                }}
              />
              <FormikTextField
                name="price"
                textFieldProps={{
                  variant: 'outlined',
                  margin: 'normal',
                  fullWidth: true,
                  type: 'number',
                  label: 'Giá nhập (*)',
                  InputLabelProps: {
                    shrink: true,
                    focused: true,
                  },
                }}
              />
              <FormikTextField
                name="currentPrice"
                textFieldProps={{
                  variant: 'outlined',
                  margin: 'normal',
                  fullWidth: true,
                  label: 'Giá bán (*)',
                  type: 'number',
                  InputLabelProps: {
                    shrink: true,
                    focused: true,
                  },
                }}
              />
              <FormikTextField
                name="discountPrice"
                textFieldProps={{
                  variant: 'outlined',
                  margin: 'normal',
                  fullWidth: true,
                  label: 'Giá sau khi giảm',
                  type: 'number',
                  InputLabelProps: {
                    shrink: true,
                    focused: true,
                  },
                }}
              />
              <FormikTextField
                name="shortDescription"
                textFieldProps={{
                  variant: 'outlined',
                  margin: 'normal',
                  fullWidth: true,
                  label: 'Mô tả ngắn',
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
                  label: 'Mô tả',
                  multiline: true,
                  InputLabelProps: {
                    shrink: true,
                    focused: true,
                  },
                }}
              />
              <CategoryForm
                selectedCategories={selectedCategories}
                selectedColors={selectedColors}
                selectedSizes={selectedSizes}
                handleChangeCategories={handleChangeCategories}
                handleChangeColors={handleChangeColors}
                handleChangeSizes={handleChangeSizes}
              />
              <FormikTextField
                name="bodyDetail"
                textFieldProps={{
                  variant: 'outlined',
                  margin: 'normal',
                  fullWidth: true,
                  label: 'Thông tin thân giày',
                  InputLabelProps: {
                    shrink: true,
                    focused: true,
                  },
                }}
              />
              <FormikTextField
                name="soleDetail"
                textFieldProps={{
                  variant: 'outlined',
                  margin: 'normal',
                  fullWidth: true,
                  label: 'Thông tin đế giày',
                  InputLabelProps: {
                    shrink: true,
                    focused: true,
                  },
                }}
              />
              <div>Thumbnail</div>
              <input id="thumnail" type="file" onChange={onChangeSingleFile} /> <br />
              <img className={classes.prevImg} src={singleUrl} alt="" />
              {previewThumbnail}
              <div>Ảnh</div>
              <input id="images" type="file" onChange={onChangeMultiFiles} multiple /> <br />
              {prevImgsMemo}
              <FormikTextField
                name="quantity"
                textFieldProps={{
                  variant: 'outlined',
                  margin: 'normal',
                  fullWidth: true,
                  label: 'Số lượng (*)',
                  type: 'number',
                  InputLabelProps: {
                    shrink: true,
                    focused: true,
                  },
                }}
              />
              <FormikTextField
                name="priority"
                textFieldProps={{
                  variant: 'outlined',
                  margin: 'normal',
                  fullWidth: true,
                  label: 'Độ ưu tiên',
                  type: 'number',
                  InputLabelProps: {
                    shrink: true,
                    focused: true,
                  },
                }}
              />
              <FormControl component="fieldset">
                <FormLabel component="legend">Sản phẩm đặc biệt</FormLabel>
                <RadioGroup value={special} onChange={handleChangeSpecial}>
                  <FormControlLabel value={0} control={<Radio />} label="False" />
                  <FormControlLabel value={1} control={<Radio />} label="True" />
                </RadioGroup>
              </FormControl>
              <br />
              <FormControl component="fieldset">
                <FormLabel component="legend">Bán chạy</FormLabel>
                <RadioGroup value={sellWell} onChange={handleChangeSellWell}>
                  <FormControlLabel value={0} control={<Radio />} label="False" />
                  <FormControlLabel value={1} control={<Radio />} label="True" />
                </RadioGroup>
              </FormControl>
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
      </Box>
    </Layout>
  );
};

const validateForm = Yup.object().shape({
  name: Yup.string().required('Trường Bắt Buộc'),
  price: Yup.string().required('Trường Bắt Buộc'),
  currentPrice: Yup.string().required('Trường Bắt Buộc'),
  quantity: Yup.string().required('Trường Bắt Buộc'),
});

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  prevImg: {
    width: 150,
    marginTop: 5,
  },
}));

export default EditProduct;
