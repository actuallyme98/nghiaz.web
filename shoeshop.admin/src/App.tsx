import React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import PageError from './components/PageError';
import { SnackbarProvider } from 'notistack';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

// pages
import Home from './pages/home';
import Login from './pages/login';
import Product from './pages/product';
import AddProduct from './pages/product/list-product/add-product';
import ListVoucher from './pages/voucher';
import Order from './pages/order';
import Blog from './pages/blog';
import CreateBlog from './pages/blog/list-blog/add-modal';
import User from './pages/user';
import Contact from './pages/contact';

// themes
import theme from './themes/dark-theme';

const routes: RouteConfig[] = [
  {
    component: Home,
    path: '/',
    exact: true,
  },
  {
    component: Login,
    path: '/login',
    exact: true,
  },
  {
    component: Product,
    path: '/products/:tab?',
    exact: true,
  },
  {
    component: AddProduct,
    path: '/product/create',
    exact: true,
  },
  {
    component: ListVoucher,
    path: '/voucher',
    exact: true,
  },
  {
    component: Order,
    path: '/order',
    exact: true,
  },
  {
    component: Blog,
    path: '/blog/:tab?',
    exact: true,
  },
  {
    component: CreateBlog,
    path: '/blog-create',
    exact: true,
  },
  {
    component: User,
    path: '/user',
    exact: true,
  },
  {
    component: Contact,
    path: '/contact',
    exact: true,
  },
  {
    component: () => <PageError code={404} description="Trang không tồn tại" />,
  },
];
function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3}>{renderRoutes(routes)}</SnackbarProvider>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}
export default App;
