import { FunctionComponent } from 'react';
import { Container } from 'semantic-ui-react';

const Layout: FunctionComponent = props => {
  const { children } = props;
  return <Container>{children}</Container>;
};

export default Layout;
