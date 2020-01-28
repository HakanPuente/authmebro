import LoadingIndicator from '../../common/loading-indicator';
import { FunctionComponent } from 'react';

const Redirecting: FunctionComponent = () => {
  return <LoadingIndicator loading msg="Redirecting ..." />;
};

export default Redirecting;
