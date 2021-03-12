import { createTypeReducer, isError } from '../type-redux';
import * as AppActions from '../actions/app-action';

export interface Store {
  isMobile: boolean;
  openCartDrawer: boolean;
  initializeAuthPage?: boolean;
  profile?: REDUX_STORE.Profile;
  deliveryAddresses: SHOES_API.GDeliveryAddress[];
}

export const initialState: Store = {
  isMobile: false,
  openCartDrawer: false,
  deliveryAddresses: [],
};

export const detectMobileReducer = AppActions.detectMobile.reducer<Store>((state, action) => ({
  isMobile: action.payload,
}));

export const openCartDrawer = AppActions.openCartDrawer.reducer<Store>((state, action) => ({
  openCartDrawer: action.payload,
}));

export const loginReducer = AppActions.loginAction.reducer<Store>((state, action) => {
  if (isError(action) || !action.payload) {
    return {};
  }
  return {
    profile: action.payload.user,
  };
});

export const getProfile = AppActions.getProfileAction.reducer<Store>((state, action) => {
  if (isError(action) || !action.payload || !action.payload.me) {
    return {};
  }
  return {
    profile: action.payload.me,
  };
});

export const logoutReducer = AppActions.logOutAction.reducer<Store>((state, action) => {
  if (isError(action) || !action.payload) {
    return {};
  }
  return {
    profile: undefined,
    deliveryAddresses: [],
  };
});

export const listDeliveryAddressReducer = AppActions.listDeliveryAddressAction.reducer<Store>(
  (state, action) => {
    if (isError(action) || !action.payload.data) {
      return {};
    }
    return {
      deliveryAddresses: action.payload.data,
    };
  },
);

export const reducer = createTypeReducer(
  initialState,
  detectMobileReducer,
  openCartDrawer,
  loginReducer,
  getProfile,
  logoutReducer,
  listDeliveryAddressReducer,
);
