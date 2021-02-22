import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import {
  typePendingReducerSet,
  TypeReduxPendingState,
  createTypeReduxInitialState,
  typeReduxMiddleware,
} from '../type-redux';

import * as AppReducer from './app-reducer';

export const rootReducer = combineReducers({
  ...typePendingReducerSet,
  appState: AppReducer.reducer,
});

export interface IStore {
  appState: REDUX_STORE.State;
}

export const InitialState: IStore = Object.assign(createTypeReduxInitialState(), {
  appState: AppReducer.initialState,
});

const middlewares: any[] = [typeReduxMiddleware, promiseMiddleware];
const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;
export const configureStore = (initialState?: IStore) => {
  return createStore(
    rootReducer,
    { ...InitialState, ...initialState },
    composeEnhancers(applyMiddleware(...middlewares)),
  );
};
