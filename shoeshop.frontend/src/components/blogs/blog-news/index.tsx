import React, { useMemo } from 'react';

import Slider, { Settings } from 'react-slick';
import css from './style.module.scss';
interface IProps {}

const BlogNew: React.FC<IProps> = (props) => {
  return (
    <div className={css.container}>
      <div className={css.heading}>
        <a href="#" className={css.link}>
          TIN TỨC
        </a>
      </div>
      <div className={css.col}>
        <div className={css.contentLeftRight}>
          <div>
            <h3 className={css.title}>
              <a href="#" className={css.link}>
                Bật mí địa chỉ mua giày thể thao nữ giá rẻ
              </a>
            </h3>
            <span className={css.date}>14:46:43 16/10/2020</span>
            <p className={css.des}>
              Phụ nữ sinh ra với đặc quyền làm đẹp, và đương nhiên, chúng ta phải luôn đẹp mọi lúc
              mọi nơi. Cùng với sự phát triển của xã hội, hình ảnh chị em trong các buổi tập gym,
              chạy thể dục xuất hiện nhiều hơn bao giờ hết. Bởi vậy, nhu cầu tìm kiếm giày thể thao
              cho đôi chân lại càng tăng lên. Vậy, bạn có biết đâu là địa chỉ uy tín cho sự lựa chọn
              giày thể thao đẹp, giá rẻ, đừng bỏ qua bài viết hôm nay.
            </p>
            <div>
              <div className={css.icon}>
                <img src="/assets/icons/like.svg" alt="" />
                <button className={css.btnIcon} type="submit">
                  Thích 0
                </button>
              </div>
              <button className={css.btn} type="submit">
                Chia sẻ
              </button>
            </div>
          </div>
          <div>
            <img src="/assets/mocks/blogs/news/blog3.jpg" alt="" />
          </div>
        </div>
        <div className={css.contentLeftRight}>
          <div>
            <h3 className={css.title}>
              <a href="#" className={css.link}>
                Mua giày thể thao chất lượng tốt,giá cả phải chăng
              </a>
            </h3>
            <span className={css.date}>9:51:05 16/10/2020</span>
            <p className={css.des}>
              Trong tủ đồ của các cô nàng, chắc chắn không thể thiếu những đôi giày thể thao cá
              tính, sành điệu. Chẳng ai có thể đi giày cao gót cả tuần, bởi đôi chân cũng cần nghỉ
              ngơi. Vậy, bạn có biết mua ở đâu đôi giày chất lượng hàng đầu mà giá thành phải chăng?
            </p>
            <div>
              <div className={css.icon}>
                <img src="/assets/icons/like.svg" alt="" />
                <button type="submit" className={css.btnIcon}>
                  Thích 0
                </button>
              </div>
              <button type="submit" className={css.btn}>
                Chia sẻ
              </button>
            </div>
          </div>
          <div>
            <img src="/assets/mocks/blogs/news/blog5.jpg" alt="" />
          </div>
        </div>
      </div>

      <div className={css.row}>
        <div className={css.content}>
          <img src="/assets/mocks/blogs/news/blog1.jpg" alt="" />
          <h3>
            <a href="#" className={css.styleH3}>
              10 cách buộc dây giày nhanh,đơn giản
            </a>
          </h3>
          <span className={css.date}>15:36:21 25/02/2021</span>
        </div>
        <div className={css.content}>
          <img src="/assets/mocks/blogs/news/blog2.jpg" alt="" />
          <h3>
            <a href="#" className={css.styleH3}>
              Bluewin - Định hướng phong cách riêng cho các cặp đôi
            </a>
          </h3>
          <span className={css.date}>17:01:51 23/02/2021</span>
        </div>
        <div className={css.content}>
          <img src="/assets/mocks/blogs/news/blog3.jpg" alt="" />
          <h3>
            <a href="#" className={css.styleH3}>
              6 CÁCH SỬA DÂY GIÀY NHỎ THÀNH LỚN HƠN
            </a>
          </h3>
          <span className={css.date}>10:10:31 12/1/2021</span>
        </div>
        <div className={css.content}>
          <img src="/assets/mocks/blogs/news/blog4.jpg" alt="" />
          <h3>
            <a href="#" className={css.styleH3}>
              Tín đồ sneaker không thể bỏ qua bài viết này
            </a>
          </h3>
          <span className={css.date}>13:21:28 19/12/2020</span>
        </div>
        <div className={css.content}>
          <img src="/assets/mocks/blogs/news/blog6.jpg" alt="" />
          <h3>
            <a href="#" className={css.styleH3}>
              IDEA MIX ĐỒ VỚI GIÀY THỂ THAO TREND 2020
            </a>
          </h3>
          <span className={css.date}>17:19:09 07/12/2020</span>
        </div>
        <div className={css.content}>
          <img src="/assets/mocks/blogs/news/blog7.jpg" alt="" />
          <h3>
            <a href="#" className={css.styleH3}>
              Bật mí địa chỉ mua giày thể thao nữ giá rẻ hàng đầu toàn quốc
            </a>
          </h3>
          <span className={css.date}>14:46:43 16/10/2020</span>
        </div>
      </div>
    </div>
  );
};

export default BlogNew;
