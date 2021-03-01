import React, { useMemo, useCallback, useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RouteConfigComponentProps } from 'react-router-config';
import { Link } from 'react-router-dom';

// components
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Layout from '../../components/layout';
import Breadcrumb, { BreadcumbItem } from '../../components/breadcumb';
import MenuFilterOption from '../../components/category/menu-filter-options';
import LoadingIcon from '../../components/loading-icon';
import SortOptionBar from '../../components/category/sort-option-bar';
import ProductItem from '../../components/category/product-category-item';

// redux
import { useSelector } from 'react-redux';
import { IStore } from '../../redux/stores/configure-store';

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

const Home: React.FC<RouteConfigComponentProps<{ slug: string }>> = (props) => {
  const isMobile = useSelector((store: IStore) => store.appState.isMobile);
  const classes = useStyles();
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

  const onOpenCloseMenu = useCallback(() => {
    document.documentElement.scrollTop = 0;
    setOpenFilterMenu(true);
  }, []);

  const onCloseFilterMenu = useCallback(() => setOpenFilterMenu(false), []);

  const breadcrumbs = useMemo(() => [...BREADCRUMB_ITEMS], []);

  return (
    <Layout>
      <Container maxWidth="lg">
        <div className={classes.container}>
          <div className={classes.banner}>
            <img src="/assets/mocks/banners/banner1.png" alt="" />
          </div>
          <div className={classes.breadcumbWrap}>
            <Breadcrumb items={breadcrumbs} />
          </div>

          <div className={classes.content}>
            <div className={classes.leftMenu}>
              <MenuFilterOption ref={menuFilterRef} />
            </div>

            <div className={classes.rightContent}>
              <div className={classes.title}>
                <div>Giày nam</div>
                {isMobile && (
                  <div className={classes.filter} onClick={onOpenCloseMenu}>
                    Filter
                  </div>
                )}
              </div>
              {/* {category.image && (
                <img alt={category.name} className={classes.banner} src={category.image} />
              )} */}
              <Button className={classes.openFilterBtn} onClick={onOpenCloseMenu}>
                Filter
              </Button>
              <SortOptionBar totalProductReview={0} ref={sortRef} />
              <div className={classes.listProduct}>
                {products.map((eage, index) => (
                  <Product key={index} product={eage} />
                ))}
              </div>
              <div className={classes.loadMoreBtnArea}>
                <Button className={classes.loadMoreBtn}>Xem thêm</Button>
              </div>
              {getProductsLoading && (
                <div className={classes.loadingArea}>
                  <LoadingIcon />
                </div>
              )}
            </div>
          </div>
        </div>
        <Drawer open={openFilterMenu} onClose={onCloseFilterMenu} className={classes.mobileMenu}>
          <MenuFilterOption onClose={onCloseFilterMenu} />
        </Drawer>
      </Container>
    </Layout>
  );
};

const Product: React.FC<{ product: any }> = ({ product }) => {
  const classes = useStyles();
  return (
    <Link className={classes.productLink} to="/shop/giay-the-thao-nam">
      <ProductItem
        data={{
          category: '',
          originalPrice: product.price,
          currentPrice: product.currentPrice || product.price,
          title: product.name,
          thumbnail: product.thumbnail ? product.thumbnail : '',
        }}
      />
    </Link>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    fontFamily: 'SFUIDisplay',
  },
  banner: {
    '& img': {
      width: '100%',
    },
  },
  breadcumbWrap: {
    padding: '20px 0',
  },
  content: {
    display: 'flex',
    marginTop: 25,
  },
  leftMenu: {
    width: 230,
    marginRight: 35,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  rightContent: {
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  listProduct: {
    marginTop: 26,
    display: 'grid',
    gap: 10,
    gridTemplateColumns: 'repeat(4, 1fr)',
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      gridTemplateColumns: 'repeat(auto-fit, minmax(145px, 1fr))',
      gridGap: 4,
    },
  },
  title: {
    fontSize: 20,
    color: '#4a4a4a',
    marginBottom: 10,
    lineHeight: 1,
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 18,
      fontWeight: 600,
      color: '#4a4a4a',
      marginBottom: 20,
    },
  },
  wrapPagination: {
    textAlign: 'center',
    marginTop: 20,
  },
  pagination: {
    margin: 'auto',
  },
  loadMoreBtnArea: {
    marginTop: 20,
    textAlign: 'center',
  },
  loadMoreBtn: {
    border: '1px solid #e8bba7',
    color: '#f16728',
    backgroundColor: '#fff5f0',
    boxShadow: '0 2px 0 rgb(0 0 0 / 2%)',
    padding: '0 15px',
    height: 36,
  },
  openFilterBtn: {
    border: '1px solid #e8bba7',
    color: '#f16728',
    backgroundColor: '#fff5f0',
    boxShadow: '0 2px 0 rgb(0 0 0 / 2%)',
    padding: '0 15px',
    height: 36,
    width: 100,
    margin: '10px 0',
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  loadingArea: {
    marginTop: 20,
    textAlign: 'center',
  },
  filter: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f16728',
    '&::after': {
      content: '',
      display: 'inline-block',
      width: 6.7,
      height: 10,
      backgroundSize: 'contain',
      marginLeft: 3.8,
      backgroundRepeat: 'no-repeat',
      backgroundImage: 'url("/assets/icons/right-arrow-red.svg")',
    },
  },
  btnReset: {
    width: 160,
    borderRadius: 2,
    border: 'solid 1px #d2d2d2',
    backgroundColor: '#fcf7f5',
    fontSize: 15,
    fontWeight: 600,
    color: '#848484',
  },
  btnApply: {
    width: 160,
    borderRadius: 2,
    border: 'solid 1px #d05922',
    backgroundColor: '#f16728',
    fontSize: 15,
    fontWeight: 600,
    marginLeft: 20,
    '&:focus': {
      backgroundColor: '#f16728',
    },
  },
  mobileMenu: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bottom: {
    display: 'flex',
    justifyContent: 'center',
    padding: '0 20px',
  },
  productLink: {
    textDecoration: 'none',
  },
}));

export default Home;
