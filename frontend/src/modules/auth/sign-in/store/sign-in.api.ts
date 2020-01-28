import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs';
import { SIGN_IN } from './sign-in.queries';
import settings from '../../../../settings';

export const apiSignIn = (email: string, password: string): Observable<any> =>
  ajax.post(
    settings.apiUrl,
    {
      query: SIGN_IN,
      variables: {
        email,
        password,
      },
    },
    {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  );
