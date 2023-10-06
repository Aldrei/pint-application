import * as React from 'react';

import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';

import SingleBedIcon from '@mui/icons-material/SingleBed';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CloudDoneIcon from '@mui/icons-material/CloudDone';

import { useNavigate } from 'react-router-dom';

import OwnerAutocomplete from '../../../../../components/Autocomplete/hocs/OwnerAutocomplete';
import EmployeesAgentsAutocomplete from '../../../../../components/Autocomplete/hocs/EmployeesAgentsAutocomplete';
import EmployeesBrokersAutocomplete from '../../../../../components/Autocomplete/hocs/EmployeesBrokersAutocomplete';
import CitiesAutocomplete from '../../../../../components/Autocomplete/hocs/CitiesAutocomplete';
import NeighborhoodsAutocomplete from '../../../../../components/Autocomplete/hocs/NeighborhoodsAutocomplete';
import Button from '../../../../../components/Button';

import { hasFeature, hasProperty, getMessage } from '../../../../../helpers';

import { IPropertyData, IServiceFieldsRequired, IPropertyStoreRequired, IPropertyShow } from '../../../../../types';

import { statusImovOptions, tipoOptions, categoriaOptions, nascerDoSolOptions } from '../../../../../constants/options';
import { ROUTES } from '../../../../../constants/routes';

import { IOwnerSearchServiceRequest } from '../../../../../reducers/owners/search';
import { IEmployeeSearchServiceRequest } from '../../../../../reducers/employees/search';
import { ICitiesSearchServiceRequest } from '../../../../../reducers/cities/search';
import { INeighborhoodsSearchServiceRequest } from '../../../../../reducers/neighborhoods/search';
import { propertiesStoreThunk, IPropertiesStoreServiceRequest, setStatus } from '../../../../../reducers/properties/store';
import { propertiesUpdateThunk, IPropertiesUpdateServiceRequest, setStatus as setStatusUpdate } from '../../../../../reducers/properties/update';

import { useAppDispatch } from '../../../../../hooks/useReducerDispatch';
import { useAppSelectorBlaBlaBal } from '../../../../../hooks/useReducerSelector';

import SnackContext from '../../../../../contexts/SnackContext';

import { 
  WrapperInfo, 
  WrapperInfoHorizon,
  WrapperInfoHorizonStatus,
  WrapperInfoHorizonExclusividade,
  WrapperInfoHorizonFeatures,
  WrapperInfoHorizonSite,
  BoxInfo, 
  BoxInfoCity,
  BoxInfoLocalidade,
  BoxInfoLocalidadeNumero,
  BoxInfoAreaTotal,
  BoxInfoAreaFrente,
  BoxInfoValores,
  WrapperStack, 
  DividerSpacingRows, 
  CheckCircleIconCustom, 
  CancelIconCustom,
  Textarea,
  InputTextAdornmentContainer,
  InputTextAdornment,
  InputText,
  FormControlSelect,
  MaterialUISwitch,
} from './styles';

interface IProps {
  dataProperty?: IPropertyData
  disabled?: boolean
}

const model = 'Imóvel';

