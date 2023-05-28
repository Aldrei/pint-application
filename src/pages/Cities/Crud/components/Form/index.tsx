import * as React from 'react';

import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import CloudDoneIcon from '@mui/icons-material/CloudDone';
import DeleteIcon from '@mui/icons-material/Delete';

import { useNavigate } from 'react-router-dom';

import Button from '../../../../../components/Button';

import { hasProperty, getMessage } from '../../../../../helpers';

import { ICityData, ICityServiceFieldsRequired, ICityStoreRequired, ICityShow, IStateData, IServiceRequestTemp } from '../../../../../types';

import { ROUTES } from '../../../../../constants/routes';
import { statesOptions } from '../../../../../constants/options';

import { ICitiesSearchServiceRequest } from '../../../../../reducers/cities/search';
import { INeighborhoodsSearchServiceRequest } from '../../../../../reducers/neighborhoods/search';
import { 
  citiesStoreThunk as dataStoreThunk, 
  citiesUpdateThunk as dataUpdateThunk,
  citiesDeleteThunk as dataDeleteThunk,
  setStatusStore,
  setStatusUpdate,
} from '../../../../../reducers/cities/crud';


import { useAppDispatch } from '../../../../../hooks/useReducerDispatch';
import { useAppSelectorBlaBlaBal } from '../../../../../hooks/useReducerSelector';

import SnackContext from '../../../../../contexts/SnackContext';

import { 
  WrapperInfo, 
  BoxInfo,
  DividerSpacingRows, 
  FormControlSelect,
} from './styles';

interface IProps {
  data?: ICityData;
  action: 'create' | 'show' | 'edit' | 'delete';
  inModal?: boolean;
}

const model = 'Cidade';

