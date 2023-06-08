import React from 'react';

import Typography from '@mui/material/Typography';

import { useAppSelectorBlaBlaBal } from '../../hooks/useReducerSelector';

import { IAutyState } from '../../reducers/auty';

import Card from '../../components/Card';

import { DashContainer } from './styles';

const DashboardPage = (): React.ReactElement => {
  const { whoIsAuth } = useAppSelectorBlaBlaBal('authReducer') as IAutyState;
  
  return (
    <DashContainer data-testid='dashboard-container'>
      <Card>
        <Typography variant="h5" gutterBottom>Olá {whoIsAuth?.employee?.data?.nome}</Typography>
        <Typography variant="subtitle1" gutterBottom>Você está logado!</Typography>
      </Card>
    </DashContainer>
  );
};

export default DashboardPage;
