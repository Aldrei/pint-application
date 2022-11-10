import React from 'react';

import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';

import { IEmployeeSearchServiceRequest } from '../../../../reducers/employees/search';
import { employeesAgentsSearchThunk, setSelectedEmployeeAgent } from '../../../../reducers/employees/agents/search';

import Autocomplete from '../..';

interface IProps {
  error?: boolean;
}

const EmployeesAgentsAutocomplete = ({ error }: IProps) => {
  const { status, data: dataResult } = useAppSelectorBlaBlaBal('employeesAgentsSearchReducer') as IEmployeeSearchServiceRequest;

  // eslint-disable-next-line
  const dataEmployees = dataResult ? dataResult as unknown as Record<string, any> : [];

  // eslint-disable-next-line
  const dataList: readonly any[] = dataEmployees.data || [];

  const defaultValue = null;

  return (
    <Autocomplete
      error={error}
      required
      loading={(status === 'loading')}
      onReducerSource={employeesAgentsSearchThunk}
      onReducerSelected={setSelectedEmployeeAgent}
      dataOptions={dataList} 
      descFlag="nome" 
      label="Agenciador"
      readonly={false}
      valueDefault={defaultValue ? [defaultValue] : []}
    />
  );
};

export default EmployeesAgentsAutocomplete;