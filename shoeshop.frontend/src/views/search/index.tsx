import React, { useMemo, useCallback, useState, useRef, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

// styles
import css from './style.module.scss';

// components
import Button from 'antd/lib/button';
import Drawer from 'antd/lib/drawer';
import Layout from '../../components/layout';
import InfinityScroll from '../../components/infinity-scroll';
import Breadcrumb, { BreadcumbItem } from '../../components/breadcrumb';
import MenuFilterOption from '../../components/category/menu-filter-options';
import LoadingIcon from '../../components/loading-icon';
import SortOptionBar from '../../components/category/sort-option-bar';
import ProductItem from '../../components/category/product-category-item';

// redux
import * as AppActions from '@actions/app-action';
import { initializeStore } from '@redux/with-redux';
import { useSelector, useDispatch } from 'react-redux';
import notification from 'antd/lib/notification';
import { RootState } from '../../redux/stores/configure-store';

// enums
import { AppRouteEnums } from '../../enums/app-route.enum';

// types
import { QueryToProductsArgs } from '../../types/gtypes';

interface Props {}

const Search: React.FC<Props> = (props) => {
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const products = useSelector((store: RootState) => store.appState.categoryProducts);
  const getProductsLoading = useSelector((store: RootState) =>
    AppActions.listProductCategoryAction.isPending(store),
  );

  const [page, setPage] = useState(1);
  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  const [argsToQuery, setArgsToQuery] = useState<QueryToProductsArgs>();

  const menuFilterRef = useRef();
  const sortRef = useRef();
  const route = useRouter();
  const dispatch = useDispatch();

  const keyword = useMemo(() => String(route.query.keyword || ''), [route]);

  useEffect(() => {
    if (menuFilterRef && menuFilterRef.current && (menuFilterRef.current as any).reset) {
      (menuFilterRef.current as any).reset();
    }
    if (sortRef && sortRef.current && (sortRef.current as any).reset) {
      (sortRef.current as any).reset();
    }
  }, [menuFilterRef, sortRef]);

  const loadProducts = useCallback(async () => {
    if (!keyword) {
      await dispatch(
        AppActions.listProductCategoryAction({
          page: 1,
          filters: {},
        }),
      );
    }
    await dispatch(
      AppActions.listProductCategoryAction({
        page: 1,
        filters: {
          name: String(keyword),
        },
      }),
    );
  }, [keyword]);

  useEffect(() => {
    loadProducts();
  }, [keyword]);

  const onLoadMore = useCallback(async () => {
    await dispatch(
      AppActions.listProductCategoryAction({
        page: page + 1,
        filters: {
          name: keyword,
          colors: argsToQuery?.colors,
          sizes: argsToQuery?.sizes,
          price:
            argsToQuery?.priceGte !== undefined && argsToQuery?.priceLte
              ? {
                  start: argsToQuery.priceGte,
                  end: argsToQuery.priceLte,
                }
              : undefined,
        },
        sorts: argsToQuery?.orderBy,
      }),
    );
    setPage(page + 1);
  }, [page, argsToQuery, keyword]);

  const onRefetch = useCallback(
    async (args: QueryToProductsArgs) => {
      const objArgs = Object.assign(argsToQuery || {}, args);
      setArgsToQuery(objArgs);
      const { colors, sizes, priceGte, priceLte, orderBy } = objArgs;
      try {
        await dispatch(
          AppActions.listProductCategoryAction({
            page,
            filters: {
              name: keyword,
              colors,
              sizes,
              price:
                priceGte !== undefined && priceLte
                  ? {
                      start: priceGte,
                      end: priceLte,
                    }
                  : undefined,
            },
            sorts: orderBy || '-priority',
          }),
        );
      } catch (err) {
        notification.error({
          message: String(err).replace(/Error: /g, ''),
          placement: 'bottomRight',
        });
      }
    },
    [page, argsToQuery, keyword],
  );

  const listProductMemo = useMemo(() => {
    return products.items.map((eage, index) => <Product key={index} product={eage} />);
  }, [products]);

  const onOpenCloseMenu = useCallback(() => {
    document.documentElement.scrollTop = 0;
    setOpenFilterMenu(true);
  }, []);

  const onCloseFilterMenu = useCallback(() => setOpenFilterMenu(false), []);

  return (
    <Layout backUrl={AppRouteEnums.HOME} title="Tìm kiếm">
      <div className={isMobile ? css.contentMobile : css.contentDesktop}>
        {!isMobile && (
          <Breadcrumb
            items={[
              { title: 'Trang chủ', url: '/' },
              { title: 'Tìm kiếm', url: '/search' },
            ]}
          />
        )}
        <div className={css.content}>
          {!isMobile && (
            <div className={css.leftMenu}>
              <MenuFilterOption onChange={onRefetch} ref={menuFilterRef} />
            </div>
          )}
          <div className={css.rightContent}>
            <div className={css.title}>
              {isMobile && (
                <div className={css.filter} onClick={onOpenCloseMenu}>
                  Filter
                </div>
              )}
            </div>
            {!isMobile && (
              <SortOptionBar
                onChange={onRefetch}
                totalProductReview={products.meta.itemCount}
                ref={sortRef}
              />
            )}
            {isMobile ? (
              <InfinityScroll
                isLoading={getProductsLoading}
                loadMore={onLoadMore}
                hasMore={products.meta.totalPages > 1}
              >
                <div className={css.listProductMobile}>
                  {products.items.map((eage, index) => (
                    <Product key={index} product={eage} />
                  ))}
                </div>
              </InfinityScroll>
            ) : (
              <>
                <div className={css.listProduct}>{listProductMemo}</div>
                {products.meta.totalPages > 1 && (
                  <div className={css.loadMoreBtnArea}>
                    <Button className={css.loadMoreBtn} onClick={onLoadMore}>
                      Xem thêm
                    </Button>
                  </div>
                )}
              </>
            )}
            {getProductsLoading && (
              <div className={css.loadingArea}>
                <LoadingIcon />
              </div>
            )}
          </div>
        </div>
      </div>
      {isMobile && (
        <Drawer
          visible={openFilterMenu}
          placement="left"
          closable={false}
          bodyStyle={{
            padding: 0,
          }}
          width="100%"
          maskStyle={{
            backgroundColor: 'transparent',
          }}
          className={css.mobileMenu}
        >
          <MenuFilterOption onChange={onRefetch} onClose={onCloseFilterMenu} />
        </Drawer>
      )}
    </Layout>
  );
};

const Product: React.FC<{ product: REDUX_STORE.Product }> = ({ product }) => {
  return (
    <Link href={`/shop/${product.slug.trim()}/${product.code}`}>
      <a className={css.productLink}>
        <ProductItem
          data={{
            category: product.categories[0].name,
            originalPrice: product.currentPrice,
            currentPrice: product.discountPrice || product.currentPrice,
            title: product.name,
            thumbnail: product.thumbnail || '',
          }}
        />
      </a>
    </Link>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;
  dispatch(AppActions.detectMobile(userAgent));

  return {
    props: {
      title: 'Search - ',
      initialReduxState: reduxStore.getState(),
    },
  };
};

export default Search;
