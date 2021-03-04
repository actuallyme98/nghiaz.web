import React from 'react';

// styles
import css from './style.module.scss';

// components
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

interface IProps {}

const TopCampaign: React.FC<IProps> = (props) => {
  return (
    <div className="container">
      <Row className={css.lisenceArea}>
        <Col className={css.lisenceItem} md={12} xl={6}>
          <img src="/assets/icons/icon-service-transport.png" alt="" />
          <div>
            <div className={css.lisenceHeading}>GIAO HÀNG MIỄN PHÍ</div>
            <div>Tất cả sản phẩm đều giao hàng miễn phí</div>
          </div>
        </Col>

        <Col className={css.lisenceItem} md={12} xl={6}>
          <img src="/assets/icons/icon-service-change.png" alt="" />
          <div>
            <div className={css.lisenceHeading}>ĐỔI TRẢ HÀNG</div>
            <div className={css.lisenceText}>Sản phẩm được phép đổi trả trong vòng 2 ngày</div>
          </div>
        </Col>

        <Col className={css.lisenceItem} md={12} xl={6}>
          <img src="/assets/icons/icon-service-recieve-money.png" alt="" />
          <div>
            <div className={css.lisenceHeading}>GIAO HÀNG NHẬN TIỀN</div>
            <div className={css.lisenceText}>Thanh toán đơn hàng bằng hình thức trực tiếp</div>
          </div>
        </Col>

        <Col className={css.lisenceItem} md={12} xl={6}>
          <img src="/assets/icons/icon-service-phone.png" alt="" />
          <div>
            <div className={css.lisenceHeading}>ĐẶT HÀNG ONLINE</div>
            <div className={css.lisenceText}>03645889229</div>
          </div>
        </Col>
      </Row>

      <Row className={css.campaignArea}>
        <Col className={css.campaignItem} sm={7}>
          <img src="/assets/campaign/campaign1.jpg" alt="" />
        </Col>
        <Col className={css.campaignItem} sm={7}>
          <img src="/assets/campaign/campaign2.jpg" alt="" />
        </Col>
        <Col className={css.campaignItem} sm={7}>
          <img src="/assets/campaign/campaign3.jpg" alt="" />
        </Col>
      </Row>
    </div>
  );
};

export default TopCampaign;
