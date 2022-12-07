import React from 'react';

import { render } from '@testing-library/react';

import { useLocation } from 'react-router-dom';

import { useAppDispatch } from '../../../stores/hooks';

import { IServiceRequest } from '../../../types';

import { useAppSelectorBlaBlaBal } from '../../../hooks/useReducerSelector';

import { PROPERTIES_LIST } from '../../../mocks/constants';

import PropertiesList from './index';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

jest.mock('../../../stores/hooks', () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock('../../../hooks/useReducerSelector', () => ({
  useAppSelectorBlaBlaBal: jest.fn()
}));

describe('Properties list page', () => {
  const useLocationMocked = useLocation as jest.MockedFunction<typeof useLocation>;
  const useAppDispatchMocked = useAppDispatch as jest.MockedFunction<typeof useAppDispatch>;
  const useAppSelectorBlaBlaBalMocked = useAppSelectorBlaBlaBal as jest.MockedFunction<typeof useAppSelectorBlaBlaBal>;

  beforeEach(() => {
    jest.resetAllMocks();
    useAppSelectorBlaBlaBalMocked.mockReturnValue({ status: 'success', name: '' });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should be render data list', () => {
    const dataMocked = { data: PROPERTIES_LIST } as IServiceRequest;
    useAppSelectorBlaBlaBalMocked.mockReturnValue(dataMocked);

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

  it('Should be render data list without infos', () => {
    useAppSelectorBlaBlaBalMocked.mockReturnValue({ data: PROPERTIES_LIST } as IServiceRequest);

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

  it('Should be render empty data list', () => {
    useAppSelectorBlaBlaBalMocked.mockReturnValue({ data: null } as unknown as IServiceRequest);

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

  it('Should be render loading', () => {
    useAppSelectorBlaBlaBalMocked.mockReturnValue({ data: null } as unknown as IServiceRequest);

    useLocationMocked.mockReturnValue({
      search: '',
      state: undefined,
      key: '',
      pathname: '',
      hash: ''
    });

    useAppDispatchMocked.mockReturnValue(jest.fn());

    useAppSelectorBlaBlaBalMocked.mockReturnValue({ status: 'loading', name: '' });

    const nodeEl = render(<PropertiesList />);

    expect(nodeEl.baseElement).toMatchSnapshot();
  });
});