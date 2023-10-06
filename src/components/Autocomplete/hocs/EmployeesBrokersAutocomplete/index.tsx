import React, { useEffect, useState } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import { IServiceRequestTemp, IEmployeeShow, IEmployeeData, IHookAutocomplete } from '../../../../types';

import { dataListToDataOptions } from '../../../../helpers';

import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';
import { useAppDispatch } from '../../../../hooks/useReducerDispatch';

import { IEmployeeSearchServiceRequest } from '../../../../reducers/employees/search';
import { employeesBrokersSearchThunk, setSelectedEmployeeBroker } from '../../../../reducers/employees/brokers/search';

import Autocomplete from '../../../Autocomplete';
import ModalEmployeeCreate from '../../../ModalEmployeeCreate';

const EmployeesBrokersAutocomplete = ({ error, shouldRenderAdd, type }: IHookAutocomplete) => {
  const dispatch = useAppDispatch();

  const [shouldOpenModal, setShouldOpenModal] = useState<boolean>(false);

  const { crud: { create: { data: dataStore, status: statusStore } } } = useAppSelectorBlaBlaBal('employeesListReducer') as IServiceRequestTemp;
  const employeeCreated = dataStore as IEmployeeShow;

  useEffect(() => {
    if (shouldOpenModal && statusStore === 'success' && employeeCreated?.employee?.data?.id) {      
      dispatch(setSelectedEmployeeBroker([employeeCreated.employee.data] as IEmployeeData[]));
      setShouldOpenModal(false);
    }
  }, [statusStore, dataStore]);
  
  const { status, data: dataResult, employeeBrokerSelected } = useAppSelectorBlaBlaBal('employeesBrokersSearchReducer') as IEmployeeSearchServiceRequest;

  return (
    <React.Fragment>
      <Autocomplete
        error={error}
        required
        loading={(status === 'loading')}
        onReducerSource={employeesBrokersSearchThunk}
        onReducerSelected={setSelectedEmployeeBroker}
        dataOptions={dataListToDataOptions(dataResult)}
        descFlag="nome" 
        label="Corretor"
        readonly={false}
        valueDefault={employeeBrokerSelected}
        startAdornmentIcon={shouldRenderAdd ? <AddCircleIcon /> : null}
        startAdornmentHandle={() => setShouldOpenModal(!shouldOpenModal)}
      />
      <ModalEmployeeCreate open={shouldOpenModal} handleSetOpen={setShouldOpenModal} type={type} />
    </React.Fragment>
  );
};

export default EmployeesBrokersAutocomplete;