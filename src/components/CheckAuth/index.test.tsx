import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { useAppSelectorBlaBlaBal } from '../../hooks/useReducerSelector';
import { IAutyState } from '../../reducer/auty';

import CheckAuth from './index';

jest.mock('../../hooks/useReducerSelector', () => ({
  useAppSelectorBlaBlaBal: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  Navigate: jest.fn(),
  useNavigate: jest.fn()
}));

jest.mock('../../store/hooks', () => ({
  useAppDispatch: jest.fn(),
}));

describe('CheckAuth component', () => {
  const useAppSelectorBlaBlaBalMocked = useAppSelectorBlaBlaBal as jest.MockedFunction<typeof useAppSelectorBlaBlaBal>;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should render children correctly', () => {
    useAppSelectorBlaBlaBalMocked.mockReturnValue({ accessToken: { access_token: 'dummy-token' } } as IAutyState);
    const nodeEl = render(<CheckAuth><div>Children element</div></CheckAuth>);
    expect(nodeEl.baseElement).toHaveTextContent('Children element');
    expect(nodeEl.baseElement).toMatchSnapshot();
  });

  it('Should redirect to Login page', () => {
    useAppSelectorBlaBlaBalMocked.mockReturnValue({ accessToken: { access_token: null } } as unknown as IAutyState);
    const nodeEl = render(<CheckAuth><div>Children element</div></CheckAuth>);
    expect(nodeEl.baseElement).not.toHaveTextContent('Children element');
    expect(nodeEl.baseElement).toMatchSnapshot();
  });

  it('Should open side left menu', () => {
    useAppSelectorBlaBlaBalMocked.mockReturnValue({ accessToken: { access_token: 'dummy-token' } } as IAutyState);
    
    const nodeEl = render(<CheckAuth><div>Children element</div></CheckAuth>);
    expect(nodeEl.baseElement).toHaveTextContent('Children element');

    const leftMenuButton = nodeEl.getByTestId('toggle-left-menu-button');
    fireEvent.click(leftMenuButton);

    expect(nodeEl.baseElement).toMatchSnapshot();
  });
});
