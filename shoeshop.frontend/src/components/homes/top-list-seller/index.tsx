import React, { useCallback, useEffect, useMemo, useState } from 'react';

// styles
import css from './style.module.scss';

// components
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import LoadingIcon from '../../loading-icon';
import Button from 'antd/lib/button';
import ProductItem from '../product-item';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';
import * as AppActions from '@actions/app-action';

interface IProps {}

const TopListSeller: React.FC<IProps> = (props) => {
  const products = useSelector((store: RootState) => store.appState.sellWellProducts);
  const getProductsLoading = useSelector((store: RootState) =>
    AppActions.listProductSellWellsAction.isPending(store),
  );
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AppActions.listProductSellWellsAction());
  }, []);

  const onLoadMore = useCallback(async () => {
    await dispatch(AppActions.listProductSellWellsAction(page + 1));
    setPage(page + 1);
  }, [page]);

  const listProducts = useMemo(() => {
    return products.items.map((product, index) => (
      <Col key={index} className={css.listItem} xs={24} sm={12} md={8} xl={6}>
        <a className={css.productLink} href={`/shop/${product.slug.trim()}/${product.code.trim()}`}>
          <ProductItem
            product={{
              id: product.id as any,
              category: '/giay-nam',
              currentPrice: product.discountPrice,
              originalPrice: product.currentPrice,
              pk: 1,
              thumbnail: product.thumbnail,
              title: product.name,
            }}
          />
        </a>
      </Col>
    ));
  }, [products]);

  return (
    <div className={css.container}>
      <div className={css.heading}>SẢN PHẨM BÁN CHẠY</div>
      <Row className={css.listArea}>{listProducts}</Row>
      {products.meta.totalPages > 1 && (
        <div className={css.loadMoreArea}>
          <Button className={css.loadMoreBtn} onClick={onLoadMore}>
            Xem thêm
          </Button>
        </div>
      )}
      {getProductsLoading && (
        <div className={css.loadingArea}>
          <LoadingIcon />
        </div>
      )}
    </div>
  );
};

export default TopListSeller;
