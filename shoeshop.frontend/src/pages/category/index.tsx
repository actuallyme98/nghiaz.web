import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RouteConfigComponentProps } from 'react-router-config';

// components
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Layout from '../../components/layout';
import Breadcrumb, { BreadcumbItem } from '../../components/breadcumb';
import MenuFilterOption from '../../components/menu-filter-options';

const BREADCRUMB_ITEMS: BreadcumbItem[] = [
  { title: 'Trang chủ', url: '/' },
  { title: 'Danh mục', url: '/category' },
];

const Home: React.FC<RouteConfigComponentProps<{ slug: string }>> = (props) => {
  const classes = useStyles();

  const items = useMemo(() => [...BREADCRUMB_ITEMS], []);

  return (
    <Layout>
      <Container maxWidth="lg">
        <div className={classes.container}>
          <div className={classes.banner}>
            <img src="/assets/mocks/banners/banner1.png" alt="" />
          </div>
          <div className={classes.breadcumbWrap}>
            <Breadcrumb items={items} />
          </div>

          <div>
            <Grid container>
              <Grid md={3} item>
                <MenuFilterOption />
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {},
  banner: {
    '& img': {
      width: '100%',
    },
  },
  breadcumbWrap: {
    padding: '20px 0',
  },
}));

export default Home;
