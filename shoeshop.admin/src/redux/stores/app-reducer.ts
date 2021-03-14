import { createTypeReducer, isError } from '../type-redux';
import * as AppActions from '../actions/app-action';

export interface Store {
  profile?: REDUX_STORE.Profile;
  sizes: REDUX_STORE.ProductSize[];
  colors: REDUX_STORE.ProductColor[];
}

export const initialState: Store = {
  sizes: [],
  colors: [],
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
    sizes: [],
    colors: [],
  };
});

export const listSizesReducer = AppActions.listSizesAction.reducer<Store>((state, action) => {
  if (isError(action) || !action.payload) {
    return {};
  }
  return {
    sizes: action.payload,
  };
});

export const listColorsReducer = AppActions.listColorsAction.reducer<Store>((state, action) => {
  if (isError(action) || !action.payload) {
    return {};
  }
  return {
    colors: action.payload,
  };
});

export const reducer = createTypeReducer(
  initialState,
  loginReducer,
  getProfile,
  logoutReducer,
  listSizesReducer,
  listColorsReducer,
);
