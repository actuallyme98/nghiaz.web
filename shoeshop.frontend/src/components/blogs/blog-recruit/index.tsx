import React, { useMemo } from 'react';

import Slider, { Settings } from 'react-slick';

interface IProps {}
import css from './style.module.scss';
const BlogRecruit: React.FC<IProps> = (props) => {
  return (
    <div className={css.container}>
      <div className={css.heading}>
        <a href="#" className={css.link}>
          Tuyển dụng
        </a>
      </div>
      <div className={css.col}>
        <div className={css.contentLeftRight}>
          <div>
            <h3 className={css.title}>
              <a href="#" className={css.link}>
                BLUEWIND TUYỂN DỤNG NHÂN VIÊN FACEBOOK
              </a>
            </h3>
            <span className={css.date}>15:04:04 28/03/2020</span>
            <p className={css.des}>
              CÔNG TY TNHH SẢN XUẤT THƯƠNG MẠI VÀ DỊCH VỤ BLUEWIND cần tuyển nhân viên Marekting lên
              kế hoạch, nội dung chạy quảng cáo sản phẩm.
            </p>
          </div>
          <div>
            <img src="/assets/mocks/blogs/recruit/blog1.jpg" alt="" />
          </div>
        </div>
        <div className={css.contentLeftRight}>
          <div>
            <h3 className={css.title}>
              <a href="#" className={css.link}>
                BLUEWIND TUYỂN DỤNG NHÂN VIÊN SALE/
              </a>
            </h3>
            <span className={css.date}>15:00:28 28/03/2020</span>
            <p className={css.des}>
              CÔNG TY TNHH SẢN XUẤT THƯƠNG MẠI VÀ DỊCH VỤ BLUEWIND cần tuyển nhân viên Sale trực
              page, tư vấn và chốt đơn.
            </p>
          </div>
          <div>
            <img src="/assets/mocks/blogs/recruit/blog2.jpg" alt="" />
          </div>
        </div>
      </div>

      <div className={css.row}>
        <div className={css.content}>
          <img src="/assets/mocks/blogs/recruit/blog3.jpg" alt="" />
          <h3>
            <a href="#" className={css.styleH3}>
              BLUEWIND TUYỂN DỤNG NHÂN VIÊN KHO
            </a>
          </h3>
          <span className={css.date}>16:35:28 28/03/2020</span>
        </div>
        <div className={css.content}>
          <img src="/assets/mocks/blogs/recruit/blog4.jpg" alt="" />
          <h3>
            <a href="#" className={css.styleH3}>
              BLUEWIND TUYỂN DỤNG NHÂN VIÊN CSKH
            </a>
          </h3>
          <span className={css.date}>16:25:49 28/03/2020</span>
        </div>
        <div className={css.content}>
          <img src="/assets/mocks/blogs/recruit/blog5.jpg" alt="" />
          <h3>
            <a href="#" className={css.styleH3}>
              BLUEWIND TUYỂN DỤNG NHÂN VIÊN CONTENT MARKETING
            </a>
          </h3>
          <span className={css.date}>15:58:46 28/03/2020</span>
        </div>
        <div className={css.content}>
          <img src="/assets/mocks/blogs/recruit/blog6.jpg" alt="" />
          <h3>
            <a href="#" className={css.styleH3}>
              BLUEWIND TUYỂN DỤNG CTV ONLINE
            </a>
          </h3>
          <span className={css.date}>15:34:52 28/03/2020</span>
        </div>
        <div className={css.content}>
          <img src="/assets/mocks/blogs/recruit/blog1.jpg" alt="" />
          <h3>
            <a href="#" className={css.styleH3}>
              BLUEWIND TUYỂN DỤNG NHÂN VIÊN FACEBOOK ADS
            </a>
          </h3>
          <span className={css.date}>15:04:04 28/03/2020</span>
        </div>
        <div className={css.content}>
          <img src="/assets/mocks/blogs/recruit/blog2.jpg" alt="" />
          <h3>
            <a href="#" className={css.styleH3}>
              BLUEWIND TUYỂN DỤNG NHÂN VIÊN SALE
            </a>
          </h3>
          <span className={css.date}>15:00:28 28/03/2020</span>
        </div>
      </div>
    </div>
  );
};

export default BlogRecruit;
