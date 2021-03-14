import { createTypeReducer, isError } from '../type-redux';
import * as AppActions from '../actions/app-action';

export interface Store {
  profile?: REDUX_STORE.Profile;
}

export const initialState: Store = {
};

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
  };
});

export const reducer = createTypeReducer(initialState, loginReducer, getProfile, logoutReducer);
