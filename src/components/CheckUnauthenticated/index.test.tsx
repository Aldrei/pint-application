import { render } from '@testing-library/react';

import { useAppSelectorBlaBlaBal } from '../../hooks/useReducerSelector';
import { IAuthState } from '../../reducers/auth';

import { useLocation } from 'react-router-dom';
import CheckAuth from './index';

jest.mock('../../hooks/useReducerSelector', () => ({
  useAppSelectorBlaBlaBal: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  Navigate: jest.fn(),
  useLocation: jest.fn(),
}));

jest.mock('../../constants/routes', () => ({
  ROUTES: {
    login: {
      path: '/login'
    }
  }
}));

describe('CheckUnauthenticated component', () => {
  const useAppSelectorBlaBlaBalMocked = useAppSelectorBlaBlaBal as jest.MockedFunction<typeof useAppSelectorBlaBlaBal>;
  const useLocationMocked = useLocation as jest.MockedFunction<typeof useLocation>;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should render children correctly', () => {
    useAppSelectorBlaBlaBalMocked.mockReturnValue({ accessToken: { access_token: 'dummy-token' } } as IAuthState);
    useLocationMocked.mockReturnValue({
      pathname: '/test', 
      search: '', 
      hash: '',
      state: undefined,
      key: ''
    });

    const nodeEl = render(<CheckAuth><div>Children element</div></CheckAuth>);
    expect(nodeEl.baseElement).toHaveTextContent('Children element');
    expect(nodeEl.baseElement).toMatchSnapshot();
  });

  it('Should redirect to Login page', () => {
    useAppSelectorBlaBlaBalMocked.mockReturnValue({ accessToken: { access_token: 'dummy-token' } } as IAuthState);
    useLocationMocked.mockReturnValue({
      pathname: '/login', 
      search: '', 
      hash: '',
      state: undefined,
      key: ''
    });

    const nodeEl = render(<CheckAuth><div>Children element</div></CheckAuth>);
    expect(nodeEl.baseElement).not.toHaveTextContent('Children element');
    expect(nodeEl.baseElement).toMatchSnapshot();
  });
});
