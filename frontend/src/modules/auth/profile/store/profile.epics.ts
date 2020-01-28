import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { from, of, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { apiGetMe } from './profile.api';
import { GET_ME } from './profile.actions';
import { commonApiCallFragment } from '../../../common/utils/utils.epics';
import { asyncFinish } from '../../../common/async/async.actions';
import RootState from '../../../../store/store';
import { AnyResult } from '../../../common/common';
// import AnyResult from '../../../common/utils/utils.epics';

const getMeEpic: Epic<AnyAction, AnyAction, RootState> = action$ =>
  action$.pipe(
    ofType(GET_ME),
    switchMap(
      (action: AnyAction): Observable<AnyResult> => {
        return from(apiGetMe()).pipe(
          commonApiCallFragment(action$, action, 'Reset Password'),
        );
      },
    ),
    switchMap((results: AnyResult) => {
      if (results.success) {
        return of(
          asyncFinish(results.action.type, {
            user: results.response,
          }),
        );
      }
      if (results.actions) return of(...results.actions);
      return of(results.action);
    }),
  );

export default combineEpics(getMeEpic);
