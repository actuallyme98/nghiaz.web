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

interface IProps {}

const TopListSeller: React.FC<IProps> = (props) => {
  const listProducts = useMemo(() => {
    return products.map((product, index) => (
      <Col key={index} className={css.listItem} xs={24} sm={12} md={6}>
        <a className={css.productLink} href="/shop/giay-the-thao-nam">
          <ProductItem product={product} />
        </a>
      </Col>
    ));
  }, []);

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

const products: IProductItem[] = Array.from({ length: 8 }, () => ({
  id: '1',
  category: '/',
  currentPrice: 1000,
  originalPrice: 100000,
  pk: 1,
  thumbnail: '/assets/mocks/products/product1.jpg',
  title: 'GIÀY VẢI DỆT NỮ 68742 GIÀY THỂ THAO NỮ 68741 ĐỘN ĐẾ',
}));
