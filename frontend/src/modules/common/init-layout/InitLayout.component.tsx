import { FunctionComponent } from 'react';
import LoadingIndicator from '../loading-indicator';
import './init-layout.styles.less';
import Sorry from '../sorry';

interface Props {
  loadingMsg: string;
  error: null | Error;
  children: any;
}

const AppLayout: FunctionComponent<Props> = (props: Props) => {
  const { loadingMsg, children, error } = props;
  if (error) return <Sorry msg={error.message} />;
  return (
    <div className="app-layout">
      <LoadingIndicator loading={!!loadingMsg} msg="One moment ..." />
      {children}
    </div>
  );
};

export default AppLayout;
