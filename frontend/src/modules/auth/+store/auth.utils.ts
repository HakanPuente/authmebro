import * as jwt from 'jsonwebtoken';
import { Session } from './auth';
import { of, Observable, throwError } from 'rxjs';
import { apiRefreshToken } from './auth.api';
import { map, catchError } from 'rxjs/operators';
import { useMemo } from 'react';

export const saveSession = (
  username: string,
  token: string,
  refreshToken: string,
): Session => {
  const session = {
    username,
    token,
    refreshToken,
  };
  localStorage.setItem('session', JSON.stringify(session));
  return session;
};

export const loadSession = (): Session => {
  let session = null;
  if (process.browser) {
    const sessionJson = localStorage.getItem('session');
    if (sessionJson) {
      session = JSON.parse(sessionJson);
    }
  }
  return session;
};

export class TokenError extends Error {
  constructor(name: string, message: string) {
    super(message);
    this.name = name;
  }
}

export const isTokenExpired = (token: string): boolean => {
  const decoded: any = jwt.decode(token);
  if (!decoded) return true;
  const nowTime = Date.now() / 1000;
  if (nowTime + 60 < decoded.exp) {
    return false;
  }
  return true;
};

export const withToken = (): Observable<string | null> => {
  const session = loadSession();
  if (!session) {
    return of(null);
  }
  if (isTokenExpired(session.token)) {
    return apiRefreshToken(session.refreshToken).pipe(
      catchError(() => {
        return throwError(new TokenError('SessionExpired', 'Session expired'));
      }),
      map((response: any) => {
        if (response.response.errors) {
          throwError(new TokenError('SessionExpired', 'Session expired'));
          return null;
        }
        const { token } = response.response.data.refreshToken;
        saveSession(session.username, token, session.refreshToken);
        return token;
      }),
    );
  }
  return of(session.token);
};

export const deleteSession = (): void => {
  localStorage.removeItem('session');
};

export default 'auth.utils.js';
