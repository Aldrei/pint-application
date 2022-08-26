import { render } from '@testing-library/react';
import React from 'react';

import { useAppSelectorBlaBlaBal } from '../../hooks/useReducerSelector';
import { IAutyState } from '../../reducer/auty';

import Header from './index';

jest.mock('../../hooks/useReducerSelector', () => ({
  useAppSelectorBlaBlaBal: jest.fn(),
}));

jest.mock('../../store/hooks', () => ({
  useAppDispatch: jest.fn(),
}));

describe('Header component', () => {
  const useAppSelectorBlaBlaBalMocked = useAppSelectorBlaBlaBal as jest.MockedFunction<typeof useAppSelectorBlaBlaBal>;
  useAppSelectorBlaBlaBalMocked.mockReturnValue({ accessToken: { access_token: 'dummy-token' } } as IAutyState);

  it('Should render correctly', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const nodeEl = render(<Header toggleMenu={() => {}} />);
    expect(nodeEl.baseElement).toMatchSnapshot();
  });
});
