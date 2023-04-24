import * as React from 'react';

import Box from '@mui/material/Box';

import CloudDoneIcon from '@mui/icons-material/CloudDone';

import { useNavigate } from 'react-router-dom';

import PropertiesAutocomplete from '../../../../../../components/Autocomplete/hocs/PropertiesAutocomplete';
import Button from '../../../../../../components/Button';

import { hasProperty } from '../../../../../../helpers';

import { IPropertyData, IServiceFieldsRequired, IPropertyStoreRequired, IPropertyShow } from '../../../../../../types';

import { ROUTES } from '../../../../../../constants/routes';

import { IOwnerSearchServiceRequest } from '../../../../../../reducers/owners/search';
import { propertiesStoreThunk, IPropertiesStoreServiceRequest, setStatus } from '../../../../../../reducers/properties/store';
import { propertiesUpdateThunk, IPropertiesUpdateServiceRequest, setStatus as setStatusUpdate } from '../../../../../../reducers/properties/update';

import { useAppDispatch } from '../../../../../../hooks/useReducerDispatch';
import { useAppSelectorBlaBlaBal } from '../../../../../../hooks/useReducerSelector';

import SnackContext from '../../../../../../contexts/SnackContext';
import { messages } from '../../../../../../constants/messages';

import { 
  WrapperInfo,
  BoxInfo,
  DividerSpacingRows,
} from './styles';

interface IProps {
  dataProperty?: IPropertyData
}

