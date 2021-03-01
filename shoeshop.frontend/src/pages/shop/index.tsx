import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RouteConfigComponentProps } from 'react-router-config';
import clsx from 'clsx';

// components
import Container from '@material-ui/core/Container';
import Layout from '../../components/layout';
import Breadcrumb, { BreadcumbItem } from '../../components/breadcumb';
import MediaGallery from '../../components/shop/media-gallery';
import ProductInformation from '../../components/shop/product-information';
import ProductDetails from '../../components/shop/product-details';

// redux
import { useSelector } from 'react-redux';
import { IStore } from '../../redux/stores/configure-store';

// mocks
const BREADCRUMB_ITEMS: BreadcumbItem[] = [
  { title: 'Trang chủ', url: '/' },
  { title: 'Giày nam', url: '/shop/giay-the-thao-nam' },
];

const mediaFiles = [
  {
    thumbnail: '/assets/mocks/products/product2.jpg',
    type: 'video',
    url: 'https://www.youtube.com/embed/ToCfRdeH5X8',
  },
  {
    thumbnail: '/assets/mocks/products/product2.jpg',
    type: 'video',
    url: 'https://www.youtube.com/embed/7vR2lPExR00',
  },
  {
    thumbnail: '/assets/mocks/products/product2.jpg',
    type: 'video',
    url: 'https://www.youtube.com/embed/nLzyTNd-j3M',
  },
  {
    thumbnail: '/assets/mocks/products/product2.jpg',
    type: 'video',
    url: 'https://www.youtube.com/embed/X_6rIASGJCQ',
  },
  {
    thumbnail: '/assets/mocks/products/product2.jpg',
    type: 'video',
    url: 'https://www.youtube.com/embed/sWMhBC8_Wcs',
  },
  {
    thumbnail: '/assets/mocks/products/product2.jpg',
    type: 'video',
    url: 'https://www.youtube.com/embed/TsrfgJB6QD4',
  },
  {
    thumbnail: '/assets/mocks/products/product2.jpg',
    type: 'video',
    url: 'https://www.youtube.com/embed/xp8E3Wvqzf8',
  },
];

const Home: React.FC<RouteConfigComponentProps<any>> = (props) => {
  const classes = useStyles();
  const isMobile = useSelector((store: IStore) => store.appState.isMobile);

  const breadcrumbs = useMemo(() => [...BREADCRUMB_ITEMS], []);

  return (
    <Layout>
      <Container
        maxWidth="lg"
        className={clsx({
          [classes.contentDesktop]: !isMobile,
          [classes.contentMobile]: isMobile,
        })}
      >
        <div className={classes.breadcumbWrap}>
          <Breadcrumb items={breadcrumbs} />
        </div>
        <div className={classes.wrap}>
          <div className={classes.left}>
            <MediaGallery mediaFiles={mediaFiles} />
          </div>
          <div>
            <ProductInformation
              voucher="MOCK"
              data={{
                id: '',
                name: 'GIÀY THỂ THAO NỮ 68741 ĐỘN ĐẾ',
                sizes: [40, 41, 42, 43, 44],
                remain: 2,
                price: 10000000,
                currentPrice: 100000,
                colors: ['Trắng', 'Đen', 'Đỏ'],
                shortDescription:
                  'Kiểu dáng năng động, trẻ trung phù hợp với mọi tính chất công việc',
                thumbnail: '',
                isFavorite: false,
              }}
            />
          </div>
        </div>
        <div>
          <ProductDetails
            data={{
              sizes: [40, 41, 42, 43, 44],
              category: 'Giày nam',
              material: 'Vải',
              weight: 100,
              origin: 'China',
              colors: ['Trắng', 'Đen', 'Đỏ'],
              body: 'Chất liệu da lộn kết hợp vải lưới thoáng khí',
              sole: 'Bằng cao su non mềm cao 5cm chống trơn trượt, tạo độ ma sát tối đa',
            }}
          />
        </div>

        <div>Facebook comments will be down here ....</div>
      </Container>
    </Layout>
  );
};

const useStyles = makeStyles((theme) => ({
  content: {},
  breadcumbWrap: {
    padding: '10px 0',
  },
  contentDesktop: {
    boxSizing: 'border-box',
    margin: 'auto',
    backgroundColor: 'white',
  },
  wrap: {
    display: 'flex',
    padding: '40px 0 40px 0',
    [theme.breakpoints.down('md')]: {
      display: 'block',
      padding: 0,
    },
  },
  left: {
    paddingRight: 40,
    [theme.breakpoints.down('md')]: {
      padding: 0,
    },
  },
  contentMobile: {
    width: '100%',
    padding: '0px 0px 60px 0px',
    backgroundColor: '#eef0f6',
  },
}));

export default Home;
