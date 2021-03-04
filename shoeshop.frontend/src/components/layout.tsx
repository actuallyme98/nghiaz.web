import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// components
import Header from './header';
import Footer from './footer';

interface IProps {
  title?: string;
}
const Layout: React.FC<IProps> = (props) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.content}>{children}</div>
      <Footer />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 0,
    padding: 0,
    background: '#fff',
    fontFamily: 'SFUIDisplay',
  },
  content: {
    minHeight: '50vh',
    padding: '0 0 50px',
  },
}));

export default Layout;
