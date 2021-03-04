import React from 'react';
import clsx from 'clsx';

// styles
import css from './style.scss';

interface Props {
  classes?: {
    root?: string;
  };
}

const LoadingIcon: React.FC<Props> = ({ classes }) => (
  <img className={clsx(css.root, classes?.root)} src="/assets/icons/loading.svg" alt="" />
);

export default LoadingIcon;
