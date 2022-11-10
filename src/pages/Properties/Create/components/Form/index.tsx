import * as React from 'react';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';

import SingleBedIcon from '@mui/icons-material/SingleBed';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AddIcon from '@mui/icons-material/Add';

import TextField from '@mui/material/TextField';

import OwnerAutocomplete from '../../../../../components/Autocomplete/hocs/OwnerAutocomplete';
import EmployeesAgentsAutocomplete from '../../../../../components/Autocomplete/hocs/EmployeesAgentsAutocomplete';
import EmployeesBrokersAutocomplete from '../../../../../components/Autocomplete/hocs/EmployeesBrokersAutocomplete';
import CitiesAutocomplete from '../../../../../components/Autocomplete/hocs/CitiesAutocomplete';
import NeighborhoodsAutocomplete from '../../../../../components/Autocomplete/hocs/NeighborhoodsAutocomplete';

import { hasFeature, hasProperty } from '../../../../../helpers';

import { IPropertyData, IServiceFieldsRequired, IPropertyStoreRequired } from '../../../../../types';

import { statusImovOptions, tipoOptions, categoriaOptions, nascerDoSolOptions } from '../../../../../constants/options';

import { IOwnerSearchServiceRequest } from '../../../../../reducers/owners/search';
import { IEmployeeSearchServiceRequest } from '../../../../../reducers/employees/search';
import { ICitiesSearchServiceRequest } from '../../../../../reducers/cities/search';
import { INeighborhoodsSearchServiceRequest } from '../../../../../reducers/neighborhoods/search';
import { propertiesStoreThunk, IPropertiesStoreServiceRequest } from '../../../../../reducers/properties/store';

import { useAppDispatch } from '../../../../../stores/hooks';
import { useAppSelectorBlaBlaBal } from '../../../../../hooks/useReducerSelector';

import { 
  WrapperInfo, 
  WrapperInfoHorizon, 
  BoxInfo, 
  BoxInfoLocalidade,
  WrapperStack, 
  Text, 
  DividerSpacingRows, 
  ChipCustom, 
  CheckCircleIconCustom, 
  CancelIconCustom,
  Textarea,
  InputTextAdornmentContainer,
  InputTextAdornment,
  InputText,
  FormControlSelect,
  MaterialUISwitch,
} from './styles';

