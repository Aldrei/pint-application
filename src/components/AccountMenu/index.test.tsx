import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';

import { useAppSelectorBlaBlaBal } from '../../hooks/useReducerSelector';
import { useAppDispatch } from '../../hooks/useReducerDispatch';
import { IAutyState } from '../../reducers/auty';

import AccountMenu from './index';

jest.mock('../../hooks/useReducerSelector', () => ({
  useAppSelectorBlaBlaBal: jest.fn(),
}));

jest.mock('../../hooks/useReducerDispatch', () => ({
  useAppDispatch: jest.fn(),
}));

describe('AccountMenu component', () => {
  const useAppSelectorBlaBlaBalMocked = useAppSelectorBlaBlaBal as jest.MockedFunction<typeof useAppSelectorBlaBlaBal>;
  const useAppDispatchMocked = useAppDispatch as jest.MockedFunction<typeof useAppDispatch>;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should render closed menu', () => {
    useAppSelectorBlaBlaBalMocked.mockReturnValue({ accessToken: { access_token: 'dummy-token' } } as IAutyState);
    // useAppDispatchMocked.mockReturnValue();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const nodeEl = render(<AccountMenu />);

    expect(nodeEl.baseElement).toMatchSnapshot();
  });

  it('Should render opened menu', () => {
    useAppSelectorBlaBlaBalMocked.mockReturnValue({ accessToken: { access_token: 'dummy-token' } } as IAutyState);

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const nodeEl = render(<AccountMenu />);

    const accountMenuButton = nodeEl.getByTestId('account-menu-button-open-testid');
    fireEvent.click(accountMenuButton);

    expect(nodeEl.baseElement).toMatchSnapshot();
  });

  it('Should close menu', async () => {
    useAppSelectorBlaBlaBalMocked.mockReturnValue({ accessToken: { access_token: 'dummy-token' } } as IAutyState);

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const nodeEl = render(<AccountMenu />);

    expect(nodeEl.queryByTestId('account-menu-list-testid')).not.toBeInTheDocument();

    expect(nodeEl.baseElement).toMatchSnapshot();


    const accountMenuButton = nodeEl.getByTestId('account-menu-button-open-testid');
    fireEvent.click(accountMenuButton);
    expect(nodeEl.queryByTestId('account-menu-list-testid')).toBeInTheDocument();

    expect(nodeEl.baseElement).toMatchSnapshot();


    const accountMenuList = nodeEl.getByTestId('account-menu-list-testid');
    fireEvent.click(accountMenuList);

    await waitFor(() => {
      expect(nodeEl.queryByTestId('account-menu-list-testid')).not.toBeInTheDocument();
    });

    expect(nodeEl.baseElement).toMatchSnapshot();
  });

  it('Should click logout option', () => {
    useAppSelectorBlaBlaBalMocked.mockReturnValue({ accessToken: { access_token: 'dummy-token' } } as IAutyState);
    useAppDispatchMocked.mockReturnValue(jest.fn());

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const nodeEl = render(<AccountMenu />);

    const accountMenuButton = nodeEl.getByTestId('account-menu-button-open-testid');
    fireEvent.click(accountMenuButton);

    const accountMenuLogoutButton = nodeEl.getByTestId('account-menu-list-logout-option');
    fireEvent.click(accountMenuLogoutButton);

    expect(nodeEl.baseElement).toMatchSnapshot();
  });
});
