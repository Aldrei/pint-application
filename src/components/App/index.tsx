import React from 'react';

import { Provider } from 'react-redux'
import { store } from '../../store';

import LoginPage from '../../pages/Login';

import { AppContainer } from './styles';

function App() {
  return (
    <Provider store={store}>
      <AppContainer className='appComp' data-testid='appContainer'>
        <LoginPage />
      </AppContainer>
    </Provider>
  );
}

export default App;
