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
import OwnerCrud from '../../pages/Owners/Crud';
import OwnersList from '../../pages/Owners/List';
import EmployeesList from '../../pages/Employees/List';
import EmployeesCrud from '../../pages/Employees/Crud';
import CitiesList from '../../pages/Cities/List';
import CitiesCrud from '../../pages/Cities/Crud';
import NeighborhoodsList from '../../pages/Neighborhoods/List';
import NeighborhoodsCrud from '../../pages/Neighborhoods/Crud';
import SlidesCreateEdit from '../../pages/Slides/Crud';
import BannersCreateEdit from '../../pages/Banners/Crud/CreateEdit';

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
                {/**
                 * Owners 
                 */}
                <Route path={ROUTES.ownersList.path} element={
                  <CheckAuth>
                    <OwnersList />
                  </CheckAuth>
                } />
                {<Route path={ROUTES.ownersCreate.path} element={
                  <CheckAuth>
                    <OwnerCrud action='create' />
                  </CheckAuth>
                } />}
                {<Route path={ROUTES.ownersEdit.path} element={
                  <CheckAuth>
                    <OwnerCrud action='edit' />
                  </CheckAuth>
                } />}
                {<Route path={ROUTES.ownersDetail.path} element={
                  <CheckAuth>
                    <OwnerCrud action='show' />
                  </CheckAuth>
                } />}
                {<Route path={ROUTES.ownersDelete.path} element={
                  <CheckAuth>
                    <OwnerCrud action="delete" />
                  </CheckAuth>
                } />}
                {/** 
                 * Employees 
                 */}
                <Route path={ROUTES.employeesList.path} element={
                  <CheckAuth>
                    <EmployeesList />
                  </CheckAuth>
                } />
                <Route path={ROUTES.employeesCreate.path} element={
                  <CheckAuth>
                    <EmployeesCrud action="create" />
                  </CheckAuth>
                } />
                <Route path={ROUTES.employeesEdit.path} element={
                  <CheckAuth>
                    <EmployeesCrud action="edit" />
                  </CheckAuth>
                } />
                <Route path={ROUTES.employeesDetail.path} element={
                  <CheckAuth>
                    <EmployeesCrud action="show" />
                  </CheckAuth>
                } />
                <Route path={ROUTES.employeesDelete.path} element={
                  <CheckAuth>
                    <EmployeesCrud action="delete" />
                  </CheckAuth>
                } />
                {/** 
                 * Cities 
                 */}
                <Route path={ROUTES.citiesList.path} element={
                  <CheckAuth>
                    <CitiesList />
                  </CheckAuth>
                } />
                <Route path={ROUTES.citiesEdit.path} element={
                  <CheckAuth>
                    <CitiesCrud action="edit" />
                  </CheckAuth>
                } />
                {/** 
                 * Neighborhoods 
                 */}
                <Route path={ROUTES.neighborhoodsList.path} element={
                  <CheckAuth>
                    <NeighborhoodsList />
                  </CheckAuth>
                } />
                <Route path={ROUTES.neighborhoodsEdit.path} element={
                  <CheckAuth>
                    <NeighborhoodsCrud action="edit" />
                  </CheckAuth>
                } />
                {/** 
                 * Slides 
                 */}
                <Route path={ROUTES.slidesEdit.path} element={
                  <CheckAuth>
                    <SlidesCreateEdit />
                  </CheckAuth>
                } />
                <Route path={ROUTES.bannersCreate.path} element={
                  <CheckAuth>
                    <BannersCreateEdit />
                  </CheckAuth>
                } />
              </Routes>
            </AppContainer>
          </BrowserRouter>
        </SnackContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
