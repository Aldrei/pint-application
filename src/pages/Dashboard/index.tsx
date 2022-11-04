import React from 'react';

import Card from '../../components/Card';

import { DashContainer } from './styles';

const DashboardPage = (): React.ReactElement => {
  return (
    <DashContainer data-testid='dashboard-container'>
      <Card>
        Você está logado!
      </Card>
    </DashContainer>
  );
};

export default DashboardPage;
