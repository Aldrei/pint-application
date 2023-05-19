import React, { useEffect, useState } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import { IServiceRequestTemp, IEmployeeShow, IEmployeeData, IHookAutocomplete } from '../../../../types';

import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';
import { useAppDispatch } from '../../../../hooks/useReducerDispatch';

import { IEmployeeSearchServiceRequest } from '../../../../reducers/employees/search';
import { employeesBrokersSearchThunk, setSelectedEmployeeBroker } from '../../../../reducers/employees/brokers/search';

import Autocomplete from '../../../Autocomplete';
import ModalEmployeeCreate from '../../../ModalEmployeeCreate';

const EmployeesBrokersAutocomplete = ({ error, shouldRenderAdd }: IHookAutocomplete) => {
  const dispatch = useAppDispatch();

  const [shouldOpenModal, setShouldOpenModal] = useState<boolean>(false);

  const { crud: { create: { data: dataResultStore, status: statusStore } } } = useAppSelectorBlaBlaBal('employeesListReducer') as IServiceRequestTemp;
  const employeeCreated = dataResultStore as IEmployeeShow; 

  console.log('DEBUG employeeCreated:', employeeCreated);
  console.log('DEBUG statusStore:', statusStore);

  useEffect(() => {
    if (statusStore === 'success' && employeeCreated?.employee?.data?.id) {      
      dispatch(setSelectedEmployeeBroker([employeeCreated.employee.data] as IEmployeeData[]));
      setShouldOpenModal(false);
    }
  }, [statusStore, dataResultStore]);
  
  const { status, data: dataResult, employeeBrokerSelected } = useAppSelectorBlaBlaBal('employeesBrokersSearchReducer') as IEmployeeSearchServiceRequest;

  // eslint-disable-next-line
  const dataEmployees = dataResult ? dataResult as unknown as Record<string, any> : [] as Record<string, any>;;

  // eslint-disable-next-line
  const dataList: readonly any[] = dataEmployees.data || [];

  return (
    <React.Fragment>
      <Autocomplete
        error={error}
        required
        loading={(status === 'loading')}
        onReducerSource={employeesBrokersSearchThunk}
        onReducerSelected={setSelectedEmployeeBroker}
        dataOptions={dataList} 
        descFlag="nome" 
        label="Corretor"
        readonly={false}
        valueDefault={employeeBrokerSelected}
        startAdornmentIcon={shouldRenderAdd ? <AddCircleIcon /> : null}
        startAdornmentHandle={() => setShouldOpenModal(!shouldOpenModal)}
      />
      <ModalEmployeeCreate open={shouldOpenModal} handleSetOpen={setShouldOpenModal} />
    </React.Fragment>
  );
};

export default EmployeesBrokersAutocomplete;