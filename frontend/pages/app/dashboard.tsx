import { NextPage } from 'next';
import AppLayout from '../../src/modules/app/app-layout';
import Dashboard from '../../src/modules/dashboard';
import withPrivateRoute from '../../src/modules/auth/with-private-route';

const DashboardPage: NextPage = () => {
  return (
    <AppLayout activeItem="dashboard">
      <Dashboard />
    </AppLayout>
  );
};

DashboardPage.getInitialProps = async (): Promise<any> => ({
  namespacesRequired: ['common'],
});

export default withPrivateRoute(DashboardPage);
