import React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';
import loadable from '@loadable/component';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AuthenticationGuard from './components/AuthenticationGuard';
import PageError from './components/PageError';
import { SnackbarProvider } from 'notistack';

// pages
import Home from './pages/home';
import Login from './pages/login';
import Contact from './pages/contact';
import Category from './pages/category';

// themes
import theme from './themes/light-theme';

// const AdminPage = loadable(() => import('./views/pages/admin'), {
//   fallback: <div>Loading...</div>,
// });

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
    component: Contact,
    path: '/contact',
    exact: true,
  },
  {
    component: Category,
    path: '/category/:slug?',
    exact: true,
  },
  {
    component: () => <PageError code={404} description="Trang không tồn tại" />,
  },
];
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthenticationGuard>
        <SnackbarProvider>{renderRoutes(routes)}</SnackbarProvider>
      </AuthenticationGuard>
    </ThemeProvider>
  );
}
export default App;
