import { createMuiTheme, Theme } from '@material-ui/core/styles';

const darkTheme: Theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#1c87fb'
    },
    success: {
      main: '#3dd553',
      contrastText: '#000'
    },
    info: {
      main: '#69d3fd',
      contrastText: '#000'
    },
    warning: {
      main: '#fd9e2b',
      contrastText: '#000'
    },
    error: {
      main: '#fc4741',
      contrastText: '#000'
    }
  }
});

export default darkTheme;
