import React from 'react';
import ReactDOM from 'react-dom/client';

import { PersistGate } from 'redux-persist/integration/react';
import { persistorStore } from './stores';

import { Provider } from 'react-redux';
import { store } from './stores';

import { getEnv } from './helpers';

import App from './components/App';
import reportWebVitals from './reportWebVitals';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') || new DocumentFragment());

if (getEnv('REACT_APP_ENVIRONMENT') === 'prod') {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.log = () => {};
}

/**
 * "Strict mode checks are run in development mode only; they do not impact the production build.".
 * https://reactjs.org/docs/strict-mode.html
*/
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistorStore}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
