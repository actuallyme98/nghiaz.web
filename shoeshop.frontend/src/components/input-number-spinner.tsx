import React, { useRef, useEffect, useState, useImperativeHandle, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

// components
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

// hooks
import useDebounce from '../hooks/use-debounce';

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
  const inputRef = useRef<any>(null);
  const allowCallOnChangeRef = useRef(false);
  const classes = useStyles();

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

  const handleIncrease = useCallback(() => {
    allowCallOnChangeRef.current = true;
    setOwnValue((x) => x + 1);
  }, []);

  const handleDecrease = useCallback(() => {
    allowCallOnChangeRef.current = true;
    setOwnValue((x) => x - 1);
  }, []);

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
    if (inputRef.current.setValue) {
      inputRef.current.setValue(String(ownValue));
    }
  }, [ownValue]);

  return (
    <ButtonGroup className={clsx(classes.spinnerBtn, className)}>
      <Button
        className={classes.buttonAddSub}
        onClick={handleDecrease}
        disabled={ownValue < min + 1}
      >
        -
      </Button>
      <Input
        ref={inputRef}
        className={classes.value}
        disableUnderline
        value={ownValue}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button
        className={classes.buttonAddSub}
        onClick={handleIncrease}
        disabled={ownValue > max - 1}
      >
        +
      </Button>
    </ButtonGroup>
  );
});

const useStyles = makeStyles((theme) => ({
  spinnerBtn: {
    height: 30,
    display: 'inline-flex',
    justifyContent: 'center',
    '& *': {
      fontSize: 12,
      color: '#323232',
      borderColor: '#dddddd',
      width: 30,
      padding: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  value: {
    backgroundColor: 'white',
    cursor: 'default',
    border: '1px solid #ddd',
  },
  buttonAddSub: {},
}));

export default InputNumberSpinner;
