import { combineReducers } from 'redux';
import {
  AsyncAction,
  ASYNC_START,
  ASYNC_ERROR,
  ASYNC_FINISH,
  AsyncError,
} from '../../../common/async/async.actions';
import { SIGN_IN } from './sign-in.actions';

const loadingMsg = (state = '', action: AsyncAction): string => {
  switch (action.type) {
    case ASYNC_START:
      if (action.model === SIGN_IN) {
        return 'Signing in ...';
      }
      return state;
    case ASYNC_ERROR:
    case ASYNC_FINISH:
      if (action.model === SIGN_IN) {
        return '';
      }
      return state;
    default:
      return state;
  }
};

const errorMsg = (state = '', action: AsyncError): string => {
  switch (action.type) {
    case ASYNC_START:
    case ASYNC_FINISH:
      return '';
    case ASYNC_ERROR:
      if (action.model === SIGN_IN) {
        return action.errorMsg || 'An error occurred';
      }
      return state;
    default:
      return state;
  }
};

export interface SignInReducers {
  errorMsg: string;
  loadingMsg: string;
}

export default combineReducers({
  loadingMsg,
  errorMsg,
});
