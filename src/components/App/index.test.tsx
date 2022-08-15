import React from 'react';

import { render } from '@testing-library/react';

import { IAutyState } from '../../reducer/auty';

jest.mock('../../hooks/useReducerSelector', () => {
  const useAppSelectorBlaBlaBalMocked = jest.fn(() => ({
    accessToken: 'this-is-a-invalid-token',
    whoIsAuth: {}
  } as unknown as IAutyState));
  return { useAppSelectorBlaBlaBal: useAppSelectorBlaBlaBalMocked };
});

jest.mock('../../store/hooks', () => {
  const useAppDispatchMocked = jest.fn(() => null);
  return { useAppDispatch: useAppDispatchMocked };
});

import App from './index';

describe('App component', () => {
  it('Should render Login page', () => {
    const bodyEl = render(<App />);

    const appNode = bodyEl.getByTestId('appContainer');
    const loginPage = bodyEl.getByTestId('loginContainer');
    expect(appNode).toContainElement(loginPage);
    
    expect(bodyEl.baseElement).toMatchSnapshot();
  });
});
