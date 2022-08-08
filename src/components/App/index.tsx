import React from 'react';

import { PersistGate } from 'redux-persist/integration/react';
import { persistorStore } from '../../store';

import { Provider } from 'react-redux';
import { store } from '../../store';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import LoginPage from '../../pages/Login';
import DashboardPage from '../../pages/Dashboard';

import { AppContainer } from './styles';

import { ROUTES } from '../../constants/routes';

function App() {
  console.log('App component!');

  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistorStore}>
          <AppContainer className='appComp' data-testid='appContainer'>
            {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
            <Routes>
              <Route path={ROUTES.index.path} element={<Navigate to='/login' />} />
              <Route path={ROUTES.login.path} element={<LoginPage />} />
              <Route path={ROUTES.dashboard.path} element={<DashboardPage />} />
            </Routes>
          </AppContainer>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
