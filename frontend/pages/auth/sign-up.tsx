import { NextPage } from 'next';
import AuthLayout from '../../src/modules/auth/auth-layout';
import SignUpForm from '../../src/modules/auth/sign-up/SignUp.component';

const SignUpPage: NextPage = () => {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
};

SignUpPage.getInitialProps = async (): Promise<any> => ({
  namespacesRequired: ['common'],
});

export default SignUpPage;
