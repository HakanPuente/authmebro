import { deleteSession } from '../+store/auth.utils';
import { Dispatch } from 'redux';
import { SIGN_OUT } from '../+store/auth.actions';

export default function signOut(dispatch: Dispatch): void {
  deleteSession();
  dispatch({ type: SIGN_OUT });
}
