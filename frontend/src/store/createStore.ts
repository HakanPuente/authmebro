/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable dot-notation */

import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware,
  AnyAction,
  Reducer,
  Store,
} from 'redux';
import thunk from 'redux-thunk';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';
import RootState from './store';
import { ASYNC_ERROR } from '../modules/common/async/async.actions';
import { SIGN_OUT, TOKEN_EXPIRED } from '../modules/auth/+store/auth.actions';
import auth from '../modules/auth';
import global from '../modules/global';
import settings from '../settings';

export default (preloadedState: any): Store => {
  const appReducer = combineReducers({
    auth: auth.reducers,
  });

  const rootReducer = (state: RootState, action: AnyAction): any => {
    if (
      action.type === SIGN_OUT ||
      (action.type === ASYNC_ERROR && action.model === TOKEN_EXPIRED)
    ) {
      return (appReducer(undefined, action) as unknown) as Reducer<
        RootState,
        AnyAction
      >;
    }
    return (appReducer(state, action) as unknown) as Reducer<
      RootState,
      AnyAction
    >;
  };

  const epicMiddleware = createEpicMiddleware();
  const epics = combineEpics(global.epics);

  let middleware: any[];
  if (process.browser) {
    middleware = [epicMiddleware, thunk];
  } else {
    middleware = [thunk];
  }

  let composeEnhancers: any;
  if (typeof window !== 'undefined' && settings.env == 'development') {
    composeEnhancers =
      ((window as any)[
        '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'
      ] as typeof compose) || compose;
  } else {
    composeEnhancers = compose;
  }

  const store = createStore(
    rootReducer as any,
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware)),
  );
  if (process.browser) {
    epicMiddleware.run(epics as Epic);
  }
  return store;
};
