import React, { useEffect, useState } from 'react';
import { useLocation, Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { IStore } from '../redux/stores/configure-store';
import AppActions from '../redux/actions/app-action';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import PageError from './PageError';

interface IProps {}

const AuthenticationGuard: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const profile = useSelector((store: IStore) => store.appState.profile);
  const [isLoading, setIsLoading] = useState(true);

  //   useEffect(() => {
  //     dispatch(AppActions.getProfileAction()).finally(() => {
  //       setIsLoading(false);
  //     });
  //   }, [dispatch]);

  // if (isLoading) {
  //   return (
  //     <Backdrop open={true}>
  //       <CircularProgress />
  //     </Backdrop>
  //   );
  // }

  if (whiteLists.includes(location.pathname)) {
    if (!profile) {
      return <Redirect to="/login" />;
    }
  }

  return <>{props.children}</>;
};

const whiteLists = ['/order', '/profile'];

export default AuthenticationGuard;
