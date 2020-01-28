export const AUTH_INIT = 'auth.init';
export const SIGN_OUT = 'auth.signOut';
export const SIGN_UP = 'auth.signUp';
export const CONFIRM = 'auth.confirm';
export const RESEND_CONFIRM = 'auth.resendConfirm';
export const COMPLETE_NEW_PASSWORD = 'auth.completeNewPassword';
export const FORGOTTEN_PASSWORD = 'auth.forgottenPassword';
export const TOKEN_EXPIRED = 'auth.tokenExpired';
export const TOKEN_REFRESHED = 'auth.tokenRefreshed';

interface MeAction {
  type: string;
  me: any;
}

export const ME = 'auth.me';
export const me = (profile: any): MeAction => ({
  type: ME,
  me: profile,
});
