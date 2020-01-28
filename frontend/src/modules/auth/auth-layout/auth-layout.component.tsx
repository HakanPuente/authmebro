import { FunctionComponent } from 'react';
import { Container } from 'semantic-ui-react';
import './auth-layout.styles.less';

const AuthLayout: FunctionComponent = props => {
  const { children } = props;
  return <Container className="auth-layout">{children}</Container>;
};

export default AuthLayout;
