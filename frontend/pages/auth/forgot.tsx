import { NextPage } from 'next';
import AuthLayout from '../../src/modules/auth/auth-layout';
// import ForgotPassword from '../../src/modules/auth/forgot/Forgot.component';

const ForgotPage: NextPage = () => {
  return <AuthLayout>{/* <ForgotPassword /> */}</AuthLayout>;
};

ForgotPage.getInitialProps = async (): Promise<any> => ({
  namespacesRequired: ['common'],
});

export default ForgotPage;
