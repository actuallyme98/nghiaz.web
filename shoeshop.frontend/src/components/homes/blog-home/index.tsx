import React, { useMemo } from 'react';

// styles
import css from './style.scss';

// components
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Slider, { Settings } from 'react-slick';

interface IProps {}

const BlogHome: React.FC<IProps> = (props) => {
  const blogSliders = useMemo(() => {
    return blogs.map((blog, index) => (
      <a className={css.leftItem} href="/" target="_blank" key={index}>
        <img src={blog.thumnail} alt="" />
        <div className={css.specialArea}>
          <div className={css.specialTag}>TIN TỨC</div>
          <div className={css.specialTitle}>{blog.title}</div>
        </div>
      </a>
    ));
  }, []);

  const listBlogs = useMemo(() => {
    return blogs.map((blog, index) => (
      <a className={css.blogContainer} href="/" key={index}>
        <div className={css.thumbnail}>
          <img src={blog.thumnail} alt="" />
        </div>
        <div className={css.blogContentArea}>
          <div className={css.blogHeading}>{blog.title}</div>
          <div className={css.createdDate}>{blog.date}</div>
          <div className={css.shortDescription}>{blog.shortDescription}</div>
        </div>
      </a>
    ));
  }, []);

  return (
    <div className={css.container}>
      <div className={css.heading}>TIN TỨC MỖI NGÀY</div>
      <Row className={css.gridContainer}>
        <Col xs={24} sm={18} md={14}>
          <Slider {...settings}>{blogSliders}</Slider>
        </Col>
        <Col xs={24} sm={18} md={10} className={css.gridItem}>
          <div className={css.rightHeading}>BÀI ĐƯỢC XEM NHIỀU NHẤT</div>
          {listBlogs}
        </Col>
      </Row>
    </div>
  );
};

export default BlogHome;

const settings: Settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
};

const blogs = Array.from({ length: 4 }, (_, index) => ({
  thumnail: `/assets/mocks/blogs/blog${index + 1}.jpg`,
  title: 'Bluewind – Định hướng phong cách riêng cho các cặp đôi',
  date: '17:01:51 23/02/2021',
  shortDescription:
    'Giày đôi là món quà giúp gửi gắm tình yêu bền vững, sự quan tâm nhẹ nhàng cho đối phương.',
}));
