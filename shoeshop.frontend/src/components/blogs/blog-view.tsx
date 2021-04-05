import React from 'react';
import css from './style.module.scss';
import moment from 'moment';

// enums
import { AppRouteEnums } from '../../enums/app-route.enum';

interface Props {
  blog: REDUX_STORE.Blog;
}

const BlogView: React.FC<Props> = (props) => {
  const { blog } = props;

  return (
    <div className={css.block}>
      <div className={css.meta}>
        <div className={css.date}>
          <img src="/assets/mocks/blogs/calendar.svg" alt="" />
          <span>{moment(blog.createdAt).format('YYYY-MM-DD HH:MM')}</span>
        </div>
      </div>

      <h1>
        <a className={css.title} href={`${AppRouteEnums.BLOGS}/read/${blog.slug}`}>
          {blog.title}
        </a>
      </h1>
      <p className={css.para}>{blog.shortDescription}</p>
    </div>
  );
};

export default BlogView;
