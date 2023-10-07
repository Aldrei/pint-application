import * as React from 'react';

import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';

import CloudDoneIcon from '@mui/icons-material/CloudDone';
import DeleteIcon from '@mui/icons-material/Delete';

import { useNavigate } from 'react-router-dom';

import CitiesAutocomplete from '../../../../../components/Autocomplete/hocs/CitiesAutocomplete';
import NeighborhoodsAutocomplete from '../../../../../components/Autocomplete/hocs/NeighborhoodsAutocomplete';
import Button from '../../../../../components/Button';

import { hasProperty, getMessage } from '../../../../../helpers';

import { IEmployeeData, IEmployeeServiceFieldsRequired, IEmployeeStoreRequired, IEmployeeShow, IServiceRequestTemp } from '../../../../../types';

import { ROUTES } from '../../../../../constants/routes';

import { ICitiesSearchServiceRequest } from '../../../../../reducers/cities/search';
import { INeighborhoodsSearchServiceRequest } from '../../../../../reducers/neighborhoods/search';

import { 
  employeesStoreThunk as ownersStoreThunk, 
  employeesUpdateThunk as ownersUpdateThunk,
  employeesDeleteThunk as ownersDeleteThunk,
  setStatusStore,
  setStatusUpdate,
} from '../../../../../reducers/employees/crud';


import { useAppDispatch } from '../../../../../hooks/useReducerDispatch';
import { useAppSelectorBlaBlaBal } from '../../../../../hooks/useReducerSelector';

import SnackContext from '../../../../../contexts/SnackContext';

import { 
  WrapperInfo, 
  BoxInfo, 
  BoxInfoCity,
  BoxInfoLocalidade,
  BoxInfoLocalidadeNumero,
  DividerSpacingRows, 
} from './styles';

interface IProps {
  dataOwner?: IEmployeeData;
  action: 'create' | 'show' | 'edit' | 'delete'
  inModal?: boolean
}

const model = 'Colaborador';

const Form = ({ dataOwner, action, inModal }: IProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [owner, setOwner] = React.useState<IEmployeeData>(hasProperty(dataOwner, 'id') ? dataOwner as IEmployeeData : {} as IEmployeeData);
  const [errors, setErrors] = React.useState<IEmployeeStoreRequired>({} as IEmployeeStoreRequired);

  /**
   * Contexts.
  */
  const snackContext = React.useContext(SnackContext);

  /**
   * dataOwner prop.
  */
  React.useEffect(() => {
    if (hasProperty(dataOwner, 'id')) setOwner(dataOwner as IEmployeeData);
  }, [dataOwner]);

  /**
   * Submit create/edit.
  */
  const { crud: {
    create: { status: statusStore, data: dataStore }, 
    update: { status: statusUpdate, data: dataUpdate },
    delete: { status: statusDelete, data: dataDelete },
  } } = useAppSelectorBlaBlaBal('employeesListReducer') as IServiceRequestTemp;

  const handleSubmitCreate = () => {
    console.log('DEBUG CLICK ownersStoreThunk.');
    dispatch(ownersStoreThunk(owner));
  };

  const handleSubmitUpdate = () => dispatch(ownersUpdateThunk(owner));

  const handleDelete = () => dispatch(ownersDeleteThunk(owner));

  React.useEffect(() => {
    if (dataDelete?.status === 200) {
      snackContext.addMessage({ type: 'success', message: dataDelete.message });

      setTimeout(() => {
        navigate(ROUTES.ownersList.go({}));
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
    if (!inModal && hasProperty(dataStore, 'owner.data.id') && action === 'create') {
      const storeData = dataStore as IEmployeeShow;
      setTimeout(() => {
        navigate(ROUTES.ownersEdit.go({ id: storeData.employee.data.id }));
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
      setErrors({...dataUpdateRequired.errors});
    }
  }, [dataUpdate]);

  /** Get reducers values selected. */
  const { citiesSelected } = useAppSelectorBlaBlaBal('citiesSearchReducer') as ICitiesSearchServiceRequest;
  const { neighborhoodsSelected } = useAppSelectorBlaBlaBal('neighborhoodsSearchReducer') as INeighborhoodsSearchServiceRequest;

  console.log('DEBUGN citiesSelected:', citiesSelected);
  console.log('DEBUGN neighborhoodsSelected:', neighborhoodsSelected);

  React.useEffect(() => {
    const newOwner = JSON.parse(JSON.stringify(owner));

    delete newOwner.owner_id;
    delete newOwner.owner;
    delete newOwner.city_id;
    delete newOwner.city;
    delete newOwner.neighborhood_id;
    delete newOwner.neighborhood;

    if (citiesSelected && citiesSelected.length) {
      newOwner.city_id = citiesSelected[0].id;
      newOwner.city = citiesSelected[0];
    }
    if (neighborhoodsSelected && neighborhoodsSelected.length) {
      newOwner.neighborhood_id = neighborhoodsSelected[0].id;
      newOwner.neighborhood = neighborhoodsSelected[0];
    }

    setOwner({...newOwner});
  }, [citiesSelected, neighborhoodsSelected]);

  /** Handle values. */
  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, format?: string, max?: number) => {
    let result = event.target.value;

    if (max && result.length > max) return false;

    if (format === 'int') result = String(result).onlyNumbers();
    if (format === 'cur') result = String(result).toCurrencyBRPress();
    if (format === 'cep') result = String(result).toCepPress();
     
    setOwner({
      ...owner, 
      [event.target.name]: result
    });
  };

  /** Get value. */
  const resolveValue = (value: string) => value || '';

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
          <TextField error={Boolean(errors?.nome && !hasProperty(owner, 'owner.id'))} fullWidth id="standard-basic" label="Nome" variant="standard" name="nome" onChange={handleChangeText} value={resolveValue(owner.nome)} />
        </BoxInfo>
      </WrapperInfo>

      <DividerSpacingRows />

      <WrapperInfo>
        <BoxInfoCity>
          <BoxInfo>
            <CitiesAutocomplete />
          </BoxInfo>
          <BoxInfo>
            <NeighborhoodsAutocomplete />
          </BoxInfo>
        </BoxInfoCity>
        <Divider />
        <BoxInfoLocalidade>
          <BoxInfo>
            <TextField fullWidth id="standard-basic" label="Logradouro" variant="standard" name="logradouro" onChange={handleChangeText} value={resolveValue(owner.logradouro)} />
          </BoxInfo>
          <BoxInfoLocalidadeNumero>
            <TextField fullWidth id="standard-basic" label="Número" variant="standard" name="numero" onChange={(e) => handleChangeText(e, 'int')} value={resolveValue(owner.numero)} />
            <TextField fullWidth id="standard-basic" label="Apto" variant="standard" name="apto" onChange={handleChangeText} value={resolveValue(owner.apto)} />
            <TextField fullWidth id="standard-basic" label="CEP" variant="standard" name="cep" onChange={(e) => handleChangeText(e, 'cep', 8)} value={resolveValue(owner.cep)} />
          </BoxInfoLocalidadeNumero>
        </BoxInfoLocalidade>
      </WrapperInfo>

      <DividerSpacingRows />

      <Box style={{ alignItems: 'end' }}>
        {renderButtonSubmit()}
      </Box>
    </React.Fragment>
  );
};

export default Form;
