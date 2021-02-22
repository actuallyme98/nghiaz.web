import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// components
import Container from '@material-ui/core/Container';

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
            <a href="tel:0364589229" className={classes.phoneText}>
              <div className={classes.borderBox}>
                <img src="/assets/icons/phone.svg" alt="" />
              </div>
              <span>0364589229</span>
            </a>

            <a href="/" className={classes.phoneText}>
              <div className={classes.borderBox}>
                <img src="/assets/icons/bill.svg" alt="" />
              </div>
              <span>Kiểm tra đơn hàng</span>
            </a>
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
  borderBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: '#f7f7f7',
    '& img': {
      width: '50%',
    },
  },
}));

export default Header;
