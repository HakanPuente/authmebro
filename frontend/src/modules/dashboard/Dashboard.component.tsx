import React, { FunctionComponent } from 'react';
import { Header, Icon, Container, Segment, Grid } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import RootState from '../../store/store';

const Dashboard: FunctionComponent = () => {
  const me = useSelector((state: RootState) => state.auth.auth.me);
  console.log('dashboard', me);
  return (
    <div className="page">
      <Container>
        <Header as="h1">
          <Icon name="video" />
          <Header.Content>Dashboard</Header.Content>
        </Header>
        Content
      </Container>
    </div>
  );
};

export default Dashboard;
