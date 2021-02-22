import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

interface IProps {
}

const Footer: React.FC<IProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>Footer</div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {}
}));

export default Footer;