import { fireEvent } from '@testing-library/react';

import { useAppSelectorBlaBlaBal } from '../../hooks/useReducerSelector';
import { IAuthState } from '../../reducers/auth';

import renderThemeProvider from '../../helpers/test/renderThemeProvider';

import Header from './index';

jest.mock('../../hooks/useReducerSelector', () => ({
  useAppSelectorBlaBlaBal: jest.fn(),
}));

jest.mock('../../hooks/useReducerDispatch', () => ({
  useAppDispatch: jest.fn(),
}));

describe('Header component', () => {
  const useAppSelectorBlaBlaBalMocked = useAppSelectorBlaBlaBal as jest.MockedFunction<typeof useAppSelectorBlaBlaBal>;
  useAppSelectorBlaBlaBalMocked.mockReturnValue({ accessToken: { access_token: 'dummy-token' } } as IAuthState);

  it('Should render correctly', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const nodeEl = renderThemeProvider(<Header toggleMenu={() => {}} />);
    expect(nodeEl.baseElement).toMatchSnapshot();

    fireEvent.click(nodeEl.getByTestId('button-color-mode'));
    expect(nodeEl.baseElement).toMatchSnapshot();
  });
});
