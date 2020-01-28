import React, { FunctionComponent } from 'react';
import { Form } from 'semantic-ui-react';

export interface TextControlProps {
  name: string;
  label: string;
  inputProps: any;
  prepend?: any;
  append?: any;
  handleChange: (name: string) => void;
  handleBlur: (name: string) => void;
  value: any;
  error: any;
  touched: any;
  required?: boolean;
  icon?: any;
}

const TextControl: FunctionComponent<TextControlProps> = (
  props: TextControlProps,
) => {
  const {
    name,
    label,
    icon,
    handleChange,
    handleBlur,
    value,
    error,
    touched,
    required,
    inputProps,
  } = props;
  return (
    <Form.Field required={required}>
      <Form.Input
        fluid
        icon={icon}
        name={name}
        className="text-control-input"
        onChange={handleChange(name)}
        onBlur={handleBlur(name)}
        value={value}
        label={label}
        error={!!touched && error}
        {...inputProps}
      />
    </Form.Field>
  );
};

export default TextControl;
