import React from 'react';

import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';

import { IEmployeeSearchServiceRequest } from '../../../../reducers/employees/search';
import { employeesBrokersSearchThunk, setSelectedEmployeeBroker } from '../../../../reducers/employees/brokers/search';

import Autocomplete from '../..';

// import { OWNERS_SEARCH_LIST } from '../../../../mocks/constants';

const EmployeesBrokersAutocomplete = () => {
  const { status, data: dataResult } = useAppSelectorBlaBlaBal('employeesBrokersSearchReducer') as IEmployeeSearchServiceRequest;

  // eslint-disable-next-line
  const dataEmployees = dataResult ? dataResult as unknown as Record<string, any> : [];

  // eslint-disable-next-line
  const dataList: readonly any[] = dataEmployees.data || [];

  const defaultValue = null; // OWNERS_SEARCH_LIST.data[0];

  return (
    <Autocomplete 
      loading={(status === 'loading')}
      onReducerSource={employeesBrokersSearchThunk}
      onReducerSelected={setSelectedEmployeeBroker}
      dataOptions={dataList} 
      descFlag="nome" 
      label="Corretor"
      readonly={false}
      valueDefault={defaultValue ? [defaultValue] : []}
    />
  );
};

export default EmployeesBrokersAutocomplete;