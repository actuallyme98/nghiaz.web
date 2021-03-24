import React, { useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

// components
import Header from './header';
import Container from '@material-ui/core/Container';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

// redux
import * as AppActions from '../redux/actions/app-action';
import { useSelector, useDispatch } from 'react-redux';
import { IStore } from '../redux/stores/configure-store';

// enums
import { AppRouteEnum } from '../enums/app-route';

interface IProps {
  title?: string;
}
const Layout: React.FC<IProps> = (props) => {
  const { children, title } = props;
  const getProfilePending = useSelector((store: IStore) =>
    AppActions.getProfileAction.isPending(store),
  );

  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const loadProfile = useCallback(async () => {
    try {
      const data = await dispatch(AppActions.getProfileAction());
      if (!data) {
        history.push(AppRouteEnum.LOGIN);
      }
    } catch (err) {
      history.push(AppRouteEnum.LOGIN);
    }
  }, []);

  useEffect(() => {
    window.document.title = title || 'ADMIN';
  }, [title]);

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    dispatch(AppActions.initializeApp());
  }, []);

  if (getProfilePending) {
    return (
      <Backdrop open={true}>
        <CircularProgress />
      </Backdrop>
    );
  }

  return (
    <div className={classes.container}>
      <Header />
      <Container className={classes.content} maxWidth="lg">
        <div>{children}</div>
      </Container>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 0,
    padding: 0,
    fontFamily: 'SFUIDisplay',
  },
  content: {
    minHeight: '50vh',
  },
}));

export default Layout;
