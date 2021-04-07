import React, { useEffect, useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';

// components
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DonutSmallRoundedIcon from '@material-ui/icons/DonutSmallRounded';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import RedeemIcon from '@material-ui/icons/Redeem';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Tooltip from '@material-ui/core/Tooltip';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ContactMailIcon from '@material-ui/icons/ContactMail';

// redux
import * as AppActions from '../redux/actions/app-action';
import { useDispatch } from 'react-redux';

// enums
import { AppRouteEnum } from '../enums/app-route';

interface IProps {}

const Header: React.FC<IProps> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const collapseMenu = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(AppActions.logOutAction());
    history.push(AppRouteEnum.LOGIN);
  }, []);

  return (
    <Box>
      <Container maxWidth="xl">
        <AppBar position="static">
          <Toolbar>
            <Tooltip title="Menu">
              <IconButton className={classes.menuButton} color="inherit" onClick={collapseMenu}>
                <MenuIcon />
              </IconButton>
            </Tooltip>
            <Typography variant="h6" className={classes.title}>
              ADMIN widget
            </Typography>
            <Tooltip title="Đăng xuất">
              <IconButton color="inherit" onClick={handleLogout}>
                <PowerSettingsNewIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Container>

      <Drawer open={open} onClose={closeMenu} className={classes.drawer}>
        <List className={classes.list}>
          <Typography color="primary" className={classes.heading}>
            Nghĩa Phương ADMIN
          </Typography>

          <Link to={AppRouteEnum.HOME} className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <HomeSharpIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>

          <Link to={AppRouteEnum.USER} className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <PeopleAltIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
          </Link>

          <Link to={AppRouteEnum.PRODUCTS} className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <DonutSmallRoundedIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItem>
          </Link>

          <Link to={AppRouteEnum.VOUCHER} className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <RedeemIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Vouchers" />
            </ListItem>
          </Link>

          <Link to={AppRouteEnum.ORDER} className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <ShoppingCartIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Order" />
            </ListItem>
          </Link>

          <Link to={AppRouteEnum.BLOG} className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <MenuBookIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Blog" />
            </ListItem>
          </Link>

          <Link to={AppRouteEnum.CONTACT} className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <ContactMailIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Contact" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    background: '#1c87fb',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
  },
  drawer: {},
  heading: {
    textAlign: 'center',
    fontWeight: 600,
    padding: '20px 0',
  },
  list: {
    width: 250,
  },
}));

export default Header;
