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

import { hasProperty } from '../../../../../helpers';

import { IOwnerData, IOwnerServiceFieldsRequired, IOwnerStoreRequired, IOwnerShow } from '../../../../../types';

import { ROUTES } from '../../../../../constants/routes';

import { ICitiesSearchServiceRequest } from '../../../../../reducers/cities/search';
import { INeighborhoodsSearchServiceRequest } from '../../../../../reducers/neighborhoods/search';
import { ownersStoreThunk, IOwnerStoreServiceRequest, setStatus } from '../../../../../reducers/owners/store';
import { ownersUpdateThunk, IOwnerUpdateServiceRequest, setStatus as setStatusUpdate } from '../../../../../reducers/owners/update';

import { useAppDispatch } from '../../../../../hooks/useReducerDispatch';
import { useAppSelectorBlaBlaBal } from '../../../../../hooks/useReducerSelector';

import SnackContext from '../../../../../contexts/SnackContext';
import { messages } from '../../../../../constants/messages';

import { 
  WrapperInfo, 
  BoxInfo, 
  BoxInfoCity,
  BoxInfoLocalidade,
  BoxInfoLocalidadeNumero,
  DividerSpacingRows, 
} from './styles';

interface IProps {
  dataOwner?: IOwnerData;
  action: 'create' | 'show' | 'edit' | 'delete'
}

