import * as React from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import TextField from '@mui/material/TextField';

import CloudDoneIcon from '@mui/icons-material/CloudDone';
import DeleteIcon from '@mui/icons-material/Delete';

import { useNavigate } from 'react-router-dom';

import CitiesAutocomplete from '../../../../../components/Autocomplete/hocs/CitiesAutocomplete';
import NeighborhoodsAutocomplete from '../../../../../components/Autocomplete/hocs/NeighborhoodsAutocomplete';
import Button from '../../../../../components/Button';

import { canManageUsers, getMessage, hasProperty } from '../../../../../helpers';

import { IEmployeeData, IEmployeeServiceFieldsRequired, IEmployeeShow, IEmployeeStoreRequired, IServiceRequestTemp, TAction } from '../../../../../types';

import { ROUTES } from '../../../../../constants/routes';

import { ICitiesSearchServiceRequest } from '../../../../../reducers/cities/search';
import { INeighborhoodsSearchServiceRequest } from '../../../../../reducers/neighborhoods/search';

import {
  employeesDeleteThunk,
  employeesStoreThunk,
  employeesUpdateThunk,
  setStatusStore,
  setStatusUpdate,
} from '../../../../../reducers/employees/crud';


import { useAppDispatch } from '../../../../../hooks/useReducerDispatch';
import { useAppSelectorBlaBlaBal } from '../../../../../hooks/useReducerSelector';

import SnackContext from '../../../../../contexts/SnackContext';

import FormControlLabel from '@mui/material/FormControlLabel';
import { ROLES } from '../../../../../constants';
import { CancelIconCustom, CheckCircleIconCustom, MaterialUISwitch } from '../../../../Properties/CreateEdit/components/Form/styles';
import {
  BoxInfo,
  BoxInfoCity,
  BoxInfoLocalidade,
  BoxInfoLocalidadeNumero,
  BoxInfoPermission,
  BoxInfoUsername,
  DividerSpacingRows,
  WrapperInfo,
} from './styles';

interface IProps {
  dataEmployee?: IEmployeeData;
  action: TAction
  inModal?: boolean
  disabled?: boolean
}

const model = 'Colaborador';

