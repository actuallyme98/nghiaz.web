import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  classes?: {
    root?: string;
  };
}

const LoadingIcon: React.FC<Props> = ({ classes }) => {
  const styles = useStyles();
  return (
    <img className={clsx(styles.root, classes?.root)} src="/assets/icons/loading.svg" alt="" />
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: 50,
    height: 50,
  },
}));

export default LoadingIcon;
