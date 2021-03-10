import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// components
import Header from '../header';
import Footer from '../footer';
import Loading from '../loading';

// redux
import { useSelector, useDispatch } from 'react-redux';
import * as AppActions from '@actions/app-action';
import { RootState } from '@redux/stores/configure-store';

interface IProps {
  loading?: boolean;
  backUrl?: string;
}

const whiteLists = ['/', '/contact', '/signin', '/blogs', '/signup'];

const Layout: React.FC<IProps> = (props) => {
  const { children, loading, backUrl } = props;
  const route = useRouter();
  const dispatch = useDispatch();
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);

  useEffect(() => {
    dispatch(AppActions.getProfileAction());
  }, []);

  const isFluid = useMemo(() => {
    const path = route.pathname;
    return !whiteLists.includes(path);
  }, [route]);

  return (
    <div
      className={clsx({
        [css.container]: true,
        [css.containerFluid]: isFluid && !isMobile,
      })}
    >
      <Header backUrl={backUrl} />
      <div className={css.content}>{loading ? <Loading /> : children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
