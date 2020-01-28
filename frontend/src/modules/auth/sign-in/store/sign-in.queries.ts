export const SIGN_IN = `mutation SignIn($email: String!, $password: String!) {
  tokenAuth(email: $email, password: $password) {
		token
    refreshToken
  }
}`;
