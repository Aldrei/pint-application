import React from 'react';

import { render } from '@testing-library/react';

import { useAppDispatch } from '../../hooks/useReducerDispatch';
import { useAppSelectorBlaBlaBal } from '../../hooks/useReducerSelector';

import SearchComponent from './index';
import { IServiceRequest } from '../../types';

jest.mock('../../hooks/useReducerSelector', () => {
  const useAppSelectorBlaBlaBalMocked = jest.fn(() => ({
    status: 'idle',
  }));
  return { useAppSelectorBlaBlaBal: useAppSelectorBlaBlaBalMocked };
});

jest.mock('../../hooks/useReducerDispatch', () => ({
  useAppDispatch: jest.fn()
}));

describe('Search component', () => {
  const useAppSelectorBlaBlaBalMocked = useAppSelectorBlaBlaBal as jest.MockedFunction<typeof useAppSelectorBlaBlaBal>;
  const useAppDispatchMocked = useAppDispatch as jest.MockedFunction<typeof useAppDispatch>;

  it('Should render correctly', () => {
    useAppDispatchMocked.mockReturnValue(jest.fn());
    useAppSelectorBlaBlaBalMocked.mockReturnValue({ status: 'idle', data: {} } as IServiceRequest);

    const nodeEl = render(<SearchComponent />);

    expect(nodeEl.baseElement).toMatchSnapshot();
  });
});
