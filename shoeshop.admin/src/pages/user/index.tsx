import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

// components
import Layout from '../../components/layout';
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
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TextField from '@material-ui/core/TextField';
import AddModal from './add-modal';
import EditModal from './edit-modal';

// redux
import * as AppActions from '../../redux/actions/app-action';
import { IStore } from '../../redux/stores/configure-store';
import { useSelector, useDispatch } from 'react-redux';

import { useSnackbar } from 'notistack';

import useDebounceCallBack from '../../hooks/useDebounceCallBack';

interface Props {}

const UserList: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [userSelected, setUserSelected] = useState<REDUX_STORE.User>();
  const [phone, setPhone] = useState('');

  const usersPaging = useSelector((store: IStore) => store.appState.users);
  const users = useMemo(() => usersPaging.items, [usersPaging]);

  const onOpenAdd = useCallback(() => {
    setOpenAdd(true);
  }, []);

  const onCloseAdd = useCallback(() => {
    setOpenAdd(false);
  }, []);

  const onOpenEdit = useCallback((data) => {
    setUserSelected(data);
    setOpenEdit(true);
  }, []);

  const onCloseEdit = useCallback(() => {
    setOpenEdit(false);
  }, []);

  useEffect(() => {
    dispatch(
      AppActions.listUsersAction({
        paging: {
          page: 1,
          limit: 5,
        },
        filters: {},
      }),
    );
  }, []);

  const onDelete = useCallback(async (id: number) => {
    try {
      await dispatch(AppActions.deleteUserAction(id));
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

  const handleChangePage = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      await dispatch(
        AppActions.listUsersAction({
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
        AppActions.listUsersAction({
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

  const debounce = useDebounceCallBack(
    async (phone: string) => {
      await dispatch(
        AppActions.listUsersAction({
          paging: {
            page: 1,
            limit: 5,
          },
          filters: {
            phone,
          },
        }),
      );
    },
    500,
    [],
  );

  const handleChangePhone = useCallback(
    async (event: any) => {
      const { value } = event.target;
      setPhone(value);
      await debounce(value);
    },
    [debounce],
  );

  const rows = useMemo(() => {
    return users.map((row, index) => (
      <TableRow key={index}>
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.username}</TableCell>
        <TableCell>{row.firstName + ' ' + row.lastName}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.client.dob}</TableCell>
        <TableCell>{row.client.gender}</TableCell>
        <TableCell>{row.createdAt}</TableCell>
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
  }, [users]);

  return (
    <Layout title="Quản lý người dùng">
      <Box className={classes.container}>
        <Box display="flex" justifyContent="space-between">
          <Typography>Danh sách người dùng</Typography>
          <Tooltip title="Thêm mới" placement="top" arrow>
            <IconButton onClick={onOpenAdd}>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Box marginBottom={4}>
          <TextField
            placeholder="Tìm theo số điện thoại"
            value={phone}
            onChange={handleChangePhone}
          />
        </Box>

        <AddModal open={openAdd} onClose={onCloseAdd} />
        {userSelected && <EditModal open={openEdit} onClose={onCloseEdit} user={userSelected} />}

        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Ngày sinh</TableCell>
                <TableCell>Giới tính</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{rows}</TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={8}
                  count={usersPaging.meta.totalItems}
                  rowsPerPage={usersPaging.meta.itemsPerPage}
                  page={usersPaging.meta.currentPage - 1}
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
      </Box>
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
  container: {
    paddingTop: 80,
  },
  table: {},
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  rootRow: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  link: {
    color: 'unset',
  },
}));

export default UserList;
