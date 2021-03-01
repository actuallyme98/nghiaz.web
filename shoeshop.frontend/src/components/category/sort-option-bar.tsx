import React, {
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
  ForwardRefRenderFunction,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';

// components
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// utils
import { sortOptions } from '../../configs/product-sort-options';

interface IProps {
  totalProductReview: number;
  onChange?: (args: any) => void;
}

const SortOptionBar: ForwardRefRenderFunction<any, IProps> = (props, ref) => {
  const { onChange, children, totalProductReview } = props;
  const [orderBy, setOrderBy] = useState<string | undefined>('-createdAt');
  const classes = useStyles();
  const onOrderByChange = useCallback(
    (event: React.ChangeEvent<any>) => {
      const { value } = event.target;
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
    <div className={classes.root}>
      <div className={classes.text}>
        Tìm thấy&#160;<div className={classes.number}>{totalProductReview}</div> &#160;sản phẩm
      </div>
      <div className={classes.sort}>
        <div className={classes.textSort}>Sắp xếp theo</div>
        <Select
          className={classes.optionSelect}
          onChange={onOrderByChange}
          value={orderBy}
          disableUnderline
          IconComponent={() => (
            <img className={classes.imgDown} src="/assets/icons/down-arrow.svg" />
          )}
        >
          {sortOptions.map((option, index) => (
            <MenuItem key={index} className={classes.option} value={option.value}>
              <div className={classes.option}>{option.label}</div>
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '17px 25px',
    height: 50,
    borderRadius: 4,
    border: 'solid 1px #dedede',
    backgroundColor: '#fcfcfc',
    /* Safari */
    '-webkit-justify-content': 'space-between',
    /* Safari 6.1+ */
    display: 'flex',
    'justify-content': 'space-between',
  },
  text: {
    display: 'flex',
    alignItems: 'baseline',
    height: 16,
    fontSize: 14,
    color: '#4a4a4a',
  },
  number: {
    fontWeight: 600,
  },
  sort: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  textSort: {
    fontSize: 14,
    color: '#4a4a4a',
    marginRight: 10,
  },
  optionSelect: {
    marginTop: 8,
  },
  option: {
    padding: '0 5px',
    fontSize: 12,
    color: '#4a4a4a',
  },
  imgDown: {
    width: 8,
    height: 5,
    marginTop: 2,
  },
}));

export default forwardRef(SortOptionBar);
