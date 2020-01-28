import { FunctionComponent } from 'react';
import { languageKeys } from '../../../../i18n';
import TextControl from '../text-control/text-control.component';

interface Props {
  name: string;
  label: string;
  props: any;
  handleChange?: any;
}

const TranslatedTextControl: FunctionComponent<Props> = (
  componentProps: Props,
) => {
  const { name, label, props, handleChange } = componentProps;
  return (
    <>
      {Object.entries(languageKeys).map(([key, lang]: string[]) => (
        <TextControl
          key={key}
          name={`${name}[${key}]`}
          label={`${label} (${lang})`}
          handleChange={handleChange || props.handleChange}
          handleBlur={props.handleBlur}
          value={props.values[name][key]}
          error={props.errors && props.errors[name] && props.errors[name][key]}
          touched={
            props.touched && props.touched[name] && props.touched[name][key]
          }
          inputProps={{
            placeholder: label,
          }}
        />
      ))}
    </>
  );
};

export default TranslatedTextControl;
