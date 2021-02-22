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
    <>
      <Header />
      <div className={classes.content}>{children}</div>
      <Footer />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  content: {
    minHeight: '100vh',
  },
}));

export default Layout;
