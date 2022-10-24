import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { useAppDispatch } from '../../stores/hooks';
import { useAppSelectorBlaBlaBal } from '../../hooks/useReducerSelector';

jest.mock('../../hooks/useReducerSelector', () => {
  const useAppSelectorBlaBlaBalMocked = jest.fn(() => ({
    status: 'idle',
  }));
  return { useAppSelectorBlaBlaBal: useAppSelectorBlaBlaBalMocked };
});

jest.mock('../../stores/hooks', () => ({
  useAppDispatch: jest.fn()
}));

jest.mock('../../hooks/useReducerSelector', () => ({
  useAppSelectorBlaBlaBal: jest.fn()
}));

import LoginPage from './index';
import { IAutyState } from '../../reducers/auty';

describe('Login page', () => {
  const useAppSelectorBlaBlaBalMocked = useAppSelectorBlaBlaBal as jest.MockedFunction<typeof useAppSelectorBlaBlaBal>;
  const useAppDispatchMocked = useAppDispatch as jest.MockedFunction<typeof useAppDispatch>;

  it('Should be render correctly', () => {
    useAppSelectorBlaBlaBalMocked.mockReturnValue({ status: 'idle' } as IAutyState);

    const nodeEl = render(<LoginPage />);

    const nodeBody = nodeEl.getByTestId('loginContainer');
    const nodeUsername = nodeEl.getByTestId('username');
    const nodePassword = nodeEl.getByTestId('password');
    const nodeButtonLogin = nodeEl.getByTestId('button-login');

    expect(nodeBody).toContainElement(nodeUsername);
    expect(nodeBody).toContainElement(nodePassword);
    expect(nodeBody).toContainElement(nodeButtonLogin);

    expect(nodeEl.baseElement).toMatchSnapshot();
  });

  /**
   * TODO: Test behavior here:
   *        1. Check button is disabled if empty input.
   *        2. If has data:
   *           2.1. Check if make request and redirect to dashboard page.
   *           2.2. Check if make request and render message error.
  */
  it('Should be render warning message', () => {
    useAppSelectorBlaBlaBalMocked.mockReturnValue({ status: 'failed' } as IAutyState);

    const nodeEl = render(<LoginPage />);

    const nodeButtonLogin = nodeEl.getByTestId('button-login');
    fireEvent.click(nodeButtonLogin);

    expect(nodeEl.baseElement).toMatchSnapshot();
  });

  it('Should be filled form', () => {
    useAppSelectorBlaBlaBalMocked.mockReturnValue({ status: 'idle' } as IAutyState);
    useAppDispatchMocked.mockReturnValue(jest.fn());

    const nodeEl = render(<LoginPage />);

    const nodeUsername = nodeEl.getByTestId('username');
    fireEvent.change(nodeUsername, { target: {
      value: 'test@test.com'
    } });

    const nodePassword = nodeEl.getByTestId('password');
    fireEvent.change(nodePassword, { target: {
      value: 'test1234'
    } });

    const nodeButtonLogin = nodeEl.getByTestId('button-login');
    fireEvent.click(nodeButtonLogin);

    // const setForm = jest.fn();
    // const form = undefined;
    // const handleClick = jest.spyOn(React, 'useState');
    // handleClick.mockImplementation(() => [form, setForm]);

    // expect(setForm).toBeCalled();

    expect(nodeEl.baseElement).toMatchSnapshot();
  });
});
