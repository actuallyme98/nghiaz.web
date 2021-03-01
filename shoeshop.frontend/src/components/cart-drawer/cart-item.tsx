import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { IStore } from '../../redux/stores/configure-store';
import IconButton from '@material-ui/core/IconButton';
import InputNumberSpinner from '../input-number-spinner';
import { Link } from 'react-router-dom';

interface IProps {
  className?: string;
  onChangeAmount?: (amount: number) => Promise<any>;
  onDelete?: () => void;
  data: any;
}

const CartItem: React.FC<IProps> = (props) => {
  const { data, className, onChangeAmount, onDelete } = props;
  const isMobile = useSelector((store: IStore) => store.appState.isMobile);
  const inputRef = useRef<InputNumberSpinner>(null);
  const classes = useStyles();

  const onChange = async (amount: number) => {
    if (onChangeAmount) {
      try {
        await onChangeAmount(amount);
      } catch {
        inputRef.current?.setValue(data.quantity);
      }
    }
  };
  return (
    <div className={clsx(classes.rootDesktop, className)}>
      <div className={classes.divThumbnail}>
        <img className={classes.thumbnail} src={data.product.thumbnail} alt={data.product.name} />
      </div>
      <div className={classes.grow}>
        <Link to={`/shop/${data.product.slug}/${data.product.code}`}>
          <a className={classes.title}>{data.product.name}</a>
        </Link>
        <div className={classes.price}>{data.product.currentPrice?.toLocaleString('vi-VN')} đ</div>
        <InputNumberSpinner
          ref={inputRef}
          value={data.quantity}
          min={1}
          max={100}
          onChange={onChange}
        />
      </div>
      <IconButton className={classes.btnDelete} onClick={onDelete} />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  rootDesktop: {
    display: 'flex',
    alignItems: 'center',
  },
  grow: {
    flexGrow: 1,
  },
  divThumbnail: {
    minWidth: 96,
    width: 96,
    height: 96,
    marginRight: 27,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  title: {
    fontSize: 16,
    color: '#788995',
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
  },
  price: {
    fontSize: 14,
    fontWeight: 600,
    color: '#384650',
  },
  btnDelete: {
    border: 'none',
    backgroundImage: 'url("/assets/icons/trash.svg")',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    minWidth: 27,
    height: 27,
    padding: 0,
  },
}));

export default CartItem;
