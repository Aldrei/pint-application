import * as React from 'react';

import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';

import SingleBedIcon from '@mui/icons-material/SingleBed';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AddIcon from '@mui/icons-material/Add';
import CloudDoneIcon from '@mui/icons-material/CloudDone';

import { useNavigate } from 'react-router-dom';

import OwnerAutocomplete from '../../../../../components/Autocomplete/hocs/OwnerAutocomplete';
import EmployeesAgentsAutocomplete from '../../../../../components/Autocomplete/hocs/EmployeesAgentsAutocomplete';
import EmployeesBrokersAutocomplete from '../../../../../components/Autocomplete/hocs/EmployeesBrokersAutocomplete';
import CitiesAutocomplete from '../../../../../components/Autocomplete/hocs/CitiesAutocomplete';
import NeighborhoodsAutocomplete from '../../../../../components/Autocomplete/hocs/NeighborhoodsAutocomplete';

import { hasFeature, hasProperty } from '../../../../../helpers';

import { IPropertyData, IServiceFieldsRequired, IPropertyStoreRequired, IPropertyShow } from '../../../../../types';

import { statusImovOptions, tipoOptions, categoriaOptions, nascerDoSolOptions } from '../../../../../constants/options';
import { ROUTES } from '../../../../../constants/routes';

import { IOwnerSearchServiceRequest } from '../../../../../reducers/owners/search';
import { IEmployeeSearchServiceRequest } from '../../../../../reducers/employees/search';
import { ICitiesSearchServiceRequest } from '../../../../../reducers/cities/search';
import { INeighborhoodsSearchServiceRequest } from '../../../../../reducers/neighborhoods/search';
import { propertiesStoreThunk, IPropertiesStoreServiceRequest, setStatus } from '../../../../../reducers/properties/store';
import { propertiesUpdateThunk, IPropertiesUpdateServiceRequest, setStatus as setStatusUpdate } from '../../../../../reducers/properties/update';

import { useAppDispatch } from '../../../../../stores/hooks';
import { useAppSelectorBlaBlaBal } from '../../../../../hooks/useReducerSelector';

import SnackContext from '../../../../../contexts/SnackContext';
import { messages } from '../../../../../constants/messages';

