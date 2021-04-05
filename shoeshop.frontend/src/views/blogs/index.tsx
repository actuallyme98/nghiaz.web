import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

// styles
import css from './style.module.scss';

// components
import Layout from '../../components/layout';
import BlogView from '../../components/blogs/blog-view';
import LoadingIcon from '../../components/loading-icon';
import Button from 'antd/lib/button';
import Select from 'antd/lib/select';

// redux
import * as AppActions from '@actions/app-action';
import { initializeStore } from '@redux/with-redux';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';

// enums
import { AppRouteEnums } from '../../enums/app-route.enum';

interface Props {}

const Blogs: React.FC<Props> = (props) => {
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState<SHOES_API.SortBlogDTO>('-createdAt');

  const route = useRouter();
  const dispatch = useDispatch();

  const blogsPaging = useSelector((store: RootState) => store.appState.blogs);
  const blogCategories = useSelector((store: RootState) => store.appState.blogCategories);

  const getBlogsPending = useSelector((store: RootState) =>
    AppActions.listBlogsAction.isPending(store),
  );
  const getBlogCategoriesPending = useSelector((store: RootState) =>
    AppActions.listBlogCategoriesAction.isPending(store),
  );

  const blogs = useMemo(() => blogsPaging.items, [blogsPaging]);
  const hasMore = useMemo(() => blogsPaging.meta.totalPages > 1, [blogsPaging]);
  const category = useMemo(() => {
    const categoryQuery = route.query.category;
    return categoryQuery ? String(categoryQuery) : '';
  }, [route]);

  useEffect(() => {
    const filters = category ? { category } : {};
    dispatch(
      AppActions.listBlogsAction({
        paging: {
          page: 1,
        },
        filters,
      }),
    );
  }, [route, category]);

  const onOrderByChange = useCallback(
    async (value: any) => {
      setOrderBy(value);
      const filters = category ? { category } : {};
      await dispatch(
        AppActions.listBlogsAction({
          paging: {
            page,
          },
          filters,
          sort: value,
        }),
      );
    },
    [page, category],
  );

  const onLoadMore = useCallback(async () => {
    const filters = category ? { category } : {};
    await dispatch(
      AppActions.listBlogsAction({
        paging: {
          page: page + 1,
        },
        filters,
        sort: orderBy,
      }),
    );
    setPage(page + 1);
  }, [page, category, orderBy]);

  const listBlogs = useMemo(() => {
    if (blogs.length === 0) {
      return <div className="text-center mt-5">Không tìm thấy bài viết nào</div>;
    }
    return blogs.map((blog, index) => <BlogView key={index} blog={blog} />);
  }, [blogs]);

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

  return (
    <Layout backUrl={AppRouteEnums.HOME} title="Bài viết">
      <div className={css.container}>
        <div className={css.root}>
          <div className={css.text}>
            Tìm thấy&#160;<div className={css.number}>{blogsPaging.meta.itemCount}</div> &#160;bài
            viết
          </div>
          <div className={css.sort}>
            <div className={css.textSort}>Sắp xếp theo</div>
            <Select
              className={css.optionSelect}
              onChange={onOrderByChange}
              value={orderBy}
              suffixIcon={<img className={css.imgDown} src="/assets/icons/down-arrow.svg" />}
            >
              {sortOptions.map((option, index) => (
                <Select.Option key={index} className={css.option} value={option.value}>
                  <div className={css.option}>{option.label}</div>
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <div className={css.contentContainer}>
          <div className={css.contentLeft}>
            {listBlogs}
            {hasMore && (
              <div className={css.loadMoreBtnArea}>
                <Button className={css.loadMoreBtn} onClick={onLoadMore}>
                  Xem thêm
                </Button>
              </div>
            )}
            {getBlogsPending && (
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
      </div>
    </Layout>
  );
};

const sortOptions = [
  {
    id: 1,
    label: 'Mới nhất',
    value: '-createdAt',
  },
  {
    id: 2,
    label: 'Cũ nhất',
    value: 'createdAt',
  },
];

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

export default Blogs;
