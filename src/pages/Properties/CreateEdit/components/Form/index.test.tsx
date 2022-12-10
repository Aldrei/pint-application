import React from 'react';

// import { render } from '@testing-library/react';
// import { fireEvent } from '@testing-library/react';

import { useNavigate } from 'react-router-dom';

import renderReduxProvider from '../../../../../helpers/test/renderReduxProvider';
import { useAppSelectorBlaBlaBal } from '../../../../../hooks/useReducerSelector';

import { IOwnerData } from '../../../../../types';

import { IPropertiesStoreServiceRequest } from '../../../../../reducers/properties/store';
import { IPropertiesUpdateServiceRequest } from '../../../../../reducers/properties/update';
import { IOwnerSearchServiceRequest } from '../../../../../reducers/owners/search';

import { SERVICE_REQUIRED_ERROR } from '../../../../../mocks/constants';

import CreateEditForm from './index';
import { IEmployeeSearchServiceRequest } from '../../../../../reducers/employees/search';
import { ICitiesSearchServiceRequest } from '../../../../../reducers/cities/search';
import { INeighborhoodsSearchServiceRequest } from '../../../../../reducers/neighborhoods/search';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

jest.mock('../../../../../hooks/useReducerSelector', () => ({
  useAppSelectorBlaBlaBal: jest.fn()
}));

describe('Property CreateEdit', () => {
  const useNavigateMocked = useNavigate as jest.MockedFunction<typeof useNavigate>;
  const useAppSelectorBlaBlaBalMocked = useAppSelectorBlaBlaBal as jest.MockedFunction<typeof useAppSelectorBlaBlaBal>;

  it('Form: initial create mode', () => {
    useNavigateMocked.mockReturnValue(jest.fn());

    const propertiesDefault = { data: {}, status: 'idle' } as IPropertiesStoreServiceRequest;
    const propertiesStore = { data: SERVICE_REQUIRED_ERROR, status: 'idle' } as IPropertiesStoreServiceRequest;
    const propertiesUpdate = { data: SERVICE_REQUIRED_ERROR, status: 'idle' } as IPropertiesUpdateServiceRequest;
    const ownersSearchReducer = { ownerSelected: [] as IOwnerData[] } as IOwnerSearchServiceRequest;
    const employeesAgentsSearchReducer = { employeeAgentSelected: [] as IOwnerData[] } as unknown as IEmployeeSearchServiceRequest;
    const employeesBrokersSearchReducer = { employeeBrokerSelected: [] as IOwnerData[] } as unknown as IEmployeeSearchServiceRequest;
    const citiesSearchReducer = { citiesSelected: [] as IOwnerData[] } as unknown as ICitiesSearchServiceRequest;
    const neighborhoodsSearchReducer = { neighborhoodsSelected: [] as IOwnerData[] } as unknown as INeighborhoodsSearchServiceRequest;

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
    expect(nodeEl.baseElement).toMatchSnapshot();
  });

  // it('Form: submit create mode', () => {
  //   useNavigateMocked.mockReturnValue(jest.fn());
  //   useAppSelectorBlaBlaBalMocked.mockReturnValue({ data: {}, status: 'success' } as IPropertiesStoreServiceRequest);

  //   const nodeEl = renderReduxProvider(<CreateEditForm />);

  //   fireEvent.click(nodeEl.getByTestId('submit-create-button'));

  //   expect(nodeEl.baseElement).toMatchSnapshot();
  // });
});
