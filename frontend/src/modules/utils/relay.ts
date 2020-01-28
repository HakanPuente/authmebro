import { Translation, Translatable } from '../common/common';
import { languageKeys } from '../../i18n';

export function translationFormToApi(
  value: Translatable | undefined,
): Translation[] | undefined {
  if (value) {
    return Object.entries(value).map(([key, val]) => ({
      lang: key,
      value: val as string,
    }));
  }
  return undefined;
}

export function translationApiToForm(value: Translation[]): Translatable {
  const getLangVal = (lang: string): string => {
    const val = value.find(v => v.lang === lang);
    return val ? val.value : '';
  };
  return Object.keys(languageKeys).reduce(
    (prev, curr: string) => ({
      ...prev,
      [curr]: value ? getLangVal(curr) : '',
    }),
    {},
  );
}

export function getDefaultTranslation(): Translatable {
  return Object.keys(languageKeys).reduce(
    (prev, curr: string) => ({
      ...prev,
      [curr]: '',
    }),
    {},
  );
}
