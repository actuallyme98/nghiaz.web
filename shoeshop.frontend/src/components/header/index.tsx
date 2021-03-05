import React, { useState, useCallback } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';

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
          <a className={css.menuLinkDrawer} href="/">
            Trang chủ
          </a>
          <a className={css.menuLinkDrawer} href="/category/giay-nam">
            Giày nam
          </a>
          <a className={css.menuLinkDrawer} href="/category/giay-nu">
            Giày nữ
          </a>
          <a className={css.menuLinkDrawer} href="/category/giay-doi">
            Giày đôi
          </a>
          <a className={css.menuLinkDrawer} href="/category/tui-xach">
            Phụ kiện
          </a>
          <a className={css.menuLinkDrawer} href="/">
            Khuyến mại
          </a>
          <a className={css.menuLinkDrawer} href="/blogs">
            Tin tức
          </a>
          <a className={css.menuLinkDrawer} href="/contact">
            Liên hệ
          </a>
        </div>
      </Drawer>
      <div className="container">
        <div className={css.wrapper}>
          <a href="/" className={css.logoLink}>
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

            <a href="/order" className={clsx(css.phoneText, css.orderLink)}>
              <div className={css.borderBox}>
                <img src="/assets/icons/bill.svg" alt="" />
              </div>
              <span>Kiểm tra đơn hàng</span>
            </a>

            <a href="/profile" className={css.borderBox}>
              <img src="/assets/icons/user.svg" alt="" />
            </a>

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
            <a className={css.menuLink} href="/">
              Trang chủ
            </a>
            <a className={css.menuLink} href="/category/giay-nam">
              Giày nam
            </a>
            <a className={css.menuLink} href="/category/giay-nu">
              Giày nữ
            </a>
            <a className={css.menuLink} href="/category/giay-doi">
              Giày đôi
            </a>
            <div className={clsx(css.menuLink, css.menuDropDown)}>
              Phụ kiện
              <div className={css.dropDown}>
                <a className={css.dropDownItem} href="/category/tui-xach">
                  Túi xách
                </a>
                <a className={css.dropDownItem} href="/category/day-giay">
                  Dây giày
                </a>
                <a className={css.dropDownItem} href="/category/binh-xit">
                  Bình xịt
                </a>
                <a className={css.dropDownItem} href="/category/kinh">
                  Kính
                </a>
                <a className={css.dropDownItem} href="/category/lot-giay">
                  Lót giày
                </a>
                <a className={css.dropDownItem} href="/category/qua-tang">
                  Qùa tặng
                </a>
              </div>
            </div>
            <a className={css.menuLink} href="/">
              Khuyến mại
            </a>
            <div onClick={redirectToBlog} className={clsx(css.menuLink, css.menuDropDown)}>
              Tin tức
              <div className={css.dropDown}>
                <a className={css.dropDownItem} href="/">
                  Hoạt động cộng đồng
                </a>
                <a className={css.dropDownItem} href="/">
                  Xu hướng
                </a>
                <a className={css.dropDownItem} href="/">
                  Mẹo hay hằng ngày
                </a>
                <a className={css.dropDownItem} href="/">
                  Trải nghiệm - Phượt
                </a>
                <a className={css.dropDownItem} href="/">
                  Feedback
                </a>
              </div>
            </div>
            <a className={css.menuLink} href="/contact">
              Liên hệ
            </a>
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
