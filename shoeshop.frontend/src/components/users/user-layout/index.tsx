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
  profile: REDUX_STORE.Profile;
}

const BREADCRUMB_ITEMS: BreadcumbItem[] = [
  { title: 'Trang chủ', url: '/' },
  { title: 'Trang cá nhân', url: '/user' },
];

const defaultAvatar = process.env.DEFAULT_AVATAR_URL || '';

const UserLayout: React.FC<Props> = ({ children, breadcumb, loading, profile }) => {
  const items = useMemo(() => [...BREADCRUMB_ITEMS, ...breadcumb], [breadcumb]);

  return (
    <Layout loading={loading}>
      <div className={css.root}>
        <div className={css.container}>
          <div className={css.breadcumbWrap}>
            <Breadcrumb items={items} />
          </div>
          <div className={css.content}>
            <div className={css.left}>
              <ProfileMenu
                data={{
                  avatar: profile.client?.avatar || defaultAvatar,
                  name: profile.firstName + ' ' + profile.lastName,
                  updatedAt: profile.updatedAt,
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
