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
import AddColorModal from './add-color-modal';
import EditColorModal from './edit-color-modal';

// redux
import * as AppActions from '../../../redux/actions/app-action';
import { IStore } from '../../../redux/stores/configure-store';
import { useSelector, useDispatch } from 'react-redux';

import { useSnackbar } from 'notistack';

interface Props {}

const ProductColor: React.FC<Props> = (props) => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [colorSelected, setColorSelected] = useState(null);

  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const colors = useSelector((store: IStore) => store.appState.colors);

  useEffect(() => {
    dispatch(AppActions.listColorsAction());
  }, []);

  const onOpenAddColor = useCallback(() => {
    setOpenAdd(true);
  }, []);

  const onCloseAddColor = useCallback(() => {
    setOpenAdd(false);
  }, []);

  const onOpenEditColor = useCallback((color) => {
    setColorSelected(color);
    setOpenEdit(true);
  }, []);

  const onCloseEditColor = useCallback(() => {
    setOpenEdit(false);
  }, []);

  const onDeleteColor = useCallback(async (id: number) => {
    try {
      await dispatch(AppActions.deleteColorAction(id));
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
    return colors.map((row, index) => (
      <TableRow key={index}>
        <TableCell>{row.name}</TableCell>
        <TableCell>#{row.code.toUpperCase()}</TableCell>
        <TableCell>
          <Box>
            <Tooliip title="Sửa" placement="top" arrow>
              <IconButton onClick={() => onOpenEditColor(row)}>
                <EditRoundedIcon />
              </IconButton>
            </Tooliip>
            <Tooliip title="Xóa" placement="top" arrow>
              <IconButton onClick={() => onDeleteColor(row.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooliip>
          </Box>
        </TableCell>
      </TableRow>
    ));
  }, [colors]);

  return (
    <Box className={classes.container}>
      <AddColorModal open={openAdd} onClose={onCloseAddColor} />
      <EditColorModal color={colorSelected} open={openEdit} onClose={onCloseEditColor} />
      <Box display="flex" justifyContent="space-between">
        <Typography>Danh sách màu</Typography>
        <Tooliip title="Thêm mới" placement="top" arrow>
          <IconButton onClick={onOpenAddColor}>
            <AddCircleIcon />
          </IconButton>
        </Tooliip>
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Tên màu</TableCell>
              <TableCell>Mã màu</TableCell>
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
}));

export default ProductColor;
