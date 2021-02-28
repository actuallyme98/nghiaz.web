import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RouteConfigComponentProps } from 'react-router-config';

// components
import Layout from '../../components/layout';

const Contact: React.FC<RouteConfigComponentProps<any>> = (props) => {
  const classes = useStyles();

  return (
    <Layout>
      <div className={classes.container}>
        <h1>Liên Hệ</h1>
        <div className={classes.map}>
          <img src="/assets/icons/bg.jpg" alt="" />
        </div>

        <div className={classes.wrapper}>
          <div>
            <div className={classes.titleLeftRight}>
              <img src="/assets/icons/envelope.svg" alt="" />
              <span className={classes.mes}>Để lại lời nhắn cho chúng tôi</span>
            </div>
            <div className={classes.col}>
              <div>
                <div className={classes.inputGroup}>
                  <span className={classes.spanIcons}>
                    <img src="/assets/icons/user.svg" alt="" />
                  </span>
                  <input className={classes.input} type="text" placeholder="Họ và tên" />
                </div>
                <div className={classes.inputGroup}>
                  <span className={classes.spanIcons}>
                    <img src="/assets/icons/email.svg" alt="" />
                  </span>
                  <input className={classes.input} type="text" placeholder="Email" />
                </div>
                <div className={classes.inputGroup}>
                  <span className={classes.spanIcons}>
                    <img src="/assets/icons/phone.svg" alt="" />
                  </span>
                  <input className={classes.input} type="text" placeholder="Số điện thoại" />
                </div>
                <div className={classes.inputGroup}>
                  <span className={classes.spanIcons}>
                    <img src="/assets/icons/home.svg" alt="" />
                  </span>
                  <input className={classes.input} type="text" placeholder="Địa chỉ" />
                </div>
              </div>

              <div>
                <textarea className={classes.inputTexarea} placeholder="Viết lời nhắn"></textarea>
              </div>
            </div>
            <div className={classes.colFul}>
              <button className={classes.btn}>Gửi lời nhắn</button>
            </div>
          </div>

          <div className={classes.right}>
            <div className={classes.titleLeftRight}>
              <span>
                Cung cấp giày thể thao nam, giày thể thao nữ, giày sneaker uy tín trên toàn quốc
              </span>
            </div>
            <div className={classes.phone}>
              <img src="/assets/icons/building.svg" alt="" />
              <span className={classes.spaceSpan}>BLUEWIND.VN</span>
            </div>

            <div className={classes.phone}>
              <img src="/assets/icons/phone.svg" alt="" />
              <span className={classes.spaceSpanLink}> 19004772</span>
            </div>

            <div className={classes.phone}>
              <img src="/assets/icons/pin.svg" alt="" />
              <span className={classes.spaceSpan}>
                Số 39 Ngõ 115 Nguyễn Khang, Phường Yên Hòa, Quận Cầu Giấy, Hà Nội
              </span>
            </div>

            <div className={classes.phone}>
              <img src="/assets/icons/envelope.svg" alt="" />
              <span className={classes.spaceSpanLink}> bluewindcontact@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    width: '90%',
    margin: '40px auto',
  },
  titleLeftRight: {
    width: '100%',
    fontWeight: 'bold',
    fontSize: 14,
    margin: '10px 0 15px',
    overflow: 'hidden',
    paddingBottom: 5,
    borderBottom: '1px dotted #ddd',

    '& img': {
      height: 15,
      width: 15,
      verticalAlign: 'middle',
      marginRight: 8,
    },
  },

  mes: {
    verticalAlign: 'middle',
  },

  map: {
    '& img': {
      width: '100%',
      height: 400,
    },
  },

  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2,1fr)',
    gridGap: 40,
    '@media screen and (max-width: 960px)': {
      display: 'block',
    },
  },

  col: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2,1fr)',
    gridGap: 30,
    marginBottom: 10,
    '@media screen and (max-width: 760px)': {
      display: 'block',
    },
  },

  colFul: {
    textAlign: 'center',
  },

  spanIcons: {
    padding: '8px 14px',
    border: '1px solid #ccc',
    borderRight: 0,
    lineHeight: '13px',
    textAlign: 'center',
    '& img': {
      height: 15,
      width: 15,
    },
  },

  inputGroup: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 5fr',
    marginBottom: 10,
  },

  input: {
    width: '100%',
    padding: '6px 12px',
    outline: 0,
    border: '1px solid #ccc',
  },
  inputTexarea: {
    width: '100%',
    height: 120,
    boxSsizing: 'border-box',
    padding: 5,
    border: '1px solid #ccc',
    resize: 'none',
    outline: 0,
  },
  btn: {
    color: '#fff',
    background: '#333',
    border: '1px solid #333',
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
    padding: '7px 15px',
    position: 'relative',
    width: 'auto',
    whiteSpace: 'nowrap',
    marginTtop: 10,
    cursor: 'pointer',
  },
  phone: {
    width: '100%',
    float: 'left',
    fontSize: 14,
    lineHeight: '16px',
    margin: '5px 0',
    overflow: 'hidden',
    paddingBottom: 5,

    '& img': {
      height: 15,
      width: 15,
      verticalAlign: 'middle',
    },
  },

  spaceSpan: {
    padding: 7,
    verticalAlign: 'middle',
  },

  spaceSpanLink: {
    padding: 7,

    cursor: 'pointer',
    verticalAlign: 'middle',
    '&:hover': {
      color: '#428bca',
    },
  },

  right: {
    '@media screen and (max-width: 960px)': {
      marginBottom: 200,
    },
  },
}));

export default Contact;
