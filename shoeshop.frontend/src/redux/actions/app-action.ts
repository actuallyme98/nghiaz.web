import { createTypeAction, createTypeAsyncAction } from '../type-redux';
import SystemHelper from '../../helpers/system.helper';
import ApiService from '../../services/api-service';

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
    const { message, status } = await ApiService.register(args);
    if (!status) {
      throw new Error(message);
    }
    return message;
  },
);
