import React from 'react';

import LoginPage from '../../pages/Login';

import { AppContainer } from './styles';

function App() {
  return (  
    <AppContainer className='appComp' data-testid='appContainer'>
      <LoginPage />
    </AppContainer>
  );
}

export default App;
