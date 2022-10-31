import React from 'react';

import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';
import { employeesSearchThunk, IEmployeeSearchServiceRequest } from '../../../../reducers/employees/search';

import Autocomplete from '../..';

// import { OWNERS_SEARCH_LIST } from '../../../../mocks/constants';

interface IProps {
  type: 'agent' | 'broker';
}

const EmployeesAutocomplete = ({ type }: IProps) => {
  const { status, data: dataResult } = useAppSelectorBlaBlaBal('employeesSearchReducer') as IEmployeeSearchServiceRequest;
  console.log('type', type);

  // eslint-disable-next-line
  const dataEmployees = dataResult ? dataResult as unknown as Record<string, any> : [];

  // eslint-disable-next-line
  const dataList: readonly any[] = dataEmployees.data || [];

  const defaultValue = null; // OWNERS_SEARCH_LIST.data[0];

  return (
    <Autocomplete 
      loading={(status === 'loading')}
      reducerSource={employeesSearchThunk}
      dataOptions={dataList} 
      descFlag="nome" 
      label="Equipe"
      readonly={false}
      valueDefault={defaultValue ? [defaultValue] : []}
    />
  );
};

export default EmployeesAutocomplete;