import React, { useState, useEffect } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import { dataListToDataOptions } from '../../../../helpers';

import { IEmployeeData, IEmployeeShow, IHookAutocomplete, IServiceRequestTemp } from '../../../../types';

import { useAppDispatch } from '../../../../hooks/useReducerDispatch';
import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';

import { IEmployeeSearchServiceRequest } from '../../../../reducers/employees/search';
import { employeesAgentsSearchThunk, setSelectedEmployeeAgent } from '../../../../reducers/employees/agents/search';

import ModalEmployeeCreate from '../../../ModalEmployeeCreate';
import Autocomplete from '../../../Autocomplete';

const EmployeesAgentsAutocomplete = ({ error, shouldRenderAdd, type, valueDefault, disabled }: IHookAutocomplete) => {
  const dispatch = useAppDispatch();

  const [shouldOpenModal, setShouldOpenModal] = useState<boolean>(false);

  const { crud: { create: { data: dataStore, status: statusStore } } } = useAppSelectorBlaBlaBal('employeesListReducer') as IServiceRequestTemp;
  const employeeCreated = dataStore as IEmployeeShow; 

  useEffect(() => {
    if (shouldOpenModal && statusStore === 'success' && employeeCreated?.employee?.data?.id) {
      dispatch(setSelectedEmployeeAgent([employeeCreated.employee.data] as IEmployeeData[]));
      setShouldOpenModal(false);
    }
  }, [statusStore, dataStore]);

  const { status, data: dataResult, employeeAgentSelected } = useAppSelectorBlaBlaBal('employeesAgentsSearchReducer') as IEmployeeSearchServiceRequest;

  /**
   * Resolve value.
  */
  const resolveValue = () => valueDefault && !employeeAgentSelected?.length ? [valueDefault] : employeeAgentSelected;

  return (
    <React.Fragment>
      <Autocomplete
        error={error}
        required
        loading={(status === 'loading')}
        onReducerSource={employeesAgentsSearchThunk}
        onReducerSelected={setSelectedEmployeeAgent}
        dataOptions={dataListToDataOptions(dataResult)}
        descFlag="nome" 
        label="Agenciador"
        readonly={Boolean(disabled)}
        valueDefault={resolveValue()}
        startAdornmentIcon={shouldRenderAdd ? <AddCircleIcon /> : null}
        startAdornmentHandle={() => setShouldOpenModal(!shouldOpenModal)}
      />
      <ModalEmployeeCreate open={shouldOpenModal} handleSetOpen={setShouldOpenModal} type={type} />
    </React.Fragment>
  );
};

export default EmployeesAgentsAutocomplete;