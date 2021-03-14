import { createMuiTheme, Theme } from '@material-ui/core/styles';

const lightTheme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#428bca',
    },
    success: {
      main: '#4caf50',
      contrastText: '#fff',
    },
    info: {
      main: '#00acc1',
      contrastText: '#fff',
    },
    warning: {
      main: '#ff9800',
      contrastText: '#000',
    },
    error: {
      main: '#f44336',
    },
  },
});

export default lightTheme;
