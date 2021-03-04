import React, { useMemo } from 'react';

import Slider, { Settings } from 'react-slick';
import css from './style.module.scss';
// components

interface IProps {}

const BlogGift: React.FC<IProps> = (props) => {
  return (
    <div className={css.container}>
      <div className={css.heading}>
        <a href="#" className={css.link}>
          Thông tin khuyến mại
        </a>
      </div>
      <div className={css.col}>
        <div className={css.contentLeftRight}>
          <div>
            <h3 className={css.title}>
              <a href="#" className={css.link}>
                MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC TỪ 99K
              </a>
            </h3>
            <span className={css.date}>13:35:31 10/04/2019</span>
            <p className={css.des}>
              Miễn phí vận chuyển toàn quốc từ 99K cho các đơn hàng thuộc Shopee Bluewind.vn từ 20/3
              - 18/4
            </p>
          </div>
          <div>
            <img src="/assets/mocks/blogs/gifts/blog1.png" alt="" />
          </div>
        </div>
        <div className={css.contentLeftRight}>
          <div>
            <h3 className={css.title}>
              <a href="#" className={css.link}>
                SINH NHẬT TƯNG BỪNG - MUÔN RỪNG QUÀ TẶNG
              </a>
            </h3>
            <span className={css.date}>17:56:46 09/04/2019</span>
            <p className={css.des}>
              🎊SINH NHẬT TƯNG BỪNG - MUÔN RỪNG QUÀ TẶNG🎊👉 Chỉ có duy nhất tại Bluewind
            </p>
          </div>
          <div>
            <img src="/assets/mocks/blogs/gifts/blog2.jpg" alt="" />
          </div>
        </div>
      </div>

      <div className={css.row}>
        <div className={css.content}>
          <img src="/assets/mocks/blogs/gifts/blog3.jpg" alt="" />
          <h3>
            <a href="#" className={css.styleH3}>
              Xả hàng cực sốc từ #39k
            </a>
          </h3>
          <span className={css.date}>17:34:51 29/05/2019</span>
        </div>
        <div className={css.content}>
          <img src="/assets/mocks/blogs/gifts/blog4.jpg" alt="" />
          <h3>
            <a href="#" className={css.styleH3}>
              Tặng 30000 xu tương đương 30k cho đơn hàng đầu tiên tại Shopee Bluewind.vn
            </a>
          </h3>
          <span className={css.date}>12:04:25 14/05/2019</span>
        </div>
        <div className={css.content}>
          <img src="/assets/mocks/blogs/gifts/blog5.jpg" alt="" />
          <h3>
            <a href="#" className={css.styleH3}>
              CHƯƠNG TRÌNH COMBO SẢN PHẨM CHO HÓA ĐƠN ONLINE
            </a>
          </h3>
          <span className={css.date}>16:44:23 10/04/2019</span>
        </div>
        <div className={css.content}>
          <img src="/assets/mocks/blogs/gifts/blog6.jpg" alt="" />
          <h3>
            <a href="#" className={css.styleH3}>
              CHƯƠNG TRÌNH COMBO SẢN PHẨM CHO HÓA ĐƠN TẠI CỬA HÀNG
            </a>
          </h3>
          <span className={css.date}>16:26:59 10/04/2019</span>
        </div>
        <div className={css.content}>
          <img src="/assets/mocks/blogs/gifts/blog1.png" alt="" />
          <h3>
            <a href="#" className={css.styleH3}>
              MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC TỪ 99K
            </a>
          </h3>
          <span className={css.date}>13:35:31 10/04/2019</span>
        </div>
        <div className={css.content}>
          <img src="/assets/mocks/blogs/gifts/blog2.jpg" alt="" />
          <h3>
            <a href="#" className={css.styleH3}>
              SINH NHẬT TƯNG BỪNG - MUÔN RỪNG QUÀ TẶNG
            </a>
          </h3>
          <span className={css.date}>17:56:46 09/04/2019</span>
        </div>
      </div>
    </div>
  );
};

export default BlogGift;
