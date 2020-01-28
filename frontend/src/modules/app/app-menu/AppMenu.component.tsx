import { useRouter } from 'next/router';
import React, { FunctionComponent, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Icon, Menu } from 'semantic-ui-react';
import signOut from '../../auth/utils/sign-out';

interface Props {
  activeItem: string;
}

const AppMenu: FunctionComponent<Props> = (props: Props) => {
  const { activeItem } = props;
  const dispatch = useDispatch();
  const handleSignOut = useCallback(() => {
    signOut(dispatch);
  }, [dispatch]);
  const router = useRouter();
  const handleItemClick = (route: string) => (): void => {
    router.push(route);
  };
  return (
    <Menu icon="labeled" vertical pointing secondary>
      <Menu.Item
        name="dashboard"
        active={activeItem === 'dashboard'}
        onClick={handleItemClick('/app/dashboard')}
        color="blue"
      >
        <Icon name="dashboard" />
        Dashboard
      </Menu.Item>
      <Menu.Item
        name="sign-out"
        active={activeItem === 'sign-out'}
        onClick={handleSignOut}
      >
        <Icon name="sign out" />
        Sign Out
      </Menu.Item>
    </Menu>
  );
};

export default AppMenu;