const Form = ({ dataOwner, action }: IProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [owner, setOwner] = React.useState<IOwnerData>(hasProperty(dataOwner, 'id') ? dataOwner as IOwnerData : {} as IOwnerData);
  const [errors, setErrors] = React.useState<IOwnerStoreRequired>({} as IOwnerStoreRequired);

  /**
   * Contexts.
  */
  const snackContext = React.useContext(SnackContext);

  /**
   * dataOwner prop.
  */
  React.useEffect(() => {
    if (hasProperty(dataOwner, 'id')) setOwner(dataOwner as IOwnerData);
  }, [dataOwner]);

  /**
   * Submit create/edit.
  */
  const { data: ownersStoreData, status: ownersStoreStatus } = useAppSelectorBlaBlaBal('ownersStoreReducer') as IOwnerStoreServiceRequest;
  const { data: ownerssUpdateData, status: ownerssUpdateStatus } = useAppSelectorBlaBlaBal('ownersUpdateReducer') as IOwnerUpdateServiceRequest;

  console.log('DEBUG ownersStoreStatus:', ownersStoreStatus);
  console.log('DEBUG ownersStoreData:', ownersStoreData);

  console.log('DEBUG ownerssUpdateStatus:', ownerssUpdateStatus);
  console.log('DEBUG ownerssUpdateData:', ownerssUpdateData);

  const handleSubmitCreate = () => {
    console.log('DEBUG CLICK ownersStoreThunk.');
    dispatch(ownersStoreThunk(owner));
  };

  const handleSubmitUpdate = () => dispatch(ownersUpdateThunk(owner));

  const handleDelete = () => {
    // Implement reducer delete...
  };

  React.useEffect(() => {
    /** Create. */
    if (ownersStoreStatus === 'success' && hasProperty(ownersStoreData, 'errors')) {
      dispatch(setStatus('idle'));
      snackContext.addMessage({ type: 'warning', message: messages.pt.properties.store.errorRequired });
    }

    if (ownersStoreStatus === 'success' && hasProperty(ownersStoreData, 'status')) {
      const ownersStoreDataTyped = ownersStoreData as IOwnerShow;
      dispatch(setStatus('idle'));
      if (ownersStoreDataTyped.status === 200) snackContext.addMessage({ type: 'success', message: messages.pt.properties.store.success });
      else snackContext.addMessage({ type: 'error', message: messages.pt.properties.store.errorRequest });
    }

    if (ownersStoreStatus === 'failed') {
      dispatch(setStatus('idle'));
      snackContext.addMessage({ type: 'error', message: messages.pt.properties.store.errorRequest });
    }

    /** Update. */
    if (ownerssUpdateStatus === 'success' && hasProperty(ownerssUpdateData, 'errors')) {
      dispatch(setStatusUpdate('idle'));
      snackContext.addMessage({ type: 'warning', message: messages.pt.owners.store.errorRequired });
    }

    if (ownerssUpdateStatus === 'success' && hasProperty(ownerssUpdateData, 'status')) {
      const ownerssUpdateDataTyped = ownerssUpdateData as IOwnerShow;
      dispatch(setStatusUpdate('idle'));
      if (ownerssUpdateDataTyped.status === 200) snackContext.addMessage({ type: 'success', message: messages.pt.owners.store.success });
      else snackContext.addMessage({ type: 'error', message: messages.pt.owners.store.errorRequest });
    }

    if (ownerssUpdateStatus === 'failed') {
      dispatch(setStatusUpdate('idle'));
      snackContext.addMessage({ type: 'error', message: messages.pt.owners.update.errorRequest });
    }
  }, [ownersStoreStatus, ownerssUpdateData]);

  React.useEffect(() => {
    if (hasProperty(ownersStoreData, 'owner.data.id') && action === 'create') {
      const storeData = ownersStoreData as IOwnerShow;
      setTimeout(() => {
        navigate(ROUTES.ownersEdit.go({ id: storeData.owner.data.id }));
      }, 750);
    }
  }, [ownersStoreData]);
  
  /** Submit return fields required to create. */
  React.useEffect(() => {
    const ownersStoreDataRequired = ownersStoreData as IOwnerServiceFieldsRequired;
    if (hasProperty(ownersStoreDataRequired, 'errors')) {
      setErrors({...ownersStoreDataRequired.errors});
    }
  }, [ownersStoreData]);

  /** Submit return fields required to update. */
  React.useEffect(() => {
    const ownerssUpdateDataRequired = ownerssUpdateData as IOwnerServiceFieldsRequired;
    if (hasProperty(ownerssUpdateDataRequired, 'errors')) {
      setErrors({...ownerssUpdateDataRequired.errors});
    }
  }, [ownerssUpdateData]);

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
      return <Button data-testid="submit-create-button" fab text="Cadastrar" icon={<CloudDoneIcon />} onClick={handleSubmitCreate} loading={(ownersStoreStatus === 'loading')} />;

    if (action === 'delete')
      return <Button data-testid="submit-delete-button" fab text="Deletar" icon={<DeleteIcon />} onClick={handleDelete} 
        //loading={(ownersStoreStatus === 'loading')} 
      />;
      
    return <Button fab text="Salvar Informações" icon={<CloudDoneIcon />} onClick={handleSubmitUpdate} disabled={(ownerssUpdateStatus === 'loading')} />;
  };

  return (
    <React.Fragment>
      <WrapperInfo>
        <BoxInfo>
          <TextField error={Boolean(errors?.nomeRazao && !hasProperty(owner, 'owner.id'))} fullWidth id="standard-basic" label="Nome ou Razão Social" variant="standard" name="nomeRazao" onChange={handleChangeText} value={resolveValue(owner.nomeRazao)} />
        </BoxInfo>
        {/* <Divider />
        <WrapperStack>
          <Textarea
            aria-label="maximum height"
            placeholder="Observações sobre o Nome ou Razão Social..."
            name="descGeral" 
            onChange={handleChangeText}
            value={resolveValue(owner.descGeral)}
          />
        </WrapperStack> */}
      </WrapperInfo>

      <DividerSpacingRows />

      <WrapperInfo>
        <BoxInfoCity>
          <BoxInfo>
            <CitiesAutocomplete defaultValue={hasProperty(owner, 'city.data.id') ? owner.city.data : {}} />
          </BoxInfo>
          <BoxInfo>
            <NeighborhoodsAutocomplete defaultValue={hasProperty(owner, 'neighborhood.data.id') ? owner.neighborhood.data : {}} />
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
