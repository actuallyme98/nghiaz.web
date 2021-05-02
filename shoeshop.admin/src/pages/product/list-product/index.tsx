import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import moment from 'moment';

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
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import CategoryForm from '../../../components/category-form';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

// redux
import * as AppActions from '../../../redux/actions/app-action';
import { IStore } from '../../../redux/stores/configure-store';
import { useSelector, useDispatch } from 'react-redux';

import { useSnackbar } from 'notistack';

interface Props {}

const ProductList: React.FC<Props> = (props) => {
  const [selectedColors, setSelectedColors] = useState<number[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const productsPaging = useSelector((store: IStore) => store.appState.products);
  const products = useMemo(() => productsPaging.items, [productsPaging]);

  useEffect(() => {
    dispatch(
      AppActions.listProductsAction({
        paging: {
          page: 1,
          limit: 5,
        },
        filters: {},
      }),
    );
  }, []);

  const handleChangeColors = useCallback(
    async (event: React.ChangeEvent<{ value: any }>) => {
      const { value } = event.target;
      await dispatch(
        AppActions.listProductsAction({
          paging: {
            page: 1,
            limit: 5,
          },
          filters: {
            colors: value,
            sizes: selectedSizes,
            categories: selectedCategories,
          },
        }),
      );
      setSelectedColors(value);
    },
    [selectedSizes, selectedCategories],
  );

  const handleChangeSizes = useCallback(
    async (event: React.ChangeEvent<{ value: any }>) => {
      const { value } = event.target;
      setSelectedSizes(value);
      await dispatch(
        AppActions.listProductsAction({
          paging: {
            page: 1,
            limit: 5,
          },
          filters: {
            colors: selectedColors,
            sizes: value,
            categories: selectedCategories,
          },
        }),
      );
    },
    [selectedColors, selectedCategories],
  );

  const handleChangeCategories = useCallback(
    async (event: React.ChangeEvent<{ value: any }>) => {
      const { value } = event.target;
      setSelectedCategories(value);
      await dispatch(
        AppActions.listProductsAction({
          paging: {
            page: 1,
            limit: 5,
          },
          filters: {
            colors: selectedColors,
            sizes: selectedSizes,
            categories: value,
          },
        }),
      );
    },
    [selectedColors, selectedSizes],
  );

  const onDelete = useCallback(async (id: number) => {
    try {
      const r = confirm('Chắc chắn xóa?');
      if(!r) {
        return;
      }
      await dispatch(AppActions.deleteProductAction(id));
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
        AppActions.listProductsAction({
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
        AppActions.listProductsAction({
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

  return (
    <Box className={classes.container}>
      <CategoryForm
        selectedCategories={selectedCategories}
        selectedColors={selectedColors}
        selectedSizes={selectedSizes}
        handleChangeCategories={handleChangeCategories}
        handleChangeColors={handleChangeColors}
        handleChangeSizes={handleChangeSizes}
      />

      <Box display="flex" justifyContent="space-between" marginTop={3}>
        <Typography>Danh sách sản phẩm</Typography>
        <Tooltip title="Thêm mới" placement="top" arrow>
          <IconButton>
            <Link to="/product/create" className={classes.link}>
              <AddCircleIcon />
            </Link>
          </IconButton>
        </Tooltip>
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Mã sản phẩm</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Giá nhập</TableCell>
              <TableCell>Giá bán</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Thumbnail</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row, index) => (
              <CollapseRow key={index} row={row} onDelete={onDelete} />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={8}
                count={productsPaging.meta.totalItems}
                rowsPerPage={productsPaging.meta.itemsPerPage}
                page={productsPaging.meta.currentPage - 1}
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
  );
};

const CollapseRow = (props: { row: REDUX_STORE.IProduct; onDelete: any }) => {
  const { row, onDelete } = props;
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.code}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.categories.map((x) => x.name).join(', ')}</TableCell>
        <TableCell>{row.price}</TableCell>
        <TableCell>{row.currentPrice}</TableCell>
        <TableCell>{row.quantity}</TableCell>
        <TableCell>{row.thumbnail}</TableCell>
        <TableCell>
          <Box>
            <Tooltip title="Sửa" placement="top" arrow>
              <IconButton>
                <Link
                  to={{
                    pathname: '/product/edit',
                    state: row,
                  }}
                  className={classes.link}
                >
                  <EditRoundedIcon />
                </Link>
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
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Màu</TableCell>
                    <TableCell>Kích cỡ</TableCell>
                    <TableCell>Mô tả</TableCell>
                    <TableCell>Slug</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell>{row.colors.map((x) => x.name).join(', ')}</TableCell>
                  <TableCell>{row.sizes.map((x) => x.name).join(', ')}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.slug}</TableCell>
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

export default ProductList;
