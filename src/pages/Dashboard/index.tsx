import React from 'react';

import Card from '../../components/Card';

// import { useAppSelectorBlaBlaBal } from '../../hooks/useReducerSelector';
// import { IAutyState } from '../../reducers/auty';

import { DashContainer } from './styles';

const DashboardPage = (): React.ReactElement => {
  // const { accessToken } = useAppSelectorBlaBlaBal('authReducer') as IAutyState;

  // console.log('#### DashboardPage accessToken:', accessToken);

  return (
    <DashContainer data-testid='dashboard-container'>
      <Card>
        Você está logado!
      </Card>
    </DashContainer>
  );
};

export default DashboardPage;

