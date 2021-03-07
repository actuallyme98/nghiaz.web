import React, { useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// components
import Header from '../header';
import Footer from '../footer';

// redux
import { useSelector, useDispatch } from 'react-redux';
import * as AppActions from '@actions/app-action';
import { RootState } from '@redux/stores/configure-store';

interface IProps {
  loading?: boolean;
  isRequireAuthentication?: boolean;
}

const whiteLists = ['/', '/contact', '/signin', '/blogs', '/signup'];

const Layout: React.FC<IProps> = (props) => {
  const { children, isRequireAuthentication } = props;
  const route = useRouter();
  const profile = useSelector((store: RootState) => store.appState.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isRequireAuthentication) {
      dispatch(AppActions.getProfileAction());
    }
  }, [profile, isRequireAuthentication]);

  const isFluid = useMemo(() => {
    const path = route.pathname;
    return !whiteLists.includes(path);
  }, [route]);

  return (
    <div
      className={clsx({
        [css.container]: true,
        [css.containerFluid]: isFluid,
      })}
    >
      <Header />
      <div className={css.content}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
