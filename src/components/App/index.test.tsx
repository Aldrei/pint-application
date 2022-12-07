import * as React from 'react';

import { render } from '@testing-library/react';

import { IAutyState } from '../../reducers/auty';

jest.mock('../../hooks/useReducerSelector', () => {
  const useAppSelectorBlaBlaBalMocked = jest.fn(() => ({
    accessToken: 'this-is-a-invalid-token',
    whoIsAuth: {}
  } as unknown as IAutyState));
  return { useAppSelectorBlaBlaBal: useAppSelectorBlaBlaBalMocked };
});

jest.mock('../../hooks/useReducerDispatch', () => {
  const useAppDispatchMocked = jest.fn(() => null);
  return { useAppDispatch: useAppDispatchMocked };
});

import App from './index';

describe('App component', () => {
  beforeAll(() => {
    process.env = Object.assign(process.env, {
      REACT_APP_ENVIRONMENT: 'local',
      REACT_APP_API_BASE_URL: 'https://blablabla.bla/api'
    });
  });

  it('Should render Login page correctly', () => {
    process.env = Object.assign(process.env, {
      REACT_APP_ENVIRONMENT: 'local',
      REACT_APP_API_BASE_URL: 'https://blablabla.bla/api'
    });

    const bodyEl = render(<App />);

    const appNode = bodyEl.getByTestId('appContainer');
    const loginPage = bodyEl.getByTestId('loginContainer');
    expect(appNode).toContainElement(loginPage);
    
    expect(bodyEl.baseElement).toMatchSnapshot();
  });

  it('There is no REACT_APP_API_BASE_URL env', () => {
    delete process.env.REACT_APP_API_BASE_URL;

    const bodyEl = render(<App />);

    const appNode = bodyEl.getByTestId('appErrorContainer');
    expect(appNode).toHaveTextContent('Check your ENVs.');
    
    expect(bodyEl.baseElement).toMatchSnapshot();
  });

  it('There is no REACT_APP_ENVIRONMENT env', () => {
    delete process.env.REACT_APP_ENVIRONMENT;

    const bodyEl = render(<App />);

    const appNode = bodyEl.getByTestId('appErrorContainer');
    expect(appNode).toHaveTextContent('Check your ENVs.');
    
    expect(bodyEl.baseElement).toMatchSnapshot();
  });
});
