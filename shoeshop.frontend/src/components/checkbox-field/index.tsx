import React from 'react';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// components
import Checkbox, { CheckboxProps } from 'antd/lib/checkbox';

interface Props {
  label: string;
  input: CheckboxProps;
  classes?: {
    label?: string;
    root?: string;
  };
}

const CheckboxField: React.FC<Props> = ({ classes, input, label }) => {
  return (
    <div className={clsx(css.root, classes?.root)}>
      <div className={css.checkBox}>
        <Checkbox {...input}>
          <span className={clsx(css.label, classes?.label)}>{label}</span>
        </Checkbox>
      </div>
    </div>
  );
};

export default CheckboxField;
