import React from 'react';

import { render } from '@testing-library/react';

import { useLocation } from 'react-router-dom';
import { 
  useAppSelector, 
  useAppDispatch 
} from '../../../store/hooks';

import { PROPERTIES_LIST } from '../../../mocks';

import PropertiesList from './index';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

jest.mock('../../../store/hooks', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

describe('Properties list page', () => {
  const useLocationMocked = useLocation as jest.MockedFunction<typeof useLocation>;
  const useAppSelectorMocked = useAppSelector as jest.MockedFunction<typeof useAppSelector>;
  const useAppDispatchMocked = useAppDispatch as jest.MockedFunction<typeof useAppDispatch>;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should be render data list', () => {
    useAppSelectorMocked.mockReturnValue(PROPERTIES_LIST);

    useLocationMocked.mockReturnValue({
      search: '',
      state: undefined,
      key: '',
      pathname: '',
      hash: ''
    });

    useAppDispatchMocked.mockReturnValue(jest.fn());

    const nodeEl = render(<PropertiesList />);

    expect(nodeEl.baseElement).toMatchSnapshot();
  });
});