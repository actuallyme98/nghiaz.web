import React from 'react';

// styles
import css from './style.module.scss';

// components

interface IProps {}
const BrandHome: React.FC<IProps> = (props) => {
  return (
    <div className={css.container}>
      <div className={css.heading}>THƯƠNG HIỆU</div>
      <div className={css.content}>Comming soon...</div>
    </div>
  );
};

export default BrandHome;
