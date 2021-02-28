import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider, { Settings } from 'react-slick';

// components
import Grid from '@material-ui/core/Grid';

interface IProps {}

const BlogHome: React.FC<IProps> = (props) => {
  const classes = useStyles();

  const blogSliders = useMemo(() => {
    return blogs.map((blog, index) => (
      <a className={classes.leftItem} href="/" target="_blank" key={index}>
        <img src={blog.thumnail} alt="" />
        <div className={classes.specialArea}>
          <div className={classes.specialTag}>TIN TỨC</div>
          <div className={classes.specialTitle}>{blog.title}</div>
        </div>
      </a>
    ));
  }, []);

  const listBlogs = useMemo(() => {
    return blogs.map((blog, index) => (
      <a className={classes.blogContainer} href="/" key={index}>
        <div className={classes.thumbnail}>
          <img src={blog.thumnail} alt="" />
        </div>
        <div className={classes.blogContentArea}>
          <div className={classes.blogHeading}>{blog.title}</div>
          <div className={classes.createdDate}>{blog.date}</div>
          <div className={classes.shortDescription}>{blog.shortDescription}</div>
        </div>
      </a>
    ));
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.heading}>TIN TỨC MỖI NGÀY</div>
      <Grid className={classes.gridContainer} container>
        <Grid xs={12} sm={9} md={7} item>
          <Slider {...settings}>{blogSliders}</Slider>
        </Grid>
        <Grid xs={12} sm={9} md={5} className={classes.gridItem} item>
          <div className={classes.rightHeading}>BÀI ĐƯỢC XEM NHIỀU NHẤT</div>
          {listBlogs}
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 50,
  },
  heading: {
    fontSize: 26,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    '&::before': {
      content: '""',
      flexGrow: 1,
      height: 2,
      background: '#333',
      marginRight: 20,
    },
    '&::after': {
      content: '""',
      height: 2,
      flexGrow: 1,
      background: '#333',
      marginLeft: 20,
    },
  },
  gridContainer: {
    justifyContent: 'center',
  },
  gridItem: {
    padding: 20,
  },
  leftItem: {
    position: 'relative',
    '& img': {
      width: '100%',
      maxHeight: 600,
    },
  },
  specialArea: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '65%',
    background: 'rgba(255,255,255,.7)',
  },
  specialTag: {
    background: '#3ba1a2',
    color: '#fff',
    padding: '2px 10px',
    display: 'inline-block',
  },
  specialTitle: {
    fontSize: 22,
    padding: '15px 20px',
    color: '#000',
  },
  rightHeading: {
    fontSize: 18,
    textAlign: 'center',
    borderBottom: '2px solid #333',
    marginBottom: 10,
  },
  blogContainer: {
    display: 'flex',
    textDecoration: 'none',
  },
  thumbnail: {
    width: '50%',
    marginRight: 10,
    '& img': {
      width: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      minWidth: 100,
    },
  },
  blogContentArea: {},
  blogHeading: {
    color: '#222',
    fontSize: 16,
  },
  createdDate: {
    fontSize: 13,
    color: '#666',
  },
  shortDescription: {
    fontSize: 14,
    color: '#7c7575',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  },
}));

export default BlogHome;

const settings: Settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
};

const blogs = Array.from({ length: 4 }, (_, index) => ({
  thumnail: `/assets/mocks/blogs/blog${index + 1}.jpg`,
  title: 'Bluewind – Định hướng phong cách riêng cho các cặp đôi',
  date: '17:01:51 23/02/2021',
  shortDescription:
    'Giày đôi là món quà giúp gửi gắm tình yêu bền vững, sự quan tâm nhẹ nhàng cho đối phương.',
}));
