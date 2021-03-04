import React, { useMemo } from 'react';

import css from './style.module.scss';
interface IProps {}

const BlogCom: React.FC<IProps> = (props) => {
  return (
    <div className={css.container}>
      <div className={css.heading}>
        <a href="#" className={css.link}>
          Hoạt động cộng đồng
        </a>
      </div>

      <div className={css.row}>
        <div className={css.content}>
          <img src="/assets/mocks/blogs/community/blog1.jpg" alt="" />
          <h3>
            <a href="#" className={css.styleH3}>
              Gom nắng gửi yêu thương - chương trình trao tặng giày cho trẻ em khó khăn của Bluewind
            </a>
          </h3>
          <span className={css.date}>15:25:19 13/03/2020</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCom;
