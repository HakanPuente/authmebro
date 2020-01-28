import React, { FunctionComponent } from 'react';
import { Message, Form } from 'semantic-ui-react';

interface Props {
  errors: string[];
}

const FormError: FunctionComponent<Props> = (props: Props) => {
  const { errors } = props;
  return (
    <Form.Field>
      {errors.map((error: string) => (
        <Message key={error} negative>
          <p>{error}</p>
        </Message>
      ))}
    </Form.Field>
  );
};

export default FormError;
