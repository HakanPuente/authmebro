import { NextPage } from 'next';
import Link from 'next/link';
import Layout from '../../src/modules/common/layout';

const SignUpPage: NextPage = () => {
  return (
    <Layout>
      <Link href="/auth/sign-in">
        <a>Sign In</a>
      </Link>
      <div>Sign Up</div>
    </Layout>
  );
};

SignUpPage.getInitialProps = async (): Promise<any> => ({
  namespacesRequired: ['common'],
});

export default SignUpPage;
