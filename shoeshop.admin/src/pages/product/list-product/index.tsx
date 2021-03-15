import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// components
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Typography from '@material-ui/core/Typography';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooliip from '@material-ui/core/Tooltip';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

// redux
import * as AppActions from '../../../redux/actions/app-action';
import { IStore } from '../../../redux/stores/configure-store';
import { useSelector, useDispatch } from 'react-redux';

import { useSnackbar } from 'notistack';

interface Props {}

const ProductList: React.FC<Props> = (props) => {
  const [selectedColors, setSelectedColors] = useState<number[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const products = useSelector((store: IStore) => store.appState.products);
  const colors = useSelector((store: IStore) => store.appState.colors);
  const sizes = useSelector((store: IStore) => store.appState.sizes);
  const categories = useSelector((store: IStore) => store.appState.categories);

  const handleChangeColors = useCallback((event: React.ChangeEvent<{ value: any }>) => {
    setSelectedColors(event.target.value);
  }, []);

  const handleChangeSizes = useCallback((event: React.ChangeEvent<{ value: any }>) => {
    setSelectedSizes(event.target.value);
  }, []);

  const handleChangeCategories = useCallback((event: React.ChangeEvent<{ value: any }>) => {
    setSelectedCategories(event.target.value);
  }, []);

  const getColorName = useCallback(
    (id: number) => {
      const color = colors.find((x) => x.id === id);
      if (!color) return '';
      return color.name;
    },
    [colors],
  );

  const getSizeName = useCallback(
    (id: number) => {
      const size = sizes.find((x) => x.id === id);
      if (!size) return '';
      return size.name;
    },
    [sizes],
  );

  const getCategoryName = useCallback(
    (id: number) => {
      const category = categories.find((x) => x.id === id);
      if (!category) return '';
      return category.name;
    },
    [categories],
  );

  const colorsMap = useMemo(
    () =>
      colors.map((color, index) => {
        const checked = selectedColors.findIndex((x) => x === color.id) > -1;
        return (
          <MenuItem key={index} value={color.id}>
            <Checkbox checked={checked} />
            <ListItemText primary={color.code} />
          </MenuItem>
        );
      }),
    [colors, selectedColors],
  );

  const sizesMap = useMemo(
    () =>
      sizes.map((size, index) => {
        const checked = selectedSizes.findIndex((x) => x === size.id) > -1;
        return (
          <MenuItem key={index} value={size.id}>
            <Checkbox checked={checked} />
            <ListItemText primary={size.name} />
          </MenuItem>
        );
      }),
    [sizes, selectedSizes],
  );

  const categoriesMap = useMemo(
    () =>
      categories.map((category, index) => {
        const checked = selectedCategories.findIndex((x) => x === category.id) > -1;
        return (
          <MenuItem key={index} value={category.id}>
            <Checkbox checked={checked} />
            <ListItemText primary={category.name} />
          </MenuItem>
        );
      }),
    [categories, selectedCategories],
  );

  const rows = useMemo(() => {
    return products.map((row, index) => (
      <TableRow key={index}>
        <TableCell>{row.code}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.price}</TableCell>
        <TableCell>{row.currentPrice}</TableCell>
        <TableCell>{row.quantity}</TableCell>
        <TableCell>
          <Box>
            <Tooliip title="Sửa" placement="top" arrow>
              <IconButton>
                <EditRoundedIcon />
              </IconButton>
            </Tooliip>
            <Tooliip title="Xóa" placement="top" arrow>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooliip>
          </Box>
        </TableCell>
      </TableRow>
    ));
  }, [products]);

  return (
    <Box className={classes.container}>
      <FormControl className={classes.formControl}>
        <InputLabel id="check_color">Màu sắc</InputLabel>
        <Select
          labelId="check_color"
          multiple
          value={selectedColors}
          onChange={handleChangeColors}
          input={<Input />}
          renderValue={(selected) => (selected as number[]).map((x) => getColorName(x)).join(', ')}
        >
          {colorsMap}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="check_size">Kích thước</InputLabel>
        <Select
          labelId="check_size"
          multiple
          value={selectedSizes}
          onChange={handleChangeSizes}
          input={<Input />}
          renderValue={(selected) => (selected as number[]).map((x) => getSizeName(x)).join(', ')}
        >
          {sizesMap}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="check_category">Thể loại</InputLabel>
        <Select
          labelId="check_category"
          multiple
          value={selectedCategories}
          onChange={handleChangeCategories}
          input={<Input />}
          renderValue={(selected) =>
            (selected as number[]).map((x) => getCategoryName(x)).join(', ')
          }
        >
          {categoriesMap}
        </Select>
      </FormControl>

      <Box display="flex" justifyContent="space-between">
        <Typography>Danh sách sản phẩm</Typography>
        <Tooliip title="Thêm mới" placement="top" arrow>
          <IconButton>
            <AddCircleIcon />
          </IconButton>
        </Tooliip>
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Mã sản phẩm</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Giá nhập</TableCell>
              <TableCell>Giá bán</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: 80,
  },
  table: {},
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
}));

export default ProductList;
