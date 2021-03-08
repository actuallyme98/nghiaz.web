import { createTypeReducer, isError } from '../type-redux';
import * as AppActions from '../actions/app-action';

export const initialState: REDUX_STORE.Store = {
  isMobile: false,
  openCartDrawer: false,
};

export const detectMobileReducer = AppActions.detectMobile.reducer((state, action) => ({
  isMobile: action.payload,
}));

export const openCartDrawer = AppActions.openCartDrawer.reducer((state, action) => ({
  openCartDrawer: action.payload,
}));

export const loginReducer = AppActions.loginAction.reducer((state, action) => {
  if (isError(action) || !action.payload) {
    return {};
  }
  return {
    profile: action.payload.user,
  };
});

export const getProfile = AppActions.getProfileAction.reducer((state, action) => {
  if (isError(action) || !action.payload || !action.payload.me) {
    return {};
  }
  return {
    profile: action.payload.me,
  };
});

export const logoutReducer = AppActions.logOutAction.reducer((state, action) => {
  if (isError(action) || !action.payload) {
    return {};
  }
  return {
    profile: undefined,
  };
});

export const reducer = createTypeReducer(
  initialState,
  detectMobileReducer,
  openCartDrawer,
  loginReducer,
  getProfile,
  logoutReducer,
);
