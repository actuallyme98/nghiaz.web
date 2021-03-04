import React, { useState, useMemo, useCallback, forwardRef, useImperativeHandle } from 'react';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// components
import Checkbox from 'antd/lib/checkbox';
import Radio, { RadioChangeEvent } from 'antd/lib/radio';
import Button from 'antd/lib/button';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '@redux/stores/configure-store';

// utils
import { priceOptions } from '../../../configs/product-filter-options';

interface Props {
  onChange?: (args: any) => void;
  onClose?: () => void;
}

// mocks
const colors: any[] = Array.from({ length: 6 }, (_, index) => ({
  id: index,
  label: 'XMCA',
}));

const sizes: any[] = Array.from({ length: 6 }, (_, index) => ({
  id: index,
  label: 40 + index,
}));

const MenuFilterOption: React.ForwardRefRenderFunction<any, Props> = (
  { onChange, onClose },
  ref,
) => {
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const [selectedPriceId, setSelectedPriceId] = useState<number>(0);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const onChangePrice = useCallback(
    (event: RadioChangeEvent) => {
      const { value } = event.target;
      setSelectedPriceId(parseInt(value));
      // !isMobile && onChange(getPriceArgs(e.target.value));
    },
    [onChange],
  );

  const onChangeColors = useCallback(
    (checkedValue: any[]) => {
      setSelectedColors(checkedValue);
      //   !isMobile && onChange(getColorsArgs(checkedValue));
    },
    [onChange],
  );

  const onChangeSizes = useCallback(
    (checkedValue: any[]) => {
      setSelectedSizes(checkedValue);
      //   !isMobile && onChange(getSizesArgs(checkedValue));
    },
    [onChange],
  );

  const getPriceArgs = useCallback((id: number): any => {
    const option = priceOptions.find((option) => option.id === id);
    return option ? { priceGte: option.value.start, priceLte: option.value.end } : {};
  }, []);

  const getColorsArgs = useCallback((colors: string[]): any => ({ colors }), []);

  const getSizesArgs = useCallback((sizes: string[]): any => ({ sizes }), []);

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

  const listPrices = useMemo(() => {
    return priceOptions.map((option, index) => (
      <div key={index}>
        <Radio value={option.id} className={css.checkbox} onChange={onChangePrice}>
          {option.label}
        </Radio>
      </div>
    ));
  }, []);

  const listColors = useMemo(() => {
    return colors.map((color, index) => (
      <div key={index}>
        <Checkbox value={color.id} className={css.checkbox}>
          {color.label}
        </Checkbox>
      </div>
    ));
  }, []);

  const listSizes = useMemo(() => {
    return sizes.map((size, index) => (
      <div key={index}>
        <Checkbox className={css.checkbox} value={size.id}>
          {size.label}
        </Checkbox>
      </div>
    ));
  }, []);

  return (
    <div className={isMobile ? css.rootMobile : css.rootDesktop}>
      <div className={css.titleFilter}>
        <div className={css.filter}>
          Filter
          <img className={css.imgArrowRight} src="/assets/icons/right-arrow-red.svg" />
        </div>
        {isMobile && (
          <Button type="link" className={css.unFilterBtn} onClick={onClose}>
            Đóng Filter
          </Button>
        )}
        {!isMobile && (
          <Button type="link" className={css.unFilterBtn} onClick={onUnfiltered}>
            Bỏ Filter
          </Button>
        )}
      </div>
      <div className={clsx(css.borderBottom, css.firstFilter)} />
      <div className={css.listFilter}>
        <div className={css.title}>
          Khoảng giá
          <Button
            type="link"
            className={css.unFilterBtnIcon}
            hidden={!Boolean(selectedPriceId)}
            onClick={onUnfilteredPrice}
          >
            &#10005;
          </Button>
        </div>
        <div className={css.check}>
          <Radio.Group value={selectedPriceId}>{listPrices}</Radio.Group>
        </div>
        <div className={css.borderBottom} />
        <div className={css.title}>
          Màu sắc
          <Button
            type="link"
            className={css.unFilterBtnIcon}
            hidden={!Boolean(selectedColors.length)}
            onClick={onUnfilteredColor}
          >
            &#10005;
          </Button>
        </div>
        <div className={css.check}>
          <Checkbox.Group value={selectedColors} onChange={onChangeColors}>
            {listColors}
          </Checkbox.Group>
        </div>
        <div className={css.borderBottom} />
        <div className={css.title}>
          Kích cỡ
          <Button
            type="link"
            className={css.unFilterBtnIcon}
            hidden={!Boolean(selectedSizes.length)}
            onClick={onUnfilteredSize}
          >
            &#10005;
          </Button>
        </div>
        <div className={css.check}>
          <Checkbox.Group value={selectedSizes} onChange={onChangeSizes}>
            {listSizes}
          </Checkbox.Group>
        </div>
        <div className={css.borderBottom} />
      </div>
      {isMobile && (
        <div className={css.bottom}>
          <Button className={css.btnReset} onClick={onUnfiltered}>
            THIẾT LẬP LẠI
          </Button>
          <Button className={css.btnApply} type="danger" onClick={onApply}>
            ÁP DỤNG
          </Button>
        </div>
      )}
    </div>
  );
};

export default forwardRef(MenuFilterOption);
