import React, { FunctionComponent, useCallback } from 'react';
import { Form, Label } from 'semantic-ui-react';
import MarkdownEditor from '../../markdown-editor';

interface Props {
  formName: string;
  name: string;
  label: any;
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean,
  ) => void;
  error: any;
  touched: any;
  required?: boolean;
  helpText?: string;
  value: string;
}

const MarkdownControl: FunctionComponent<Props> = (props: Props) => {
  const {
    formName,
    name,
    label,
    setFieldValue,
    error,
    touched,
    required,
    helpText,
    value,
  } = props;
  const onChange = useCallback(
    (text: string): void => {
      setFieldValue(name, text);
    },
    [name, setFieldValue],
  );
  return (
    <Form.Field required={required} error={!!touched && error}>
      <label>{label}</label>
      <MarkdownEditor
        name={`${formName}-${name}`}
        onChange={onChange}
        value={value}
      />
      {helpText && <p>{helpText}</p>}
      {!!touched && error && (
        <Label pointing prompt>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default MarkdownControl;
