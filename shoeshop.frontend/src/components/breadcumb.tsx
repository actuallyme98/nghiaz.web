import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

export interface BreadcumbItem {
  title: string;
  url?: string;
}

interface IProps {
  items: BreadcumbItem[];
}

const Breadcrumb: React.FC<IProps> = ({ items }) => {
  const classes = useStyles();
  return (
    <div className={classes.breadcrumb}>
      {items.map((e, i) =>
        e.url ? (
          <Link to={e.url} key={i} className={clsx(classes.title, classes.linkTitle)}>
            {e.title}
          </Link>
        ) : (
          <div key={i} className={classes.title}>
            {e.title}
          </div>
        ),
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  breadcrumb: {
    width: 'fit-content',
    height: 28,
    borderRadius: 5,
    border: 'solid 1px #efefef',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
    justifyContent: 'space-between',
    padding: '6px 0 6px 10px',
    display: 'flex',
  },
  title: {
    textDecoration: 'none',
    float: 'left',
    textAlign: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    fontSize: 12,
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#4a4a4a',
    paddingRight: 10,
    '&::after': {
      content: '""',
      transform: 'rotate(-45deg) skew(-12deg, -12deg)',
      display: 'inline-block',
      borderBottom: '1px solid #ececec',
      borderRight: '1px solid #ececec',
      width: 16,
      height: 16,
      marginTop: -2,
      marginBottom: -2,
    },
    '&:last-child': {
      color: '#f16728',
      fontSize: 12,
    },
    '&:last-child::after': {
      content: 'none',
    },
  },
  linkTitle: {
    cursor: 'pointer',
  },
}));

export default Breadcrumb;
