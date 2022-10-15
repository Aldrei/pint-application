import { fireEvent } from '@testing-library/react';
import React from 'react';

import { useAppSelectorBlaBlaBal } from '../../hooks/useReducerSelector';
import { IAutyState } from '../../reducers/auty';

import renderThemeProvider from '../../helpers/test/renderThemeProvider';

import Header from './index';

jest.mock('../../hooks/useReducerSelector', () => ({
  useAppSelectorBlaBlaBal: jest.fn(),
}));

jest.mock('../../stores/hooks', () => ({
  useAppDispatch: jest.fn(),
}));

describe('Header component', () => {
  const useAppSelectorBlaBlaBalMocked = useAppSelectorBlaBlaBal as jest.MockedFunction<typeof useAppSelectorBlaBlaBal>;
  useAppSelectorBlaBlaBalMocked.mockReturnValue({ accessToken: { access_token: 'dummy-token' } } as IAutyState);

  it('Should render correctly', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const nodeEl = renderThemeProvider(<Header toggleMenu={() => {}} />);
    expect(nodeEl.baseElement).toMatchSnapshot();

    fireEvent.click(nodeEl.getByTestId('button-color-mode'));
    expect(nodeEl.baseElement).toMatchSnapshot();
  });
});
