
import { employeesServiceThunk } from '../../../../reducers/employees/crud';

import { ROUTES } from '../../../../constants/routes';

import { IEmployeeData } from '../../../../types';

import EmployeesActionsMenu from '../../../ActionsMenu/hocs/EmployeesActionsMenu';

import ListComponent from '../../index';

const OwnersList = () => {
  return <ListComponent
    title='Colaboradores'
    primaryInfo='nome' 
    secondaryInfo='celular' 
    onReducerSource={employeesServiceThunk} 
    stateAppSelector={'employeesListReducer'}
    onPaginate={ROUTES.employeesList}
    actionsComponent={(item: IEmployeeData) => <EmployeesActionsMenu item={item} />}
  />;
};

export default OwnersList;