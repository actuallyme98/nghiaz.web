import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// components

interface IProps {}
const Layout: React.FC<IProps> = (props) => {
  const classes = useStyles();

  return <div className={classes.container}></div>;
};

const useStyles = makeStyles((theme) => ({
  container: {},
}));

export default Layout;
