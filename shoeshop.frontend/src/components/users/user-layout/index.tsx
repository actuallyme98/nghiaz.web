import React, { useMemo } from 'react';

// ctyles
import css from './style.module.scss';

// components
import Breadcrumb, { BreadcumbItem } from '../../../components/breadcrumb';
import Layout from '../../../components/layout';
import ProfileMenu from '../profile-menu';

interface Props {
  title?: string;
  breadcumb: { title: string; url: string }[];
  loading?: boolean;
}

const BREADCRUMB_ITEMS: BreadcumbItem[] = [
  { title: 'Trang chủ', url: '/' },
  { title: 'Trang cá nhân', url: '/user' },
];

// mocks
const userData = {
  user: {
    firstName: '',
    lastName: '',
    client: {
      avatar: '',
      level: '',
      score: 1,
    },
  },
};
const loading = false;
const loadingUser = false;

const UserLayout: React.FC<Props> = ({ children, breadcumb, title = 'Trang cá nhân', loading }) => {
  const items = useMemo(() => [...BREADCRUMB_ITEMS, ...breadcumb], [breadcumb]);
  return (
    <Layout loading={loading || loadingUser}>
      <div className={css.root}>
        <div className={css.container}>
          <div className={css.breadcumbWrap}>
            <Breadcrumb items={items} />
          </div>
          <div className={css.content}>
            <div className={css.left}>
              <ProfileMenu
                data={{
                  avatar: userData?.user.client?.avatar || process.env.DEFAULT_AVATAR_URL || '',
                  name: userData?.user.lastName + ' ' + userData?.user.firstName,
                  point: userData?.user.client?.score || 0,
                }}
              />
            </div>
            <div className={css.right}>{children}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserLayout;
