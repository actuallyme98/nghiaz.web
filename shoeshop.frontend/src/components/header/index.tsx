import React, { useState, useCallback, useMemo, useEffect } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import Link from 'next/link';

// styles
import css from './style.module.scss';

// components
import Badge from 'antd/lib/badge';
import IconButton from 'antd/lib/button';
import Drawer from 'antd/lib/drawer';
import CartDrawer from '../cart-drawer';
import PopoverProfile from './popover-profile';

// redux
import * as AppActions from '../../redux/actions/app-action';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/stores/configure-store';

// enums
import { AppRouteEnums } from '../../enums/app-route.enum';

interface IProps {
  backUrl?: string;
}

const Header: React.FC<IProps> = (props) => {
  const { backUrl } = props;
  const [openMenu, setOpenMenu] = useState(false);
  const [keyword, setKeyword] = useState('');
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const profile = useSelector((store: RootState) => store.appState.profile);
  const categories = useSelector((store: RootState) => store.appState.categories);
  const openCartDrawer = useSelector((store: RootState) => store.appState.openCartDrawer);
  const cartline = useSelector((store: RootState) => store.appState.cartline);
  const blogCategories = useSelector((store: RootState) => store.appState.blogCategories);
  const dispatch = useDispatch();
  const route = useRouter();

  useEffect(() => {
    const { keyword } = route.query;
    if (keyword) {
      setKeyword(String(keyword));
    }
  }, []);

  const handleChangeKeyword = useCallback((event: any) => {
    setKeyword(event.target.value);
  }, []);

  const handleKeydown = useCallback(
    (event: any) => {
      if (event.code === 'Enter') {
        handleSearch();
      }
    },
    [keyword],
  );

  const handleSearch = useCallback(() => {
    route.push(`/search?keyword=${keyword}`);
  }, [keyword]);

  const handleCollapseMenu = useCallback(() => {
    setOpenMenu((prev) => !prev);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false);
  }, []);

  const handleOpenCloseCartDrawer = useCallback(() => {
    dispatch(AppActions.openCartDrawer(!openCartDrawer));
  }, [openCartDrawer]);

  const redirectToBlog = useCallback(() => {
    route.push('/blogs');
  }, []);

  const goBack = useCallback(() => {
    route.push(backUrl || AppRouteEnums.HOME);
  }, [backUrl]);

  const totalItem = useMemo(() => cartline?.cartItems.reduce((sum, item) => sum + item.amount, 0), [
    cartline,
  ]);

  const listMainMenu = useMemo(() => {
    return categories
      .filter((categ) => categ.pk !== 1)
      .map((x, index) => (
        <Link key={index} href={`/category/${x.slug.trim()}`}>
          <a className={css.menuLink}>{x.name}</a>
        </Link>
      ));
  }, [categories]);

  const listPk = useMemo(() => {
    return categories
      .filter((categ) => categ.pk !== 0)
      .map((x, index) => (
        <Link key={index} href={`/category/${x.slug.trim()}`}>
          <a className={css.dropDownItem}>{x.name}</a>
        </Link>
      ));
  }, [categories]);

  const menuDrawer = useMemo(() => {
    return categories
      .filter((categ) => categ.pk !== 1)
      .map((x, index) => (
        <Link key={index} href={`/category/${x.slug.trim()}`}>
          <a className={css.menuLinkDrawer}>{x.name}</a>
        </Link>
      ));
  }, [categories]);

  const profileMenu = useMemo(() => {
    if (!profile) {
      return (
        <Link href={AppRouteEnums.SIGNIN}>
          <a className={css.borderBox}>
            <img src="/assets/icons/user.svg" alt="" />
          </a>
        </Link>
      );
    }
    return (
      <PopoverProfile
        data={{
          avatar: profile.client?.avatar,
        }}
      />
    );
  }, [profile]);

  const profileLink = useMemo(() => {
    if (!profile) {
      return (
        <>
          <Link href={AppRouteEnums.HOME}>
            <a className={css.menuLinkDrawer}>Trang chủ</a>
          </Link>
          <Link href={AppRouteEnums.SIGNIN}>
            <a className={css.menuLinkDrawer}>Đăng nhập/ Đăng ký</a>
          </Link>
        </>
      );
    }
    return (
      <Link href={AppRouteEnums.USER}>
        <a className={css.menuLinkDrawer}>Trang cá nhân</a>
      </Link>
    );
  }, [profile]);

  return (
    <div className={css.rootMobile}>
      {isMobile && backUrl && (
        <IconButton shape="circle" className={css.backMenuButton} onClick={goBack}>
          <img src="/assets/icons/back-menu.svg" alt="" />
        </IconButton>
      )}
      <IconButton
        shape="circle"
        className={clsx({
          [css.menuButton]: true,
          [css.menuButtonMobile]: !isMobile || !backUrl,
        })}
        onClick={handleCollapseMenu}
      >
        <img src="/assets/icons/menu-bar.svg" alt="" />
      </IconButton>
      <Drawer
        visible={openMenu}
        onClose={handleCloseMenu}
        bodyStyle={{
          padding: 0,
        }}
        placement="left"
      >
        <div className={css.rootDrawer}>
          {profileLink}
          {menuDrawer}
          <Link href={AppRouteEnums.HOME}>
            <a className={css.menuLinkDrawer}>Khuyến mại</a>
          </Link>
          <Link href={AppRouteEnums.BLOGS}>
            <a className={css.menuLinkDrawer}>Tin tức</a>
          </Link>
          <Link href={AppRouteEnums.CONTACT}>
            <a className={css.menuLinkDrawer}>Liên hệ</a>
          </Link>
        </div>
      </Drawer>
      <div className={css.container}>
        <div
          className={clsx({
            [css.wrapper]: true,
            [css.wrapperMb]: isMobile,
          })}
        >
          <a href={AppRouteEnums.HOME} className={css.logoLink}>
            <img src="/assets/icons/logo.png" alt="" />
          </a>
          <div
            className={clsx({
              [css.boxInput]: true,
              [css.boxInputMb]: isMobile,
            })}
          >
            <div className={css.inputGroupSearch}>
              <input
                className={css.inputSearch}
                placeholder="Bạn cần tìm gì?"
                onChange={handleChangeKeyword}
                onKeyDown={handleKeydown}
                value={keyword}
              />
            </div>
            <button className={css.btnSearch} onClick={handleSearch}>
              <img src="/assets/icons/search.svg" alt="" />
            </button>
          </div>
          <div className={css.controlHeader}>
            <a
              href="tel:0364589229"
              className={clsx({
                [css.phoneText]: true,
                [css.phoneLink]: true,
                [css.phoneLinkMb]: isMobile,
              })}
            >
              <div className={css.borderBox}>
                <img src="/assets/icons/phone.svg" alt="" />
              </div>
              <span>0364589229</span>
            </a>
            <Link href={AppRouteEnums.USER_ORER_HISTORY}>
              <a
                className={clsx({
                  [css.phoneText]: true,
                  [css.orderLink]: true,
                  [css.orderLinkMb]: isMobile,
                })}
              >
                <div
                  className={clsx({
                    [css.borderBox]: true,
                    [css.borderBoxMb]: isMobile,
                  })}
                >
                  <img src="/assets/icons/bill.svg" alt="" />
                </div>
                <span>Kiểm tra đơn hàng</span>
              </a>
            </Link>
            {profileMenu}
            <Badge count={totalItem}>
              <IconButton
                shape="circle"
                className={css.bagButton}
                onClick={handleOpenCloseCartDrawer}
              >
                <img src="/assets/icons/bag-red.svg" alt="" />
              </IconButton>
            </Badge>
          </div>
        </div>
      </div>
      <div
        className={clsx({
          [css.mainMenu]: true,
          [css.mainMenuMb]: isMobile,
        })}
      >
        <div>
          <div
            className={clsx({
              [css.dFlexline]: true,
              [css.dFlexlineMb]: isMobile,
            })}
          >
            <Link href={AppRouteEnums.HOME}>
              <a className={css.menuLink}>Trang chủ</a>
            </Link>
            {listMainMenu}
            <div className={clsx(css.menuLink, css.menuDropDown)}>
              Phụ kiện
              <div className={css.dropDown}>{listPk}</div>
            </div>
            <div onClick={redirectToBlog} className={clsx(css.menuLink, css.menuDropDown)}>
              Tin tức
              <div className={css.dropDown}>
                {blogCategories.map((item, index) => (
                  <Link key={index} href={`${AppRouteEnums.BLOGS}?category=${item.slug}`}>
                    <a className={css.dropDownItem}>{item.name}</a>
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/contact">
              <a className={css.menuLink}>Liên hệ</a>
            </Link>
          </div>
        </div>
      </div>
      <CartDrawer
        destroyOnClose
        visible={openCartDrawer}
        onClose={handleOpenCloseCartDrawer}
        placement={isMobile ? 'bottom' : 'right'}
        closable={false}
        bodyStyle={{
          padding: 0,
        }}
        width={isMobile ? '100%' : 400}
        height={isMobile ? 'auto' : undefined}
      />
    </div>
  );
};

export default Header;
