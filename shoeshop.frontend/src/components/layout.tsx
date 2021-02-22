import React from 'react';
import { makeStyles  } from '@material-ui/core/styles';

interface IProps {
  title?: string;
}
const Layout: React.FC<IProps> = (props) => {
  const classes = useStyles();

  return (
    <div>{props.children}</div>
  );
};

const useStyles = makeStyles((theme) => ({
}));

export default Layout;