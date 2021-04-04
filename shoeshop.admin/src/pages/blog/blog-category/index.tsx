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
import Tooltip from '@material-ui/core/Tooltip';
import AddModal from './add-modal';
import EditModal from './edit-modal';

// redux
import * as AppActions from '../../../redux/actions/app-action';
import { IStore } from '../../../redux/stores/configure-store';
import { useSelector, useDispatch } from 'react-redux';

import { useSnackbar } from 'notistack';

interface Props {}

const ProductColor: React.FC<Props> = (props) => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [categorySelected, setCategorySelected] = useState(null);

  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const categories = useSelector((store: IStore) => store.appState.blogCategories);

  const onOpenAdd = useCallback(() => {
    setOpenAdd(true);
  }, []);

  const onCloseAdd = useCallback(() => {
    setOpenAdd(false);
  }, []);

  const onOpenEdit = useCallback((data) => {
    setCategorySelected(data);
    setOpenEdit(true);
  }, []);

  const onCloseEdit = useCallback(() => {
    setOpenEdit(false);
  }, []);

  const onDelete = useCallback(async (id: number) => {
    try {
      await dispatch(AppActions.deleteBlogCategoryAction(id));
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
        <TableCell>{row.slug.toUpperCase()}</TableCell>
        <TableCell>
          <Box>
            <Tooltip title="Sửa" placement="top" arrow>
              <IconButton onClick={() => onOpenEdit(row)}>
                <EditRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa" placement="top" arrow>
              <IconButton onClick={() => onDelete(row.id)}>
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
      <AddModal open={openAdd} onClose={onCloseAdd} />
      <EditModal category={categorySelected} open={openEdit} onClose={onCloseEdit} />
      <Box display="flex" justifyContent="space-between">
        <Typography>Danh sách</Typography>
        <Tooltip title="Thêm mới" placement="top" arrow>
          <IconButton onClick={onOpenAdd}>
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Tiêu đề</TableCell>
              <TableCell>Slug</TableCell>
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
    paddingTop: 30,
  },
  table: {},
}));

export default ProductColor;
