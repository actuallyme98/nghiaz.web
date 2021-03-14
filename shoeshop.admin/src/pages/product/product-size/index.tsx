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
import Tooliip from '@material-ui/core/Tooltip';
import AddSizeModal from './add-size-modal';
import EditSizeModal from './edit-size-modal';

// redux
import * as AppActions from '../../../redux/actions/app-action';
import { IStore } from '../../../redux/stores/configure-store';
import { useSelector, useDispatch } from 'react-redux';

import { useSnackbar } from 'notistack';

interface Props {}

const ProductSize: React.FC<Props> = (props) => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [sizeSelected, setSizeSelected] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const sizes = useSelector((store: IStore) => store.appState.sizes);

  useEffect(() => {
    dispatch(AppActions.listSizesAction());
  }, []);

  const onOpenAddSize = useCallback(() => {
    setOpenAdd(true);
  }, []);

  const onCloseAddSize = useCallback(() => {
    setOpenAdd(false);
  }, []);

  const onOpenEditSize = useCallback((size) => {
    setSizeSelected(size);
    setOpenEdit(true);
  }, []);

  const onCloseEditSize = useCallback(() => {
    setOpenEdit(false);
  }, []);

  const onDeleteSize = useCallback(async (id: number) => {
    try {
      await dispatch(AppActions.deleteSizeAction(id));
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
    return sizes.map((row, index) => (
      <TableRow key={index}>
        <TableCell>{row.name}</TableCell>
        <TableCell>
          <Box>
            <Tooliip title="Sửa" placement="top" arrow>
              <IconButton onClick={() => onOpenEditSize(row)}>
                <EditRoundedIcon />
              </IconButton>
            </Tooliip>
            <Tooliip title="Xóa" placement="top" arrow>
              <IconButton onClick={() => onDeleteSize(row.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooliip>
          </Box>
        </TableCell>
      </TableRow>
    ));
  }, [sizes]);

  return (
    <Box className={classes.container}>
      <AddSizeModal open={openAdd} onClose={onCloseAddSize} />
      <EditSizeModal size={sizeSelected} open={openEdit} onClose={onCloseEditSize} />
      <Box display="flex" justifyContent="space-between">
        <Typography>Danh sách kích thước</Typography>
        <Tooliip title="Thêm mới" placement="top" arrow>
          <IconButton onClick={onOpenAddSize}>
            <AddCircleIcon />
          </IconButton>
        </Tooliip>
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Kích thước</TableCell>
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

export default ProductSize;
