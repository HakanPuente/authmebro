import LoadingIndicator from '../../common/loading-indicator';
import { FunctionComponent } from 'react';

const Authenticating: FunctionComponent = () => {
  return <LoadingIndicator loading msg="Authenticating ..." />;
};

export default Authenticating;
