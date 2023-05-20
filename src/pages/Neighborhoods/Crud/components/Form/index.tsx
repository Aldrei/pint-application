import * as React from 'react';

import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';

import CloudDoneIcon from '@mui/icons-material/CloudDone';
import DeleteIcon from '@mui/icons-material/Delete';

import { useNavigate } from 'react-router-dom';

import Button from '../../../../../components/Button';

import { hasProperty } from '../../../../../helpers';

import { INeighborhoodData, INeighborhoodServiceFieldsRequired, INeighborhoodStoreRequired, INeighborhoodShow, IServiceRequestTemp } from '../../../../../types';
import { NeighborhoodModel } from '../../../../../constants/models';

import { ROUTES } from '../../../../../constants/routes';

import { ICitiesSearchServiceRequest } from '../../../../../reducers/cities/search';
import { INeighborhoodsSearchServiceRequest } from '../../../../../reducers/neighborhoods/search';

import { 
  neighborhoodsStoreThunk as dataStoreThunk, 
  neighborhoodsUpdateThunk as dataUpdateThunk,
  neighborhoodsDeleteThunk as dataDeleteThunk,
  setStatusStore,
  setStatusUpdate,
} from '../../../../../reducers/neighborhoods/list';


import { useAppDispatch } from '../../../../../hooks/useReducerDispatch';
import { useAppSelectorBlaBlaBal } from '../../../../../hooks/useReducerSelector';

import SnackContext from '../../../../../contexts/SnackContext';
import { messages } from '../../../../../constants/messages';

import { 
  WrapperInfo, 
  BoxInfo,
  DividerSpacingRows, 
} from './styles';

interface IProps {
  data?: INeighborhoodData;
  action: 'create' | 'show' | 'edit' | 'delete';
  inModal?: boolean;
}