const Form = ({ dataProperty }: IProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [crudType, setCrudType] = React.useState<string>(hasProperty(dataProperty, 'code') ? 'edit' : 'create');
  const [property, setProperty] = React.useState<IPropertyData>(hasProperty(dataProperty, 'code') ? dataProperty as IPropertyData : {} as IPropertyData);
  const [errors, setErrors] = React.useState<IPropertyStoreRequired>({} as IPropertyStoreRequired);

  /**
   * Contexts.
  */
  const snackContext = React.useContext(SnackContext);

  /**
   * dataProperty prop.
  */
  React.useEffect(() => {
    if (hasProperty(dataProperty, 'code') && !hasProperty(property, 'code')) {
      setProperty(dataProperty as IPropertyData);
      setCrudType('edit');
    }
  }, [dataProperty]);

  /**
   * Submit create/edit.
  */
  const { data: propertiesStoreData, status: propertiesStoreStatus } = useAppSelectorBlaBlaBal('propertiesStoreReducer') as IPropertiesStoreServiceRequest;
  const { data: propertiesUpdateData, status: propertiesUpdateStatus } = useAppSelectorBlaBlaBal('propertiesUpdateReducer') as IPropertiesUpdateServiceRequest;

  console.log('DEBUG propertiesStoreStatus:', propertiesStoreStatus);
  console.log('DEBUG propertiesStoreData:', propertiesStoreData);

  console.log('DEBUG propertiesUpdateStatus:', propertiesUpdateStatus);
  console.log('DEBUG propertiesUpdateData:', propertiesUpdateData);

  const handleSubmitCreate = () => {
    console.log('DEBUG CLICK propertiesStoreThunk.');
    dispatch(propertiesStoreThunk(property));
  };
  const handleSubmitUpdate = () => dispatch(propertiesUpdateThunk(property));

  React.useEffect(() => {
    /** Create. */
    if (propertiesStoreStatus === 'success' && hasProperty(propertiesStoreData, 'result.errors')) {
      dispatch(setStatus('idle'));
      snackContext.addMessage({ type: 'warning', message: messages.pt.properties.store.errorRequired });
    }

    if (propertiesStoreStatus === 'success' && hasProperty(propertiesStoreData, 'status')) {
      const propertiesStoreDataTyped = propertiesStoreData as IPropertyShow;
      dispatch(setStatus('idle'));
      if (propertiesStoreDataTyped.status === 200) snackContext.addMessage({ type: 'success', message: messages.pt.properties.store.success });
      else snackContext.addMessage({ type: 'error', message: messages.pt.properties.store.errorRequest });
    }

    if (propertiesStoreStatus === 'failed') {
      dispatch(setStatus('idle'));
      snackContext.addMessage({ type: 'error', message: messages.pt.properties.store.errorRequest });
    }

    /** Update. */
    if (propertiesUpdateStatus === 'success' && hasProperty(propertiesUpdateData, 'result.errors')) {
      dispatch(setStatusUpdate('idle'));
      snackContext.addMessage({ type: 'warning', message: messages.pt.properties.store.errorRequired });
    }

    if (propertiesUpdateStatus === 'success' && hasProperty(propertiesUpdateData, 'status')) {
      const propertiesUpdateDataTyped = propertiesUpdateData as IPropertyShow;
      dispatch(setStatusUpdate('idle'));
      if (propertiesUpdateDataTyped.status === 200) snackContext.addMessage({ type: 'success', message: messages.pt.properties.store.success });
      else snackContext.addMessage({ type: 'error', message: messages.pt.properties.store.errorRequest });
    }

    if (propertiesUpdateStatus === 'failed') {
      dispatch(setStatusUpdate('idle'));
      snackContext.addMessage({ type: 'error', message: messages.pt.properties.store.errorRequest });
    }
  }, [propertiesStoreStatus, propertiesUpdateData]);

  React.useEffect(() => {
    if (hasProperty(propertiesStoreData, 'property.data.code') && crudType === 'create') {
      const propertyShow = propertiesStoreData as IPropertyShow;
      setTimeout(() => {
        navigate(ROUTES.propertiesEdit.go({ code: propertyShow.property.data.code, tab: 'map' }));
      }, 750);
    }
  }, [propertiesStoreData]);
  
  /** Submit return fields required to create. */
  React.useEffect(() => {
    const propertiesStoreDataRequired = propertiesStoreData as IServiceFieldsRequired;
    if (hasProperty(propertiesStoreDataRequired, 'result.errors')) {
      setErrors({...propertiesStoreDataRequired.result.errors});
    }
  }, [propertiesStoreData]);

  /** Submit return fields required to update. */
  React.useEffect(() => {
    const propertiesUpdateDataRequired = propertiesUpdateData as IServiceFieldsRequired;
    if (hasProperty(propertiesUpdateDataRequired, 'result.errors')) {
      setErrors({...propertiesUpdateDataRequired.result.errors});
    }
  }, [propertiesUpdateData]);

  /** Get reducers values selected. */
  const { ownerSelected } = useAppSelectorBlaBlaBal('ownersSearchReducer') as IOwnerSearchServiceRequest;

  console.log('DEBUGN ownerSelected:', ownerSelected);

  React.useEffect(() => {
    const newProperty = JSON.parse(JSON.stringify(property));

    delete newProperty.owner_id;
    delete newProperty.owner;

    if (ownerSelected && ownerSelected.length) {
      newProperty.owner_id = ownerSelected[0].id;
      newProperty.owner = ownerSelected[0];
    }

    setProperty({...newProperty});
  }, [
    ownerSelected,
  ]);

  /**
   * Render.
  */
  const renderButtonSubmit = () => {
    if (crudType === 'create') 
      return <Button data-testid="submit-create-button" fab text="Avançar" icon={<CloudDoneIcon />} onClick={handleSubmitCreate} loading={(propertiesStoreStatus === 'loading')} />;
      
    return <Button fab text="Salvar Informações" icon={<CloudDoneIcon />} onClick={handleSubmitUpdate} disabled={(propertiesUpdateStatus === 'loading')} />;
  };

  return (
    <React.Fragment>
      <WrapperInfo>
        <BoxInfo>
          <PropertiesAutocomplete error={Boolean(errors?.owner_id && !hasProperty(property, 'owner.id'))} defaultValue={hasProperty(property, 'owner.data.id') ? property.owner.data : {}} />
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
