import { FunctionComponent } from 'react';
import { Image, Button, Header } from 'semantic-ui-react';
import logo from '../../../assets/img/LogoBird.svg';
import './app-header.styles.less';
import { withTranslation } from '../../../../src/i18n';
import { WithTranslation } from 'next-i18next';

const AppHeader: FunctionComponent<WithTranslation> = (
  props: WithTranslation,
) => {
  const { i18n } = props;
  return (
    <div className="app-header">
      <Header>
        <Image src={logo} alt="Kanal Hayat" />
        Kanal Hayat
      </Header>
      <div>
        <Button onClick={(): any => i18n.changeLanguage('en')}>English</Button>
        <Button onClick={(): any => i18n.changeLanguage('tr')}>Turkish</Button>
      </div>
    </div>
  );
};

export default withTranslation('common')(AppHeader);