const Form = ({ dataProperty, disabled }: IProps) => {
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

  const handleSubmitCreate = () => dispatch(propertiesStoreThunk(property));
  const handleSubmitUpdate = () => dispatch(propertiesUpdateThunk(property));

  React.useEffect(() => {
    /** Create. */
    if (propertiesStoreStatus === 'success' && hasProperty(propertiesStoreData, 'result.errors')) {
      dispatch(setStatus('idle'));
      snackContext.addMessage({ type: 'warning', message: getMessage({ action: 'store', type: 'errorRequired', model }) });
    }

    if (propertiesStoreStatus === 'success' && hasProperty(propertiesStoreData, 'status')) {
      const propertiesStoreDataTyped = propertiesStoreData as IPropertyShow;
      dispatch(setStatus('idle'));
      if (propertiesStoreDataTyped.status === 200) snackContext.addMessage({ type: 'success', message: getMessage({ action: 'store', type: 'success', model }) });
      else snackContext.addMessage({ type: 'error', message: getMessage({ action: 'store', type: 'errorRequest', model }) });
    }

    if (propertiesStoreStatus === 'failed') {
      dispatch(setStatus('idle'));
      snackContext.addMessage({ type: 'error', message: getMessage({ action: 'store', type: 'errorRequest', model }) });
    }

    /** Update. */
    if (propertiesUpdateStatus === 'success' && hasProperty(propertiesUpdateData, 'result.errors')) {
      dispatch(setStatusUpdate('idle'));
      snackContext.addMessage({ type: 'warning', message: getMessage({ action: 'update', type: 'errorRequired', model }) });
    }

    if (propertiesUpdateStatus === 'success' && hasProperty(propertiesUpdateData, 'status')) {
      const propertiesUpdateDataTyped = propertiesUpdateData as IPropertyShow;
      dispatch(setStatusUpdate('idle'));
      if (propertiesUpdateDataTyped.status === 200) snackContext.addMessage({ type: 'success', message: getMessage({ action: 'update', type: 'success', model }) });
      else snackContext.addMessage({ type: 'error', message: getMessage({ action: 'update', type: 'errorRequest', model }) });
    }

    if (propertiesUpdateStatus === 'failed') {
      dispatch(setStatusUpdate('idle'));
      snackContext.addMessage({ type: 'error', message: getMessage({ action: 'update', type: 'errorRequest', model }) });
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
  const { employeeAgentSelected } = useAppSelectorBlaBlaBal('employeesAgentsSearchReducer') as IEmployeeSearchServiceRequest;
  const { employeeBrokerSelected } = useAppSelectorBlaBlaBal('employeesBrokersSearchReducer') as IEmployeeSearchServiceRequest;
  const { citiesSelected } = useAppSelectorBlaBlaBal('citiesSearchReducer') as ICitiesSearchServiceRequest;
  const { neighborhoodsSelected } = useAppSelectorBlaBlaBal('neighborhoodsSearchReducer') as INeighborhoodsSearchServiceRequest;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getNewPropertyWithUpdatedFlags = (newData: any, flag: string) => {
    const newProperty = JSON.parse(JSON.stringify(property));

    newProperty[`${flag}_id`] = newData?.id || undefined;
    newProperty[flag] = newData?.id ? newData : undefined;

    return newProperty;
  };

  React.useEffect(() => {
    const newProperty = JSON.parse(JSON.stringify(property));

    delete newProperty.neighborhood_id;
    delete newProperty.neighborhood;

    if (neighborhoodsSelected && neighborhoodsSelected.length) {
      newProperty.neighborhood_id = neighborhoodsSelected[0].id;
      newProperty.neighborhood = neighborhoodsSelected[0];
    }

    setProperty({...newProperty});
  }, [
    neighborhoodsSelected
  ]);

  React.useEffect(() => {
    const shouldUpdate = property?.city_id !== citiesSelected?.[0]?.id;
    if (shouldUpdate) setProperty({...getNewPropertyWithUpdatedFlags(citiesSelected?.[0], 'city')});
  }, [citiesSelected]);

  React.useEffect(() => {
    const shouldUpdate = property?.broker_id !== employeeBrokerSelected?.[0]?.id;
    if (shouldUpdate) setProperty({...getNewPropertyWithUpdatedFlags(employeeBrokerSelected?.[0], 'broker')});
  }, [employeeBrokerSelected]);

  React.useEffect(() => {
    const shouldUpdate = property?.agent_id !== employeeAgentSelected?.[0]?.id;
    if (shouldUpdate) setProperty({...getNewPropertyWithUpdatedFlags(employeeAgentSelected?.[0], 'agent')});
  }, [employeeAgentSelected]);

  React.useEffect(() => {
    const shouldUpdate = property?.owner_id !== ownerSelected?.[0]?.id;
    if (shouldUpdate) setProperty({...getNewPropertyWithUpdatedFlags(ownerSelected?.[0], 'owner')});
  }, [ownerSelected]);

  console.log('DEBUG property:', property);

  /** Handle values. */
  const handleChangeSelect = (event: SelectChangeEvent, flag: string) => {
    setProperty({
      ...property, 
      [flag]: event.target.value
    });
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, format?: string, max?: number) => {
    let result = event.target.value;

    if (max && result.length > max) return false;

    if (format === 'cur' && result.length < 3) result = '0.0' + result;

    if (format === 'int') result = String(result).onlyNumbers();
    if (format === 'cur') result = String(result).toCurrencyBRPress();
    if (format === 'cep') result = String(result).toCepPress();
     
    setProperty({
      ...property, 
      [event.target.name]: result
    });
  };

  const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setProperty({
      ...property,
      [event.target.name]: checked ? 1 : 0
    });
  };

  /** Get value. */
  const resolveValue = (value: string) => value || '';

  const resolveDecimalValue = (value: string) => {
    if (value) return value.toCurrencyBRPress();

    return '';
  };

  /**
   * Render.
  */
  const renderButtonSubmit = () => {
    if (disabled) return null;

    if (crudType === 'create') 
      return <Button data-testid="submit-create-button" fab text="Cadastrar e Avançar" icon={<CloudDoneIcon />} onClick={handleSubmitCreate} loading={(propertiesStoreStatus === 'loading')} />;
      
    return <Button fab text="Salvar Informações" icon={<CloudDoneIcon />} onClick={handleSubmitUpdate} disabled={(propertiesUpdateStatus === 'loading')} />;
  };

  return (
    <React.Fragment>
      <WrapperInfo>
        <BoxInfo>
          <OwnerAutocomplete 
            error={Boolean(errors?.owner_id && !hasProperty(property, 'owner.id'))}
            shouldRenderAdd
            valueDefault={property?.owner?.data}
            disabled={disabled}
          />
        </BoxInfo>
      </WrapperInfo>
      
      <DividerSpacingRows />

      <WrapperInfo>
        <BoxInfo>
          <EmployeesAgentsAutocomplete
            error={Boolean(errors?.agent_id && !hasProperty(property, 'agent.id'))}
            shouldRenderAdd
            type="agent"
            valueDefault={property?.agent?.data}
            disabled={disabled}
          />
        </BoxInfo>
      </WrapperInfo>

      <DividerSpacingRows />

      <WrapperInfo>
        <BoxInfo>
          <EmployeesBrokersAutocomplete
            error={Boolean(errors?.broker_id && !hasProperty(property, 'broker.id'))} 
            shouldRenderAdd
            type="broker"
            valueDefault={property?.broker?.data}
            disabled={disabled}
          />
        </BoxInfo>
      </WrapperInfo>

      <DividerSpacingRows />

      <WrapperInfoHorizonStatus>
        <BoxInfo>
          <FormControlSelect variant="standard">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              value={resolveValue(property.status)}
              onChange={(e) => handleChangeSelect(e, 'status')}
              label="Status"
              disabled={disabled}
            >
              {statusImovOptions.map((item, i) => (
                <MenuItem key={String(i)} value={item.id}>{item.desc}</MenuItem>
              ))}
            </Select>
          </FormControlSelect>
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <FormControlSelect variant="standard">
            <InputLabel id="tipo-label">Tipo</InputLabel>
            <Select
              labelId="tipo-label"
              value={resolveValue(property.tipo)}
              onChange={(e) => handleChangeSelect(e, 'tipo')}
              label="Tipo"
              disabled={disabled}
            >
              {tipoOptions.map((item, i) => (
                <MenuItem key={String(i)} value={item.id}>{item.desc}</MenuItem>
              ))}
            </Select>
          </FormControlSelect>
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <FormControlSelect variant="standard">
            <InputLabel id="categoria-label">Categoria</InputLabel>
            <Select
              labelId="categoria-label"
              value={resolveValue(property.categoria)}
              onChange={(e) => handleChangeSelect(e, 'categoria')}
              label="Categoria"
              disabled={disabled}
            >
              {categoriaOptions.map((item, i) => (
                <MenuItem key={String(i)} value={item.id}>{item.desc}</MenuItem>
              ))}
            </Select>
          </FormControlSelect>
        </BoxInfo>
      </WrapperInfoHorizonStatus>

      <DividerSpacingRows />

      <WrapperInfo>
        <BoxInfoCity>
          <BoxInfo>
            <CitiesAutocomplete
              error={Boolean(errors?.city_id && !hasProperty(property, 'city.id'))} 
              shouldRenderAdd
              disabled={disabled}
            />
          </BoxInfo>
          <BoxInfo>
            <NeighborhoodsAutocomplete
              error={Boolean(errors?.neighborhood_id && !hasProperty(property, 'neighborhood.id'))} 
              shouldRenderAdd
              disabled={disabled}
            />
          </BoxInfo>
        </BoxInfoCity>
        <Divider />
        <BoxInfoLocalidade>
          <BoxInfo>
            <TextField fullWidth id="standard-basic" label="Logradouro" variant="standard" name="localLogradouro" onChange={handleChangeText} value={resolveValue(property.localLogradouro)} disabled={disabled} />
          </BoxInfo>
          <BoxInfoLocalidadeNumero>
            <TextField fullWidth id="standard-basic" label="Número" variant="standard" name="localNumero" onChange={(e) => handleChangeText(e, 'int')} value={resolveValue(property.localNumero)} disabled={disabled} />
            <TextField fullWidth id="standard-basic" label="Apto" variant="standard" name="apApto" onChange={handleChangeText} value={resolveValue(property.apApto)} disabled={disabled} />
            <TextField fullWidth id="standard-basic" label="CEP" variant="standard" name="localCEP" onChange={(e) => handleChangeText(e, 'cep', 8)} value={resolveValue(property.localCEP)} disabled={disabled} />
          </BoxInfoLocalidadeNumero>
        </BoxInfoLocalidade>
      </WrapperInfo>

      <DividerSpacingRows />

      <WrapperInfo>
        <BoxInfo>
          <TextField fullWidth id="standard-basic" label="Nome do imóvel" variant="standard" name="nomeImovel" onChange={handleChangeText} value={resolveValue(property.nomeImovel)} disabled={disabled} />
        </BoxInfo>
        <Divider />
        <WrapperStack>
          <Textarea
            aria-label="maximum height"
            placeholder="Descrição do imóvel"
            name="descGeral" 
            onChange={handleChangeText}
            value={resolveValue(property.descGeral)}
            disabled={disabled}
          />
        </WrapperStack>
      </WrapperInfo>

      <DividerSpacingRows />

      <WrapperInfoHorizon sx={{ justifyContent: 'space-evenly' }}>
        <BoxInfo sx={{ justifyContent: 'center' }}>
          <InputTextAdornmentContainer>
            <InputTextAdornment position="start">
              <SingleBedIcon style={{ color: '#000' }} />
            </InputTextAdornment>
            <InputText label="Dormitório(s)" variant="standard" name="dormitorio" onChange={(e) => handleChangeText(e, 'int')} value={resolveValue(property.dormitorio)} disabled={disabled} />
          </InputTextAdornmentContainer>
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo sx={{ justifyContent: 'center' }}>
          <InputTextAdornmentContainer>
            <InputTextAdornment position="start">
              <DirectionsCarIcon style={{ color: '#000' }} />
            </InputTextAdornment>
            <InputText label="Garagem" variant="standard" name="garagem" onChange={(e) => handleChangeText(e, 'int')} value={resolveValue(property.garagem)} disabled={disabled} />
          </InputTextAdornmentContainer>
        </BoxInfo>
      </WrapperInfoHorizon>

      <DividerSpacingRows />

      <WrapperInfoHorizonExclusividade>
        <BoxInfo>
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={hasFeature(property, 'exclusividade')} color="primary" name="exclusividade" onChange={handleChangeSwitch} />}
            label="Exclusividade"
            disabled={disabled}
          />
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={hasFeature(property, 'empreendimento')} color="primary" name="empreendimento" onChange={handleChangeSwitch} />}
            label="Empreendimento"
            disabled={disabled}
          />
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={hasFeature(property, 'placa')} color="primary" name="placa" onChange={handleChangeSwitch} />}
            label="Já possui placa"
            disabled={disabled}
          />
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={hasFeature(property, 'possuiFoto')} color="primary" name="possuiFoto" onChange={handleChangeSwitch} />}
            label="Já possui fotos"
            disabled={disabled}
          />
        </BoxInfo>
      </WrapperInfoHorizonExclusividade>

      <DividerSpacingRows />

      <WrapperInfoHorizonFeatures>
        <BoxInfo>
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={hasFeature(property, 'lavanderia')} color="primary" name="lavanderia" onChange={handleChangeSwitch} />}
            label="Lavanderia"
            disabled={disabled}
          />
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={hasFeature(property, 'alarme')} color="primary" name="alarme" onChange={handleChangeSwitch} />}
            label="Alarme"
            disabled={disabled}
          />
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={hasFeature(property, 'apElevador')} color="primary" name="apElevador" onChange={handleChangeSwitch} />}
            label="Elevador"
            disabled={disabled}
          />
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={hasFeature(property, 'portaoEletronico')} color="primary" name="portaoEletronico" onChange={handleChangeSwitch} />}
            label="Portão eletrônico"
            disabled={disabled}
          />
        </BoxInfo>
      </WrapperInfoHorizonFeatures>

      <DividerSpacingRows style={{ margin: '5px 0' }} />

      <WrapperInfoHorizonFeatures>
        <BoxInfo>
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={hasFeature(property, 'pocoArtesiano')} color="primary" name="pocoArtesiano" onChange={handleChangeSwitch} />}
            label="Poço artesiano"
            disabled={disabled}
          />
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={hasFeature(property, 'cercaEletrica')} color="primary" name="cercaEletrica" onChange={handleChangeSwitch} />}
            label="Cerca elétrica"
            disabled={disabled}
          />
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={hasFeature(property, 'cameraDeVideo')} color="primary" name="cameraDeVideo" onChange={handleChangeSwitch} />}
            label="Câmera de vídeo"
            disabled={disabled}
          />
        </BoxInfo>
      </WrapperInfoHorizonFeatures>

      <DividerSpacingRows />

      <WrapperInfo>
        <BoxInfo>
          <FormControlSelect variant="standard">
            <InputLabel id="nascerDoSol-label">Nascer do sol</InputLabel>
            <Select
              labelId="nascerDoSol-label"
              value={resolveValue(property.nascerDoSol)}
              onChange={(e) => handleChangeSelect(e, 'nascerDoSol')}
              label="Nascer do sol"
              disabled={disabled}
            >
              {nascerDoSolOptions.map((item, i) => (
                <MenuItem key={String(i)} value={item.id}>{item.desc}</MenuItem>
              ))}
            </Select>
          </FormControlSelect>
        </BoxInfo>
      </WrapperInfo>

      <DividerSpacingRows />

      <WrapperInfo>
        <BoxInfoAreaTotal>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputText label="Área total" variant="standard" name="areaTotal" onChange={(e) => handleChangeText(e, 'cur')} value={resolveValue(property.areaTotal)} disabled={disabled} />
              <InputTextAdornment position="start">m²</InputTextAdornment>
            </InputTextAdornmentContainer>
          </BoxInfo>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputText label="Área construída" variant="standard" name="areaConstruida" onChange={(e) => handleChangeText(e, 'cur')} value={resolveValue(property.areaConstruida)} disabled={disabled} />
              <InputTextAdornment position="start">m²</InputTextAdornment>
            </InputTextAdornmentContainer>
          </BoxInfo>
        </BoxInfoAreaTotal>
        <Divider />
        <BoxInfoAreaFrente>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputText label="Espaço frente" variant="standard" name="areaFrente" onChange={(e) => handleChangeText(e, 'cur')} value={resolveValue(property.areaFrente)} disabled={disabled} />
              <InputTextAdornment position="start">m</InputTextAdornment>
            </InputTextAdornmentContainer>
          </BoxInfo>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputText label="Espaço fundos" variant="standard" name="areaFundos" onChange={(e) => handleChangeText(e, 'cur')} value={resolveValue(property.areaFundos)} disabled={disabled} />
              <InputTextAdornment position="start">m</InputTextAdornment>
            </InputTextAdornmentContainer>
          </BoxInfo>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputText label="Espaço esquerda" variant="standard" name="areaEsquerda" onChange={(e) => handleChangeText(e, 'cur')} value={resolveValue(property.areaEsquerda)} disabled={disabled} />
              <InputTextAdornment position="start">m</InputTextAdornment>
            </InputTextAdornmentContainer>
          </BoxInfo>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputText label="Espaço direita" variant="standard" name="areaDireita" onChange={(e) => handleChangeText(e, 'cur')} value={resolveValue(property.areaDireita)} disabled={disabled} />
              <InputTextAdornment position="start">m</InputTextAdornment>
            </InputTextAdornmentContainer>
          </BoxInfo>
        </BoxInfoAreaFrente>
      </WrapperInfo>

      <DividerSpacingRows />

      <BoxInfoValores>
        <WrapperInfo sx={{ borderRadius: '0', borderTopLeftRadius: '10px' }}>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputTextAdornment position="start">R$</InputTextAdornment>
              <InputText label="Valor" variant="standard" name="valor" onChange={(e) => handleChangeText(e, 'cur')} value={resolveDecimalValue(property.valor)} disabled={disabled} />
            </InputTextAdornmentContainer>
          </BoxInfo>
        </WrapperInfo>
        <WrapperInfo>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputTextAdornment position="start">R$</InputTextAdornment>
              <InputText label="Condomínio" variant="standard" name="valorCondominio" onChange={(e) => handleChangeText(e, 'cur')} value={resolveDecimalValue(property.valorCondominio)} disabled={disabled} />
            </InputTextAdornmentContainer>
          </BoxInfo>
        </WrapperInfo>
        <WrapperInfo sx={{ borderRadius: '0', borderTopRightRadius: '10px' }}>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputTextAdornment position="start">R$</InputTextAdornment>
              <InputText label="IPTU" variant="standard" name="valorIPTU" onChange={(e) => handleChangeText(e, 'cur')} value={resolveDecimalValue(property.valorIPTU)} disabled={disabled} />
            </InputTextAdornmentContainer>
          </BoxInfo>
        </WrapperInfo>
      </BoxInfoValores>
      <WrapperInfo sx={{ borderTopLeftRadius: '0', borderTopRightRadius: '0', }}>
        <WrapperStack>
          <Textarea
            aria-label="maximum height"
            placeholder="Observação sobre valores"
            name="condObs" 
            onChange={handleChangeText}
            value={resolveValue(property.condObs)}
            disabled={disabled}
          />
        </WrapperStack>
      </WrapperInfo>

      <DividerSpacingRows />

      <WrapperInfoHorizonSite>
        <BoxInfo>
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={hasFeature(property, 'sitePublicarImovel')} color="primary" name="sitePublicarImovel" onChange={handleChangeSwitch} />}
            label="Publicar imóvel no site"
            disabled={disabled}
          />
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={hasFeature(property, 'siteImovelDestaque')} color="primary" name="siteImovelDestaque" onChange={handleChangeSwitch} />}
            label='Destacar imóvel no site'
            disabled={disabled}
          />
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={hasFeature(property, 'sitePublicarValor')} color="primary" name="sitePublicarValor" onChange={handleChangeSwitch} />}
            label="Informar valor do imóvel no site"
            disabled={disabled}
          />
        </BoxInfo>
      </WrapperInfoHorizonSite>

      <DividerSpacingRows />

      <Box style={{ alignItems: 'end' }}>
        {renderButtonSubmit()}
      </Box>
    </React.Fragment>
  );
};

export default Form;
