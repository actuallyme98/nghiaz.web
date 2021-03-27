import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
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
  title?: string;
}

const whiteLists = ['/', '/contact', '/signin', '/blogs', '/signup'];

const Layout: React.FC<IProps> = (props) => {
  const { children, loading, backUrl, title } = props;
  const route = useRouter();
  const dispatch = useDispatch();
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);

  useEffect(() => {
    dispatch(AppActions.getProfileAction());
  }, []);

  useEffect(() => {
    dispatch(AppActions.initializeApp());
  }, [route]);

  const isFluid = useMemo(() => {
    const path = route.pathname;
    return !whiteLists.includes(path);
  }, [route]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="/fonts/SFUIDisplay/styles.css" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
      </Head>
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
    </>
  );
};

export default Layout;
