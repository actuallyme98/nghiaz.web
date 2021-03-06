import React, { useCallback } from 'react';
import clsx from 'clsx';
import moment from 'moment';

// styles
import css from './style.module.scss';

// components
import DatePicker from 'antd/lib/date-picker';
import locale from 'antd/lib/date-picker/locale/vi_VN';

interface Props {
  label: string;
  input: {
    placeholder?: string;
    format?: string;
    value?: Date;
    name: string;
    onChange?: (date: Date) => void;
    onBlur?: (e: React.SyntheticEvent<Element, Event>) => void;
  };
  error?: string | boolean;
  classes?: {
    root?: string;
    labelWrap?: string;
    label?: string;
    errorText?: string;
    errorPickerWrap?: string;
    picker?: string;
  };
}

const DatePickerField: React.FC<Props> = ({ label, classes, error, input }) => {
  const onChange = useCallback(
    (date: moment.Moment | null, dateString: string) => {
      input.onChange && input.onChange(date?.toDate() || moment(dateString).toDate());
    },
    [input.onChange],
  );
  return (
    <div className={clsx(css.root, classes?.root)}>
      <div className={clsx(css.topLine, classes?.labelWrap)}>
        <div className={clsx(css.label, classes?.label)}>{label}</div>
        {error && <div className={clsx(css.error, classes?.errorText)}>{error}</div>}
      </div>
      <DatePicker
        className={clsx(css.picker, error && css.errorPickerWrap)}
        placeholder="DD/MM/YYYY"
        format="DD/MM/YYYY"
        locale={locale}
        {...input}
        name={input.name}
        onChange={onChange}
        value={moment(input.value, 'DD/MM/YYYY')}
      />
    </div>
  );
};

export default DatePickerField;
