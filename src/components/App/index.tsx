
import { ThemeProvider } from '@mui/material/styles';

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { TAction } from '../../types';

import BannersCreateEdit from '../../pages/Banners/Crud/CreateEdit';
import CitiesCrud from '../../pages/Cities/Crud';
import CitiesList from '../../pages/Cities/List';
import DashboardPage from '../../pages/Dashboard';
import EmployeesCrud from '../../pages/Employees/Crud';
import EmployeesList from '../../pages/Employees/List';
import LoginPage from '../../pages/Login';
import NeighborhoodsCrud from '../../pages/Neighborhoods/Crud';
import NeighborhoodsList from '../../pages/Neighborhoods/List';
import OwnerCrud from '../../pages/Owners/Crud';
import OwnersList from '../../pages/Owners/List';
import PropertyCreateEdit from '../../pages/Properties/CreateEdit';
import PropertiesDetail from '../../pages/Properties/Detail';
import PropertiesList from '../../pages/Properties/List';
import SlidesCreateEdit from '../../pages/Slides/Crud';

import CheckAuth from '../../components/CheckAuth';
import CheckUnauthenticated from '../../components/CheckUnauthenticated';

import { ROUTES } from '../../constants/routes';

import ColorModeContext from '../../contexts/ColorModeContext';
import useTheme from '../../hooks/useTheme';

import SnackContext from '../../contexts/SnackContext';
import useSnack from '../../hooks/useSnack';

import { canManageUsers } from '../../helpers';
import MessagesPageList from '../../pages/Messages/List';
import PropertiesAgenciesPageList from '../../pages/PropertiesAgencies/List';
import SubscriptionPage from '../../pages/Subscription';
import { AppContainer, AppErrorContainer } from './styles';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || '');

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
          <Elements stripe={stripePromise}>
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
                  <Route path={ROUTES.subscription.path} element={
                    <CheckAuth>
                      <SubscriptionPage />
                    </CheckAuth>
                  } />
                  {/**
                   * Properties
                  */}
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
                      <PropertyCreateEdit action={TAction.CREATE} />
                    </CheckAuth>
                  } />}
                  {<Route path={ROUTES.propertiesEdit.path} element={
                    <CheckAuth>
                      <PropertyCreateEdit action={TAction.EDIT} />
                    </CheckAuth>
                  } />}
                  {<Route path={ROUTES.propertiesRead.path} element={
                    <CheckAuth>
                      <PropertyCreateEdit action={TAction.READ} />
                    </CheckAuth>
                  } />}
                  {<Route path={ROUTES.propertiesDelete.path} element={
                    <CheckAuth>
                      <PropertyCreateEdit action={TAction.DELETE} />
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
                      <OwnerCrud action={TAction.CREATE} />
                    </CheckAuth>
                  } />}
                  {<Route path={ROUTES.ownersEdit.path} element={
                    <CheckAuth>
                      <OwnerCrud action={TAction.EDIT} />
                    </CheckAuth>
                  } />}
                  {<Route path={ROUTES.ownersDetail.path} element={
                    <CheckAuth>
                      <OwnerCrud action={TAction.READ} />
                    </CheckAuth>
                  } />}
                  {<Route path={ROUTES.ownersDelete.path} element={
                    <CheckAuth>
                      <OwnerCrud action={TAction.DELETE} />
                    </CheckAuth>
                  } />}
                  {/** 
                   * Employees 
                   */}
                  {canManageUsers() && (
                    <>
                      <Route path={ROUTES.employeesList.path} element={
                        <CheckAuth>
                          <EmployeesList />
                        </CheckAuth>
                      } />
                      <Route path={ROUTES.employeesCreate.path} element={
                        <CheckAuth>
                          <EmployeesCrud action={TAction.CREATE} />
                        </CheckAuth>
                      } />
                      <Route path={ROUTES.employeesEdit.path} element={
                        <CheckAuth>
                          <EmployeesCrud action={TAction.EDIT} />
                        </CheckAuth>
                      } />
                      <Route path={ROUTES.employeesDetail.path} element={
                        <CheckAuth>
                          <EmployeesCrud action={TAction.READ} />
                        </CheckAuth>
                      } />
                      <Route path={ROUTES.employeesDelete.path} element={
                        <CheckAuth>
                          <EmployeesCrud action={TAction.DELETE} />
                        </CheckAuth>
                      } />
                    </>
                  )}
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
                      <NeighborhoodsCrud action={TAction.EDIT} />
                    </CheckAuth>
                  } />
                  <Route path={ROUTES.neighborhoodsDelete.path} element={
                    <CheckAuth>
                      <NeighborhoodsCrud action={TAction.DELETE} />
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
                  <Route path={ROUTES.bannersEdit.path} element={
                    <CheckAuth>
                      <BannersCreateEdit />
                    </CheckAuth>
                  } />
                  {/** 
                   * Messages 
                   */}
                  <Route path={ROUTES.messagesList.path} element={
                    <CheckAuth>
                      <MessagesPageList />
                    </CheckAuth>
                  } />
                  {/** 
                   * Properties Agencies 
                   */}
                  <Route path={ROUTES.propertiesAgenciesList.path} element={
                    <CheckAuth>
                      <PropertiesAgenciesPageList />
                    </CheckAuth>
                  } />
                </Routes>
              </AppContainer>
            </BrowserRouter>
          </Elements>
        </SnackContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
