import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import {
  typePendingReducerSet,
  createTypeReduxInitialState,
  typeReduxMiddleware,
} from '../type-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import * as AppReducer from './app-reducer';

export const rootReducer = combineReducers({
  ...typePendingReducerSet,
  appState: AppReducer.reducer,
});

export interface RootState {
  appState: REDUX_STORE.Store;
}

export const InitialState: RootState = Object.assign(createTypeReduxInitialState(), {
  appState: AppReducer.initialState,
});

const middlewares: any[] = [typeReduxMiddleware, promiseMiddleware];

export const configureStore = (initialState?: RootState) => {
  return createStore(
    rootReducer,
    { ...InitialState, ...initialState },
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
};
