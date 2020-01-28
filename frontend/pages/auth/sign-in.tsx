import { NextPage } from 'next';
import AuthLayout from '../../src/modules/auth/auth-layout';
import SignIn from '../../src/modules/auth/sign-in';

const SignInPage: NextPage = () => {
  return (
    <AuthLayout>
      <SignIn />
    </AuthLayout>
  );
};

SignInPage.getInitialProps = async (): Promise<any> => ({
  namespacesRequired: ['common'],
});

export default SignInPage;
