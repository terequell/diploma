/* eslint-disable import/no-cycle */
import {
  Action,
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import user from './user';
import lesson from './lesson';

declare global {
  interface Window {
    store: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const reducers = combineReducers({
  user,
  lesson,
});

type RootReducerType = typeof reducers;
export type StateType = ReturnType<RootReducerType>;

export type InferActionsTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never;

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<
  R,
  StateType,
  unknown,
  A
>;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
window.store = store;

export default store;
