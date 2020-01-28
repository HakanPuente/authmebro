import { combineReducers } from 'redux';
import { GET_ME } from './profile.actions';
import {
  AsyncAction,
  ASYNC_START,
  ASYNC_ERROR,
  ASYNC_FINISH,
  AsyncError,
} from '../../../common/async/async.actions';
import { Profile } from '../profile';

const loadingMsg = (state = '', action: AsyncAction): string => {
  switch (action.type) {
    case ASYNC_START:
      if (action.model === GET_ME) {
        return 'Loading Profile ...';
      }
      return state;
    case ASYNC_ERROR:
    case ASYNC_FINISH:
      if (action.model === GET_ME) {
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
      if (action.model === GET_ME) {
        return action.errorMsg || 'An error occurred';
      }
      return state;
    default:
      return state;
  }
};

const me = (
  state: null | Profile = null,
  action: AsyncAction,
): null | Profile => {
  switch (action.type) {
    case ASYNC_FINISH:
      if (action.model === GET_ME) {
        return action.data.me || null;
      }
      return state;
    default:
      return state;
  }
};

export interface ProfileReducers {
  errorMsg: string;
  loadingMsg: string;
  me: Profile | null;
}

export default combineReducers({
  me,
  loadingMsg,
  errorMsg,
});
