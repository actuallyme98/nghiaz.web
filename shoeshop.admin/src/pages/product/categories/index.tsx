import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// components
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import AddCategoryModal from './add-category-modal';
import EditCategoryModal from './edit-category-modal';

// redux
import * as AppActions from '../../../redux/actions/app-action';
import { IStore } from '../../../redux/stores/configure-store';
import { useSelector, useDispatch } from 'react-redux';

import { useSnackbar } from 'notistack';

interface Props {}

const Categories: React.FC<Props> = (props) => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [categorySelected, setCategorySelected] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const categories = useSelector((store: IStore) => store.appState.categories);

  const onOpenAddCategory = useCallback(() => {
    setOpenAdd(true);
  }, []);

  const onCloseAddCategory = useCallback(() => {
    setOpenAdd(false);
  }, []);

  const onOpenEditCategory = useCallback((categ) => {
    setCategorySelected(categ);
    setOpenEdit(true);
  }, []);

  const onCloseEditCategory = useCallback(() => {
    setOpenEdit(false);
  }, []);

  const onDeleteCategory = useCallback(async (id: number) => {
    try {
      await dispatch(AppActions.deleteCategoryAction(id));
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
    return categories.map((row, index) => (
      <TableRow key={index}>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.slug}</TableCell>
        <TableCell>
          <Box>
            <Tooltip title="Sửa" placement="top" arrow>
              <IconButton onClick={() => onOpenEditCategory(row)}>
                <EditRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa" placement="top" arrow>
              <IconButton onClick={() => onDeleteCategory(row.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </TableCell>
      </TableRow>
    ));
  }, [categories]);

  return (
    <Box className={classes.container}>
      <AddCategoryModal open={openAdd} onClose={onCloseAddCategory} />
      <EditCategoryModal
        category={categorySelected}
        open={openEdit}
        onClose={onCloseEditCategory}
      />
      <Box display="flex" justifyContent="space-between">
        <Typography>Danh sách kích thước</Typography>
        <Tooltip title="Thêm mới" placement="top" arrow>
          <IconButton onClick={onOpenAddCategory}>
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Tên</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell />
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
}));

export default Categories;
