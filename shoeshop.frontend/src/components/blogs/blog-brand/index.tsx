import React, { useMemo } from 'react';

import css from './style.module.scss';
interface IProps {}

const BlogBrand: React.FC<IProps> = (props) => {
  return (
    <div className={css.container}>
      <div className={css.heading}>
        <a href="#" className={css.link}>
          Thương hiệu Bluewind
        </a>
      </div>

      <div className={css.row}>
        <div className={css.content}>
          <img src="/assets/mocks/blogs/brands/blog1.png" alt="" />
          <h3>
            <a href="#" className={css.styleH3}>
              Lịch sử phát triển Bluewind
            </a>
          </h3>
          <span className={css.date}>21:44:00 30/10/2019</span>
        </div>
        <div className={css.content}>
          <img src="/assets/mocks/blogs/brands/blog2.png" alt="" />
          <h3>
            <a href="#" className={css.styleH3}>
              Bộ nhận diện Thương Hiệu Bluewind
            </a>
          </h3>
          <span className={css.date}>10:29:00 20/09/2019</span>
        </div>
        <div className={css.content}>
          <img src="/assets/mocks/blogs/brands/blog3.png" alt="" />
          <h3>
            <a href="#" className={css.styleH3}>
              Điều gì làm nên Thương hiệu Bluewind 6 năm trước chỉ là 1 cửa hàng trong con ngõ nhỏ !
            </a>
          </h3>
          <span className={css.date}>15:59:48 18/09/2019</span>
        </div>
      </div>
    </div>
  );
};

export default BlogBrand;
