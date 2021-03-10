import React, { useMemo } from 'react';

import Slider, { Settings } from 'react-slick';
import css from './style.module.scss';
// components

interface IProps {}

const BlogLogist: React.FC<IProps> = (props) => {
  return (
    <div className={css.container}>
      <div className={css.heading}>
        <a href="#" className={css.link}>
          Bluewind Logistics
        </a>
      </div>
      <div className={css.col}>
        <div className={css.contentLeftRight}>
          <div>
            <h3 className={css.title}>
              <a href="#" className={css.link}>
                FAQs ( Frequently Asked Questions ) – CÂU HỎI THƯỜNG GẶP
              </a>
            </h3>
            <span className={css.date}>16:34:11 03/04/2019</span>
            <p className={css.des}>
              BLUEWIND MEMBERSHIP là chương trình Khách hàng Thân Thiết mới, mang đến những ưu đãi
              và những quyền lợi đặc biêt dành riêng cho khách hàng thân thiết của Bluewind. Tài
              khoản thành viên được quản lý và cập nhật theo số điện thoại.
            </p>
          </div>
          <div>
            <img src="/assets/mocks/blogs/logist/blog1.jpg" alt="" />
          </div>
        </div>
        <div className={css.contentLeftRight}>
          <div>
            <h3 className={css.title}>
              <a href="#" className={css.link}>
                CHÍNH SÁCH BẢO MẬT
              </a>
            </h3>
            <span className={css.date}>16:13:38 03/04/2019</span>
            <p className={css.des}>NỘI DUNG CHI TIẾT CHÍNH SÁCH BẢO MẬT</p>
          </div>
          <div>
            <img src="/assets/mocks/blogs/logist/blog2.jpg" alt="" />
          </div>
        </div>
      </div>

      <div className={css.row}>
        <div className={css.content}>
          <img src="/assets/mocks/blogs/logist/blog3.png" alt="" />
          <h3>
            <a href="#" className={css.styleH3}>
              Hướng dẫn cách chọn size giày
            </a>
          </h3>
          <span className={css.date}>15:40:17 23/09/2019</span>
        </div>
        <div className={css.content2}>
          <img src="/assets/mocks/blogs/logist/blog4.png" alt="" />
          <h3>
            <a href="#" className={css.styleH3}>
              CHÍNH SÁCH BẢO HÀNH TRỌN ĐỜI
            </a>
          </h3>
          <span className={css.date}>15:19:44 18/06/2019</span>
        </div>
        <div className={css.content}>
          <img src="/assets/mocks/blogs/logist/blog5.png" alt="" />
          <h3>
            <a href="#" className={css.styleH3}>
              Hướng dẫn cách đo chân chọn size giày
            </a>
          </h3>
          <span className={css.date}>17:33:47 03/04/2019</span>
        </div>
        <div className={css.content3}>
          <img src="/assets/mocks/blogs/logist/blog6.jpg" alt="" />
          <h3>
            <a href="#" className={css.styleH3}>
              CHÍNH SÁCH KHÁCH HÀNG THÂN THIẾT
            </a>
          </h3>
          <span className={css.date}>17:25:16 03/04/2019</span>
        </div>
        <div className={css.content2}>
          <img src="/assets/mocks/blogs/logist/blog7.jpg" alt="" />
          <h3>
            <a href="#" className={css.styleH3}>
              CÂU HỎI THƯỜNG GẶP
            </a>
          </h3>
          <span className={css.date}>17:09:26 03/04/2019</span>
        </div>
        <div className={css.content2}>
          <img src="/assets/mocks/blogs/logist/blog8.jpg" alt="" />
          <h3>
            <a href="#" className={css.styleH3}>
              CHÍNH SÁCH ĐỔI TRẢ VÀ HOÀN TIỀN
            </a>
          </h3>
          <span className={css.date}>16:52:22 03/04/2019</span>
        </div>
      </div>
    </div>
  );
};

export default BlogLogist;
