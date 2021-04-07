import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import moment from 'moment';

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
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

// redux
import * as AppActions from '../../redux/actions/app-action';
import { IStore } from '../../redux/stores/configure-store';
import { useSelector, useDispatch } from 'react-redux';

import { useSnackbar } from 'notistack';

import useDebounceCallBack from '../../hooks/useDebounceCallBack';

interface Props {}

const ListContact: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [phone, setPhone] = useState('');

  const contactsPaging = useSelector((store: IStore) => store.appState.contacts);
  const contacts = useMemo(() => contactsPaging.items, [contactsPaging]);

  useEffect(() => {
    dispatch(
      AppActions.listContactsAction({
        paging: {
          page: 1,
          limit: 5,
        },
      }),
    );
  }, []);

  const onDelete = useCallback(async (id: number) => {
    try {
      await dispatch(AppActions.deleteContactAction(id));
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
        AppActions.listContactsAction({
          paging: {
            page: newPage + 1,
          },
        }),
      );
    },
    [],
  );

  const handleChangeRowsPerPage = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      await dispatch(
        AppActions.listContactsAction({
          paging: {
            page: 1,
            limit: Number(event.target.value),
          },
        }),
      );
    },
    [],
  );

  const debounce = useDebounceCallBack(
    async (phone: string) => {
      await dispatch(
        AppActions.listContactsAction({
          paging: {
            page: 1,
            limit: 5,
          },
          phone,
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

  return (
    <Layout title="Yêu cầu liên hệ">
      <Box className={classes.container}>
        <Box>
          <Typography>Danh sách yêu cầu liên hệ</Typography>
        </Box>

        <Box marginBottom={4} marginTop={3}>
          <TextField
            placeholder="Tìm theo số điện thoại"
            value={phone}
            onChange={handleChangePhone}
          />
        </Box>

        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Tên</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Địa chỉ</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((row, index) => (
                <CollapseRow key={index} row={row} onDelete={onDelete} />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={8}
                  count={contactsPaging.meta.totalItems}
                  rowsPerPage={contactsPaging.meta.itemsPerPage}
                  page={contactsPaging.meta.currentPage - 1}
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

const CollapseRow = (props: { row: REDUX_STORE.Contact; onDelete: any }) => {
  const { row, onDelete } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.from}</TableCell>
        <TableCell>{row.phone}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.address}</TableCell>
        <TableCell>{moment(row.createdAt).format('YYYY-MM-DD')}</TableCell>
        <TableCell>
          <Box>
            <Tooltip title="Xóa" placement="top" arrow>
              <IconButton onClick={() => onDelete(row.id)}>
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
                    <TableCell>Nội dung</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell>
                    <Box whiteSpace="pre-line">{row.content}</Box>
                  </TableCell>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
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

export default ListContact;
