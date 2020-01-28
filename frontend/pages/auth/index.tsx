import { NextPage } from 'next';
import withPrivateRoute from '../../src/modules/auth/with-private-route';
import Redirecting from '../../src/modules/auth/with-private-route/AuthRedirect.component';

const AuthPage: NextPage = () => {
  return <Redirecting />;
};

AuthPage.getInitialProps = ({ res }): any => {
  if (res) {
    res.writeHead(301, {
      Location: '/auth/sign-in',
    });
    res.end();
  }

  return {};
};

export default withPrivateRoute(AuthPage);
