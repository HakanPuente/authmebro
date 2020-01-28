import React, { FunctionComponent, useState, useCallback } from 'react';
import { Form, Icon, Label } from 'semantic-ui-react';
import './password-control.styles.less';

interface Props {
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

const PasswordControl: FunctionComponent<Props> = (props: Props) => {
  const {
    name,
    label,
    handleChange,
    handleBlur,
    value,
    error,
    touched,
    required,
    inputProps,
  } = props;
  const [show, setShow] = useState(false);
  const handleShowClick = useCallback(() => {
    setShow(!show);
  }, [show, setShow]);
  return (
    <Form.Field required={required} error={(!!touched && !!error) || false}>
      <label>{label}</label>
      <div className="ui fluid left icon input">
        <input
          name={name}
          onChange={handleChange(name)}
          onBlur={handleBlur(name)}
          value={value}
          label={label}
          {...inputProps}
          type={show ? 'text' : 'password'}
        />
        <Icon name="lock" />
        <button
          type="button"
          className="password-control-show-btn"
          onClick={handleShowClick}
        >
          <Icon name={show ? 'eye slash' : 'eye'} />
        </button>
      </div>
      {!!touched && !!error && (
        <Label pointing prompt>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default PasswordControl;
