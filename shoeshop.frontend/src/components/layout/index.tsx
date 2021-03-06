import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// components
import Header from '../header';
import Footer from '../footer';

interface IProps {
  loading?: boolean;
  isAuthenticated?: boolean;
}

const whiteLists = ['/', '/contact', '/signin', '/blogs', '/signup'];

const Layout: React.FC<IProps> = (props) => {
  const { children } = props;
  const route = useRouter();

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
