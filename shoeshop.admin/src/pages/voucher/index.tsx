import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// components
import Container from '@material-ui/core/Container';
import Layout from '../../components/layout';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Typography from '@material-ui/core/Typography';
import AddVoucherModal from './add-voucher-modal';
import EditVoucherModal from './edit-voucher-modal';

// redux
import * as AppActions from '../../redux/actions/app-action';
import { IStore } from '../../redux/stores/configure-store';
import { useSelector, useDispatch } from 'react-redux';

import { useSnackbar } from 'notistack';

interface Props {}

const ListVoucher: React.FC<Props> = (props) => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState<REDUX_STORE.Voucher>();
  const vouchers = useSelector((store: IStore) => store.appState.vouchers);

  const classes = useStyles();

  const onOpenAdd = useCallback(() => {
    setOpenAdd(true);
  }, []);

  const onCloseAdd = useCallback(() => {
    setOpenAdd(false);
  }, []);

  const onOpenEdit = useCallback((row) => {
    setSelected(row);
    setOpenEdit(true);
  }, []);

  const onCloseEdit = useCallback(() => {
    setOpenEdit(false);
  }, []);

  return (
    <Layout title="Quản lí mã giảm giá">
      <Container maxWidth="lg" className={classes.container}>
        <Box display="flex" justifyContent="space-between">
          <Typography>Danh sách mã giảm giá</Typography>
          <Tooltip title="Thêm mới" placement="top" arrow>
            <IconButton onClick={onOpenAdd}>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <AddVoucherModal onClose={onCloseAdd} open={openAdd} />
        {selected && <EditVoucherModal onClose={onCloseEdit} open={openEdit} voucher={selected} />}
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Tiêu đề</TableCell>
                <TableCell align="right">Số lượng</TableCell>
                <TableCell align="right">Loại giảm giá</TableCell>
                <TableCell align="right">Ngày áp dụng</TableCell>
                <TableCell align="right">Ngày hết hạn</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {vouchers.map((voucher, index) => (
                <Row key={index} row={voucher} openEdit={onOpenEdit} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Layout>
  );
};

function Row(props: { row: REDUX_STORE.Voucher; openEdit: any }) {
  const { row, openEdit } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleDeleteVoucher = useCallback(async () => {
    try {
      await dispatch(AppActions.deleteVoucherAction(row.id));
      enqueueSnackbar('xóa thành công', {
        variant: 'success',
      });
    } catch (err) {
      const message = String(err).replace(/Error: /g, '');
      enqueueSnackbar(message, {
        variant: 'error',
      });
    }
  }, []);

  const handleDeleteVoucherCode = useCallback(async (id: number) => {
    try {
      await dispatch(AppActions.deleteVoucherCodeAction(id));
      enqueueSnackbar('xóa thành công', {
        variant: 'success',
      });
    } catch (err) {
      const message = String(err).replace(/Error: /g, '');
      enqueueSnackbar(message, {
        variant: 'error',
      });
    }
  }, []);

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell align="right">{row.voucherCodes.length}</TableCell>
        <TableCell align="right">{row.type}</TableCell>
        <TableCell align="right">{row.startDate}</TableCell>
        <TableCell align="right">{row.endDate}</TableCell>
        <TableCell>
          <Box>
            <Tooltip title="Sửa" placement="top" arrow>
              <IconButton onClick={() => openEdit(row)}>
                <EditRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa" placement="top" arrow>
              <IconButton onClick={handleDeleteVoucher}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Mã</TableCell>
                    <TableCell>Đã sử dụng</TableCell>
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.voucherCodes.map((code, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        #{code.code}
                      </TableCell>
                      <TableCell>{code.isUsed ? 'True' : 'False'}</TableCell>
                      <TableCell />
                      <TableCell />
                      <TableCell />
                      <TableCell>
                        <Box>
                          <Tooltip title="Xóa" placement="top" arrow>
                            <IconButton onClick={() => handleDeleteVoucherCode(code.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  container: {
    padding: '50px 0',
  },
}));

export default ListVoucher;
