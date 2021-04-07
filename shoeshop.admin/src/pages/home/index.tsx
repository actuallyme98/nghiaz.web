import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RouteConfigComponentProps } from 'react-router-config';

// components
import Layout from '../../components/layout';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const Home: React.FC<RouteConfigComponentProps<any>> = (props) => {
  const classes = useStyles();

  return (
    <Layout title="Nghĩa Phương ADMIN">
      <div className={classes.note}>
        <KeyboardBackspaceIcon />
        <p>Just open sidebar</p>
      </div>
    </Layout>
  );
};

const useStyles = makeStyles((theme) => ({
  note: {
    padding: 50,
    display: 'flex',
    alignItems: 'center',
  },
}));

export default Home;
