import { combineReducers } from 'redux';
import authReducers from './+store/auth.reducers';
import profileReducers from './profile/store/profile.reducers';
import signInReducers from './sign-in/store/sign-in.reducers';

export default {
  reducers: combineReducers({
    auth: authReducers,
    profile: profileReducers,
    signIn: signInReducers,
  }),
};
