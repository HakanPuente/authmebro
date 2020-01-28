import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import RootState from '../../../store/store';
import { AuthState } from '../+store/auth.constants';
import { loadSession } from '../+store/auth.utils';
import AuthInit from './AuthInit.component';
import AuthRedirect from './AuthRedirect.component';

const withPrivateRoute = (Page: any) => (props: any): ReactElement => {
  const authState = useSelector(
    (state: RootState) => state.auth.auth.authState,
  );
  const router = useRouter();
  if (authState === AuthState.unknown) {
    return <AuthInit />;
  }
  if (authState === AuthState.notAuthenticated) {
    const params: any = {
      redirect: location.pathname,
    };
    const session = loadSession();
    if (session && session.username) {
      params.username = session.username;
    }
    router.push({
      pathname: '/auth/sign-in',
      query: {
        ...router.query,
        ...params,
      },
    });
    return <AuthRedirect />;
  }
  return <Page {...props} />;
};

export default withPrivateRoute;
