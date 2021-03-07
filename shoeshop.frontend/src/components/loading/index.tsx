import React, { useEffect } from 'react';

// styles
import css from './style.module.scss';

// components
import LoadingIcon from '../loading-icon';

interface IProps {}

const Loading: React.FC<IProps> = (props) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={css.root}>
      <div className={css.loadingPaper}>
        <LoadingIcon />
      </div>
    </div>
  );
};

export default Loading;
