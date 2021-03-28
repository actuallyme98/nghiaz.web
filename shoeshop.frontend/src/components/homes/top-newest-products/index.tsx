import React, { useMemo, useEffect, useCallback, useState } from 'react';

// styles
import css from './style.module.scss';

// components
import LoadingIcon from '../../loading-icon';
import Button from 'antd/lib/button';
import ProductItem from '../product-item';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';
import * as AppActions from '@actions/app-action';

interface IProps {}

const TopNewestProducts: React.FC<IProps> = (props) => {
  const products = useSelector((store: RootState) => store.appState.specialProducts);
  const getProductsLoading = useSelector((store: RootState) =>
    AppActions.listProductSpecialsAction.isPending(store),
  );
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AppActions.listProductSpecialsAction());
  }, []);

  const onLoadMore = useCallback(async () => {
    await dispatch(AppActions.listProductSpecialsAction(page + 1));
    setPage(page + 1);
  }, [page]);

  const listProducts = useMemo(() => {
    return products.items.map((product, index) => (
      <div key={index} className={css.listItem}>
        <a className={css.productLink} href={`/shop/${product.slug.trim()}/${product.code.trim()}`}>
          <ProductItem product={product} />
        </a>
      </div>
    ));
  }, [products]);

  return (
    <div className={css.container}>
      <div className={css.heading}>SẢN PHẨM ĐẶC BIỆT</div>
      <div className={css.listArea}>{listProducts}</div>
      {products.meta.totalPages > 1 && (
        <div className={css.loadMoreArea} onClick={onLoadMore}>
          <Button className={css.loadMoreBtn}>Xem thêm</Button>
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

export default TopNewestProducts;
