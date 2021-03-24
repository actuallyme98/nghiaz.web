import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import clsx from 'clsx';
import { useRouter } from 'next/router';

// styles
import css from './style.module.scss';

// components
import Layout from '../../components/layout';
import Breadcrumb, { BreadcumbItem } from '../../components/breadcrumb';
import MediaGallery from '../../components/shops/media-gallery';
import ProductInformation from '../../components/shops/product-information';
import ProductDetails from '../../components/shops/product-details';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';
import * as AppActions from '@actions/app-action';
import { initializeStore } from '@redux/with-redux';

// enums
import { AppRouteEnums } from '../../enums/app-route.enum';

import { pathAvatar } from '../../helpers/app-util';

// mocks
const BREADCRUMB_ITEMS: BreadcumbItem[] = [
  { title: 'Trang chủ', url: '/' },
  { title: 'Giày nam', url: '/shop/giay-the-thao-nam' },
];

interface Props {}

const Shop: React.FC<Props> = (props) => {
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const [product, setProduct] = useState<REDUX_STORE.Product>();
  const breadcrumbs = useMemo(() => [...BREADCRUMB_ITEMS], []);
  const router = useRouter();
  const dispatch = useDispatch();

  const getProduct = useCallback(async () => {
    const { slug }: any = router.query;
    const response = await dispatch(AppActions.getProductAction(slug));
    if (response.data) {
      setProduct(response.data);
    } else {
      router.push('/');
    }
  }, []);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Layout backUrl={AppRouteEnums.HOME}>
      {product && (
        <div className={isMobile ? css.contentMobile : css.contentDesktop}>
          {!isMobile && <Breadcrumb items={breadcrumbs} />}
          <div className={css.wrap}>
            <div className={css.left}>
              <MediaGallery
                mediaFiles={product.images.map((image) => ({
                  thumbnail: pathAvatar(image.url),
                  type: 'image',
                  url: pathAvatar(image.url),
                }))}
              />
            </div>
            <div>
              <ProductInformation
                voucher="MOCK"
                data={{
                  id: product.id as any,
                  name: product.name,
                  sizes: product.sizes.map((x) => x.name),
                  remain: 2,
                  price: product.currentPrice,
                  currentPrice: product.discountPrice,
                  colors: product.colors.map((x) => x.name),
                  shortDescription: product.shortDescription,
                  thumbnail: product.thumbnail,
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
              sizes: product.sizes.map((x) => x.name),
              category: 'Giày nam',
              material: 'Vải',
              weight: 100,
              origin: 'China',
              colors: product.colors.map((x) => x.name),
              body: product.bodyDetail,
              sole: product.soleDetail,
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
      initialReduxState: reduxStore.getState(),
    },
  };
};

export default Shop;
