import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// components

interface IProps {}
const BrandHome: React.FC<IProps> = (props) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.heading}>THƯƠNG HIỆU</div>
      <div className={classes.content}>Comming soon...</div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '50px 0 20px',
  },
  heading: {
    fontSize: 26,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    '&::before': {
      content: '""',
      flexGrow: 1,
      height: 2,
      background: '#333',
      marginRight: 20,
    },
    '&::after': {
      content: '""',
      height: 2,
      flexGrow: 1,
      background: '#333',
      marginLeft: 20,
    },
  },
  content: {
    textAlign: 'center',
  },
}));

export default BrandHome;
