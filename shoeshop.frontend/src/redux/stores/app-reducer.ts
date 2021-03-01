import { createTypeReducer } from '../type-redux';
import * as AppActions from '../actions/app-action';

export const initialState: REDUX_STORE.State = {
  isMobile: false,
  openCartDrawer: false,
};

export const loadingReducer = AppActions.detectMobile.reducer<REDUX_STORE.State>(
  (state, action) => ({
    isMobile: action.payload,
  }),
);

export const openCartDrawer = AppActions.openCartDrawer.reducer<REDUX_STORE.State>(
  (state, action) => ({
    openCartDrawer: action.payload,
  }),
);

export const reducer = createTypeReducer(initialState, loadingReducer, openCartDrawer);
