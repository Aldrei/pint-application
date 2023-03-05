import React from 'react';

import { ThemeProvider } from '@mui/material/styles';

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
import PropertyCreateEdit from '../../pages/Properties/CreateEdit';
import OwnersCreateEdit from '../../pages/Owners/CreateEdit';
import OwnersList from '../../pages/Owners/List';

import CheckAuth from '../../components/CheckAuth';
import CheckUnauthenticated from '../../components/CheckUnauthenticated';

import { ROUTES } from '../../constants/routes';

import ColorModeContext from '../../contexts/ColorModeContext';
import useTheme from '../../hooks/useTheme';

import SnackContext from '../../contexts/SnackContext';
import useSnack from '../../hooks/useSnack';

import { AppContainer, AppErrorContainer } from './styles';

function App() {
  const { theme, colorMode } = useTheme();
  const { addSnack, SnackList } = useSnack();

  const checkEnvs = () => {
    if (!process.env.REACT_APP_ENVIRONMENT) return false;
    if (!process.env.REACT_APP_API_BASE_URL) return false;
    return true;
  };

  if (!checkEnvs())
    return (
      <AppErrorContainer data-testid='appErrorContainer'>Check your ENVs.</AppErrorContainer>
    );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <SnackContext.Provider value={addSnack}>
          {SnackList && <SnackList />}

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
                {<Route path={ROUTES.propertiesDetail.path} element={
                  <CheckAuth>
                    <PropertiesDetail />
                  </CheckAuth>
                } />}
                {<Route path={ROUTES.propertiesCreate.path} element={
                  <CheckAuth>
                    <PropertyCreateEdit />
                  </CheckAuth>
                } />}
                {<Route path={ROUTES.propertiesEdit.path} element={
                  <CheckAuth>
                    <PropertyCreateEdit />
                  </CheckAuth>
                } />}
                <Route path={ROUTES.ownersList.path} element={
                  <CheckAuth>
                    <OwnersList />
                  </CheckAuth>
                } />
                {<Route path={ROUTES.ownersCreate.path} element={
                  <CheckAuth>
                    <OwnersCreateEdit />
                  </CheckAuth>
                } />}
                {<Route path={ROUTES.ownersEdit.path} element={
                  <CheckAuth>
                    <OwnersCreateEdit />
                  </CheckAuth>
                } />}
              </Routes>
            </AppContainer>
          </BrowserRouter>
        </SnackContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
