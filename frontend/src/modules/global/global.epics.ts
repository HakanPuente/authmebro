import Router from 'next/router';
import { AnyAction } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import { from, Observable, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import RootState from '../../store/store';
import { TOKEN_EXPIRED } from '../auth/+store/auth.actions';
import { ASYNC_ERROR, ASYNC_FINISH } from '../common/async/async.actions';
import { AnyResult } from '../common/common';
import { commonApiCallFragment, noopAction } from '../common/utils/utils.epics';
import { NAVIGATE } from './global.actions';

const routes: any = {
  [ASYNC_FINISH]: {},
  [ASYNC_ERROR]: {
    [TOKEN_EXPIRED]: (): string => {
      return '/auth/sign-in';
    },
  },
};

const routingEpic: Epic<AnyAction, AnyAction, RootState> = action$ =>
  action$.pipe(
    filter(action => [ASYNC_FINISH, ASYNC_ERROR].includes(action.type)),
    switchMap(
      (action: AnyAction): Observable<AnyResult> => {
        const route = routes[action.type][action.model];
        if (route) {
          const path = route(action);
          return from(Router.push(path)).pipe(
            commonApiCallFragment(action$, action, 'Navigate', { path }),
          );
        }
        return of({ success: false, response: null, action: noopAction() });
      },
    ),
    switchMap(
      (results: AnyResult): Observable<AnyAction> => {
        if (results.success) {
          return of({
            type: NAVIGATE,
            action: results.action,
            path: results.path,
          });
        }
        if (results.actions) return of(...results.actions);
        return of(results.action);
      },
    ),
  );

export default combineEpics(routingEpic);
