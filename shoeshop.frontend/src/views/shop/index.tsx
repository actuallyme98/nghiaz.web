import React, { useMemo } from 'react';
import { GetServerSideProps } from 'next';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// components
import Layout from '../../components/layout';
import Breadcrumb, { BreadcumbItem } from '../../components/breadcrumb';
import MediaGallery from '../../components/shops/media-gallery';
import ProductInformation from '../../components/shops/product-information';
import ProductDetails from '../../components/shops/product-details';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';
import * as AppActions from '@actions/app-action';
import { initializeStore } from '@redux/with-redux';

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

interface Props {}

const Shop: React.FC<Props> = (props) => {
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);

  // mocks
  const product = true;
  const breadcrumbs = useMemo(() => [...BREADCRUMB_ITEMS], []);

  return (
    <Layout>
      {product && (
        <div className={isMobile ? css.contentMobile : css.contentDesktop}>
          {!isMobile && <Breadcrumb items={breadcrumbs} />}
          <div className={css.wrap}>
            <div className={css.left}>
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
          {/* {!isMobile && <ListRelatedProduct
        products={product.relatedProducts.edges.map(edge => {
          const p = edge!.node!;
          return {
            id: p.id,
            pk: p.pk,
            slug: p.slug,
            category: 'MOCK',
            title: p.name,
            currentPrice: p.currentPrice || 0,
            originalPrice: p.price,
            thumbnail: p.thumbnail || ''
          };
        })}
      />} */}
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
      )}
      <div className="m-5 text-center">Facebook comment come here ...</div>
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
      title: 'Sản phẩm -',
    },
  };
};

export default Shop;
