import { NextPage } from 'next';
import withPrivateRoute from '../../src/modules/auth/with-private-route';
import Redirecting from '../../src/modules/auth/with-private-route/AuthRedirect.component';

const AppPage: NextPage = () => {
  return <Redirecting />;
};

AppPage.getInitialProps = ({ res }): any => {
  if (res) {
    res.writeHead(301, {
      Location: '/app/dashboard',
    });
    res.end();
  }

  return {};
};

export default withPrivateRoute(AppPage);
