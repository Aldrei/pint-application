import * as React from 'react';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import SingleBedIcon from '@mui/icons-material/SingleBed';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

import { IPropertyData } from '../../../../../types';

import { hasFeature } from '../../../../../helpers';

import { statusImovOptions, tipoOptions, categoriaOptions, nascerDoSolOptions } from '../../../../../constants/options';

import { 
  WrapperInfo, 
  WrapperInfoHorizon, 
  BoxInfo, 
  BoxInfoLocalidade,
  WrapperStack, 
  WrapperTitle, 
  Title, 
  Text, 
  DividerSpacingRows, 
  ChipCustom, 
  CheckCircleIconCustom, 
  CancelIconCustom,
  Textarea,
  InputTextAdornmentContainer,
  InputTextAdornment,
  InputText,
  FormControlSelect
} from './styles';

const Info = () => {
  const [property, setProperty] = React.useState<IPropertyData>({} as IPropertyData);

  const handleChange = (event: SelectChangeEvent, flag: string) => {
    setProperty({
      ...property, 
      [flag]: event.target.value
    });
  };

  return (
    <React.Fragment>
      <WrapperInfo>
        <BoxInfo>
          <BoxInfo>
            <TextField fullWidth id="standard-basic" label="Cidade" variant="standard" />
          </BoxInfo>
          <BoxInfo>
            <TextField fullWidth id="standard-basic" label="Bairro" variant="standard" />
          </BoxInfo>
        </BoxInfo>
        <Divider />
        <BoxInfo>
          <BoxInfo sx={{ backgroundColor: 'transparent' }}>
            <TextField fullWidth id="standard-basic" label="Logradouro" variant="standard" />
          </BoxInfo>
          <BoxInfoLocalidade>
            <TextField fullWidth id="standard-basic" label="Número" variant="standard" />
            <TextField fullWidth id="standard-basic" label="Apto" variant="standard" />
            <TextField fullWidth id="standard-basic" label="CEP" variant="standard" />
          </BoxInfoLocalidade>
        </BoxInfo>
      </WrapperInfo>

      <DividerSpacingRows />

      <WrapperInfo>
        <BoxInfo>
          <TextField fullWidth id="standard-basic" label="Nome do imóvel" variant="standard" />
        </BoxInfo>
        <Divider />
        <WrapperStack>
          <Textarea
            aria-label="maximum height"
            placeholder="Descrição do imóvel"
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
            <InputText label="Dormitório(s)" variant="standard" />
          </InputTextAdornmentContainer>
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo sx={{ backgroundColor: 'transparent', justifyContent: 'center' }}>
          <InputTextAdornmentContainer>
            <InputTextAdornment position="start">
              <DirectionsCarIcon style={{ color: '#000' }} />
            </InputTextAdornment>
            <InputText label="Garagem" variant="standard" />
          </InputTextAdornmentContainer>
        </BoxInfo>
      </WrapperInfoHorizon>

      <DividerSpacingRows />

      <Box sx={{ flexDirection: 'row', marginBottom: '10px' }}>
        <WrapperInfo sx={{ borderRadius: '0', borderTopLeftRadius: '10px' }}>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputTextAdornment position="start">R$</InputTextAdornment>
              <InputText label="Valor" variant="standard" />
            </InputTextAdornmentContainer>
          </BoxInfo>
        </WrapperInfo>
        <WrapperInfo style={{ margin: '0 10px', borderRadius: '0' }}>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputTextAdornment position="start">R$</InputTextAdornment>
              <InputText label="Condomínio" variant="standard" />
            </InputTextAdornmentContainer>
          </BoxInfo>
        </WrapperInfo>
        <WrapperInfo sx={{ borderRadius: '0', borderTopRightRadius: '10px' }}>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputTextAdornment position="start">R$</InputTextAdornment>
              <InputText label="IPTU" variant="standard" />
            </InputTextAdornmentContainer>
          </BoxInfo>
        </WrapperInfo>
      </Box>

      <WrapperInfo sx={{ borderTopLeftRadius: '0', borderTopRightRadius: '0', }}>
        <WrapperStack>
          <Textarea
            aria-label="maximum height"
            placeholder="Observação sobre valores"
          />
        </WrapperStack>
      </WrapperInfo>

      <DividerSpacingRows />

      <WrapperInfoHorizon>
        <BoxInfo>
          <FormControlSelect variant="standard">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              value={property.status || ''}
              onChange={(e) => handleChange(e, 'status')}
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
              onChange={(e) => handleChange(e, 'tipo')}
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
              onChange={(e) => handleChange(e, 'categoria')}
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

      <WrapperInfoHorizon>
        <BoxInfo 
          style={{
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}
        >
          <ChipCustom
            label="Exclusividade"
            variant="outlined"
            icon={hasFeature(property, 'exclusividade') ? <CheckCircleIconCustom /> : <CancelIconCustom />}
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
          <ChipCustom
            label="Empreendimento"
            variant="outlined"
            icon={hasFeature(property, 'empreendimento') ? <CheckCircleIconCustom /> : <CancelIconCustom />}
          />
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <ChipCustom
            label="Já possui placa"
            variant="outlined"
            icon={hasFeature(property, 'placa') ? <CheckCircleIconCustom /> : <CancelIconCustom />}
          />
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <ChipCustom
            label="Já possui fotos"
            variant="outlined"
            icon={hasFeature(property, 'possuiFoto') ? <CheckCircleIconCustom /> : <CancelIconCustom />}
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
          <ChipCustom
            label="Lavanderia"
            variant="outlined"
            icon={hasFeature(property, 'lavanderia') ? <CheckCircleIconCustom /> : <CancelIconCustom />}
          />
          <ChipCustom
            label="Alarme"
            variant="outlined"
            icon={hasFeature(property, 'alarme') ? <CheckCircleIconCustom /> : <CancelIconCustom />}
          />
          <ChipCustom
            label="Elevador"
            variant="outlined"
            icon={hasFeature(property, 'apElevador') ? <CheckCircleIconCustom /> : <CancelIconCustom />}
          />
          <ChipCustom
            label="Portão eletrônico"
            variant="outlined"
            icon={hasFeature(property, 'portaoEletronico') ? <CheckCircleIconCustom /> : <CancelIconCustom />}
          />
          <ChipCustom
            label="Poço artesiano"
            variant="outlined"
            icon={hasFeature(property, 'pocoArtesiano') ? <CheckCircleIconCustom /> : <CancelIconCustom />}
          />
          <ChipCustom
            label="Cerca elétrica"
            variant="outlined"
            icon={hasFeature(property, 'cercaEletrica') ? <CheckCircleIconCustom /> : <CancelIconCustom />}
          />
          <ChipCustom
            label="Câmera de vídeo"
            variant="outlined"
            icon={hasFeature(property, 'cameraDeVideo') ? <CheckCircleIconCustom /> : <CancelIconCustom />}
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
              onChange={(e) => handleChange(e, 'nascerDoSol')}
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
              <InputText label="Área total" variant="standard" />
              <InputTextAdornment position="start">m²</InputTextAdornment>
            </InputTextAdornmentContainer>
          </BoxInfo>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputText label="Área construída" variant="standard" />
              <InputTextAdornment position="start">m²</InputTextAdornment>
            </InputTextAdornmentContainer>
          </BoxInfo>
        </BoxInfo>
        <Divider />
        <BoxInfo>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputText label="Espaço frente" variant="standard" />
              <InputTextAdornment position="start">m</InputTextAdornment>
            </InputTextAdornmentContainer>
          </BoxInfo>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputText label="Espaço fundos" variant="standard" />
              <InputTextAdornment position="start">m</InputTextAdornment>
            </InputTextAdornmentContainer>
          </BoxInfo>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputText label="Espaço esquerda" variant="standard" />
              <InputTextAdornment position="start">m</InputTextAdornment>
            </InputTextAdornmentContainer>
          </BoxInfo>
          <BoxInfo>
            <InputTextAdornmentContainer>
              <InputText label="Espaço direita" variant="standard" />
              <InputTextAdornment position="start">m</InputTextAdornment>
            </InputTextAdornmentContainer>
          </BoxInfo>
        </BoxInfo>
      </WrapperInfo>

      <DividerSpacingRows />

      <BoxInfo sx={{ background: 'none', paddingTop: '0' }}>
        <Text>Site</Text>
      </BoxInfo>
      <WrapperInfoHorizon>
        <BoxInfo>
          <ChipCustom
            label="Publicar imóvel no site"
            variant="outlined"
            icon={hasFeature(property, 'sitePublicarImovel') ? <CheckCircleIconCustom /> : <CancelIconCustom />}
          />
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <ChipCustom
            label="Destacar imóvel no site"
            variant="outlined"
            icon={hasFeature(property, 'siteImovelDestaque') ? <CheckCircleIconCustom /> : <CancelIconCustom />}
          />
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <ChipCustom
            label="Informar valor do imóvel no site"
            variant="outlined"
            icon={hasFeature(property, 'sitePublicarValor') ? <CheckCircleIconCustom /> : <CancelIconCustom />}
          />
        </BoxInfo>
      </WrapperInfoHorizon>

      <DividerSpacingRows />

      <WrapperInfo sx={{ backgroundColor: 'transparent', backgroundImage: 'unset' }}>
        <BoxInfo sx={{ backgroundColor: 'transparent' }}>
          <WrapperTitle spacing={0.5}>
            <Title>Proprietário</Title>
            <Text>--</Text>
          </WrapperTitle>
        </BoxInfo>
      </WrapperInfo>

      <DividerSpacingRows />

      <WrapperInfoHorizon sx={{ justifyContent: 'space-evenly', backgroundColor: 'transparent', backgroundImage: 'unset' }}>
        <BoxInfo sx={{ backgroundColor: 'transparent' }}>
          <WrapperTitle spacing={0.5}>
            <Title>Corretor</Title>
            <Text>--</Text>
          </WrapperTitle>
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo sx={{ backgroundColor: 'transparent' }}>
          <WrapperTitle spacing={0.5}>
            <Title>Agenciador</Title>
            <Text>--</Text>
          </WrapperTitle>
        </BoxInfo>
      </WrapperInfoHorizon>
    </React.Fragment>
  );
};

export default Info;
