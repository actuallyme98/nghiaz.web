import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

interface IProps {}

const Footer: React.FC<IProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.col1}>
        <h3>Giới thiệu</h3>
        <div>
          Công ty TNHH Sản Xuất Thương Mại & Dịch Vụ Bluewind Mã số thuế: 0108124917 do Sở KH và Đầu
          Tư TP. Hà Nội Cấp ngày 11/01/2018
        </div>
        <h3>Cửa hàng :</h3>
        <div>Add 1: Số 6/106 Chùa Láng, Đống Đa, Hà Nội Hotline: 0392646973</div>
        <div>Add 2: Số 176 Nguyễn Trãi, Thanh Xuân, Hà Nội Hotline: 0337431836</div>
        <div>Add 3: Số 65/121 Lê Thanh Nghị, Hai Bà Trưng, Hà Nội Hotline: 0387402584</div>
        <h3>Văn Phòng :</h3>
        <div>Số 39, Ngõ 115 Nguyễn Khang, Cầu Giấy, Hà Nội</div>
      </div>

      <div className={classes.col2}>
        <h3>THÔNG TIN HỖ TRỢ</h3>
        <div>Tuyển dụng</div>
        <div>Những quy định chung</div>
        <div>Chính sách bảo mật</div>
        <div>Chính sách thanh toán</div>
        <div>Chính sách đổi trả</div>
        <div>Chính sách vận chuyển</div>
      </div>

      <div className={classes.col3}>
        <h3>KẾT NỐI VỚI CHÚNG TÔI</h3>
        <div>Hãy kết nối với chúng tôi.</div>
        <img src="/assets/icons/vetified.png" alt="" />
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    padding: '50px 5%',
    background: '#111',
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  col2: {
    width: '20%',
    margin: '0 50px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  col1: {
    width: '33%',
    [theme.breakpoints.down('sm')]: {
      width: '70%',
    },
  },
  col3: {
    width: '33%',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 50,
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
    },
  },
}));

export default Footer;
