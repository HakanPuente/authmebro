import { AuthReducers } from '../modules/Auth/+store/auth/auth.reducers';
import { ProfileReducers } from '../modules/Auth/+store/profile/profile.reducers';
import { SignInReducers } from '../modules/auth/sign-in/store/sign-in.reducers';

export default interface RootState {
  auth: {
    auth: AuthReducers;
    profile: ProfileReducers;
    signIn: SignInReducers;
  };
}
