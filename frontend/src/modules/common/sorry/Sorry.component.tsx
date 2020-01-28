import { FunctionComponent } from 'react';
import './sorry.styles.less';

interface Props {
  msg: string;
}

const AuthInitSession: FunctionComponent<Props> = (componentProps: Props) => {
  const { msg } = componentProps;
  return (
    <div className="sorry">
      <p>{`Woh! We're sorry for the inconvenience, but something broke ...`}</p>
      <p>{msg}</p>
    </div>
  );
};

export default AuthInitSession;
