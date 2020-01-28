import { ajax, AjaxResponse } from 'rxjs/ajax';
import { withToken } from '../../+store/auth.utils';
import { switchMap } from 'rxjs/operators';
import { GET_ME } from './profile.queries';
import { Observable } from 'rxjs';
import settings from '../../../../settings';

export const apiGetMe = (): Observable<AjaxResponse> =>
  withToken().pipe(
    switchMap(token =>
      ajax.post(
        settings.apiUrl,
        {
          query: GET_ME,
        },
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `JWT ${token}`,
        },
      ),
    ),
  );
