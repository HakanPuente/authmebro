import React, { FunctionComponent } from 'react';

interface Props {
  name: string;
}

const Icon: FunctionComponent<Props> = (props: Props) => {
  const { name } = props;
  return <i className="material-icons">{name}</i>;
};

export default Icon;
