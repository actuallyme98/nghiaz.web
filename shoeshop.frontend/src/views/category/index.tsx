import React, { useMemo, useCallback, useState, useRef, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

// styles
import css from './style.module.scss';

// components
import Button from 'antd/lib/button';
import Drawer from 'antd/lib/drawer';
import Layout from '../../components/layout';
import Breadcrumb, { BreadcumbItem } from '../../components/breadcrumb';
import MenuFilterOption from '../../components/category/menu-filter-options';
import LoadingIcon from '../../components/loading-icon';
import SortOptionBar from '../../components/category/sort-option-bar';
import ProductItem from '../../components/category/product-category-item';

// redux
import * as AppActions from '@actions/app-action';
import { initializeStore } from '@redux/with-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/stores/configure-store';

// mocks
const BREADCRUMB_ITEMS: BreadcumbItem[] = [
  { title: 'Trang chủ', url: '/' },
  { title: 'Danh mục', url: '/category' },
];

const products: any[] = Array.from({ length: 14 }, (_, index) => ({
  price: 100000,
  currentPrice: 1000,
  thumbnail: '/assets/mocks/products/product1.jpg',
  name: 'GIÀY VẢI DỆT NỮ 68742 GIÀY THỂ THAO NỮ 68741 ĐỘN ĐẾ',
}));

const getProductsLoading = false;

interface Props {}

const Category: React.FC<Props> = (props) => {
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  const menuFilterRef = useRef();
  const sortRef = useRef();

  useEffect(() => {
    if (menuFilterRef && menuFilterRef.current && (menuFilterRef.current as any).reset) {
      (menuFilterRef.current as any).reset();
    }
    if (sortRef && sortRef.current && (sortRef.current as any).reset) {
      (sortRef.current as any).reset();
    }
  }, [menuFilterRef, sortRef]);

  const listProductMemo = useMemo(() => {
    return products.map((eage, index) => <Product key={index} product={eage} />);
  }, []);

  const onOpenCloseMenu = useCallback(() => {
    document.documentElement.scrollTop = 0;
    setOpenFilterMenu(true);
  }, []);

  const onCloseFilterMenu = useCallback(() => setOpenFilterMenu(false), []);

  const breadcrumbs = useMemo(() => [...BREADCRUMB_ITEMS], []);
  return (
    <Layout>
      <div className={isMobile ? css.contentMobile : css.contentDesktop}>
        {!isMobile && <Breadcrumb items={breadcrumbs} />}
        <div className={css.content}>
          {!isMobile && (
            <div className={css.leftMenu}>
              <MenuFilterOption ref={menuFilterRef} />
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
            {/* {category.image && <img alt={category.name} className={css.banner} src={category.image} />} */}
            {!isMobile && <SortOptionBar totalProductReview={0} ref={sortRef} />}
            {isMobile ? (
              // <InfinityScroll
              //   isLoading={getProductsLoading}
              //   loadMore={onLoadMore}
              //   hasMore={productsData?.products.pageInfo.hasNextPage}
              // >
              <div className={css.listProductMobile}>{listProductMemo}</div>
            ) : (
              // </InfinityScroll>
              <>
                <div className={css.listProduct}>{listProductMemo}</div>
                <div className={css.loadMoreBtnArea}>
                  <Button className={css.loadMoreBtn}>Xem thêm</Button>
                </div>
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
          <MenuFilterOption onClose={onCloseFilterMenu} />
        </Drawer>
      )}
    </Layout>
  );
};

const Product: React.FC<{ product: any }> = ({ product }) => {
  return (
    <Link href="/shop/giay-the-thao-nam">
      <a className={css.productLink}>
        <ProductItem
          data={{
            category: '',
            originalPrice: product.price,
            currentPrice: product.currentPrice || product.price,
            title: product.name,
            thumbnail: product.thumbnail ? product.thumbnail : '',
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
      title: 'Category - ',
      initialReduxState: reduxStore.getState(),
    },
  };
};

export default Category;
