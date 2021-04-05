import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// components
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import { useSnackbar } from 'notistack';

// redux
import * as AppActions from '../../redux/actions/app-action';
import { useDispatch } from 'react-redux';

interface IProps {
  open: boolean;
  id: number;
  failedReason: string;
  status: REDUX_STORE.OrderStatusEnums;
  onClose: () => void;
  callback: () => Promise<void>;
}

const EditOrderModal: React.FC<IProps> = (props) => {
  const { open, onClose, status, id, callback, failedReason } = props;
  const [statusChange, setStatusChange] = useState<REDUX_STORE.OrderStatusEnums>('CONFIRMING');
  const [reason, setReason] = useState('');

  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const onChangeStatus = useCallback((event: any) => {
    setStatusChange(event.target.value.trim());
  }, []);

  useEffect(() => {
    setStatusChange(status.trim() as any);
  }, [status]);

  useEffect(() => {
    setReason(failedReason);
  }, [failedReason]);

  const onFormSubmit = useCallback(async () => {
    try {
      if (!statusChange) {
        return;
      }
      if (statusChange === 'FAILED' && !reason) {
        window.alert('Nhập lý do hủy đơn');
        return;
      }
      await dispatch(
        AppActions.updateStatusOrderAction({
          id,
          status: statusChange,
          reason,
        }),
      );
      onClose();
      enqueueSnackbar('Sửa thành công', {
        variant: 'success',
      });
      await callback();
    } catch (err) {
      const message = String(err).replace(/Error: /g, '');
      enqueueSnackbar(message, {
        variant: 'error',
      });
    }
  }, [statusChange, id, reason]);

  const handleChangeReason = useCallback((event: any) => {
    setReason(event.target.value);
  }, []);

  return (
    <Modal open={open} onClose={onClose} className={classes.modal}>
      <div className={classes.paper}>
        <Select
          value={statusChange}
          onChange={onChangeStatus}
          disabled={status === 'SUCCESS' || status === 'FAILED'}
        >
          <MenuItem value="CONFIRMING" disabled={status === 'SHIPPING'}>
            Đang xác nhận
          </MenuItem>
          <MenuItem value="PREPARING" disabled={status === 'SHIPPING'}>
            Đang chuẩn bị hàng
          </MenuItem>
          <MenuItem value="SHIPPING">Đang giao hàng</MenuItem>
          <MenuItem value="SUCCESS">Thành công</MenuItem>
          <MenuItem value="FAILED">Thất bại</MenuItem>
        </Select>
        <br />
        <br />
        {statusChange === 'FAILED' && (
          <>
            <TextField onChange={handleChangeReason} value={reason} placeholder="Lý do hủy đơn" />
            <br />
            <br />
          </>
        )}
        <Button
          variant="outlined"
          color="primary"
          onClick={onFormSubmit}
          disabled={status === 'SUCCESS' || status === 'FAILED'}
        >
          Submit
        </Button>
      </div>
    </Modal>
  );
};

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
  },
}));

export default EditOrderModal;
