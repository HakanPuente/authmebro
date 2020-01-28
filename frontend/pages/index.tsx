import { NextPage } from 'next';
import Redirecting from '../src/modules/auth/with-private-route/AuthRedirect.component';

const Home: NextPage = () => {
  return <Redirecting />;
};

Home.getInitialProps = ({ res }): any => {
  if (res) {
    res.writeHead(301, {
      Location: '/app/dashboard',
    });
    res.end();
  }

  return {};
};

export default Home;
