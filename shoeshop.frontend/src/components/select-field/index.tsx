import React from 'react';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// components
import Select, { SelectProps } from 'antd/lib/select';

export interface SelectItem {
  value: string;
  label: string;
}

interface Props {
  label: string;
  input: SelectProps<string>;
  error?: string | boolean;
  selectItems: SelectItem[];
  classes?: {
    root?: string;
    labelWrap?: string;
    label?: string;
    errorText?: string;
    errorSelect?: string;
    select?: string;
  };
}

const SelectField: React.FC<Props> = ({ label, error, classes, input, selectItems }) => {
  return (
    <div className={clsx(css.root, classes?.root)}>
      <div className={clsx(css.topLine, classes?.labelWrap)}>
        <div className={clsx(css.label, classes?.label)}>{label}</div>
        {error && <div className={clsx(css.error, classes?.errorText)}>{error}</div>}
      </div>
      <Select
        {...input}
        className={clsx(
          css.select,
          classes?.select,
          error && css.errorSelect,
          error && classes?.errorSelect,
        )}
      >
        {selectItems.map((item, index) => (
          <Select.Option key={index} className={css.input} value={item.value}>
            {item.label}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default SelectField;
