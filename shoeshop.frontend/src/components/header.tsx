import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

// components
import Container from '@material-ui/core/Container';
import Badge from '@material-ui/core/Badge';

interface IProps {}

const Header: React.FC<IProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Container>
        <div className={classes.wrapper}>
          <a href="/" className={classes.logoLink}>
            <img src="/assets/icons/logo.png" alt="" />
          </a>
          <div className={classes.boxInput}>
            <div className={classes.inputGroupSearch}>
              <input className={classes.inputSearch} placeholder="Bạn cần tìm gì?" />
            </div>
            <button className={classes.btnSearch}>
              <img src="/assets/icons/search.svg" alt="" />
            </button>
          </div>
          <div className={classes.controlHeader}>
            <a href="tel:0364589229" className={clsx(classes.phoneText, classes.phoneLink)}>
              <div className={classes.borderBox}>
                <img src="/assets/icons/phone.svg" alt="" />
              </div>
              <span>0364589229</span>
            </a>

            <a href="/" className={clsx(classes.phoneText, classes.orderLink)}>
              <div className={classes.borderBox}>
                <img src="/assets/icons/bill.svg" alt="" />
              </div>
              <span>Kiểm tra đơn hàng</span>
            </a>

            <a href="/" className={classes.borderBox}>
              <img src="/assets/icons/user.svg" alt="" />
            </a>

            <Badge
              badgeContent={1}
              classes={{ anchorOriginTopRightRectangle: classes.customBadge }}
              color="primary"
            >
              <a href="/" className={classes.borderBox}>
                <img src="/assets/icons/shopping-cart.svg" alt="" />
              </a>
            </Badge>
          </div>
        </div>
      </Container>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {},
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
  },
  logoLink: {
    display: 'block',
    width: 160,
    '& img': {
      width: '100%',
    },
  },
  boxInput: {
    position: 'relative',
    border: '2px solid #d5d5d5',
    borderRadius: 4,
    background: '#fff',
    flexGrow: 1,
    margin: '0 40px',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  inputGroupSearch: {},
  inputSearch: {
    border: 0,
    outline: 0,
    padding: 10,
    width: '100%',
    fontSize: 13,
    borderRadius: 8,
  },
  btnSearch: {
    position: 'absolute',
    right: 5,
    top: 7,
    border: 0,
    outline: 0,
    borderRadius: 0,
    background: 'transparent',
    cursor: 'pointer',
    '& img': {
      width: 18,
    },
  },
  controlHeader: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  dFlexline: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  phoneText: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#000',
    transition: '0.3s',
    marginRight: 10,
    '&:hover': {
      color: '#428bca',
    },
  },
  phoneLink: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  orderLink: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  borderBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: '50%',
    marginRight: 10,
    background: '#f7f7f7',
    '& img': {
      width: '50%',
    },
  },
  customBadge: {
    top: 5,
    right: 10,
  },
}));

export default Header;
