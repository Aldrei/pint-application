import * as React from 'react';

import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';

import CloudDoneIcon from '@mui/icons-material/CloudDone';

import { useNavigate } from 'react-router-dom';

import CitiesAutocomplete from '../../../../../components/Autocomplete/hocs/CitiesAutocomplete';
import NeighborhoodsAutocomplete from '../../../../../components/Autocomplete/hocs/NeighborhoodsAutocomplete';
import Button from '../../../../../components/Button';

import { hasProperty } from '../../../../../helpers';

import { IOwnerData, IServiceFieldsRequired, IPropertyStoreRequired, IOwnerShow } from '../../../../../types';

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
  dataOwner?: IOwnerData
}

const Form = ({ dataOwner }: IProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [crudType, setCrudType] = React.useState<string>(hasProperty(dataOwner, 'id') ? 'edit' : 'create');
  const [property, setProperty] = React.useState<IOwnerData>(hasProperty(dataOwner, 'id') ? dataOwner as IOwnerData : {} as IOwnerData);
  const [errors, setErrors] = React.useState<IPropertyStoreRequired>({} as IPropertyStoreRequired);

  /**
   * Contexts.
  */
  const snackContext = React.useContext(SnackContext);

  /**
   * dataOwner prop.
  */
  React.useEffect(() => {
    if (hasProperty(dataOwner, 'id') && !hasProperty(property, 'code')) {
      setProperty(dataOwner as IOwnerData);
      setCrudType('edit');
    }
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
    dispatch(ownersStoreThunk(property));
  };
  const handleSubmitUpdate = () => dispatch(ownersUpdateThunk(property));

  React.useEffect(() => {
    /** Create. */
    if (ownersStoreStatus === 'success' && hasProperty(ownersStoreData, 'result.errors')) {
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
    if (ownerssUpdateStatus === 'success' && hasProperty(ownerssUpdateData, 'result.errors')) {
      dispatch(setStatusUpdate('idle'));
      snackContext.addMessage({ type: 'warning', message: messages.pt.properties.store.errorRequired });
    }

    if (ownerssUpdateStatus === 'success' && hasProperty(ownerssUpdateData, 'status')) {
      const ownerssUpdateDataTyped = ownerssUpdateData as IOwnerShow;
      dispatch(setStatusUpdate('idle'));
      if (ownerssUpdateDataTyped.status === 200) snackContext.addMessage({ type: 'success', message: messages.pt.properties.store.success });
      else snackContext.addMessage({ type: 'error', message: messages.pt.properties.store.errorRequest });
    }

    if (ownerssUpdateStatus === 'failed') {
      dispatch(setStatusUpdate('idle'));
      snackContext.addMessage({ type: 'error', message: messages.pt.properties.store.errorRequest });
    }
  }, [ownersStoreStatus, ownerssUpdateData]);

  React.useEffect(() => {
    if (hasProperty(ownersStoreData, 'owner.data.id') && crudType === 'create') {
      const storeData = ownersStoreData as IOwnerShow;
      setTimeout(() => {
        navigate(ROUTES.ownersEdit.go({ code: storeData.owner.data.id }));
      }, 750);
    }
  }, [ownersStoreData]);
  
  /** Submit return fields required to create. */
  React.useEffect(() => {
    const ownersStoreDataRequired = ownersStoreData as IServiceFieldsRequired;
    if (hasProperty(ownersStoreDataRequired, 'result.errors')) {
      setErrors({...ownersStoreDataRequired.result.errors});
    }
  }, [ownersStoreData]);

  /** Submit return fields required to update. */
  React.useEffect(() => {
    const ownerssUpdateDataRequired = ownerssUpdateData as IServiceFieldsRequired;
    if (hasProperty(ownerssUpdateDataRequired, 'result.errors')) {
      setErrors({...ownerssUpdateDataRequired.result.errors});
    }
  }, [ownerssUpdateData]);

  /** Get reducers values selected. */
  const { citiesSelected } = useAppSelectorBlaBlaBal('citiesSearchReducer') as ICitiesSearchServiceRequest;
  const { neighborhoodsSelected } = useAppSelectorBlaBlaBal('neighborhoodsSearchReducer') as INeighborhoodsSearchServiceRequest;

  console.log('DEBUGN citiesSelected:', citiesSelected);
  console.log('DEBUGN neighborhoodsSelected:', neighborhoodsSelected);

  React.useEffect(() => {
    const newProperty = JSON.parse(JSON.stringify(property));

    delete newProperty.owner_id;
    delete newProperty.owner;
    delete newProperty.agent_id;
    delete newProperty.agent;
    delete newProperty.broker_id;
    delete newProperty.broker;
    delete newProperty.city_id;
    delete newProperty.city;
    delete newProperty.neighborhood_id;
    delete newProperty.neighborhood;

    if (citiesSelected && citiesSelected.length) {
      newProperty.city_id = citiesSelected[0].id;
      newProperty.city = citiesSelected[0];
    }
    if (neighborhoodsSelected && neighborhoodsSelected.length) {
      newProperty.neighborhood_id = neighborhoodsSelected[0].id;
      newProperty.neighborhood = neighborhoodsSelected[0];
    }

    setProperty({...newProperty});
  }, [
    citiesSelected,
    neighborhoodsSelected
  ]);

  /** Handle values. */
  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, format?: string, max?: number) => {
    let result = event.target.value;

    if (max && result.length > max) return false;

    if (format === 'int') result = String(result).onlyNumbers();
    if (format === 'cur') result = String(result).toCurrencyBRPress();
    if (format === 'cep') result = String(result).toCepPress();
     
    setProperty({
      ...property, 
      [event.target.name]: result
    });
  };

  /** Get value. */
  const resolveValue = (value: string) => value || '';

  /**
   * Render.
  */
  const renderButtonSubmit = () => {
    if (crudType === 'create') 
      return <Button data-testid="submit-create-button" fab text="Cadastrar" icon={<CloudDoneIcon />} onClick={handleSubmitCreate} loading={(ownersStoreStatus === 'loading')} />;
      
    return <Button fab text="Salvar Informações" icon={<CloudDoneIcon />} onClick={handleSubmitUpdate} disabled={(ownerssUpdateStatus === 'loading')} />;
  };

  return (
    <React.Fragment>
      <WrapperInfo>
        <BoxInfo>
          <TextField fullWidth id="standard-basic" label="Nome ou Razão Social" variant="standard" name="nomeImovel" onChange={handleChangeText} value={resolveValue(property.nomeRazao)} />
        </BoxInfo>
        {/* <Divider />
        <WrapperStack>
          <Textarea
            aria-label="maximum height"
            placeholder="Observações sobre o Nome ou Razão Social..."
            name="descGeral" 
            onChange={handleChangeText}
            value={resolveValue(property.descGeral)}
          />
        </WrapperStack> */}
      </WrapperInfo>

      <DividerSpacingRows />

      <WrapperInfo>
        <BoxInfoCity>
          <BoxInfo>
            <CitiesAutocomplete error={Boolean(errors?.city_id && !hasProperty(property, 'city.id'))} defaultValue={hasProperty(property, 'city.data.id') ? property.city.data : {}} />
          </BoxInfo>
          <BoxInfo>
            <NeighborhoodsAutocomplete error={Boolean(errors?.neighborhood_id && !hasProperty(property, 'neighborhood.id'))} defaultValue={hasProperty(property, 'neighborhood.data.id') ? property.neighborhood.data : {}} />
          </BoxInfo>
        </BoxInfoCity>
        <Divider />
        <BoxInfoLocalidade>
          <BoxInfo>
            <TextField fullWidth id="standard-basic" label="Logradouro" variant="standard" name="logradouro" onChange={handleChangeText} value={resolveValue(property.logradouro)} />
          </BoxInfo>
          <BoxInfoLocalidadeNumero>
            <TextField fullWidth id="standard-basic" label="Número" variant="standard" name="numero" onChange={(e) => handleChangeText(e, 'int')} value={resolveValue(property.numero)} />
            <TextField fullWidth id="standard-basic" label="Apto" variant="standard" name="apto" onChange={handleChangeText} value={resolveValue(property.apto)} />
            <TextField fullWidth id="standard-basic" label="CEP" variant="standard" name="cep" onChange={(e) => handleChangeText(e, 'cep', 8)} value={resolveValue(property.cep)} />
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
