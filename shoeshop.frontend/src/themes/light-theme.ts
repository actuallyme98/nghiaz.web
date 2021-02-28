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
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
      },
      textPrimary: {
        background: '#FDE937',
        color: '#000000',
        transition: '0.3s',
        '&:hover': {
          backgroundColor: '#000000',
          color: '#FDE937',
          '& svg': {
            color: '#FDE937',
          },
        },
      },
    },
    MuiSvgIcon: {
      colorPrimary: {
        color: '#428bca',
      },
    },
  },
});

export default lightTheme;
