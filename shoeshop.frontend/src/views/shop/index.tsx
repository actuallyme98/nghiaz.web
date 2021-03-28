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

interface Props {}

const Shop: React.FC<Props> = (props) => {
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const loading = useSelector((store: RootState) => AppActions.getProductAction.isPending(store));
  const [product, setProduct] = useState<REDUX_STORE.Product>();
  const router = useRouter();
  const dispatch = useDispatch();

  const getProduct = useCallback(async () => {
    const { slug }: any = router.query;
    if (!slug[1]) {
      return router.push('/');
    }
    const response = await dispatch(AppActions.getProductAction(slug[1]));
    if (response) {
      setProduct(response);
    }
  }, []);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Layout
      backUrl={AppRouteEnums.HOME}
      title={'Sản phẩm - ' + (product?.name || '')}
      loading={loading}
    >
      {product ? (
        <div className={isMobile ? css.contentMobile : css.contentDesktop}>
          {!isMobile && (
            <Breadcrumb
              items={[
                { title: 'Trang chủ', url: '/' },
                { title: product.categories?.[0].name, url: product.categories?.[0].slug },
              ]}
            />
          )}
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
      ) : (
        <div className="m-5 text-center">Sản phẩm không tồn tại</div>
      )}
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

export default Shop;
