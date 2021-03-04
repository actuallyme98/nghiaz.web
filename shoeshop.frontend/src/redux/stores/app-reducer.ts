import { createTypeReducer } from '../type-redux';
import * as AppActions from '../actions/app-action';

export const initialState: REDUX_STORE.Store = {
  isMobile: false,
  openCartDrawer: false,
};

export const detectMobileReducer = AppActions.detectMobile.reducer<REDUX_STORE.Store>(
  (state, action) => ({
    isMobile: action.payload,
  }),
);

export const openCartDrawer = AppActions.openCartDrawer.reducer<REDUX_STORE.Store>(
  (state, action) => ({
    openCartDrawer: action.payload,
  }),
);

export const reducer = createTypeReducer(initialState, detectMobileReducer, openCartDrawer);
