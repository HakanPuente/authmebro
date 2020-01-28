import { NextPage } from 'next';
import Link from 'next/link';
import Layout from '../../src/modules/common/layout';

const ForgotPage: NextPage = () => {
  return (
    <Layout>
      <Link href="/auth/sign-in">
        <a>Sign In</a>
      </Link>
      <div>Forgot</div>
    </Layout>
  );
};

ForgotPage.getInitialProps = async (): Promise<any> => ({
  namespacesRequired: ['common'],
});

export default ForgotPage;
