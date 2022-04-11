import React from 'react';
// import logo from './logo.svg';
import './App.css';

import LoginPage from './pages/Login';

/**
 * Test Slack Notification workflow:
 * 
 *  Test deploy on DEVELOPMENT branch: Test 1
 *  Test deploy on MASTER branch: Test 2
*/

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LoginPage />
      </header>
    </div>
  );
}

export default App;
