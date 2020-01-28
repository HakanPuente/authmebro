import { withTranslation, Link, defaultLanguage } from '../../../i18n';
import { WithTranslation } from 'next-i18next';
import { FunctionComponent } from 'react';

interface Props extends WithTranslation {
  href: string;
  as?: string;
  children: any;
}

const LocalizedLink: FunctionComponent<Props> = (props: Props) => {
  const { href, as, i18n, children } = props;
  let myHref;
  if (i18n.language !== defaultLanguage) {
    myHref = `/${i18n.language}${href}`;
  } else {
    myHref = href;
  }
  console.log('localized link', href, as, myHref);
  return (
    <Link href={myHref} as={as}>
      {children}
    </Link>
  );
};

export default withTranslation('common')(LocalizedLink);
