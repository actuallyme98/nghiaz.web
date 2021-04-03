import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// components
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { useSnackbar } from 'notistack';

// redux
import * as AppActions from '../../redux/actions/app-action';
import { useDispatch } from 'react-redux';

interface IProps {
  open: boolean;
  id: number;
  status: REDUX_STORE.OrderStatusEnums;
  onClose: () => void;
  callback: () => void;
}

const EditOrderModal: React.FC<IProps> = (props) => {
  const { open, onClose, status, id, callback } = props;
  const [statusChange, setStatusChange] = useState<REDUX_STORE.OrderStatusEnums>(status);

  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const onChangeStatus = useCallback((event: any) => {
    setStatusChange(event.target.value);
  }, []);

  const onFormSubmit = useCallback(async () => {
    try {
      await dispatch(
        AppActions.updateStatusOrderAction({
          id,
          status: statusChange,
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
  }, [statusChange, id]);

  return (
    <Modal open={open} onClose={onClose} className={classes.modal}>
      <div className={classes.paper}>
        <Select value={statusChange} onChange={onChangeStatus}>
          <MenuItem value="CONFIRMING">CONFIRMING</MenuItem>
          <MenuItem value="SHIPPING">SHIPPING</MenuItem>
          <MenuItem value="SUCCESS">SUCCESS</MenuItem>
          <MenuItem value="FAILED">FAILED</MenuItem>
        </Select>
        <br />
        <br />
        <Button onClick={onFormSubmit}>Submit</Button>
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
