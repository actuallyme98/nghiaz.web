import { createTypeAction, createTypeAsyncAction } from '../type-redux';
import { Store } from 'redux';

// services
import ApiService from '../../services/api-service';

// helpers
import SystemHelper from '../../helpers/system.helper';
import { redirect } from '../../helpers/app-util';

export const detectMobile = createTypeAction<string, boolean>(
  'DETECT_MOBILE',
  (userAgent: string) => {
    return SystemHelper.detectMobile(userAgent);
  },
);

export const openCartDrawer = createTypeAction('OPEN_CART_DRAWER', (open: boolean) => open);

export const registerAction = createTypeAsyncAction(
  'REGISTER_ACTION',
  async (args: SHOES_API.RegisterParams) => {
    return await ApiService.register(args);
  },
);

export const loginAction = createTypeAsyncAction(
  'LOGIN_ACTION',
  async (args: SHOES_API.LoginParams) => {
    return await ApiService.login(args);
  },
);

export const getProfileAction = createTypeAsyncAction(
  'GET_PROFILE_ACTION',
  async (cookie?: string) => {
    return await ApiService.getProfile(cookie);
  },
);

export const initializeAuthPage = createTypeAsyncAction<any, void, Store>(
  'INIT_AUTHENICATE_PAGE',
  async (args, { dispatch }) => {
    const { req, res, urlResponseForMobile } = args;
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    const isMobile = dispatch(detectMobile(userAgent)).payload;
    if (urlResponseForMobile && !isMobile) {
      redirect(res, urlResponseForMobile);
      return;
    }
    const cookie = req.headers.cookie;
    if (!cookie) {
      redirect(res, '/signin');
      return;
    }
    try {
      await dispatch(getProfileAction(cookie));
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const logOutAction = createTypeAsyncAction('LOGOUT_ACTION', async () => {
  return await ApiService.logout();
});