const Form = ({ data, action, inModal }: IProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = React.useState<ICityData>(hasProperty(data, 'id') ? data as ICityData : {} as ICityData);
  const [errors, setErrors] = React.useState<ICityStoreRequired>({} as ICityStoreRequired);

  /**
   * Contexts.
  */
  const snackContext = React.useContext(SnackContext);

  /**
   * Data prop.
  */
  React.useEffect(() => {
    if (hasProperty(data, 'id')) setFormData(data as ICityData);
  }, [data]);

  /**
   * Coutry state data.
  */
  const handleChangeSelect = (event: SelectChangeEvent, flag: string) => {
    const stateSelected = statesOptions.find(item => item.id === event.target.value) as unknown as IStateData;
    setFormData({
      ...formData,
      [`${flag}_id`]: stateSelected?.id || undefined,
      [flag]: stateSelected ? {
        id: stateSelected?.id,
        name: stateSelected?.name,
      } : undefined
    });
  };

  /**
   * Submit create/edit.
  */
  const { crud: {
    create: { status: statusStore, data: dataStore }, 
    update: { status: statusUpdate, data: dataUpdate },
    delete: { status: statusDelete, data: dataDelete },
  } } = useAppSelectorBlaBlaBal('citiesListReducer') as IServiceRequestTemp;

  const handleSubmitCreate = () => dispatch(dataStoreThunk(formData));
  const handleSubmitUpdate = () => dispatch(dataUpdateThunk(formData));
  const handleDelete = () => dispatch(dataDeleteThunk(formData));

  React.useEffect(() => {
    if (dataDelete?.status === 200) {
      snackContext.addMessage({ type: 'success', message: getMessage({ action: 'delete', type: 'success', model }) });

      setTimeout(() => {
        navigate(ROUTES.ownersList.go({}));
      }, 750);
    }

    if (dataDelete?.status !== 200 && dataDelete?.message) {
      snackContext.addMessage({ type: 'warning', message: getMessage({ action: 'delete', type: 'errorRequest', model }) });
    }
  }, [dataDelete]);

  React.useEffect(() => {
    /** Create. */
    if (statusStore === 'success' && hasProperty(dataStore, 'errors')) {
      dispatch(setStatusStore('idle'));
      snackContext.addMessage({ type: 'warning', message: getMessage({ action: 'store', type: 'errorRequired', model }) });
    }

    if (statusStore === 'success' && hasProperty(dataStore, 'status')) {
      const dataStoreTyped = dataStore as ICityShow;
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
      snackContext.addMessage({ type: 'warning', message: getMessage({ action: 'update', type: 'errorRequired', model }) });
    }

    if (statusUpdate === 'success' && hasProperty(dataUpdate, 'status')) {
      const dataUpdateTyped = dataUpdate as ICityShow;
      dispatch(setStatusUpdate('idle'));
      if (dataUpdateTyped.status === 200) snackContext.addMessage({ type: 'success', message: getMessage({ action: 'update', type: 'success', model }) });
      else snackContext.addMessage({ type: 'error', message: getMessage({ action: 'update', type: 'errorRequest', model }) });
    }

    if (statusUpdate === 'failed') {
      dispatch(setStatusUpdate('idle'));
      snackContext.addMessage({ type: 'error', message: getMessage({ action: 'update', type: 'errorRequest', model }) });
    }
  }, [statusStore, dataUpdate]);

  React.useEffect(() => {
    if (!inModal && hasProperty(dataStore, 'city.data.id') && action === 'create') {
      const storeData = dataStore as ICityShow;
      setTimeout(() => {
        navigate(ROUTES.ownersEdit.go({ id: storeData.city.data.id }));
      }, 750);
    }
  }, [dataStore]);
  
  /** Submit return fields required to create. */
  React.useEffect(() => {
    const dataStoreRequired = dataStore as ICityServiceFieldsRequired;
    if (hasProperty(dataStoreRequired, 'errors')) {
      setErrors({...dataStoreRequired.errors});
    }
  }, [dataStore]);

  /** Submit return fields required to update. */
  React.useEffect(() => {
    const dataUpdateRequired = dataUpdate as ICityServiceFieldsRequired;
    if (hasProperty(dataUpdateRequired, 'errors')) {
      setErrors({...dataUpdateRequired.errors});
    }
  }, [dataUpdate]);

  /** Get reducers values selected. */
  const { citiesSelected } = useAppSelectorBlaBlaBal('citiesSearchReducer') as ICitiesSearchServiceRequest;
  const { neighborhoodsSelected } = useAppSelectorBlaBlaBal('neighborhoodsSearchReducer') as INeighborhoodsSearchServiceRequest;

  React.useEffect(() => {
    const newOwner = JSON.parse(JSON.stringify(formData));

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

    setFormData({...newOwner});
  }, [citiesSelected, neighborhoodsSelected]);

  /** Handle values. */
  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, format?: string, max?: number) => {
    let result = event.target.value;

    if (max && result.length > max) return false;

    if (format === 'int') result = String(result).onlyNumbers();
    if (format === 'cur') result = String(result).toCurrencyBRPress();
    if (format === 'cep') result = String(result).toCepPress();
     
    setFormData({
      ...formData, 
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
          <FormControlSelect variant="standard">
            <InputLabel id="state-label">Estado</InputLabel>
            <Select
              labelId="state-label"
              value={resolveValue(String(formData?.state?.id))}
              onChange={(e) => handleChangeSelect(e, 'state')}
              label="Estado"
              autoWidth
            >
              {statesOptions.map((item, i) => (
                <MenuItem key={String(i)} value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControlSelect>
        </BoxInfo>
      </WrapperInfo>

      <DividerSpacingRows sx={{ margin: '10px 0' }} />

      <WrapperInfo>
        <BoxInfo>
          <TextField error={Boolean(errors?.name && !hasProperty(formData, 'owner.id'))} fullWidth id="standard-basic" label="Nome" variant="standard" name="name" onChange={handleChangeText} value={resolveValue(formData.name)} />
        </BoxInfo>
      </WrapperInfo>

      <DividerSpacingRows />

      <Box style={{ alignItems: 'end' }}>
        {renderButtonSubmit()}
      </Box>
    </React.Fragment>
  );
};

export default Form;