const Form = ({ data, action, inModal }: IProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = React.useState<INeighborhoodData>(hasProperty(data, 'id') ? data as INeighborhoodData : {} as INeighborhoodData);
  const [errors, setErrors] = React.useState<INeighborhoodStoreRequired>({} as INeighborhoodStoreRequired);

  /**
   * Contexts.
  */
  const snackContext = React.useContext(SnackContext);

  /**
   * data prop.
  */
  React.useEffect(() => {
    if (hasProperty(data, 'id')) setFormData(data as INeighborhoodData);
  }, [data]);

  /**
   * Submit create/edit.
  */
  const { crud: {
    create: { status: ownersStoreStatus, data: ownersStoreData }, 
    update: { status: ownersUpdateStatus, data: ownerssUpdateData },
    delete: { status: ownersDeleteStatus, data: ownersDeleteData },
  } } = useAppSelectorBlaBlaBal('neighborhoodsListReducer') as IServiceRequestTemp;

  const handleSubmitCreate = () => dispatch(dataStoreThunk(formData));
  const handleSubmitUpdate = () => dispatch(dataUpdateThunk(formData));
  const handleDelete = () => dispatch(dataDeleteThunk(formData));

  React.useEffect(() => {
    if (ownersDeleteData?.status === 200) {
      snackContext.addMessage({ type: 'success', message: ownersDeleteData.message });

      setTimeout(() => {
        navigate(ROUTES.ownersList.go({}));
      }, 750);
    }

    if (ownersDeleteData?.status !== 200 && ownersDeleteData?.message) {
      snackContext.addMessage({ type: 'warning', message: ownersDeleteData.message });
    }
  }, [ownersDeleteData]);

  /**
   * Update.
  */
  React.useEffect(() => {
    if (ownersUpdateStatus === 'success' && hasProperty(ownerssUpdateData, 'errors')) {
      dispatch(setStatusUpdate('idle'));
      snackContext.addMessage({ type: 'warning', message: messages.pt.owners.store.errorRequired });
    }

    if (ownersUpdateStatus === 'success' && hasProperty(ownerssUpdateData, 'status')) {
      const ownerssUpdateDataTyped = ownerssUpdateData as INeighborhoodShow;
      dispatch(setStatusUpdate('idle'));
      if (ownerssUpdateDataTyped.status === 200) snackContext.addMessage({ type: 'success', message: messages.pt.owners.store.success });
      else snackContext.addMessage({ type: 'error', message: messages.pt.owners.store.errorRequest });
    }

    if (ownersUpdateStatus === 'failed') {
      dispatch(setStatusUpdate('idle'));
      snackContext.addMessage({ type: 'error', message: messages.pt.owners.update.errorRequest });
    }
  }, [ownerssUpdateData, ownersUpdateStatus]);

  React.useEffect(() => {
    const ownerssUpdateDataRequired = ownerssUpdateData as INeighborhoodServiceFieldsRequired;
    if (hasProperty(ownerssUpdateDataRequired, 'errors')) {
      setErrors({...ownerssUpdateDataRequired.errors});
    }
  }, [ownerssUpdateData]);
  
  /**
   * Create.
  */
  React.useEffect(() => {
    console.log('DEBUG NeighCreate ownersStoreData:', ownersStoreData);
    console.log('DEBUG NeighCreate ownersStoreStatus:', ownersStoreStatus);

    if (ownersStoreStatus === 'success' && hasProperty(ownersStoreData, 'errors')) {
      dispatch(setStatusStore('idle'));
      snackContext.addMessage({ type: 'warning', message: messages.pt.properties.store.errorRequired });
    }
    
    if (ownersStoreStatus === 'success' && hasProperty(ownersStoreData, 'status')) {
      const ownersStoreDataTyped = ownersStoreData as INeighborhoodShow;
      dispatch(setStatusStore('idle'));
      if (ownersStoreDataTyped.status === 200) snackContext.addMessage({ type: 'success', message: messages.pt.generic.store.success(NeighborhoodModel.pt.name) });
      else snackContext.addMessage({ type: 'error', message: messages.pt.generic.store.errorRequest(NeighborhoodModel.pt.name) });
    }

    if (ownersStoreStatus === 'failed') {
      dispatch(setStatusStore('idle'));
      snackContext.addMessage({ type: 'error', message: messages.pt.properties.store.errorRequest });
    }
  }, [ownersStoreData, ownersStoreStatus]);

  React.useEffect(() => {
    if (!inModal && hasProperty(ownersStoreData, 'owner.data.id') && action === 'create') {
      const storeData = ownersStoreData as INeighborhoodShow;
      setTimeout(() => {
        navigate(ROUTES.ownersEdit.go({ id: storeData.neighborhood.data.id }));
      }, 750);
    }
  }, [ownersStoreData]);

  React.useEffect(() => {
    const ownersStoreDataRequired = ownersStoreData as INeighborhoodServiceFieldsRequired;
    if (hasProperty(ownersStoreDataRequired, 'errors')) {
      setErrors({...ownersStoreDataRequired.errors});
    }
  }, [ownersStoreData]);

  /** 
   * Get reducers values selected. 
   */
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
      return <Button data-testid="submit-create-button" fab text="Cadastrar" icon={<CloudDoneIcon />} onClick={handleSubmitCreate} loading={(ownersStoreStatus === 'loading')} />;

    if (action === 'delete')
      return <Button data-testid="submit-delete-button" fab text="Deletar" icon={<DeleteIcon />} onClick={handleDelete} loading={(ownersDeleteStatus === 'loading')} />;
      
    return <Button fab text="Salvar Informações" icon={<CloudDoneIcon />} onClick={handleSubmitUpdate} disabled={(ownersUpdateStatus === 'loading')} />;
  };

  return (
    <React.Fragment>
      <WrapperInfo>
        <BoxInfo>
          <TextField error={Boolean(errors?.nome && !hasProperty(formData, 'neighborhood.id'))} fullWidth id="standard-basic" label="Nome" variant="standard" name="nome" onChange={handleChangeText} value={resolveValue(formData.nome)} />
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
