import React, { FunctionComponent } from 'react';
import './loading-indicator.styles.less';
import { Dimmer, Loader } from 'semantic-ui-react';

interface Props {
  loading: boolean;
  msg: string;
  backdrop?: boolean;
}

const LoadingIndicator: FunctionComponent<Props> = (props: Props) => {
  const { loading, msg, backdrop = true } = props;
  if (!loading) return null;
  if (backdrop) {
    return (
      <Dimmer active>
        <Loader>{msg}</Loader>
      </Dimmer>
    );
  }
  return (
    <div style={{ height: 130, position: 'relative' }}>
      <Loader active>{msg}</Loader>
    </div>
  );
};

export default LoadingIndicator;
