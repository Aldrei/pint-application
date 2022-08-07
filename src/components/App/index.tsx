import React from 'react';

import { Provider } from 'react-redux';
import { store } from '../../store';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import LoginPage from '../../pages/Login';

import { AppContainer } from './styles';

/**
 * TODO: Add routes to CONSTANTES.ROUTES regex.
*/

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer className='appComp' data-testid='appContainer'>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Routes>
            <Route path='/' element={<Navigate to='/login' />} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>
        </AppContainer>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