const Form = ({ dataEmployee, action, inModal, disabled }: IProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [employee, setEmployee] = React.useState<IEmployeeData>(hasProperty(dataEmployee, 'id') ? dataEmployee as IEmployeeData : {} as IEmployeeData);
  const [errors, setErrors] = React.useState<IEmployeeStoreRequired>({} as IEmployeeStoreRequired);

  /**
   * Contexts.
  */
  const snackContext = React.useContext(SnackContext);

  /**
   * dataEmployee prop.
  */
  React.useEffect(() => {
    if (hasProperty(dataEmployee, 'id')) setEmployee(dataEmployee as IEmployeeData);
  }, [dataEmployee]);

  /**
   * Submit create/edit.
  */
  const { crud: {
    create: { status: statusStore, data: dataStore }, 
    update: { status: statusUpdate, data: dataUpdate },
    delete: { status: statusDelete, data: dataDelete },
  } } = useAppSelectorBlaBlaBal('employeesListReducer') as IServiceRequestTemp;

  // console.log('DEBUG dataStore:', dataStore);
  canManageUsers();
  
  const handleSubmitCreate = () => dispatch(employeesStoreThunk(employee));

  const handleSubmitUpdate = () => dispatch(employeesUpdateThunk(employee));

  const handleDelete = () => dispatch(employeesDeleteThunk(employee));

  React.useEffect(() => {
    if (dataDelete?.status === 200) {
      snackContext.addMessage({ type: 'success', message: dataDelete.message });

      setTimeout(() => {
        navigate(ROUTES.employeesList.go({}));
      }, 750);
    }

    if (dataDelete?.status !== 200 && dataDelete?.message) {
      snackContext.addMessage({ type: 'warning', message: dataDelete.message });
    }
  }, [dataDelete]);

  React.useEffect(() => {
    /** Create. */
    if (statusStore === 'success' && hasProperty(dataStore, 'errors')) {
      dispatch(setStatusStore('idle'));
      snackContext.addMessage({ type: 'warning', message: getMessage({ action: 'store', type: 'errorRequired', model }) });
    }

    if (statusStore === 'success' && hasProperty(dataStore, 'status')) {
      const dataStoreTyped = dataStore as IEmployeeShow;
      dispatch(setStatusStore('idle'));
      if (dataStoreTyped.status === 200) snackContext.addMessage({ type: 'success', message: getMessage({ action: 'store', type: 'success', model }) });
      else snackContext.addMessage({ type: 'error', message: getMessage({ action: 'store', type: 'errorRequest', model }) });
    }

    if (statusStore === 'failed') {
      dispatch(setStatusStore('idle'));
      snackContext.addMessage({ type: 'error', message: getMessage({ action: 'store', type: 'errorRequest', model }) });
    }

    /** Update. */
    if (statusUpdate === 'success' && hasProperty(dataUpdate, 'errors')) {
      dispatch(setStatusUpdate('idle'));
      snackContext.addMessage({ type: 'warning', message: getMessage({ action: 'store', type: 'errorRequired', model }) });
    }

    if (statusUpdate === 'success' && hasProperty(dataUpdate, 'status')) {
      const dataUpdateTyped = dataUpdate as IEmployeeShow;
      dispatch(setStatusUpdate('idle'));
      if (dataUpdateTyped.status === 200) snackContext.addMessage({ type: 'success', message: getMessage({ action: 'store', type: 'success', model }) });
      else snackContext.addMessage({ type: 'error', message: getMessage({ action: 'store', type: 'errorRequest', model }) });
    }

    if (statusUpdate === 'failed') {
      dispatch(setStatusUpdate('idle'));
      snackContext.addMessage({ type: 'error', message: getMessage({ action: 'store', type: 'errorRequest', model }) });
    }
  }, [statusStore, dataUpdate]);

  React.useEffect(() => {
    if (!inModal && hasProperty(dataStore, 'employee.data.id') && action === TAction.CREATE) {
      const storeData = dataStore as IEmployeeShow;
      setTimeout(() => {
        navigate(ROUTES.employeesEdit.go({ id: storeData.employee.data.id }));
      }, 750);
    }
  }, [dataStore]);
  
  /** Submit return fields required to create. */
  React.useEffect(() => {
    const dataStoreRequired = dataStore as IEmployeeServiceFieldsRequired;
    if (hasProperty(dataStoreRequired, 'errors')) {
      setErrors({...dataStoreRequired.errors});
    }
  }, [dataStore]);

  /** Submit return fields required to update. */
  React.useEffect(() => {
    const dataUpdateRequired = dataUpdate as IEmployeeServiceFieldsRequired;
    if (hasProperty(dataUpdateRequired, 'errors')) {
      setErrors({...dataUpdateRequired?.errors});
    }
  }, [dataUpdate]);

  /** Get reducers values selected. */
  const { citiesSelected } = useAppSelectorBlaBlaBal('citiesSearchReducer') as ICitiesSearchServiceRequest;
  const { neighborhoodsSelected } = useAppSelectorBlaBlaBal('neighborhoodsSearchReducer') as INeighborhoodsSearchServiceRequest;

  console.log('DEBUGN citiesSelected:', citiesSelected);
  console.log('DEBUGN neighborhoodsSelected:', neighborhoodsSelected);
  console.log('DEBUGN errors:', errors);

  React.useEffect(() => {
    const newEmployee = JSON.parse(JSON.stringify(employee));

    delete newEmployee.city_id;
    delete newEmployee.city;
    delete newEmployee.neighborhood_id;
    delete newEmployee.neighborhood;

    if (citiesSelected && citiesSelected.length) {
      newEmployee.city_id = citiesSelected[0].id;
      newEmployee.city = citiesSelected[0];
    }
    if (neighborhoodsSelected && neighborhoodsSelected.length) {
      newEmployee.neighborhood_id = neighborhoodsSelected[0].id;
      newEmployee.neighborhood = neighborhoodsSelected[0];
    }

    setEmployee({...newEmployee});
  }, [citiesSelected, neighborhoodsSelected]);

  /** Handle values. */
  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, format?: string, max?: number) => {
    let result = event.target.value;

    if (max && result.length > max) return false;

    if (format === 'int') result = String(result).onlyNumbers();
    if (format === 'cur') result = String(result).toCurrencyBRPress();
    if (format === 'cep') result = String(result).toCepPress();
     
    setEmployee({
      ...employee, 
      [event.target.name]: result
    });
  };

  const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setEmployee({
      ...employee,
      [event.target.name]: checked ? 1 : 0
    });
  };

  /** Get value. */
  const resolveValue = (value: string) => value || '';

  /** Check if user */
  const isUser = () => employee.isUser || employee?.user_id ? true : false;

  /**
   * Render.
  */
  const renderButtonSubmit = () => {
    if (action === 'create')
      return <Button data-testid="submit-create-button" fab text="Cadastrar" icon={<CloudDoneIcon />} onClick={handleSubmitCreate} loading={(statusStore === 'loading')} />;

    if (action === 'delete')
      return <Button data-testid="submit-delete-button" fab text="Deletar" icon={<DeleteIcon />} onClick={handleDelete} loading={(statusDelete === 'loading')} />;
      
    return <Button fab text="Salvar Informações" icon={<CloudDoneIcon />} onClick={handleSubmitUpdate} disabled={(statusUpdate === 'loading')} />;
  };

  return (
    <React.Fragment>
      <WrapperInfo>
        <BoxInfo>
          <TextField error={Boolean(errors?.employee?.nome && !hasProperty(employee, 'employee.id'))} fullWidth id="standard-basic" label="Nome" variant="standard" name="nome" onChange={handleChangeText} value={resolveValue(employee.nome)} disabled={disabled} />
        </BoxInfo>
      </WrapperInfo>

      <DividerSpacingRows />

      <WrapperInfo>
        <BoxInfoCity>
          <BoxInfo>
            <CitiesAutocomplete 
              shouldRenderAdd
              valueDefault={employee?.city?.data}
              disabled={disabled}
            />
          </BoxInfo>
          <BoxInfo>
            <NeighborhoodsAutocomplete
              shouldRenderAdd
              valueDefault={employee?.neighborhood?.data}
              disabled={disabled}
            />
          </BoxInfo>
        </BoxInfoCity>

        <Divider />
        
        <BoxInfoLocalidade>
          <BoxInfo>
            <TextField fullWidth id="standard-basic" label="Logradouro" variant="standard" name="logradouro" onChange={handleChangeText} value={resolveValue(employee.logradouro)} disabled={disabled} />
          </BoxInfo>
          <BoxInfoLocalidadeNumero>
            <TextField fullWidth id="standard-basic" label="Número" variant="standard" name="numero" onChange={(e) => handleChangeText(e, 'int')} value={resolveValue(employee.numero)} disabled={disabled} />
            <TextField fullWidth id="standard-basic" label="Apto" variant="standard" name="apto" onChange={handleChangeText} value={resolveValue(employee.apto)} disabled={disabled} />
            <TextField fullWidth id="standard-basic" label="CEP" variant="standard" name="cep" onChange={(e) => handleChangeText(e, 'cep', 8)} value={resolveValue(employee.cep)} disabled={disabled} />
          </BoxInfoLocalidadeNumero>
        </BoxInfoLocalidade>
      </WrapperInfo>

      <DividerSpacingRows />

      <WrapperInfo>
        <BoxInfo>
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={isUser()} color="primary" name="isUser" onChange={handleChangeSwitch} />} label="Conceder acesso ao sistema e aplicativo?"
          />
        </BoxInfo>
        <Divider />
        {isUser() && (
          <>
            <BoxInfoPermission>
              <BoxInfo>
                <h2>Usuário e Senha</h2>
              </BoxInfo>
              <BoxInfoUsername>
                <TextField fullWidth id="standard-basic" label="Usuário" variant="standard" name="username" onChange={handleChangeText} value={employee.username ? employee.username : '(será gerado automaticamente)'} disabled={true} />
                <TextField type="password" fullWidth id="standard-basic" label="Senha" variant="standard" name="password" onChange={handleChangeText} value={employee.password} disabled={false} />
              </BoxInfoUsername>
            </BoxInfoPermission>
            <Divider />
            <BoxInfoPermission>
              <BoxInfo>
                <h2>Permissões</h2>
              </BoxInfo>
              <BoxInfo>
                <FormControlLabel
                  control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={employee.manager} color="primary" name={ROLES.MANAGER.VALUE} onChange={handleChangeSwitch} />} label={ROLES.MANAGER.DESC}
                />
              </BoxInfo>
            </BoxInfoPermission>
          </>
        )}
      </WrapperInfo>

      <DividerSpacingRows />

      <Box style={{ alignItems: 'end' }}>
        {renderButtonSubmit()}
      </Box>
    </React.Fragment>
  );
};

export default Form;
