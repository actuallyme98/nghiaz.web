import React, {
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useMemo,
  ForwardRefRenderFunction,
} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

// components
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

// redux
import { useSelector } from 'react-redux';
import { IStore } from '../../redux/stores/configure-store';

// utils
import { priceOptions } from '../../configs/product-filter-options';

interface IProps {
  onChange?: (args: any) => void;
  onClose?: () => void;
}

const colors: any[] = Array.from({ length: 6 }, (_, index) => ({
  id: index,
  name: 'XMCA',
}));

const sizes: any[] = Array.from({ length: 6 }, (_, index) => ({
  id: index,
  name: 40 + index,
}));

const MenuFilterOption: ForwardRefRenderFunction<any, IProps> = ({ onChange, onClose }, ref) => {
  const isMobile = useSelector((store: IStore) => store.appState.isMobile);
  const [selectedPriceId, setSelectedPriceId] = useState<number>(0);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const getPriceArgs = useCallback((id: number): any => {
    const option = priceOptions.find((option) => option.id === id);
    return option ? { priceGte: option.value.start, priceLte: option.value.end } : {};
  }, []);

  const getColorsArgs = useCallback((colors: string[]): any => ({ colors }), []);

  const getSizesArgs = useCallback((sizes: string[]): any => ({ sizes }), []);

  const onChangePrice = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSelectedPriceId(parseInt(value));
      // !isMobile && onChange(getPriceArgs(e.target.value));
    },
    [onChange],
  );

  const onChangeColors = useCallback(
    (event: React.ChangeEvent<any>, checked: boolean) => {
      const { value } = event.target;
      let newColors: string[] = [];
      if (!selectedColors.includes(value)) {
        newColors = selectedColors.concat(value);
      } else {
        newColors = selectedColors.filter((x) => x !== value);
      }
      setSelectedColors(newColors);

      // !isMobile && onChange(getColorsArgs(selectedColors));
    },
    [onChange, selectedColors],
  );

  const onChangeSizes = useCallback(
    (event: React.ChangeEvent<any>, checked: boolean) => {
      const { value } = event.target;
      let newSizes: string[] = [];
      if (!selectedSizes.includes(value)) {
        newSizes = selectedSizes.concat(value);
      } else {
        newSizes = selectedSizes.filter((x) => x !== value);
      }
      setSelectedSizes(newSizes);

      // !isMobile && onChange(getColorsArgs(selectedColors));
    },
    [onChange, selectedSizes],
  );

  const onUnfilteredPrice = useCallback(() => {
    setSelectedPriceId(0);
    // onChange({
    //   priceLte: undefined,
    //   priceGte: undefined,
    // });
  }, [onChange]);

  const onUnfilteredColor = useCallback(() => {
    setSelectedColors([]);
    // onChange({
    //   types: [],
    // });
  }, [onChange]);

  const onUnfilteredSize = useCallback(() => {
    setSelectedSizes([]);
    // onChange({
    //   types: [],
    // });
  }, [onChange]);

  const onUnfiltered = useCallback(() => {
    setSelectedPriceId(0);
    setSelectedColors([]);
    setSelectedSizes([]);
    // onChange({
    //   priceGte: undefined,
    //   priceLte: undefined,
    //   types: [],
    // });
  }, [onChange]);

  useImperativeHandle(ref, () => ({
    reset: () => {
      setSelectedPriceId(0);
      setSelectedColors([]);
      setSelectedSizes([]);
    },
  }));

  const onApply = useCallback(() => {
    let args: any = {};
    if (selectedPriceId) {
      args = { ...args, ...getPriceArgs(selectedPriceId) };
    }
    if (selectedColors) {
      args = { ...args, ...getColorsArgs(selectedColors) };
    }
    if (selectedSizes) {
      args = { ...args, ...getSizesArgs(selectedSizes) };
    }
    // onChange(args);
    onClose && onClose();
  }, [selectedPriceId, selectedColors]);

  const classes = useStyles();

  const priceOptionsMemo = useMemo(() => {
    return priceOptions.map((option, index) => (
      <FormControlLabel
        key={index}
        value={option.id}
        control={<Radio size="small" color="default" />}
        label={option.label}
        classes={{
          label: classes.customLabel,
        }}
      />
    ));
  }, []);

  const colorsOptionsMemo = useMemo(() => {
    return colors.map((color, index) => (
      <FormControlLabel
        key={index}
        control={<Checkbox value={color.id} size="small" color="default" />}
        onChange={onChangeColors}
        label={color.name}
        classes={{
          label: classes.customLabel,
        }}
      />
    ));
  }, []);

  const sizesOptionsMemo = useMemo(() => {
    return sizes.map((size, index) => (
      <FormControlLabel
        key={index}
        control={<Checkbox value={size.id} size="small" color="default" />}
        onChange={onChangeSizes}
        label={size.name}
        classes={{
          label: classes.customLabel,
        }}
      />
    ));
  }, []);

  return (
    <div className={classes.rootDesktop}>
      <div className={classes.titleFilter}>
        <div className={classes.filter}>
          Filter
          <img className={classes.imgArrowRight} src="/images/icons/right-arrow-red.svg" />
        </div>
        <Button className={classes.unFilterBtnMobile} onClick={onClose}>
          Đóng Filter
        </Button>
        <Button className={classes.unFilterBtn} onClick={onUnfiltered}>
          Bỏ Filter
        </Button>
      </div>
      <div className={classes.borderBottom} />
      <div className={classes.listFilter}>
        <div className={classes.title}>
          Khoảng giá
          <IconButton
            className={clsx({
              [classes.unFilterBtnIcon]: true,
              [classes.hideUnfil]: !Boolean(selectedPriceId),
            })}
            disabled={!Boolean(selectedPriceId)}
            onClick={onUnfilteredPrice}
          >
            &#10005;
          </IconButton>
        </div>
        <div className={classes.check}>
          <RadioGroup value={selectedPriceId} onChange={onChangePrice}>
            {priceOptionsMemo}
          </RadioGroup>
        </div>
        <div className={classes.borderBottom} />
        <div className={classes.title}>
          Màu sắc
          <IconButton
            className={clsx({
              [classes.unFilterBtnIcon]: true,
              [classes.hideUnfil]: !Boolean(selectedColors.length),
            })}
            disabled={!Boolean(selectedColors.length)}
            onClick={onUnfilteredColor}
          >
            &#10005;
          </IconButton>
        </div>
        <div className={classes.check}>{colorsOptionsMemo}</div>
        <div className={classes.borderBottom} />
        <div className={classes.title}>
          Kích cỡ
          <IconButton
            className={clsx({
              [classes.unFilterBtnIcon]: true,
              [classes.hideUnfil]: !Boolean(selectedSizes.length),
            })}
            disabled={!Boolean(selectedSizes.length)}
            onClick={onUnfilteredSize}
          >
            &#10005;
          </IconButton>
        </div>
        <div className={classes.check}>{sizesOptionsMemo}</div>
        <div className={classes.borderBottom} />
      </div>
      {isMobile && (
        <div className={classes.bottom}>
          <IconButton className={classes.btnReset} onClick={onUnfiltered}>
            THIẾT LẬP LẠI
          </IconButton>
          <IconButton className={classes.btnApply} onClick={onApply}>
            ÁP DỤNG
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default forwardRef(MenuFilterOption);

const useStyles = makeStyles((theme) => ({
  rootDesktop: {
    minWidth: 231,
    borderRadius: 4,
    border: 'solid 1px #d4d4d4',
    backgroundColor: '#fafafa',
    padding: 19,
  },
  titleFilter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filter: {
    textTransform: 'uppercase',
    display: 'flex',
    height: 16,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f16728',
  },
  imgArrowRight: {
    marginTop: 3,
    marginLeft: 8,
    width: 6.7,
    height: 10,
  },
  unFilterBtn: {
    cursor: 'pointer',
    fontSize: 12,
    color: '#4a4a4a',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  unFilterBtnMobile: {
    cursor: 'pointer',
    fontSize: 12,
    color: '#4a4a4a',
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  unFilterBtnIcon: {
    fontSize: 14,
    right: 0,
    top: 0,
    width: 12,
    height: 12,
    position: 'absolute',
    cursor: 'pointer',
    '&:hover': {
      color: '#4a4a4a',
    },
    '&:focus': {
      color: '#4a4a4a',
    },
  },
  hideUnfil: {
    display: 'none',
  },
  borderBottom: {
    marginTop: 15,
    marginBottom: 15,
    height: 2,
    border: 'solid 1px #e2e2e2',
  },
  title: {
    position: 'relative',
    paddingBottom: 10,
    fontSize: 14,
    fontWeight: 600,
    color: '#4a4a4a',
  },
  check: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 14,
    color: '#4a4a4a',
  },
  bottom: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 10,
    width: 'fit-content',
    margin: '15px auto 0 auto',
  },
  btnApply: {
    maxWidth: 160,
    borderRadius: 2,
    border: 'solid 1px #d05922',
    backgroundColor: '#f16728',
    fontSize: 15,
    fontWeight: 600,
    '&:focus': {
      backgroundColor: '#f16728',
    },
  },
  btnReset: {
    maxWidth: 160,
    borderRadius: 2,
    border: 'solid 1px #d2d2d2',
    backgroundColor: '#fcf7f5',
    fontSize: 15,
    fontWeight: 600,
    color: '#848484',
    '&:focus, &:active': {
      color: '#848484',
      backgroundColor: '#fcf7f5',
      border: 'solid 1px #d2d2d2',
    },
  },
  listFilter: {
    flexGrow: 1,
    // overflow: 'scroll',
  },
  customLabel: {
    fontFamily: 'SFUIDisplay',
    fontSize: 14,
  },
}));
