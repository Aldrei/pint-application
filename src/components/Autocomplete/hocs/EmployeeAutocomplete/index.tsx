import React from 'react';

import { dataListToDataOptions } from '../../../../helpers';

import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';
import { employeesSearchThunk, IEmployeeSearchServiceRequest } from '../../../../reducers/employees/search';

import Autocomplete from '../../../Autocomplete';

const EmployeesAutocomplete = () => {
  const { status, data: dataResult } = useAppSelectorBlaBlaBal('employeesSearchReducer') as IEmployeeSearchServiceRequest;

  const defaultValue = null;

  return (
    <Autocomplete 
      loading={(status === 'loading')}
      onReducerSource={employeesSearchThunk}
      dataOptions={dataListToDataOptions(dataResult)}
      descFlag="nome" 
      label="Equipe"
      readonly={false}
      valueDefault={defaultValue ? [defaultValue] : []}
    />
  );
};

export default EmployeesAutocomplete;