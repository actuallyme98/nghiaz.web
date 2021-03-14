import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

// components
import Header from './header';
import Container from '@material-ui/core/Container';

// redux
import * as AppActions from '../redux/actions/app-action';
import { useSelector, useDispatch } from 'react-redux';
import { IStore } from '../redux/stores/configure-store';

interface IProps {
  title?: string;
}
const Layout: React.FC<IProps> = (props) => {
  const { children, title } = props;
  const profile = useSelector((store: IStore) => store.appState.profile);

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    window.document.title = title || 'ADMIN';
  }, [title]);

  useEffect(() => {
    dispatch(AppActions.getProfileAction());
  }, []);

  useEffect(() => {
    if (!profile) {
      history.push('/login');
    }
  }, [profile]);

  if (!profile) {
    return null;
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
