import React, { useRef, useEffect, useState, useImperativeHandle } from 'react';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// components
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import ButtonGroup from 'antd/lib/button/button-group';

// hooks
import useDebounce from '../../hook/use-debounce';

interface IProps {
  className?: string;
  value: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}
interface InputNumberSpinner {
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

const InputNumberSpinner = React.forwardRef<InputNumberSpinner, IProps>((props, ref) => {
  const {
    className,
    onChange,
    value,
    max = Number.MAX_SAFE_INTEGER,
    min = Number.MIN_SAFE_INTEGER,
  } = props;
  const [ownValue, setOwnValue] = useState(value);
  const debounceValue = useDebounce(ownValue, 300);
  const debounceRef = useRef(debounceValue);
  const inputRef = useRef<Input>(null);
  const allowCallOnChangeRef = useRef(false);

  useImperativeHandle(ref, () => ({
    setValue: (arg) => {
      allowCallOnChangeRef.current = false;
      setOwnValue(arg);
    },
  }));

  useEffect(() => {
    if (debounceValue !== debounceRef.current) {
      debounceRef.current = debounceValue;
      if (onChange && allowCallOnChangeRef.current) {
        onChange(debounceValue);
      }
    }
  }, [debounceValue, onChange]);

  useEffect(() => {
    allowCallOnChangeRef.current = false;
    setOwnValue(value);
  }, [value]);

  const handleIncrease = () => {
    allowCallOnChangeRef.current = true;
    setOwnValue((x) => x + 1);
  };

  const handleDecrease = () => {
    allowCallOnChangeRef.current = true;
    setOwnValue((x) => x - 1);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const newValue = Number(event.currentTarget.value);
    if (newValue && newValue >= min && newValue <= max) {
      allowCallOnChangeRef.current = true;
      setOwnValue(newValue);
    } else {
      inputRef.current?.setValue(String(ownValue));
    }
  };

  const handleChange = (event: React.FocusEvent<HTMLInputElement>) => {
    const newValue = Number(event.currentTarget.value);
    if (newValue && newValue >= min && newValue <= max) {
      allowCallOnChangeRef.current = true;
      setOwnValue(newValue);
    } else {
      event.currentTarget.value = String(ownValue);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const newValue = Number(event.currentTarget.value);
    if (event.key === 'ArrowUp' && newValue < 100) {
      handleIncrease();
    } else if (event.key === 'ArrowDown' && newValue > 1) {
      handleDecrease();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setValue(String(ownValue));
    }
  }, [ownValue]);

  return (
    <ButtonGroup className={clsx(css.spinnerBtn, className)}>
      <Button className={css.buttonAddSub} onClick={handleDecrease} disabled={ownValue < min + 1}>
        -
      </Button>
      <Input
        ref={inputRef}
        className={clsx('ant-btn', css.value)}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button className={css.buttonAddSub} onClick={handleIncrease} disabled={ownValue > max - 1}>
        +
      </Button>
    </ButtonGroup>
  );
});

export default InputNumberSpinner;
