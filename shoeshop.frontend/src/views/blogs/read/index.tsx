import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

// styles
import css from './style.module.scss';

// components
import Layout from '../../../components/layout';
import LoadingIcon from '../../../components/loading-icon';
import Button from 'antd/lib/button';

// redux
import * as AppActions from '@actions/app-action';
import { initializeStore } from '@redux/with-redux';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';

// enums
import { AppRouteEnums } from '../../../enums/app-route.enum';
import { pathUrl } from '~/helpers/app-util';

interface Props {}

const ReadBlog: React.FC<Props> = (props) => {
  const [blog, setBlog] = useState<REDUX_STORE.Blog>();

  const route = useRouter();
  const dispatch = useDispatch();

  const blogCategories = useSelector((store: RootState) => store.appState.blogCategories);

  const getBlogPending = useSelector((store: RootState) =>
    AppActions.getBlogAction.isPending(store),
  );
  const getBlogCategoriesPending = useSelector((store: RootState) =>
    AppActions.listBlogCategoriesAction.isPending(store),
  );

  const slug = useMemo(() => {
    const slugQuery = route.query.slug;
    return slugQuery ? String(slugQuery) : '';
  }, [route]);

  const loadBlog = useCallback(async () => {
    try {
      const data = await dispatch(AppActions.getBlogAction(slug));
      if (!data) {
        return route.push(AppRouteEnums.BLOGS);
      }
      setBlog(data);
    } catch (err) {
      route.push(AppRouteEnums.BLOGS);
    }
  }, [route, slug]);

  useEffect(() => {
    loadBlog();
  }, [route, slug]);

  const categoryMemo = useMemo(() => {
    if (blogCategories.length === 0) {
      return <div>Không có thể loại nào</div>;
    }
    return blogCategories.map((blog, index) => (
      <li key={index}>
        <a className={css.item} href={`${AppRouteEnums.BLOGS}?category=${blog.slug}`}>
          {blog.name}
        </a>
      </li>
    ));
  }, [blogCategories]);

  if (!blog) {
    return (
      <div className={css.loadingArea}>
        <LoadingIcon />
      </div>
    );
  }

  return (
    <Layout backUrl={AppRouteEnums.HOME} title={'Bài viết - ' + ''}>
      <div className={css.container}>
        <div className={css.contentLeft}>
          <div className={css.title}>{blog.title}</div>
          <div className={css.shortDescription}>- {blog.shortDescription} [...]</div>
          <div className={css.image}>
            <img src={pathUrl(blog.thumbnail)} alt="" />
          </div>

          <div className={css.content}>{blog.description}</div>

          {getBlogPending && (
            <div className={css.loadingArea}>
              <LoadingIcon />
            </div>
          )}
        </div>
        <div className={css.contentRight}>
          <div>
            <div className={css.header1}>Thể loại</div>
            {getBlogCategoriesPending ? <LoadingIcon /> : <ul>{categoryMemo}</ul>}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;
  dispatch(AppActions.detectMobile(userAgent));

  return {
    props: {
      initialReduxState: reduxStore.getState(),
    },
  };
};

export default ReadBlog;
