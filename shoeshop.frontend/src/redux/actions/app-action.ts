import { createTypeAction } from '../type-redux';

import * as Utils from '../../utilities/app-util';

export const detectMobile = createTypeAction('DETECT_MOBILE', (userAgent: string) => {
  return Utils.detectMobile(userAgent);
});

export const openCartDrawer = createTypeAction('OPEN_CART_DRAWER', (open: boolean) => open);
