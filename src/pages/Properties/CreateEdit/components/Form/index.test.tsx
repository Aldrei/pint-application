import React from 'react';

import { fireEvent } from '@testing-library/react';

import { useNavigate } from 'react-router-dom';

import renderReduxProvider from '../../../../../helpers/test/renderReduxProvider';
import { useAppSelectorBlaBlaBal } from '../../../../../hooks/useReducerSelector';

import { IOwnerData, IPropertyShow } from '../../../../../types';

import { IPropertiesStoreServiceRequest } from '../../../../../reducers/properties/store';
import { IPropertiesUpdateServiceRequest } from '../../../../../reducers/properties/update';
import { IOwnerSearchServiceRequest } from '../../../../../reducers/owners/search';

import { PROPERTIES_DETAIL } from '../../../../../mocks/constants';

import CreateEditForm from './index';
import { IEmployeeSearchServiceRequest } from '../../../../../reducers/employees/search';
import { ICitiesSearchServiceRequest } from '../../../../../reducers/cities/search';
import { INeighborhoodsSearchServiceRequest } from '../../../../../reducers/neighborhoods/search';

/** Imports mocks. */
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

jest.mock('../../../../../hooks/useReducerSelector', () => ({
  useAppSelectorBlaBlaBal: jest.fn()
}));

/** Data mocks. */
const propertiesDefault = { data: {}, status: 'idle' } as IPropertiesStoreServiceRequest;
const propertiesStore = { data: {}, status: 'idle' } as IPropertiesStoreServiceRequest;
const propertiesUpdate = { data: {}, status: 'idle' } as IPropertiesUpdateServiceRequest;
const ownersSearchReducer = { ownerSelected: [] as IOwnerData[] } as IOwnerSearchServiceRequest;
const employeesAgentsSearchReducer = { employeeAgentSelected: [] as IOwnerData[] } as unknown as IEmployeeSearchServiceRequest;
const employeesBrokersSearchReducer = { employeeBrokerSelected: [] as IOwnerData[] } as unknown as IEmployeeSearchServiceRequest;
const citiesSearchReducer = { citiesSelected: [] as IOwnerData[] } as unknown as ICitiesSearchServiceRequest;
const neighborhoodsSearchReducer = { neighborhoodsSelected: [] as IOwnerData[] } as unknown as INeighborhoodsSearchServiceRequest;

/** SetTimeout mock. */
jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe('Property CreateEdit', () => {
  const useNavigateMocked = useNavigate as jest.MockedFunction<typeof useNavigate>;
  const useAppSelectorBlaBlaBalMocked = useAppSelectorBlaBlaBal as jest.MockedFunction<typeof useAppSelectorBlaBlaBal>;

  beforeAll(() => {
    useAppSelectorBlaBlaBalMocked
      .mockReturnValueOnce(propertiesStore)
      .mockReturnValueOnce(propertiesUpdate)
      .mockReturnValueOnce(ownersSearchReducer)
      .mockReturnValueOnce(employeesAgentsSearchReducer)
      .mockReturnValueOnce(employeesBrokersSearchReducer)
      .mockReturnValueOnce(citiesSearchReducer)
      .mockReturnValueOnce(neighborhoodsSearchReducer)
      .mockReturnValue(propertiesDefault);
  });

  it('Form: initial create mode', () => {
    useNavigateMocked.mockReturnValue(jest.fn());

    const nodeEl = renderReduxProvider(<CreateEditForm />);
    expect(nodeEl.baseElement).toMatchSnapshot();
  });

  it('Form: submit create mode', () => {
    useNavigateMocked.mockReturnValue(jest.fn());

    propertiesStore.status = 'success';
    propertiesStore.data = PROPERTIES_DETAIL as unknown as IPropertyShow;
    useAppSelectorBlaBlaBalMocked
      .mockReturnValueOnce(propertiesStore)
      .mockReturnValueOnce(propertiesUpdate)
      .mockReturnValueOnce(ownersSearchReducer)
      .mockReturnValueOnce(employeesAgentsSearchReducer)
      .mockReturnValueOnce(employeesBrokersSearchReducer)
      .mockReturnValueOnce(citiesSearchReducer)
      .mockReturnValueOnce(neighborhoodsSearchReducer)
      .mockReturnValue(propertiesDefault);

    const nodeEl = renderReduxProvider(<CreateEditForm />);

    fireEvent.click(nodeEl.getByTestId('submit-create-button'));

    jest.runAllTimers();

    expect(nodeEl.baseElement).toMatchSnapshot();
  });
});
