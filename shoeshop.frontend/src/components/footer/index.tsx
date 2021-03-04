import React from 'react';

// styles
import css from './style.module.scss';

interface IProps {}

const Footer: React.FC<IProps> = (props) => {
  return (
    <div className={css.container}>
      <div className={css.col1}>
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

      <div className={css.col2}>
        <h3>THÔNG TIN HỖ TRỢ</h3>
        <div>Tuyển dụng</div>
        <div>Những quy định chung</div>
        <div>Chính sách bảo mật</div>
        <div>Chính sách thanh toán</div>
        <div>Chính sách đổi trả</div>
        <div>Chính sách vận chuyển</div>
      </div>

      <div className={css.col3}>
        <h3>KẾT NỐI VỚI CHÚNG TÔI</h3>
        <div>Hãy kết nối với chúng tôi.</div>
        <img src="/assets/icons/vetified.png" alt="" />
      </div>
    </div>
  );
};

export default Footer;
