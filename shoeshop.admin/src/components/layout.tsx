import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// components

interface IProps {
  title?: string;
}
const Layout: React.FC<IProps> = (props) => {
  const { children, title } = props;
  const classes = useStyles();

  useEffect(() => {
    window.document.title = title || '';
  }, [title]);

  return (
    <div className={classes.container}>
      <div className={classes.content}>{children}</div>
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
  },
}));

export default Layout;
