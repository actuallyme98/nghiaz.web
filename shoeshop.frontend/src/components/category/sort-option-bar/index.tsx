import React, { useState, useCallback, useImperativeHandle, forwardRef } from 'react';

// styles
import css from './style.module.scss';

// components
import Select from 'antd/lib/select';

// utils
import { sortOptions } from '../../../configs/product-sort-options';

interface IProps {
  totalProductReview: number;
  onChange?: (args: any) => void;
}

const SortOptionBar: React.ForwardRefRenderFunction<any, IProps> = (
  { totalProductReview, onChange },
  ref,
) => {
  const [orderBy, setOrderBy] = useState<string | undefined>('-createdAt');
  const onOrderByChange = useCallback(
    (value: string) => {
      setOrderBy(value);
      // onChange({ orderBy: value });
    },
    [onChange],
  );
  useImperativeHandle(ref, () => ({
    reset: () => {
      setOrderBy('-createdAt');
    },
  }));

  return (
    <div className={css.root}>
      <div className={css.text}>
        Tìm thấy&#160;<div className={css.number}>{totalProductReview}</div> &#160;sản phẩm
      </div>
      <div className={css.sort}>
        <div className={css.textSort}>Sắp xếp theo</div>
        <Select
          className={css.optionSelect}
          onChange={onOrderByChange}
          value={orderBy}
          suffixIcon={<img className={css.imgDown} src="/assets/icons/down-arrow.svg" />}
        >
          {sortOptions.map((option, index) => (
            <Select.Option key={index} className={css.option} value={option.value}>
              <div className={css.option}>{option.label}</div>
            </Select.Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default forwardRef(SortOptionBar);
