import { FunctionComponent } from 'react';
import { Grid } from 'semantic-ui-react';
import AppHeader from '../app-header';
import AppMenu from '../app-menu/AppMenu.component';
import './app-layout.styles.less';

interface Props {
  activeItem: string;
  children: any;
}

const AppLayout: FunctionComponent<Props> = (props: Props) => {
  const { activeItem, children } = props;
  return (
    <>
      <AppHeader />
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <AppMenu activeItem={activeItem} />
          </Grid.Column>
          <Grid.Column className="app-layout-wrapper">{children}</Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default AppLayout;
