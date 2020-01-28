import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import RootState from '../../../../store/store';
import { asyncFinish } from '../../../common/async/async.actions';
import { AnyResult } from '../../../common/common';
import { commonApiCallFragment } from '../../../common/utils/utils.epics';
import { apiSignIn } from './sign-in.api';
import { SIGN_IN } from './sign-in.actions';
import { saveSession } from '../../+store/auth.utils';

const signInEpic: Epic<AnyAction, AnyAction, RootState> = action$ =>
  action$.pipe(
    ofType(SIGN_IN),
    switchMap(
      (action: AnyAction): Observable<AnyResult> => {
        return apiSignIn(action.email, action.password).pipe(
          commonApiCallFragment(action$, action, 'Sign in'),
        );
      },
    ),
    switchMap((results: AnyResult) => {
      if (results.success) {
        const {
          token,
          refreshToken,
        } = results.response.response.data.tokenAuth;
        const session = saveSession(results.action.email, token, refreshToken);
        return of(
          asyncFinish(results.action.type, {
            session,
            redirect: results.action.redirect,
          }),
        );
      }
      if (results.actions) return of(...results.actions);
      return of(results.action);
    }),
  );

export default combineEpics(signInEpic);
