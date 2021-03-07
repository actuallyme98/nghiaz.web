import React, { useState, useCallback } from 'react';
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

// redux
import * as AppActions from '../../redux/actions/app-action';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/stores/configure-store';

// enums
import { AppRouteEnums } from '../../enums/app-route.enum';

interface IProps {}

const Header: React.FC<IProps> = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const openCartDrawer = useSelector((store: RootState) => store.appState.openCartDrawer);
  const dispatch = useDispatch();
  const route = useRouter();

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

  return (
    <div>
      <IconButton className={css.menuButton} onClick={handleCollapseMenu}>
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
          <Link href={AppRouteEnums.HOME}>
            <a className={css.menuLink}>Trang chủ</a>
          </Link>
          <Link href="/category/giay-nam">
            <a className={css.menuLink}>Giày nam</a>
          </Link>
          <Link href="/category/giay-nu">
            <a className={css.menuLink}>Giày nữ</a>
          </Link>
          <Link href="/category/giay-doi">
            <a className={css.menuLink}>Giày đôi</a>
          </Link>
          <Link href="/category/tui-xach">
            <a className={css.menuLinkDrawer}>Phụ kiện</a>
          </Link>
          <Link href={AppRouteEnums.HOME}>
            <a className={css.menuLinkDrawer}>Khuyến mại</a>
          </Link>
          <Link href={AppRouteEnums.BLOGS}>
            <a className={css.menuLinkDrawer}>Tin tức</a>
          </Link>
          <Link href={AppRouteEnums.CONTACT}>
            <a className={css.menuLink}>Liên hệ</a>
          </Link>
        </div>
      </Drawer>
      <div className="container">
        <div className={css.wrapper}>
          <a href={AppRouteEnums.HOME} className={css.logoLink}>
            <img src="/assets/icons/logo.png" alt="" />
          </a>
          <div className={css.boxInput}>
            <div className={css.inputGroupSearch}>
              <input className={css.inputSearch} placeholder="Bạn cần tìm gì?" />
            </div>
            <button className={css.btnSearch}>
              <img src="/assets/icons/search.svg" alt="" />
            </button>
          </div>
          <div className={css.controlHeader}>
            <a href="tel:0364589229" className={clsx(css.phoneText, css.phoneLink)}>
              <div className={css.borderBox}>
                <img src="/assets/icons/phone.svg" alt="" />
              </div>
              <span>0364589229</span>
            </a>
            <Link href={AppRouteEnums.USER_ORER_HISTORY}>
              <a className={clsx(css.phoneText, css.orderLink)}>
                <div className={css.borderBox}>
                  <img src="/assets/icons/bill.svg" alt="" />
                </div>
                <span>Kiểm tra đơn hàng</span>
              </a>
            </Link>
            <Link href={AppRouteEnums.USER}>
              <a className={css.borderBox}>
                <img src="/assets/icons/user.svg" alt="" />
              </a>
            </Link>
            <Badge count={1} className={css.customBadge} color="primary">
              <div onClick={handleOpenCloseCartDrawer} className={css.borderBox}>
                <img src="/assets/icons/shopping-cart.svg" alt="" />
              </div>
            </Badge>
          </div>
        </div>
      </div>
      <div className={css.mainMenu}>
        <div className="container">
          <div className={css.dFlexline}>
            <Link href={AppRouteEnums.HOME}>
              <a className={css.menuLink}>Trang chủ</a>
            </Link>
            <Link href="/category/giay-nam">
              <a className={css.menuLink}>Giày nam</a>
            </Link>
            <Link href="/category/giay-nu">
              <a className={css.menuLink}>Giày nữ</a>
            </Link>
            <Link href="/category/giay-doi">
              <a className={css.menuLink}>Giày đôi</a>
            </Link>
            <div className={clsx(css.menuLink, css.menuDropDown)}>
              Phụ kiện
              <div className={css.dropDown}>
                <Link href="/category/tui-xach">
                  <a className={css.dropDownItem}>Túi xách</a>
                </Link>
                <Link href="/category/day-giay">
                  <a className={css.dropDownItem}>Dây giày</a>
                </Link>
                <Link href="/category/binh-xit">
                  <a className={css.dropDownItem}>Bình xịt</a>
                </Link>
                <Link href="/category/kinh">
                  <a className={css.dropDownItem}>Kính</a>
                </Link>
                <Link href="/category/lot-giay">
                  <a className={css.dropDownItem}>Lót giày</a>
                </Link>
                <Link href="/category/qua-tang">
                  <a className={css.dropDownItem}>Qùa tặng</a>
                </Link>
              </div>
            </div>
            <Link href={AppRouteEnums.HOME}>
              <a className={css.menuLink}>Khuyến mại</a>
            </Link>
            <div onClick={redirectToBlog} className={clsx(css.menuLink, css.menuDropDown)}>
              Tin tức
              <div className={css.dropDown}>
                <Link href={AppRouteEnums.HOME}>
                  <a className={css.dropDownItem}>Hoạt động cộng đồng</a>
                </Link>
                <Link href={AppRouteEnums.HOME}>
                  <a className={css.dropDownItem}>Xu hướng</a>
                </Link>
                <Link href={AppRouteEnums.HOME}>
                  <a className={css.dropDownItem}>Mẹo hay hằng ngày</a>
                </Link>
                <Link href={AppRouteEnums.HOME}>
                  <a className={css.dropDownItem}>Trải nghiệm - Phượt</a>
                </Link>
                <Link href={AppRouteEnums.HOME}>
                  <a className={css.dropDownItem}>Feedback</a>
                </Link>
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
