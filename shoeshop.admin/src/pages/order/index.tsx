import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import moment from 'moment';

// components
import Container from '@material-ui/core/Container';
import Layout from '../../components/layout';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import EditOrderModal from './edit-order-modal';
import { DatePicker } from '@material-ui/pickers';

// redux
import * as AppActions from '../../redux/actions/app-action';
import { IStore } from '../../redux/stores/configure-store';
import { useSelector, useDispatch } from 'react-redux';

import { useSnackbar } from 'notistack';

interface Props {}

const ListVoucher: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [typeFilter, setTypeFilter] = useState<ADMIN_API.FilterOrderTypes>('date');
  const [orderSelected, setOrderSelected] = useState<REDUX_STORE.Order>();
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedDate, handleDateChange] = useState();

  const ordersPaging = useSelector((store: IStore) => store.appState.orders);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(
      AppActions.listOrdersAction({
        paging: {
          page: 1,
          limit: 5,
        },
        filters: {},
      }),
    );
  }, []);

  const orders = useMemo(() => ordersPaging.items, [ordersPaging]);

  const handleChangePage = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      await dispatch(
        AppActions.listOrdersAction({
          paging: {
            page: newPage + 1,
          },
          filters: {},
        }),
      );
    },
    [],
  );

  const handleChangeRowsPerPage = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      await dispatch(
        AppActions.listOrdersAction({
          paging: {
            page: 1,
            limit: Number(event.target.value),
          },
          filters: {},
        }),
      );
    },
    [],
  );

  const refetch = useCallback(async () => {
    await dispatch(
      AppActions.listOrdersAction({
        paging: {
          page: 1,
          limit: 5,
        },
        filters: {},
      }),
    );
  }, []);

  const onOpenEdit = useCallback((row: REDUX_STORE.Order) => {
    setOrderSelected(row);
    setOpenEdit(true);
  }, []);

  const onCloseEdit = useCallback(() => {
    setOpenEdit(false);
  }, []);

  const handleChangeType = useCallback((event: any) => {
    handleDateChange(undefined);
    setTypeFilter(event.target.value);
  }, []);

  const onDelete = useCallback(async (id: number) => {
    try {
      await dispatch(AppActions.deleteOrderAction(id));
      await refetch();
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

  const onChangeYear = useCallback(
    async (date: any) => {
      switch (typeFilter) {
        case 'date':
          date = moment(date).format('YYYY-MM-DD');
          break;
        case 'month':
          date = moment(date).format('YYYY-MM');
          break;
        case 'year':
          date = moment(date).format('YYYY');
          break;
        default:
          date = moment(date).format('YYYY');
          break;
      }
      handleDateChange(date);
      await dispatch(
        AppActions.listOrdersAction({
          paging: {
            page: 1,
            limit: 5,
          },
          filters: {
            type: typeFilter,
            createdAt: date,
          },
        }),
      );
    },
    [typeFilter],
  );

  const formatPicker = useMemo(() => {
    switch (typeFilter) {
      case 'date':
        return ['date', 'month', 'year'];
      case 'month':
        return ['month', 'year'];
      case 'year':
        return ['year'];
      default:
        return ['year'];
    }
  }, [typeFilter]);

  return (
    <Layout title="Quản lí đơn hàng">
      <Container maxWidth="lg" className={classes.container}>
        <Box display="flex" marginBottom={3} justifyContent="space-between">
          <Typography>Danh sách đơn hàng</Typography>
        </Box>

        {orderSelected && (
          <EditOrderModal
            onClose={onCloseEdit}
            open={openEdit}
            id={orderSelected.id}
            status={orderSelected.status}
            callback={refetch}
          />
        )}

        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Thống kê theo</FormLabel>
          <FormGroup className={classes.rootCb}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={typeFilter === 'date'}
                  onChange={handleChangeType}
                  value="date"
                />
              }
              label="Date"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={typeFilter === 'month'}
                  onChange={handleChangeType}
                  value="month"
                />
              }
              label="Month"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={typeFilter === 'year'}
                  onChange={handleChangeType}
                  value="year"
                />
              }
              label="Year"
            />
          </FormGroup>
          <DatePicker views={formatPicker as any} value={selectedDate} onChange={onChangeYear} />
        </FormControl>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>createdAt</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    #{row.code}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{moment(row.createdAt).format('YYYY-MM-DD')}</TableCell>
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
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={8}
                  count={ordersPaging.meta.totalItems}
                  rowsPerPage={ordersPaging.meta.itemsPerPage}
                  page={ordersPaging.meta.currentPage - 1}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Container>
    </Layout>
  );
};

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.rootRow}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  rootRow: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  container: {
    padding: '50px 0',
  },
  table: {
    minWidth: 500,
  },
  rootCb: {
    display: 'flex',
    flexDirection: 'row',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default ListVoucher;
