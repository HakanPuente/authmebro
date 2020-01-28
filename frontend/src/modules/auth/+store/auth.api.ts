import { ajax } from 'rxjs/ajax';
import { REFRESH_TOKEN } from './auth.queries';

import { Observable } from 'rxjs';
import settings from '../../../settings';

export const apiRefreshToken = (refreshToken: string): Observable<any> =>
  ajax.post(
    settings.apiUrl,
    {
      query: REFRESH_TOKEN,
      variables: {
        refreshToken,
      },
    },
    {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  );

export default 'leaderboard.api';
