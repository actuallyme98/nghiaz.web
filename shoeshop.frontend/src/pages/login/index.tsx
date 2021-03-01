import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RouteConfigComponentProps } from 'react-router-config';
import Layout from '../../components/layout';

const Login: React.FC<RouteConfigComponentProps<any>> = (props) => {
  const classes = useStyles();

  return (
    <Layout>
      <div className={classes.formLogin}>
        <div>
          <h1 className={classes.sgn1}>Đăng Nhập</h1>
          <div>
            <ul className={classes.ulForm}>
              <li className={classes.formLink}>
                <input className={classes.inputSelect} type="text" placeholder="Email" />
              </li>
              <li className={classes.formLink}>
                <input className={classes.inputSelect} type="password" placeholder="Mật Khẩu" />
              </li>
              <li className={classes.formLink}>
                <button className={classes.inputSubmit}>Đăng Nhập</button>
              </li>
            </ul>
            <a href="/" className={classes.forgotPass}>
              Quên Mật Khẩu ?
            </a>
            <a href="/" className={classes.signUp}>
              Đăng Ký
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const useStyles = makeStyles((theme) => ({
  formLogin: {
    maxWidth: '100%',
    width: 335,
    margin: '50px auto 0',
    backgroundColor: '#fff',
    boxShadow: '0px 2px 4px rgb(0 0 0 / 10%)',
    marginBottom: 20,
    padding: 15,
  },
  formLink: {
    marginBottom: 15,
    listStyle: 'none',
  },
  ulForm: {
    padding: 0,
    margin: 0,
  },
  sgn1: {
    fontSize: 20,
    marginTop: 0,
    textTransform: 'uppercase',
    color: '#333333',
  },
  inputSelect: {
    height: 34,
    padding: '6px 12px',
    fontSize: 14,
    lineHeight: '20px',
    color: '#555',
    backgroundColor: '#fff',
    backgroundImage: 'none',
    border: '1px solid #ccc',
    position: 'relative',
    zIndex: 2,
    width: '100%',
    marginBottom: 0,
    top: 2,
    outline: 'none',
  },
  inputSubmit: {
    height: 34,
    padding: '6px 12px',
    fontSize: 14,
    lineHeight: '20px',
    backgroundImage: 'none',
    border: '1px solid #ccc',
    position: 'relative',
    zIndex: 2,
    width: '100%',
    marginBottom: 0,
    outline: 0,
    backgroundColor: '#28303e',
    color: '#fff',
    '&:hover': {
      background: '#DC143C',
    },
  },
  forgotPass: {
    color: '#000',
    paddingLeft: 62,
    textDecoration: 'underline',
    fontWeight: 'bold',

    '&:hover': {
      color: '#428bca',
    },
  },
  signUp: {
    color: '#000',
    fontWeight: 'bold',
    paddingLeft: 10,
    '&:hover': {
      color: '#428bca',
    },
  },
}));

export default Login;
