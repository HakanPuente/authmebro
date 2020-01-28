const settings = {
  apiUrl: process.env.API_URL || '',
  env: process.env.NODE_ENV || 'development',
  defaultPageSize: 10,
  dashboardUri: '/app/dashboard',
  signInUri: '/auth/sign-in',
};

export default settings;