import { 
  WrapperInfo, 
  WrapperInfoHorizon, 
  BoxInfo, 
  BoxInfoLocalidade,
  WrapperStack, 
  Text, 
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

  const handleSubmitCreate = () => dispatch(propertiesStoreThunk(property));
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
  const { employeeAgentSelected } = useAppSelectorBlaBlaBal('employeesAgentsSearchReducer') as IEmployeeSearchServiceRequest;
  const { employeeBrokerSelected } = useAppSelectorBlaBlaBal('employeesBrokersSearchReducer') as IEmployeeSearchServiceRequest;
  const { citiesSelected } = useAppSelectorBlaBlaBal('citiesSearchReducer') as ICitiesSearchServiceRequest;
  const { neighborhoodsSelected } = useAppSelectorBlaBlaBal('neighborhoodsSearchReducer') as INeighborhoodsSearchServiceRequest;

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

    if (ownerSelected.length) {
      newProperty.owner_id = ownerSelected[0].id;
      newProperty.owner = ownerSelected[0];
    }
    if (employeeAgentSelected && employeeAgentSelected.length) {
      newProperty.agent_id = employeeAgentSelected[0].id;
      newProperty.agent = employeeAgentSelected[0];
    }
    if (employeeBrokerSelected && employeeBrokerSelected.length) {
      newProperty.broker_id = employeeBrokerSelected[0].id;
      newProperty.broker = employeeBrokerSelected[0];
    }
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
    ownerSelected,
    employeeAgentSelected,
    employeeBrokerSelected,
    citiesSelected,
    neighborhoodsSelected
  ]);

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
    if (crudType === 'create') 
      return <Fab variant="extended" onClick={handleSubmitCreate} disabled={(propertiesStoreStatus === 'loading')}>
        <AddIcon sx={{ mr: 1 }} />
        Cadastrar e Avançar
      </Fab>;
      
    return <Fab variant="extended" onClick={handleSubmitUpdate} disabled={(propertiesUpdateStatus === 'loading')}>
      <CloudDoneIcon sx={{ mr: 1 }} />
      Salvar
    </Fab>;
  };

  return (
    <React.Fragment>
      <WrapperInfo sx={{ backgroundColor: 'transparent', backgroundImage: 'unset' }}>
        <BoxInfo sx={{ backgroundColor: 'transparent' }}>
          <OwnerAutocomplete error={Boolean(errors?.owner_id && !hasProperty(property, 'owner.id'))} defaultValue={hasProperty(property, 'owner.data.id') ? property.owner.data : {}} />
        </BoxInfo>
      </WrapperInfo>
      
      <DividerSpacingRows />

      <WrapperInfo sx={{ backgroundColor: 'transparent', backgroundImage: 'unset' }}>
        <BoxInfo sx={{ backgroundColor: 'transparent' }}>
          <EmployeesAgentsAutocomplete error={Boolean(errors?.agent_id && !hasProperty(property, 'agent.id'))} defaultValue={hasProperty(property, 'agent.data.id') ? property.agent.data : {}} />
        </BoxInfo>
      </WrapperInfo>

      <DividerSpacingRows />

      <WrapperInfo sx={{ backgroundColor: 'transparent', backgroundImage: 'unset' }}>
        <BoxInfo sx={{ backgroundColor: 'transparent' }}>
          <EmployeesBrokersAutocomplete error={Boolean(errors?.broker_id && !hasProperty(property, 'broker.id'))} defaultValue={hasProperty(property, 'broker.data.id') ? property.broker.data : {}} />
        </BoxInfo>
      </WrapperInfo>

      <DividerSpacingRows />

      <WrapperInfoHorizon>
        <BoxInfo>
          <FormControlSelect variant="standard">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              value={resolveValue(property.status)}
              onChange={(e) => handleChangeSelect(e, 'status')}
              label="Status"
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
            >
              {categoriaOptions.map((item, i) => (
                <MenuItem key={String(i)} value={item.id}>{item.desc}</MenuItem>
              ))}
            </Select>
          </FormControlSelect>
        </BoxInfo>
      </WrapperInfoHorizon>

      <DividerSpacingRows />

      <WrapperInfo>
        <BoxInfo>
          <BoxInfo>
            <CitiesAutocomplete error={Boolean(errors?.city_id && !hasProperty(property, 'city.id'))} defaultValue={hasProperty(property, 'city.data.id') ? property.city.data : {}} />
          </BoxInfo>
          <BoxInfo>
            <NeighborhoodsAutocomplete error={Boolean(errors?.neighborhood_id && !hasProperty(property, 'neighborhood.id'))} defaultValue={hasProperty(property, 'neighborhood.data.id') ? property.neighborhood.data : {}} />
          </BoxInfo>
        </BoxInfo>
        <Divider />
        <BoxInfo>
          <BoxInfo sx={{ backgroundColor: 'transparent' }}>
            <TextField fullWidth id="standard-basic" label="Logradouro" variant="standard" name="localLogradouro" onChange={handleChangeText} value={resolveValue(property.localLogradouro)} />
          </BoxInfo>
          <BoxInfoLocalidade>
            <TextField fullWidth id="standard-basic" label="Número" variant="standard" name="localNumero" onChange={(e) => handleChangeText(e, 'int')} value={resolveValue(property.localNumero)} />
            <TextField fullWidth id="standard-basic" label="Apto" variant="standard" name="apApto" onChange={handleChangeText} value={resolveValue(property.apApto)} />
            <TextField fullWidth id="standard-basic" label="CEP" variant="standard" name="localCEP" onChange={(e) => handleChangeText(e, 'cep', 8)} value={resolveValue(property.localCEP)} />
          </BoxInfoLocalidade>
        </BoxInfo>
      </WrapperInfo>

      <DividerSpacingRows />

      <WrapperInfo>
        <BoxInfo>
          <TextField fullWidth id="standard-basic" label="Nome do imóvel" variant="standard" name="nomeImovel" onChange={handleChangeText} value={resolveValue(property.nomeImovel)} />
        </BoxInfo>
        <Divider />
        <WrapperStack>
          <Textarea
            aria-label="maximum height"
            placeholder="Descrição do imóvel"
            name="descGeral" 
            onChange={handleChangeText}
            value={resolveValue(property.descGeral)}
          />
        </WrapperStack>
      </WrapperInfo>

      <DividerSpacingRows />

      <WrapperInfoHorizon sx={{ justifyContent: 'space-evenly', backgroundColor: 'transparent', backgroundImage: 'unset' }}>
        <BoxInfo sx={{ backgroundColor: 'transparent', justifyContent: 'center' }}>
          <InputTextAdornmentContainer>
            <InputTextAdornment position="start">
              <SingleBedIcon style={{ color: '#000' }} />
            </InputTextAdornment>
            <InputText label="Dormitório(s)" variant="standard" name="dormitorio" onChange={(e) => handleChangeText(e, 'int')} value={resolveValue(property.dormitorio)} />
          </InputTextAdornmentContainer>
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo sx={{ backgroundColor: 'transparent', justifyContent: 'center' }}>
          <InputTextAdornmentContainer>
            <InputTextAdornment position="start">
              <DirectionsCarIcon style={{ color: '#000' }} />
            </InputTextAdornment>
            <InputText label="Garagem" variant="standard" name="garagem" onChange={(e) => handleChangeText(e, 'int')} value={resolveValue(property.garagem)} />
          </InputTextAdornmentContainer>
        </BoxInfo>
      </WrapperInfoHorizon>

      <DividerSpacingRows />

      <WrapperInfoHorizon>
        <BoxInfo 
          style={{
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}
        >
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={hasFeature(property, 'exclusividade')} color="primary" name="exclusividade" onChange={handleChangeSwitch} />}
            label="Exclusividade"
          />
          {/* {Boolean(property.exclusividade) && (
            <Stack direction="row" sx={{ marginTop: '8px' }}>
              <ChipCustom
                sx={{ marginRight: '5px' }}
                label={'Início: --'}
              />
              <ChipCustom
                label={'Início: --'}
              />
            </Stack>
          )} */}
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={hasFeature(property, 'empreendimento')} color="primary" name="empreendimento" onChange={handleChangeSwitch} />}
            label="Empreendimento"
          />
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={hasFeature(property, 'placa')} color="primary" name="placa" onChange={handleChangeSwitch} />}
            label="Já possui placa"
          />
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={hasFeature(property, 'possuiFoto')} color="primary" name="possuiFoto" onChange={handleChangeSwitch} />}
            label="Já possui fotos"
          />
        </BoxInfo>
      </WrapperInfoHorizon>

      <DividerSpacingRows />

      <WrapperInfoHorizon sx={{ backgroundColor: 'transparent', backgroundImage: 'unset', border: 'unset', boxShadow: 'none' }}>
        <BoxInfo 
          sx={{
            justifyContent: 'center',
            backgroundColor: 'transparent', 
            backgroundImage: 'unset', 
            '& .MuiChip-root': {
              marginRight: '10px'
            } 
          }}
        >
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={hasFeature(property, 'lavanderia')} color="primary" name="lavanderia" onChange={handleChangeSwitch} />}
            label="Lavanderia"
          />
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={hasFeature(property, 'alarme')} color="primary" name="alarme" onChange={handleChangeSwitch} />}
            label="Alarme"
          />
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={hasFeature(property, 'apElevador')} color="primary" name="apElevador" onChange={handleChangeSwitch} />}
            label="Elevador"
          />
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={hasFeature(property, 'portaoEletronico')} color="primary" name="portaoEletronico" onChange={handleChangeSwitch} />}
            label="Portão eletrônico"
          />
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={hasFeature(property, 'pocoArtesiano')} color="primary" name="pocoArtesiano" onChange={handleChangeSwitch} />}
            label="Poço artesiano"
          />
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={hasFeature(property, 'cercaEletrica')} color="primary" name="cercaEletrica" onChange={handleChangeSwitch} />}
            label="Cerca elétrica"
          />
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={hasFeature(property, 'cameraDeVideo')} color="primary" name="cameraDeVideo" onChange={handleChangeSwitch} />}
            label="Câmera de vídeo"
          />
        </BoxInfo>
      </WrapperInfoHorizon>

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
        <BoxInfo>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputText label="Área total" variant="standard" name="areaTotal" onChange={(e) => handleChangeText(e, 'cur')} defaultValue="0,00" value={resolveValue(property.areaTotal)} />
              <InputTextAdornment position="start">m²</InputTextAdornment>
            </InputTextAdornmentContainer>
          </BoxInfo>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputText label="Área construída" variant="standard" name="areaConstruida" onChange={(e) => handleChangeText(e, 'cur')} defaultValue="0,00" value={resolveValue(property.areaConstruida)} />
              <InputTextAdornment position="start">m²</InputTextAdornment>
            </InputTextAdornmentContainer>
          </BoxInfo>
        </BoxInfo>
        <Divider />
        <BoxInfo>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputText label="Espaço frente" variant="standard" name="areaFrente" onChange={(e) => handleChangeText(e, 'cur')} defaultValue="0,00" value={resolveValue(property.areaFrente)} />
              <InputTextAdornment position="start">m</InputTextAdornment>
            </InputTextAdornmentContainer>
          </BoxInfo>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputText label="Espaço fundos" variant="standard" name="areaFundos" onChange={(e) => handleChangeText(e, 'cur')} defaultValue="0,00" value={resolveValue(property.areaFundos)} />
              <InputTextAdornment position="start">m</InputTextAdornment>
            </InputTextAdornmentContainer>
          </BoxInfo>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputText label="Espaço esquerda" variant="standard" name="areaEsquerda" onChange={(e) => handleChangeText(e, 'cur')} defaultValue="0,00" value={resolveValue(property.areaEsquerda)} />
              <InputTextAdornment position="start">m</InputTextAdornment>
            </InputTextAdornmentContainer>
          </BoxInfo>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputText label="Espaço direita" variant="standard" name="areaDireita" onChange={(e) => handleChangeText(e, 'cur')} defaultValue="0,00" value={resolveValue(property.areaDireita)} />
              <InputTextAdornment position="start">m</InputTextAdornment>
            </InputTextAdornmentContainer>
          </BoxInfo>
        </BoxInfo>
      </WrapperInfo>

      <DividerSpacingRows />

      <Box sx={{ flexDirection: 'row', marginBottom: '10px' }}>
        <WrapperInfo sx={{ borderRadius: '0', borderTopLeftRadius: '10px' }}>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputTextAdornment position="start">R$</InputTextAdornment>
              <InputText label="Valor" variant="standard" name="valor" onChange={(e) => handleChangeText(e, 'cur')} defaultValue="0,00" value={resolveDecimalValue(property.valor)} />
            </InputTextAdornmentContainer>
          </BoxInfo>
        </WrapperInfo>
        <WrapperInfo style={{ margin: '0 10px', borderRadius: '0' }}>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputTextAdornment position="start">R$</InputTextAdornment>
              <InputText label="Condomínio" variant="standard" name="valorCondominio" onChange={(e) => handleChangeText(e, 'cur')} defaultValue="0,00" value={resolveDecimalValue(property.valorCondominio)} />
            </InputTextAdornmentContainer>
          </BoxInfo>
        </WrapperInfo>
        <WrapperInfo sx={{ borderRadius: '0', borderTopRightRadius: '10px' }}>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputTextAdornment position="start">R$</InputTextAdornment>
              <InputText label="IPTU" variant="standard" name="valorIPTU" onChange={(e) => handleChangeText(e, 'cur')} defaultValue="0,00" value={resolveDecimalValue(property.valorIPTU)} />
            </InputTextAdornmentContainer>
          </BoxInfo>
        </WrapperInfo>
      </Box>
      <WrapperInfo sx={{ borderTopLeftRadius: '0', borderTopRightRadius: '0', }}>
        <WrapperStack>
          <Textarea
            aria-label="maximum height"
            placeholder="Observação sobre valores"
            name="condObs" 
            onChange={handleChangeText}
            value={resolveValue(property.condObs)}
          />
        </WrapperStack>
      </WrapperInfo>

      <DividerSpacingRows />

      <BoxInfo sx={{ background: 'none', paddingTop: '0' }}>
        <Text>Site</Text>
      </BoxInfo>
      <WrapperInfoHorizon>
        <BoxInfo>
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={hasFeature(property, 'sitePublicarImovel')} color="primary" name="sitePublicarImovel" onChange={handleChangeSwitch} />}
            label="Publicar imóvel no site"
          />
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={hasFeature(property, 'siteImovelDestaque')} color="primary" name="siteImovelDestaque" onChange={handleChangeSwitch} />}
            label='Destacar imóvel no site'
          />
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={hasFeature(property, 'sitePublicarValor')} color="primary" name="sitePublicarValor" onChange={handleChangeSwitch} />}
            label="Informar valor do imóvel no site"
          />
        </BoxInfo>
      </WrapperInfoHorizon>

      <DividerSpacingRows />

      <Box style={{ alignItems: 'end' }}>
        {renderButtonSubmit()}
      </Box>
    </React.Fragment>
  );
  // }, [property]);

  // return <FormMemo />;
};

export default Form;
