import React, { useMemo } from 'react';

// styles
import css from './style.module.scss';

// components
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import ProductItem from '../product-item';

// types
import { IProductItem } from '../../../types/gtypes';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';

interface IProps {}

const TopListSeller: React.FC<IProps> = (props) => {
  const products = useSelector((store: RootState) => store.appState.products);

  const listProducts = useMemo(() => {
    return products.slice(0, 8).map((product, index) => (
      <Col key={index} className={css.listItem} xs={24} sm={12} md={8} xl={6}>
        <a className={css.productLink} href={`/shop/${product.slug}`}>
          <ProductItem
            product={{
              id: product.id as any,
              category: '/giay-nam',
              currentPrice: product.currentPrice,
              originalPrice: product.price,
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
      <div className={css.loadMoreArea}>
        <Button className={css.loadMoreBtn}>Xem thêm</Button>
      </div>
    </div>
  );
};

export default TopListSeller;
