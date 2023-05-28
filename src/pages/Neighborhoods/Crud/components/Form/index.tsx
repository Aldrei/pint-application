import * as React from 'react';

import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';

import CloudDoneIcon from '@mui/icons-material/CloudDone';
import DeleteIcon from '@mui/icons-material/Delete';

import { useNavigate } from 'react-router-dom';

import Button from '../../../../../components/Button';

import { hasProperty, getMessage } from '../../../../../helpers';

import { INeighborhoodData, INeighborhoodServiceFieldsRequired, INeighborhoodStoreRequired, INeighborhoodShow, IServiceRequestTemp, INeighborhoodDataSearchResult } from '../../../../../types';
import { NeighborhoodModel } from '../../../../../constants/models';

import { ROUTES } from '../../../../../constants/routes';

import { ICitiesSearchServiceRequest } from '../../../../../reducers/cities/search';
import { INeighborhoodsSearchServiceRequest, neighborhoodsSearchThunk, setSelectedNeighborhoods } from '../../../../../reducers/neighborhoods/search';

import { 
  neighborhoodsStoreThunk as dataStoreThunk, 
  neighborhoodsUpdateThunk as dataUpdateThunk,
  neighborhoodsDeleteThunk as dataDeleteThunk,
  setStatusStore,
  setStatusUpdate,
} from '../../../../../reducers/neighborhoods/crud';


import { useAppDispatch } from '../../../../../hooks/useReducerDispatch';
import { useAppSelectorBlaBlaBal } from '../../../../../hooks/useReducerSelector';

import SnackContext from '../../../../../contexts/SnackContext';

import { 
  WrapperInfo, 
  BoxInfo,
  DividerSpacingRows, 
} from './styles';

import { Stack, Alert, Chip } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

interface IProps {
  data?: INeighborhoodData;
  action: 'create' | 'show' | 'edit' | 'delete';
  inModal?: boolean;
  handleCloseModal?: (value: boolean) => void;
}

const model = NeighborhoodModel.pt.name;

