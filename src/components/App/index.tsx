import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import LoginPage from '../../pages/Login';
import DashboardPage from '../../pages/Dashboard';
import PropertiesList from '../../pages/Properties/List';
import PropertiesDetail from '../../pages/Properties/Detail';

import CheckAuth from '../../components/CheckAuth';
import CheckUnauthenticated from '../../components/CheckUnauthenticated';

import { AppContainer } from './styles';

import { ROUTES } from '../../constants/routes';

function App() {
  return (
    <BrowserRouter basename='/'>
      <AppContainer className='appComp' data-testid='appContainer'>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Routes>
          <Route path={ROUTES.index.path} element={<Navigate to='/login' />} />
          <Route path={ROUTES.login.path} element={
            <CheckUnauthenticated>
              <LoginPage />
            </CheckUnauthenticated>
          } />
          <Route path={ROUTES.dashboard.path} element={
            <CheckAuth>
              <DashboardPage />
            </CheckAuth>
          } />
          <Route path={ROUTES.propertiesList.path} element={
            <CheckAuth>
              <PropertiesList />
            </CheckAuth>
          } />
          <Route path={ROUTES.propertiesDetail.path} element={
            <CheckAuth>
              <PropertiesDetail />
            </CheckAuth>
          } />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
