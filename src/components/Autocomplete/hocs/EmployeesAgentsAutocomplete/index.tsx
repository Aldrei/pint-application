import React from 'react';

import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';

import { IEmployeeSearchServiceRequest } from '../../../../reducers/employees/search';
import { employeesAgentsSearchThunk } from '../../../../reducers/employees/agents/search';

import Autocomplete from '../..';

// import { OWNERS_SEARCH_LIST } from '../../../../mocks/constants';

const EmployeesAgentsAutocomplete = () => {
  const { status, data: dataResult } = useAppSelectorBlaBlaBal('employeesAgentsSearchReducer') as IEmployeeSearchServiceRequest;

  // eslint-disable-next-line
  const dataEmployees = dataResult ? dataResult as unknown as Record<string, any> : [];

  // eslint-disable-next-line
  const dataList: readonly any[] = dataEmployees.data || [];

  const defaultValue = null; // OWNERS_SEARCH_LIST.data[0];

  return (
    <Autocomplete 
      loading={(status === 'loading')}
      onReducerSource={employeesAgentsSearchThunk}
      dataOptions={dataList} 
      descFlag="nome" 
      label="Agenciador"
      readonly={false}
      valueDefault={defaultValue ? [defaultValue] : []}
    />
  );
};

export default EmployeesAgentsAutocomplete;