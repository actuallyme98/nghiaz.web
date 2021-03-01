import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

// components
import Container from '@material-ui/core/Container';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import CartDrawer from './cart-drawer';

// redux
import * as AppActions from '../redux/actions/app-action';
import { useSelector, useDispatch } from 'react-redux';
import { IStore } from '../redux/stores/configure-store';

interface IProps {}

const Header: React.FC<IProps> = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const isMobile = useSelector((store: IStore) => store.appState.isMobile);
  const openCartDrawer = useSelector((store: IStore) => store.appState.openCartDrawer);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleCollapseMenu = useCallback(() => {
    setOpenMenu((prev) => !prev);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false);
  }, []);

  const handleOpenCloseCartDrawer = useCallback(() => {
    dispatch(AppActions.openCartDrawer(!openCartDrawer));
  }, [openCartDrawer]);

  return (
    <div className={classes.container}>
      <IconButton className={classes.menuButton} onClick={handleCollapseMenu}>
        <MenuIcon />
      </IconButton>
      <Drawer open={openMenu} onClose={handleCloseMenu}>
        <div className={classes.rootDrawer}>
          <Link className={classes.menuLinkDrawer} to="/">
            Trang chủ
          </Link>
          <Link className={classes.menuLinkDrawer} to="/category/giay-nam">
            Giày nam
          </Link>
          <Link className={classes.menuLinkDrawer} to="/category/giay-nu">
            Giày nữ
          </Link>
          <Link className={classes.menuLinkDrawer} to="/category/giay-doi">
            Giày đôi
          </Link>
          <Link className={classes.menuLinkDrawer} to="/category/tui-xach">
            Phụ kiện
          </Link>
          <Link className={classes.menuLinkDrawer} to="/">
            Khuyến mại
          </Link>
          <Link className={classes.menuLinkDrawer} to="/blogs">
            Tin tức
          </Link>
          <Link className={classes.menuLinkDrawer} to="/contact">
            Liên hệ
          </Link>
        </div>
      </Drawer>
      <Container>
        <div className={classes.wrapper}>
          <Link to="/" className={classes.logoLink}>
            <img src="/assets/icons/logo.png" alt="" />
          </Link>
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

            <Link to="/order" className={clsx(classes.phoneText, classes.orderLink)}>
              <div className={classes.borderBox}>
                <img src="/assets/icons/bill.svg" alt="" />
              </div>
              <span>Kiểm tra đơn hàng</span>
            </Link>

            <Link to="/profile" className={classes.borderBox}>
              <img src="/assets/icons/user.svg" alt="" />
            </Link>

            <Badge
              badgeContent={1}
              classes={{ anchorOriginTopRightRectangle: classes.customBadge }}
              color="primary"
            >
              <div onClick={handleOpenCloseCartDrawer} className={classes.borderBox}>
                <img src="/assets/icons/shopping-cart.svg" alt="" />
              </div>
            </Badge>
          </div>
        </div>
      </Container>
      <div className={classes.mainMenu}>
        <Container>
          <div className={classes.dFlexline}>
            <Link className={classes.menuLink} to="/">
              Trang chủ
            </Link>
            <Link className={classes.menuLink} to="/category/giay-nam">
              Giày nam
            </Link>
            <Link className={classes.menuLink} to="/category/giay-nu">
              Giày nữ
            </Link>
            <Link className={classes.menuLink} to="/category/giay-doi">
              Giày đôi
            </Link>
            <div className={clsx(classes.menuLink, classes.menuDropDown)}>
              Phụ kiện
              <div className={classes.dropDown}>
                <Link className={classes.dropDownItem} to="/category/tui-xach">
                  Túi xách
                </Link>
                <Link className={classes.dropDownItem} to="/category/day-giay">
                  Dây giày
                </Link>
                <Link className={classes.dropDownItem} to="/category/binh-xit">
                  Bình xịt
                </Link>
                <Link className={classes.dropDownItem} to="/category/kinh">
                  Kính
                </Link>
                <Link className={classes.dropDownItem} to="/category/lot-giay">
                  Lót giày
                </Link>
                <Link className={classes.dropDownItem} to="/category/qua-tang">
                  Qùa tặng
                </Link>
              </div>
            </div>
            <Link className={classes.menuLink} to="/">
              Khuyến mại
            </Link>
            <div className={clsx(classes.menuLink, classes.menuDropDown)}>
              Tin tức
              <div className={classes.dropDown}>
                <Link className={classes.dropDownItem} to="/">
                  Hoạt động cộng đồng
                </Link>
                <Link className={classes.dropDownItem} to="/">
                  Xu hướng
                </Link>
                <Link className={classes.dropDownItem} to="/">
                  Mẹo hay hằng ngày
                </Link>
                <Link className={classes.dropDownItem} to="/">
                  Trải nghiệm - Phượt
                </Link>
                <Link className={classes.dropDownItem} to="/">
                  Feedback
                </Link>
              </div>
            </div>
            <Link className={classes.menuLink} to="/contact">
              Liên hệ
            </Link>
          </div>
        </Container>
      </div>
      <CartDrawer
        open={openCartDrawer}
        onClose={handleOpenCloseCartDrawer}
        anchor={isMobile ? 'bottom' : 'right'}
        classes={{
          paper: classes.rootCartDrawer,
        }}
      />
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
    justifyContent: 'center',
    '@media screen and (max-width: 760px)': {
      display: 'block',
    },
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
    cursor: 'pointer',
  },
  customBadge: {
    top: 5,
    right: 10,
  },
  mainMenu: {
    background: '#f7f7f7',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  menuLink: {
    textDecoration: 'none',
    display: 'inline-block',
    color: '#000',
    padding: '15px 25px',
    cursor: 'pointer',
    '&:hover': {
      background: '#f1f1f1',
    },
    '@media screen and (max-width: 940px)': {
      padding: 15,
    },
  },
  menuDropDown: {
    position: 'relative',
    '&:hover > div': {
      display: 'block',
    },
  },
  dropDown: {
    position: 'absolute',
    top: 50,
    left: 0,
    background: '#fff',
    boxShadow: '0 6px 12px rgb(0 0 0 / 18%)',
    width: 200,
    display: 'none',
    zIndex: 10,
  },
  dropDownItem: {
    textDecoration: 'none',
    color: '#333',
    padding: '10px 20px',
    display: 'block',
    '&:hover': {
      background: '#f1f1f1',
    },
  },
  menuButton: {
    position: 'absolute',
    top: 5,
    left: 5,
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  rootDrawer: {
    background: '#31373d',
    height: '100%',
    width: 300,
    paddingTop: 50,
  },
  menuLinkDrawer: {
    textDecoration: 'none',
    display: 'block',
    color: '#fff',
    padding: '15px 25px',
    borderBottom: '1px solid #ffffff1a',
  },
  rootCartDrawer: {
    minWidth: 400,
  },
}));

export default Header;
