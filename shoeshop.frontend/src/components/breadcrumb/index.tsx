import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

// styles
import css from './style.scss';

export interface BreadcumbItem {
  title: string;
  url?: string;
  as?: string;
}

interface IProps {
  items: BreadcumbItem[];
}

const Breadcrumb: React.FC<IProps> = ({ items }) => {
  return (
    <div className={css.breadcrumb}>
      {items.map((e, i) =>
        e.url ? (
          <Link href={e.url} as={e.as} key={i}>
            <a className={clsx(css.title, css.linkTitle)}>{e.title}</a>
          </Link>
        ) : (
          <div key={i} className={css.title}>
            {e.title}
          </div>
        ),
      )}
    </div>
  );
};

export default Breadcrumb;
