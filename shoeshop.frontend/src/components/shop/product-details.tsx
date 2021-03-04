import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  data: {
    category: string;
    colors: string[];
    body?: string;
    sole?: string;
    origin: string;
    weight?: number;
    sizes: number[];
    material: string;
  };
}

const ProductDetails: React.FC<Props> = (props) => {
  const { data } = props;
  const classes = useStyles();

  return (
    <div className={classes.contentDesktop}>
      <div className={classes.title}>Thông tin chi tiết</div>
      <div className={classes.border} />
      <div className={classes.details}>
        <table>
          <tbody>
            <tr>
              <td className={clsx(classes.col1, classes.paddingTd)}>Thể loại</td>
              <td className={clsx(classes.col2, classes.paddingTd)}>{data.category}</td>
            </tr>
            <tr>
              <td className={clsx(classes.col1, classes.paddingTd)}>Thân giày</td>
              <td className={clsx(classes.col2, classes.paddingTd)}>{data.body}</td>
            </tr>
            <tr>
              <td className={clsx(classes.col1, classes.paddingTd)}>Đế giày</td>
              <td className={clsx(classes.col2, classes.paddingTd)}>{data.sole}</td>
            </tr>
          </tbody>
        </table>

        <div className={classes.borderCol}></div>

        <table>
          <tbody>
            <tr>
              <td className={classes.col1}>Xuất xứ</td>
              <td className={classes.col24_2}>{data.origin}</td>
            </tr>
            <tr>
              <td className={clsx(classes.col1, classes.paddingTd)}>Khối lượng</td>
              <td className={clsx(classes.col24_2, classes.paddingTd)}>{data.weight}</td>
            </tr>
            <tr>
              <td className={clsx(classes.col1, classes.paddingTd)}>Màu sắc</td>
              <td className={clsx(classes.col24_2, classes.paddingTd)}>{data.colors.join(', ')}</td>
            </tr>
            <tr>
              <td className={clsx(classes.col1, classes.paddingTd)}>Kích cỡ</td>
              <td className={clsx(classes.col24_2, classes.paddingTd)}>{data.sizes.join(', ')}</td>
            </tr>
            <tr>
              <td className={clsx(classes.col1, classes.paddingTd)}>Chất liệu</td>
              <td className={clsx(classes.col24_2, classes.paddingTd)}>{data.material}</td>
            </tr>
          </tbody>
        </table>
        <div className={classes.borderSum} />
      </div>

      <div className={classes.mt5}></div>
      <div className={classes.title}>Hướng dẫn chọn size</div>
      <div className={classes.border} />
      <div className={classes.mt2}>
        <img src="/assets/mocks/products/how-to-pick-size.png" alt="" />
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  contentDesktop: {
    marginTop: 10,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      padding: '7px 16px',
      backgroundColor: 'white',
    },
  },
  title: {
    display: 'inline',
    paddingBottom: 20,
    borderBottom: '5px solid #f16728',
    fontSize: 30,
    color: '#4a4a4a',
    [theme.breakpoints.down('xs')]: {
      fontSize: 20,
    },
  },
  mt2: {
    marginTop: 20,
    textAlign: 'center',
    '& img': {
      width: '80%',
    },
  },
  mt5: {
    marginTop: 50,
  },
  border: {
    marginTop: 17,
    height: 2,
    border: 'solid 1px #cccccc',
  },
  details: {
    paddingTop: 36,
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      paddingTop: 15,
      display: 'block',
    },
  },
  borderCol: {
    width: 1,
    height: 200,
    border: 'dashed 1px #cdcdcd',
    margin: '0 60px',
    [theme.breakpoints.down('sm')]: {
      opacity: 0,
      height: 19,
    },
  },
  col1: {
    minWidth: 100,
    fontSize: 14,
    fontWeight: 500,
    color: '#788995',
  },
  col24_2: {
    paddingLeft: 18,
    fontSize: 14,
    color: '#4a4a4a',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
    },
  },
  col2: {
    width: 247,
    fontSize: 14,
    fontWeight: 500,
    '& a': {
      textDecoration: 'underline',
      color: '#609af4',
    },
  },
  paddingTd: {
    paddingTop: 11,
    [theme.breakpoints.down('xs')]: {
      paddingTop: 14,
      verticalAlign: 'top',
    },
  },
  borderSum: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      marginTop: 27,
      width: 335,
      height: 2,
      border: 'dashed 1px #d1d1d1',
    },
  },
}));

export default ProductDetails;