const Form = ({ data, action, inModal, handleCloseModal }: IProps) => {
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
  const [similarsStatus, setSimilarsStatus] = React.useState<'idle' | 'has-similars' | 'no-similars'>('idle');

  const { data: dataResultSearch } = useAppSelectorBlaBlaBal('neighborhoodsSearchReducer') as INeighborhoodsSearchServiceRequest;
  const dataResultSimilarNeighbohoods = dataResultSearch as INeighborhoodDataSearchResult;

  const { crud: {
    create: { status: statusStore, data: dataStore }, 
    update: { status: statusUpdate, data: dataUpdate },
    delete: { status: statusDelete, data: dataDelete },
  } } = useAppSelectorBlaBlaBal('neighborhoodsListReducer') as IServiceRequestTemp;

  const handleSearch = () => dispatch(neighborhoodsSearchThunk({ cityId: String(formData?.city_id), search: formData?.nome }));

  const handleSubmitCreate = () =>
    similarsStatus === 'idle' ? handleSearch() : dispatch(dataStoreThunk(formData));
  const handleSubmitUpdate = () =>
    similarsStatus === 'idle' ? handleSearch() : dispatch(dataUpdateThunk(formData));
  const handleDelete = () => 
    dispatch(dataDeleteThunk(formData));

  React.useEffect(() => {
    if (similarsStatus === 'idle' && formData?.nome)
      if (!dataResultSimilarNeighbohoods?.data?.length) setSimilarsStatus('no-similars');
      else setSimilarsStatus('has-similars');
  }, [dataResultSimilarNeighbohoods]);

  React.useEffect(() => {
    if (similarsStatus === 'no-similars') {
      if (action === 'create') dispatch(dataStoreThunk(formData));
      if (action === 'edit') dispatch(dataUpdateThunk(formData));
      setSimilarsStatus('idle');
      handleCloseModal?.(false);
    }
  }, [similarsStatus]);

  React.useEffect(() => {
    if (dataDelete?.status === 200) {
      snackContext.addMessage({ type: 'success', message: getMessage({ action: 'delete', type: 'success', model }) });

      setTimeout(() => {
        navigate(ROUTES.ownersList.go({}));
      }, 750);
    }

    if (dataDelete?.status !== 200 && dataDelete?.message) {
      snackContext.addMessage({ type: 'warning', message: getMessage({ action: 'delete', type: 'success', model }) });
    }
  }, [dataDelete]);

  /**
   * Update.
  */
  React.useEffect(() => {
    if (statusUpdate === 'success' && hasProperty(dataUpdate, 'errors')) {
      dispatch(setStatusUpdate('idle'));
      snackContext.addMessage({ type: 'warning', message: getMessage({ action: 'update', type: 'errorRequired', model }) });
    }

    if (statusUpdate === 'success' && hasProperty(dataUpdate, 'status')) {
      const dataUpdateTyped = dataUpdate as INeighborhoodShow;
      dispatch(setStatusUpdate('idle'));
      if (dataUpdateTyped.status === 200) snackContext.addMessage({ type: 'success', message: getMessage({ action: 'update', type: 'success', model }) });
      else snackContext.addMessage({ type: 'error', message: getMessage({ action: 'update', type: 'errorRequest', model }) });
    }

    if (statusUpdate === 'failed') {
      dispatch(setStatusUpdate('idle'));
      snackContext.addMessage({ type: 'error', message: getMessage({ action: 'update', type: 'errorRequest', model }) });
    }
  }, [dataUpdate, statusUpdate]);

  React.useEffect(() => {
    const dataUpdateRequired = dataUpdate as INeighborhoodServiceFieldsRequired;
    if (hasProperty(dataUpdateRequired, 'errors')) {
      setErrors({...dataUpdateRequired.errors});
    }
  }, [dataUpdate]);
  
  /**
   * Create.
  */
  React.useEffect(() => {
    console.log('DEBUG NeighCreate dataStore:', dataStore);
    console.log('DEBUG NeighCreate statusStore:', statusStore);

    if (statusStore === 'success' && hasProperty(dataStore, 'errors')) {
      dispatch(setStatusStore('idle'));
      snackContext.addMessage({ type: 'warning', message: getMessage({ action: 'store', type: 'errorRequired', model }) });
    }
    
    if (statusStore === 'success' && hasProperty(dataStore, 'status')) {
      const dataStoreTyped = dataStore as INeighborhoodShow;
      dispatch(setStatusStore('idle'));
      if (dataStoreTyped.status === 200) snackContext.addMessage({ type: 'success', message: getMessage({ action: 'store', type: 'success', model }) });
      else snackContext.addMessage({ type: 'error', message: getMessage({ action: 'store', type: 'errorRequest', model }) });
    }

    if (statusStore === 'failed') {
      dispatch(setStatusStore('idle'));
      snackContext.addMessage({ type: 'error', message: getMessage({ action: 'store', type: 'errorRequest', model }) });
    }
  }, [dataStore, statusStore]);

  React.useEffect(() => {
    if (!inModal && hasProperty(dataStore, 'owner.data.id') && action === 'create') {
      const storeData = dataStore as INeighborhoodShow;
      setTimeout(() => {
        navigate(ROUTES.ownersEdit.go({ id: storeData.neighborhood.data.id }));
      }, 750);
    }
  }, [dataStore]);

  React.useEffect(() => {
    const dataStoreRequired = dataStore as INeighborhoodServiceFieldsRequired;
    if (hasProperty(dataStoreRequired, 'errors')) {
      setErrors({...dataStoreRequired.errors});
    }
  }, [dataStore]);

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
  const handleSelectedSimilarNeighborhood = (item: INeighborhoodData) => {
    dispatch(setSelectedNeighborhoods([item] as INeighborhoodData[]));
    handleCloseModal?.(false);
  };
  
  const AlertAlreadyExistName = () => {
    if (similarsStatus === 'has-similars')
      return (
        <Stack sx={{ width: '100%', marginBottom: '15px' }} spacing={2}>
          <Alert
            severity="warning"
            action={renderButtonSubmit()}
            sx={{
              '& p': {
                marginBottom: '12px',
                '&:first-child': {
                  marginBottom: '5px'
                },
              },
              '& .MuiButtonBase-root': {
                flexDirection: 'row'
              }
            }}
          >
            <p>
              Encontramos cidades com nome semelhante a "<strong><i>{formData?.nome}</i></strong>":
            </p>
            <p>
              {dataResultSimilarNeighbohoods?.data?.map(item => (
                <Chip sx={{ marginLeft: '5px' }} label={item.nome} onClick={() => handleSelectedSimilarNeighborhood(item)} icon={<RadioButtonUncheckedIcon />} />    
              ))}
            </p>
            <p>
              <strong>Cidades e Bairros</strong> com nomes <strong>duplicados trazem</strong> sérios <strong>problemas de busca nos filtros</strong> do site para seus clientes logo para seu negócio!
            </p>
            Gostaria mesmo de cadastrar?
            <br />
            Senão selecione uma delas acima e evite problemas.
          </Alert>
        </Stack>
      );

    return null;
  };

  const renderButtonSubmit = () => {
    if (action === 'create')
      return <Button data-testid="submit-create-button" fab text="Cadastrar" icon={<CloudDoneIcon />} onClick={handleSubmitCreate} loading={(statusStore === 'loading')} />;

    if (action === 'delete')
      return <Button data-testid="submit-delete-button" fab text="Deletar" icon={<DeleteIcon />} onClick={handleDelete} loading={(statusDelete === 'loading')} />;
      
    return <Button fab text="Salvar Informações" icon={<CloudDoneIcon />} onClick={handleSubmitUpdate} disabled={(statusUpdate === 'loading')} />;
  };

  return (
    <React.Fragment>
      <AlertAlreadyExistName />

      <WrapperInfo>
        <BoxInfo>
          <TextField error={Boolean(errors?.nome && !hasProperty(formData, 'neighborhood.id'))} fullWidth id="standard-basic" label="Nome" variant="standard" name="nome" onChange={handleChangeText} value={resolveValue(formData.nome)} />
        </BoxInfo>
      </WrapperInfo>

      <DividerSpacingRows />

      {similarsStatus !== 'has-similars' && (
        <Box style={{ alignItems: 'end' }}>{renderButtonSubmit()}</Box>
      )}
    </React.Fragment>
  );
};

export default Form;
