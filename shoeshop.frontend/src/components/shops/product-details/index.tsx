import React, { useState } from 'react';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// components

// redux
import { useSelector } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';

interface Props {
  data: {
    category: string;
    colors: string[];
    body?: string;
    sole?: string;
    origin: string;
    sizes: number[];
    material: string;
  };
}

const ProductDetails: React.FC<Props> = (props) => {
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const { data } = props;

  return (
    <div className={isMobile ? css.contentMobile : css.contentDesktop}>
      <div className={css.title}>Thông tin chi tiết</div>
      <div className={css.border} />
      <div className={css.details}>
        <table>
          <tbody>
            <tr>
              <td className={clsx(css.col1, css.paddingTd)}>Thể loại</td>
              <td className={clsx(css.col2, css.paddingTd)}>{data.category}</td>
            </tr>
            <tr>
              <td className={clsx(css.col1, css.paddingTd)}>Thân giày</td>
              <td className={clsx(css.col2, css.paddingTd)}>{data.body}</td>
            </tr>
            <tr>
              <td className={clsx(css.col1, css.paddingTd)}>Đế giày</td>
              <td className={clsx(css.col2, css.paddingTd)}>{data.sole}</td>
            </tr>
          </tbody>
        </table>
        <div className={css.borderCol}></div>

        <table className={css.table2}>
          <tbody>
            <tr>
              <td className={css.col1}>Xuất xứ</td>
              <td className={css.col24_2}>{data.origin}</td>
            </tr>
            <tr>
              <td className={clsx(css.col1, css.paddingTd)}>Màu sắc</td>
              <td className={clsx(css.col24_2, css.paddingTd)}>{data.colors.join(', ')}</td>
            </tr>
            <tr>
              <td className={clsx(css.col1, css.paddingTd)}>Kích cỡ</td>
              <td className={clsx(css.col24_2, css.paddingTd)}>{data.sizes.join(', ')}</td>
            </tr>
            <tr>
              <td className={clsx(css.col1, css.paddingTd)}>Chất liệu</td>
              <td className={clsx(css.col24_2, css.paddingTd)}>{data.material}</td>
            </tr>
          </tbody>
        </table>
        <div className={css.borderSum} />
      </div>
    </div>
  );
};

export default ProductDetails;