const Form = () => {
  const dispatch = useAppDispatch();

  const [property, setProperty] = React.useState<IPropertyData>({} as IPropertyData);
  const [errors, setErrors] = React.useState<IPropertyStoreRequired>({} as IPropertyStoreRequired);

  /**
   * Submit.
  */
  const handleSubmit = () => {
    console.log('Submit...');
    const property = {};
    dispatch(propertiesStoreThunk(property));
  };
  
  const { data: dataSubmit, status: statusSubmit } = useAppSelectorBlaBlaBal('propertiesStoreReducer') as IPropertiesStoreServiceRequest;
  React.useEffect(() => {
    console.log('DEBUG dataSubmit:', dataSubmit);
  }, [dataSubmit]);

  /** Submit return fields required. */
  React.useEffect(() => {
    const dataSubmitRequired = dataSubmit as IServiceFieldsRequired;
    if (hasProperty(dataSubmitRequired, 'result.errors')) {
      setErrors({...dataSubmitRequired.result.errors});
    }
  }, [dataSubmit]);

  /** Get reducers values selected. */
  const { ownerSelected } = useAppSelectorBlaBlaBal('ownersSearchReducer') as IOwnerSearchServiceRequest;
  const { employeeAgentSelected } = useAppSelectorBlaBlaBal('employeesAgentsSearchReducer') as IEmployeeSearchServiceRequest;
  const { employeeBrokerSelected } = useAppSelectorBlaBlaBal('employeesBrokersSearchReducer') as IEmployeeSearchServiceRequest;
  const { citiesSelected } = useAppSelectorBlaBlaBal('citiesSearchReducer') as ICitiesSearchServiceRequest;
  const { neighborhoodsSelected } = useAppSelectorBlaBlaBal('neighborhoodsSearchReducer') as INeighborhoodsSearchServiceRequest;

  React.useEffect(() => {
    console.log('DEBUGCITY property:', property);

    const newProperty = JSON.parse(JSON.stringify(property));

    delete newProperty.owner_id;
    delete newProperty.agent_id;
    delete newProperty.broker_id;
    delete newProperty.city_id;
    delete newProperty.neighborhood_id;

    if (ownerSelected.length) newProperty.owner_id = ownerSelected[0].id;
    if (employeeAgentSelected && employeeAgentSelected.length) newProperty.agent_id = employeeAgentSelected[0].id;
    if (employeeBrokerSelected && employeeBrokerSelected.length) newProperty.broker_id = employeeBrokerSelected[0].id;
    if (citiesSelected && citiesSelected.length) newProperty.city_id = citiesSelected[0].id;
    if (neighborhoodsSelected && neighborhoodsSelected.length) newProperty.neighborhood_id = neighborhoodsSelected[0].id;

    console.log('DEBUGCITY newProperty:', newProperty);

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

  // React.useEffect(() => { 
  //   console.log('DEBUGCITY property:', property);
  // }, [property]);

  return (
    <React.Fragment>
      <WrapperInfo sx={{ backgroundColor: 'transparent', backgroundImage: 'unset' }}>
        <BoxInfo sx={{ backgroundColor: 'transparent' }}>
          <OwnerAutocomplete error={Boolean(errors?.owner_id && !property.owner_id)} />
        </BoxInfo>
      </WrapperInfo>
      
      <DividerSpacingRows />

      <WrapperInfo sx={{ backgroundColor: 'transparent', backgroundImage: 'unset' }}>
        <BoxInfo sx={{ backgroundColor: 'transparent' }}>
          <EmployeesAgentsAutocomplete error={Boolean(errors?.agent_id && !property.agent_id)} />
        </BoxInfo>
      </WrapperInfo>

      <DividerSpacingRows />

      <WrapperInfo sx={{ backgroundColor: 'transparent', backgroundImage: 'unset' }}>
        <BoxInfo sx={{ backgroundColor: 'transparent' }}>
          <EmployeesBrokersAutocomplete error={Boolean(errors?.broker_id && !property.broker_id)} />
        </BoxInfo>
      </WrapperInfo>

      <DividerSpacingRows />

      <WrapperInfoHorizon>
        <BoxInfo>
          <FormControlSelect variant="standard">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              value={property.status || ''}
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
              value={property.tipo || ''}
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
              value={property.categoria || ''}
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
            <CitiesAutocomplete error={Boolean(errors?.city_id && !property.city_id)} />
          </BoxInfo>
          <BoxInfo>
            <NeighborhoodsAutocomplete error={Boolean(errors?.neighborhood_id && !property.neighborhood_id)} />
          </BoxInfo>
        </BoxInfo>
        <Divider />
        <BoxInfo>
          <BoxInfo sx={{ backgroundColor: 'transparent' }}>
            <TextField fullWidth id="standard-basic" label="Logradouro" variant="standard" name="logradouro" onChange={handleChangeText} />
          </BoxInfo>
          <BoxInfoLocalidade>
            <TextField fullWidth id="standard-basic" label="Número" variant="standard" name="localNumero" onChange={(e) => handleChangeText(e, 'int')} value={property.localNumero} />
            <TextField fullWidth id="standard-basic" label="Apto" variant="standard" name="apto" onChange={handleChangeText} />
            <TextField fullWidth id="standard-basic" label="CEP" variant="standard" name="localCEP" onChange={(e) => handleChangeText(e, 'cep', 8)} value={property.localCEP} />
          </BoxInfoLocalidade>
        </BoxInfo>
      </WrapperInfo>

      <DividerSpacingRows />

      <WrapperInfo>
        <BoxInfo>
          <TextField fullWidth id="standard-basic" label="Nome do imóvel" variant="standard" name="nomeImovel" onChange={handleChangeText} />
        </BoxInfo>
        <Divider />
        <WrapperStack>
          <Textarea
            aria-label="maximum height"
            placeholder="Descrição do imóvel"
            name="descGeral" 
            onChange={handleChangeText}
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
            <InputText label="Dormitório(s)" variant="standard" name="dormitorio" onChange={(e) => handleChangeText(e, 'int')} value={property.dormitorio} />
          </InputTextAdornmentContainer>
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo sx={{ backgroundColor: 'transparent', justifyContent: 'center' }}>
          <InputTextAdornmentContainer>
            <InputTextAdornment position="start">
              <DirectionsCarIcon style={{ color: '#000' }} />
            </InputTextAdornment>
            <InputText label="Garagem" variant="standard" name="garagem" onChange={(e) => handleChangeText(e, 'int')} value={property.garagem} />
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
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} defaultChecked color="primary" name="exclusividade" onChange={handleChangeSwitch} />}
            label="Exclusividade"
          />
          {hasFeature(property, 'exclusividade') && (
            <Stack direction="row" sx={{ marginTop: '8px' }}>
              <ChipCustom
                sx={{ marginRight: '5px' }}
                label={'Início: --'}
              />
              <ChipCustom
                label={'Início: --'}
              />
            </Stack>
          )}
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} defaultChecked color="primary" name="empreendimento" onChange={handleChangeSwitch} />}
            label="Empreendimento"
          />
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} defaultChecked color="primary" name="placa" onChange={handleChangeSwitch} />}
            label="Já possui placa"
          />
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} defaultChecked color="primary" name="possuiFoto" onChange={handleChangeSwitch} />}
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
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} defaultChecked color="primary" name="lavanderia" onChange={handleChangeSwitch} />}
            label="Lavanderia"
          />
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} defaultChecked color="primary" name="alarme" onChange={handleChangeSwitch} />}
            label="Alarme"
          />
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} defaultChecked color="primary" name="elevador" onChange={handleChangeSwitch} />}
            label="Elevador"
          />
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} defaultChecked color="primary" name="portaoEletronico" onChange={handleChangeSwitch} />}
            label="Portão eletrônico"
          />
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} defaultChecked color="primary" name="pocoArtesiano" onChange={handleChangeSwitch} />}
            label="Poço artesiano"
          />
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} defaultChecked color="primary" name="cercaEletrica" onChange={handleChangeSwitch} />}
            label="Cerca elétrica"
          />
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} defaultChecked color="primary" name="cameraDeVideo" onChange={handleChangeSwitch} />}
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
              value={property.nascerDoSol || ''}
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
              <InputText label="Área total" variant="standard" name="areaTotal" onChange={(e) => handleChangeText(e, 'cur')} defaultValue="0,00" value={property.areaTotal} />
              <InputTextAdornment position="start">m²</InputTextAdornment>
            </InputTextAdornmentContainer>
          </BoxInfo>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputText label="Área construída" variant="standard" name="areaConstruida" onChange={(e) => handleChangeText(e, 'cur')} defaultValue="0,00" value={property.areaConstruida} />
              <InputTextAdornment position="start">m²</InputTextAdornment>
            </InputTextAdornmentContainer>
          </BoxInfo>
        </BoxInfo>
        <Divider />
        <BoxInfo>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputText label="Espaço frente" variant="standard" name="areaFrente" onChange={(e) => handleChangeText(e, 'cur')} defaultValue="0,00" value={property.areaFrente} />
              <InputTextAdornment position="start">m</InputTextAdornment>
            </InputTextAdornmentContainer>
          </BoxInfo>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputText label="Espaço fundos" variant="standard" name="areaFundos" onChange={(e) => handleChangeText(e, 'cur')} defaultValue="0,00" value={property.areaFundos} />
              <InputTextAdornment position="start">m</InputTextAdornment>
            </InputTextAdornmentContainer>
          </BoxInfo>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputText label="Espaço esquerda" variant="standard" name="areaEsquerda" onChange={(e) => handleChangeText(e, 'cur')} defaultValue="0,00" value={property.areaEsquerda} />
              <InputTextAdornment position="start">m</InputTextAdornment>
            </InputTextAdornmentContainer>
          </BoxInfo>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputText label="Espaço direita" variant="standard" name="areaDireita" onChange={(e) => handleChangeText(e, 'cur')} defaultValue="0,00" value={property.areaDireita} />
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
              <InputText label="Valor" variant="standard" name="valor" onChange={(e) => handleChangeText(e, 'cur')} defaultValue="0,00" value={property.valor} />
            </InputTextAdornmentContainer>
          </BoxInfo>
        </WrapperInfo>
        <WrapperInfo style={{ margin: '0 10px', borderRadius: '0' }}>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputTextAdornment position="start">R$</InputTextAdornment>
              <InputText label="Condomínio" variant="standard" name="valorCondominio" onChange={(e) => handleChangeText(e, 'cur')} defaultValue="0,00" value={property.valorCondominio} />
            </InputTextAdornmentContainer>
          </BoxInfo>
        </WrapperInfo>
        <WrapperInfo sx={{ borderRadius: '0', borderTopRightRadius: '10px' }}>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputTextAdornment position="start">R$</InputTextAdornment>
              <InputText label="IPTU" variant="standard" name="valorIPTU" onChange={(e) => handleChangeText(e, 'cur')} defaultValue="0,00" value={property.valorIPTU} />
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
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} defaultChecked color="primary" name="sitePublicarImovel" onChange={handleChangeSwitch} />}
            label="Publicar imóvel no site"
          />
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} defaultChecked color="primary" name="siteImovelDestaque" onChange={handleChangeSwitch} />}
            label="Destacar imóvel no site"
          />
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <FormControlLabel
            control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} defaultChecked color="primary" name="sitePublicarValor" onChange={handleChangeSwitch} />}
            label="Informar valor do imóvel no site"
          />
        </BoxInfo>
      </WrapperInfoHorizon>

      <DividerSpacingRows />

      <Box style={{ alignItems: 'end' }}>
        <Fab variant="extended" onClick={handleSubmit} disabled={(statusSubmit === 'loading')}>
          <AddIcon sx={{ mr: 1 }} />
          Cadastrar e Avançar
        </Fab>
      </Box>
    </React.Fragment>
  );
};

export default Form;
