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
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

interface IProps {}

const Header: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const history = useHistory();

  const collapseMenu = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    history.push('/login');
  }, []);

  return (
    <Box>
      <Container maxWidth="xl">
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" onClick={collapseMenu}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              ADMIN widget
            </Typography>
            <IconButton color="inherit" onClick={handleLogout}>
              <PowerSettingsNewIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Container>

      <Drawer open={open} onClose={closeMenu} className={classes.drawer}>
        <List className={classes.list}>
          <Typography color="primary" className={classes.heading}>
            BLUEWIND ADMIN
          </Typography>

          <Link to="/" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <HomeSharpIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>

          <Link to="/products" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <DonutSmallRoundedIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Products" />
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
