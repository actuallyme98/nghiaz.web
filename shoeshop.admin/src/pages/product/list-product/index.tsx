import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

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
import CategoryForm from '../../../components/category-form';

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

  const handleChangeColors = useCallback((event: React.ChangeEvent<{ value: any }>) => {
    setSelectedColors(event.target.value);
  }, []);

  const handleChangeSizes = useCallback((event: React.ChangeEvent<{ value: any }>) => {
    setSelectedSizes(event.target.value);
  }, []);

  const handleChangeCategories = useCallback((event: React.ChangeEvent<{ value: any }>) => {
    setSelectedCategories(event.target.value);
  }, []);

  const onDelete = useCallback(async (id: number) => {
    try {
      await dispatch(AppActions.deleteProductAction(id));
      enqueueSnackbar('Xóa thành công', {
        variant: 'success',
      });
    } catch (err) {
      const message = String(err).replace(/Error: /g, '');
      enqueueSnackbar(message, {
        variant: 'error',
      });
    }
  }, []);

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
              <IconButton onClick={() => onDelete(row.id)}>
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
      <CategoryForm
        selectedCategories={selectedCategories}
        selectedColors={selectedColors}
        selectedSizes={selectedSizes}
        handleChangeCategories={handleChangeCategories}
        handleChangeColors={handleChangeColors}
        handleChangeSizes={handleChangeSizes}
      />

      <Box display="flex" justifyContent="space-between">
        <Typography>Danh sách sản phẩm</Typography>
        <Tooliip title="Thêm mới" placement="top" arrow>
          <IconButton>
            <Link to="/product/create" className={classes.link}>
              <AddCircleIcon />
            </Link>
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
  link: {
    color: 'unset',
  },
}));

export default ProductList;
