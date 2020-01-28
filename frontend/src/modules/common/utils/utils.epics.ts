import { catchError, map, takeUntil } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { ofType, ActionsObservable } from 'redux-observable';

import { AnyAction, Action } from 'redux';
import { asyncError } from '../async/async.actions';
import { TOKEN_EXPIRED } from '../../auth/+store/auth.actions';

export const noopAction = (): AnyAction => ({
  type: 'noop',
});

export const apiErrorHandlerEpicFragment = (action: AnyAction) => (
  source: any,
): any =>
  source.pipe(
    catchError(error => {
      console.log('apiErrorHandlerEpicFragment', error.name, error.message);
      if (error.name === 'NoSession') {
        return of({ success: false, action: noopAction() });
      }
      if (error.name === 'SessionExpired') {
        return of({
          success: false,
          action: asyncError(TOKEN_EXPIRED, error, error.message, { action }),
        });
      }
      if (error.message.includes('GraphQL error: ')) {
        throw new Error(error.message.replace('GraphQL error: ', ''));
      }
      throw error;
    }),
  );

export const CANCEL_API_REQUEST = 'apiRequest.cancel';
export const cancelApiRequest = (): any => ({ type: CANCEL_API_REQUEST });
export const cancelOnAction = (
  action$: ActionsObservable<Action>,
): Observable<Action> => action$.pipe(ofType(CANCEL_API_REQUEST));

export const commonApiCallFragment = (
  action$: ActionsObservable<Action>,
  action: AnyAction,
  errorLabel: string,
  incoming = {},
) => (source: any): any =>
  source.pipe(
    map((response: any) => {
      if (response && response.response && response.response.errors) {
        return {
          success: false,
          action: asyncError(
            action.type,
            new Error(errorLabel),
            response.response.errors[0].message,
            {
              action,
              response: response.response,
              ...incoming,
            },
          ),
        };
      }
      return {
        ...incoming,
        action,
        success: true,
        response,
      };
    }),
    takeUntil(cancelOnAction(action$)),
    apiErrorHandlerEpicFragment(action),
    catchError(error =>
      of({
        success: false,
        action: asyncError(action.type, error, errorLabel, {
          action,
          ...incoming,
        }),
      }),
    ),
  );

export const checkForkErrors = () => (source: any): any =>
  source.pipe(
    map((results: any) => {
      const failed: any[] = [];
      const succeeded: any[] = [];
      results.forEach((result: any) => {
        if (!result.success) {
          if (result.actions) {
            failed.push(...result.actions);
          } else {
            failed.push(result.action);
          }
        } else {
          succeeded.push(result);
        }
      });
      if (failed.length) {
        return {
          success: false,
          actions: failed,
          succeeded,
        };
      }
      return {
        success: true,
        results,
      };
    }),
  );
