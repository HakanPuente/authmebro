import { AnyAction, combineReducers } from 'redux';
import { ASYNC_FINISH } from '../../common/async/async.actions';
import {
  COMPLETE_NEW_PASSWORD,
  ME,
  SIGN_OUT,
  TOKEN_EXPIRED,
} from './auth.actions';
import { AuthState } from './auth.constants';

const authState = (
  state: AuthState = AuthState.unknown,
  action: AnyAction,
): AuthState => {
  switch (action.type) {
    case ASYNC_FINISH:
      if (action.model === COMPLETE_NEW_PASSWORD) {
        return AuthState.authenticated;
      }
      if (action.model === TOKEN_EXPIRED) {
        return AuthState.notAuthenticated;
      }
      return state;
    case SIGN_OUT:
      return AuthState.notAuthenticated;
    case ME:
      if (action.me) {
        return AuthState.authenticated;
      }
      return AuthState.notAuthenticated;
    default:
      return state;
  }
};

const me = (state = null, action: AnyAction): any => {
  switch (action.type) {
    case ME:
      return action.me || null;
    default:
      return state;
  }
};

export interface AuthReducers {
  errorMsg: string;
  loadingMsg: string;
  authState: string;
  me: any;
}

export default combineReducers({
  authState,
  me,
});
