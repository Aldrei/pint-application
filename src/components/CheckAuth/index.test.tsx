import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useAppSelectorBlaBlaBal } from '../../hooks/useReducerSelector';
import { IAuthState } from '../../reducers/auth';

import { useNavigate } from 'react-router-dom';
import CheckAuth from './index';

jest.mock('../../hooks/useReducerSelector', () => ({
  useAppSelectorBlaBlaBal: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  Navigate: jest.fn(),
  useNavigate: jest.fn()
}));

jest.mock('../../hooks/useReducerDispatch', () => ({
  useAppDispatch: jest.fn(),
}));

describe('CheckAuth component', () => {
  const useAppSelectorBlaBlaBalMocked = useAppSelectorBlaBlaBal as jest.MockedFunction<typeof useAppSelectorBlaBlaBal>;
  const useNavigateMocked = useNavigate as jest.MockedFunction<typeof useNavigate>;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should render children correctly', () => {
    useAppSelectorBlaBlaBalMocked.mockReturnValue({ accessToken: { access_token: 'dummy-token' } } as IAuthState);
    const nodeEl = render(<CheckAuth><div>Children element</div></CheckAuth>);
    expect(nodeEl.baseElement).toHaveTextContent('Children element');
    expect(nodeEl.baseElement).toMatchSnapshot();
  });

  it('Should redirect to Login page', () => {
    useAppSelectorBlaBlaBalMocked.mockReturnValue({ accessToken: { access_token: null } } as unknown as IAuthState);
    const nodeEl = render(<CheckAuth><div>Children element</div></CheckAuth>);
    expect(nodeEl.baseElement).not.toHaveTextContent('Children element');
    expect(nodeEl.baseElement).toMatchSnapshot();
  });

  it('Should open side left menu', () => {
    useAppSelectorBlaBlaBalMocked.mockReturnValue({ accessToken: { access_token: 'dummy-token' } } as IAuthState);
    
    const nodeEl = render(<CheckAuth><div>Children element</div></CheckAuth>);
    expect(nodeEl.baseElement).toHaveTextContent('Children element');

    const leftMenuButton = nodeEl.getByTestId('toggle-left-menu-button');
    fireEvent.click(leftMenuButton);

    expect(nodeEl.baseElement).toMatchSnapshot();
  });

  it('Should open and close side left menu', () => {
    useAppSelectorBlaBlaBalMocked.mockReturnValue({ accessToken: { access_token: 'dummy-token' } } as IAuthState);
    
    const nodeEl = render(<CheckAuth><div>Children element</div></CheckAuth>);
    expect(nodeEl.baseElement).toHaveTextContent('Children element');

    const leftMenuButton = nodeEl.getByTestId('toggle-left-menu-button');
    fireEvent.click(leftMenuButton);

    // Not fire event with click
    // const backdropPresentation = nodeEl.getByRole('presentation');
    // fireEvent.click(backdropPresentation);

    // Press `esc` to close
    userEvent.keyboard('{esc}');

    expect(nodeEl.baseElement).toMatchSnapshot();
  });

  it('Should redirect', () => {
    useAppSelectorBlaBlaBalMocked.mockReturnValue({ accessToken: { access_token: 'dummy-token' } } as IAuthState);
    useNavigateMocked.mockReturnValue(jest.fn());

    
    const nodeEl = render(<CheckAuth><div>Children element</div></CheckAuth>);
    expect(nodeEl.baseElement).toHaveTextContent('Children element');

    const leftMenuButton = nodeEl.getByTestId('toggle-left-menu-button');
    fireEvent.click(leftMenuButton);

    const menuList1Button = nodeEl.getByTestId('menu-list1-button-0');
    fireEvent.click(menuList1Button);
    const menuList2Button = nodeEl.getByTestId('menu-list2-button-0');
    fireEvent.click(menuList2Button);

    expect(nodeEl.baseElement).toMatchSnapshot();
  });
});
