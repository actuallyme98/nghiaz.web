import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// components
import Grid from '@material-ui/core/Grid';

interface IProps {}

const TopCampaign: React.FC<IProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid className={classes.lisenceArea} container>
        <Grid className={classes.lisenceItem} item sm={6} md={3}>
          <img src="/assets/icons/icon-service-transport.png" alt="" />
          <div>
            <div className={classes.lisenceHeading}>GIAO HÀNG MIỄN PHÍ</div>
            <div>Tất cả sản phẩm đều giao hàng miễn phí</div>
          </div>
        </Grid>

        <Grid className={classes.lisenceItem} item sm={6} md={3}>
          <img src="/assets/icons/icon-service-change.png" alt="" />
          <div>
            <div className={classes.lisenceHeading}>ĐỔI TRẢ HÀNG</div>
            <div className={classes.lisenceText}>Sản phẩm được phép đổi trả trong vòng 2 ngày</div>
          </div>
        </Grid>

        <Grid className={classes.lisenceItem} item sm={6} md={3}>
          <img src="/assets/icons/icon-service-recieve-money.png" alt="" />
          <div>
            <div className={classes.lisenceHeading}>GIAO HÀNG NHẬN TIỀN</div>
            <div className={classes.lisenceText}>Thanh toán đơn hàng bằng hình thức trực tiếp</div>
          </div>
        </Grid>

        <Grid className={classes.lisenceItem} item sm={6} md={3}>
          <img src="/assets/icons/icon-service-phone.png" alt="" />
          <div>
            <div className={classes.lisenceHeading}>ĐẶT HÀNG ONLINE</div>
            <div className={classes.lisenceText}>03645889229</div>
          </div>
        </Grid>
      </Grid>

      <Grid className={classes.campaignArea} container>
        <Grid className={classes.campaignItem} sm={3} item>
          <img src="/assets/campaign/campaign1.jpg" alt="" />
        </Grid>
        <Grid className={classes.campaignItem} sm={3} item>
          <img src="/assets/campaign/campaign2.jpg" alt="" />
        </Grid>
        <Grid className={classes.campaignItem} sm={3} item>
          <img src="/assets/campaign/campaign3.jpg" alt="" />
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {},
  lisenceArea: {},
  lisenceItem: {
    display: 'flex',
    padding: '10px 15px',
    '& img': {
      width: 40,
      height: 40,
      marginRight: 10,
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  lisenceHeading: {
    fontWeight: 600,
    fontSize: 15,
  },
  lisenceText: {
    color: '#787878',
  },
  campaignArea: {
    justifyContent: 'space-between',
    marginTop: 20,
  },
  campaignItem: {
    '& img': {
      width: '120%',
      transition: '0.5s',
      '&:hover': {
        boxShadow: '0px 5px 5px #989797',
        transform: 'translate(0, -10px)',
      },
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

export default TopCampaign;
