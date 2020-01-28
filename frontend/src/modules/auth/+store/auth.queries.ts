export const REFRESH_TOKEN = `mutation RefreshToken($refreshToken: String!) {
  refreshToken(input: { refreshToken: $refreshToken }) {
		token
    payload
  }
}`;
