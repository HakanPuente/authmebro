import React, { FunctionComponent } from 'react';
import { Form, Label } from 'semantic-ui-react';

interface Props {
  name: string;
  label: any;
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
  helpText: string;
}

const TextAreaControl: FunctionComponent<Props> = (props: Props) => {
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
    helpText,
  } = props;
  return (
    <Form.Field required={required}>
      <Form.TextArea
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
      {helpText && <p>{helpText}</p>}
    </Form.Field>
  );
};

export default TextAreaControl;
