import React from 'react';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// components

interface Props {
  label: string;
  input: React.InputHTMLAttributes<HTMLInputElement>;
  error?: string | boolean;
  classes?: {
    root?: string;
    labelWrap?: string;
    label?: string;
    errorText?: string;
    errorInput?: string;
    input?: string;
  };
}

const InputField: React.FC<Props> = ({ label, error, classes, input }) => {
  return (
    <div className={clsx(css.root, classes?.root)}>
      <div className={clsx(css.topLine, classes?.labelWrap)}>
        <div className={clsx(css.label, classes?.label)}>{label}</div>
        {error && <div className={clsx(css.error, classes?.errorText)}>{error}</div>}
      </div>
      <input
        {...input}
        className={clsx(
          css.input,
          classes?.input,
          error && css.errorInput,
          error && classes?.errorInput,
        )}
      />
    </div>
  );
};

export default InputField;
