import * as React from 'react';

import { useTheme } from '@mui/material/styles';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import LocationOn from '@mui/icons-material/LocationOn';
import PaidIcon from '@mui/icons-material/Paid';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

import { IPropertyData } from '../../../../../types';

import { hasProperty, hasFeature } from '../../../../../helpers';

import { WrapperInfo, WrapperInfoHorizon, BoxInfo, WrapperStack, WrapperTitle, Title, Text, DividerSpacingRows, ChipCustom, CheckCircleIconCustom, CancelIconCustom } from './styles';


interface IProps {
  property: IPropertyData
}

const Info = ({ property }: IProps) => {
  const theme = useTheme();  

  if (!hasProperty(property, 'code')) return null;

  return (
    <React.Fragment>
      <WrapperInfo>
        <BoxInfo>
          {/* <Avatar variant="rounded" src="avatar1.jpg" sx={{ borderRadius: '10px' }} /> */}
          <WrapperTitle
            spacing={0.5}
          >
            <Text sx={{ fontWeight: 400 }}>{property.nomeImovel}</Text>
            <Title style={{ display: 'flex', alignItems: 'center' }}>
              <LocationOn sx={{ marginLeft: '-5px' }} /> {property.city.data.long_desc} - {property.neighborhood.data.nome}, {property.localLogradouro}, núm. {property.localNumero || '--'}, apto {property.apApto || '--'} - CEP {property.localCEP || '--'}
            </Title>
            <BoxInfo 
              sx={{
                padding: '0',
                paddingTop: '8px',
                backgroundColor: 'transparent', 
                backgroundImage: 'unset', 
                '& .MuiChip-root': {
                  marginRight: '10px'
                } 
              }}
            >
              <ChipCustom
                label={`${property.dormitorio || '--'} dormitório(s)`}
                variant="outlined"
                icon={<SingleBedIcon />}
              />
              <ChipCustom
                label={`${property.garagem || '--'} carro(s)`}
                variant="outlined"
                icon={<DirectionsCarIcon />}
              />
            </BoxInfo>
          </WrapperTitle>
        </BoxInfo>
        <Divider />
        <WrapperStack>
          <Text>{property.descGeral}</Text>
        </WrapperStack>
      </WrapperInfo>

      <DividerSpacingRows />

      <Box sx={{ flexDirection: 'row', marginBottom: '10px' }}>
        <WrapperInfo sx={{ borderRadius: '0', borderTopLeftRadius: '10px' }}>
          <BoxInfo>
            <Stack spacing={0.5} sx={{
              margin: '0 20px',
            }}>
              <Title>Valor</Title>
              <Stack>
                <ChipCustom
                  icon={<PaidIcon />}
                  label={Number(property.valor).toCurrencyBR()}
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary
                  }} />
              </Stack>
            </Stack>
          </BoxInfo>
        </WrapperInfo>
        <WrapperInfo style={{ margin: '0 10px', borderRadius: '0' }}>
          <BoxInfo>
            <Stack spacing={0.5} sx={{
              margin: '0 20px',
            }}>
              <Title>Condomínio</Title>
              <Stack>
                <ChipCustom
                  icon={<PaidIcon />}
                  label={Number(property.valorCondominio).toCurrencyBR()}
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary
                  }} />
              </Stack>
            </Stack>
          </BoxInfo>
        </WrapperInfo>
        <WrapperInfo sx={{ borderRadius: '0', borderTopRightRadius: '10px' }}>
          <BoxInfo>
            <Stack spacing={0.5} sx={{
              margin: '0 20px',
            }}>
              <Title>IPTU</Title>
              <Stack>
                <ChipCustom
                  icon={<PaidIcon />}
                  label={Number(property.valorIPTU).toCurrencyBR()}
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary
                  }} />
              </Stack>
            </Stack>
          </BoxInfo>
        </WrapperInfo>
      </Box>

      <WrapperInfo sx={{ borderTopLeftRadius: '0', borderTopRightRadius: '0', }}>
        <WrapperStack>
          <Text>{property.condObs || 'Sem observação sobre valores.'}</Text>
        </WrapperStack>
      </WrapperInfo>

      <DividerSpacingRows />

      <WrapperInfoHorizon>
        <BoxInfo>
          <WrapperTitle spacing={0.5}>
            <Title>Status</Title>
            <Text>{property.status}</Text>
          </WrapperTitle>
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <WrapperTitle spacing={0.5}>
            <Title>Tipo</Title>
            <Text>{property.tipo}</Text>
          </WrapperTitle>
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <WrapperTitle spacing={0.5}>
            <Title>Categoria</Title>
            <Text>{property.categoria}</Text>
          </WrapperTitle>
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
                label={`Início: ${property.exclusividadePeriodoInicio.toDateBR() || '--'}`}
              />
              <ChipCustom
                label={`Início: ${property.exclusividadePeriodoFim.toDateBR() || '--'}`}
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
          <WrapperTitle spacing={0.5}>
            <Title>Nascer do sol</Title>
            <Text>{property.nascerDoSol}</Text>
          </WrapperTitle>
        </BoxInfo>
      </WrapperInfo>

      <DividerSpacingRows />

      <WrapperInfoHorizon>
        <BoxInfo>
          <WrapperTitle spacing={0.5}>
            <Title sx={{ fontSize: '.9em' }}>Área total</Title>
            <Text>{property.areaTotal.toMeter('square')}</Text>
          </WrapperTitle>
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <WrapperTitle spacing={0.5}>
            <Title sx={{ fontSize: '.9em' }}>Área construída</Title>
            <Text>{property.areaConstruida.toMeter('square')}</Text>
          </WrapperTitle>
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <WrapperTitle spacing={0.5}>
            <Title sx={{ fontSize: '.9em' }}>Espaço frente</Title>
            <Text>{property.areaFrente.toMeter()}</Text>
          </WrapperTitle>
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <WrapperTitle spacing={0.5}>
            <Title sx={{ fontSize: '.9em' }}>Espaço fundos</Title>
            <Text>{property.areaFundos.toMeter()}</Text>
          </WrapperTitle>
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <WrapperTitle spacing={0.5}>
            <Title sx={{ fontSize: '.9em' }}>Espaço esquerda</Title>
            <Text>{property.areaEsquerda.toMeter()}</Text>
          </WrapperTitle>
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo>
          <WrapperTitle spacing={0.5}>
            <Title sx={{ fontSize: '.9em' }}>Espaço direita</Title>
            <Text>{property.areaDireita.toMeter()}</Text>
          </WrapperTitle>
        </BoxInfo>
      </WrapperInfoHorizon>

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
            <Text>{property.owner.data.nomeRazao}</Text>
          </WrapperTitle>
        </BoxInfo>
      </WrapperInfo>

      <DividerSpacingRows />

      <WrapperInfoHorizon sx={{ justifyContent: 'space-evenly', backgroundColor: 'transparent', backgroundImage: 'unset' }}>
        <BoxInfo sx={{ backgroundColor: 'transparent' }}>
          <WrapperTitle spacing={0.5}>
            <Title>Corretor</Title>
            <Text>{property.broker.data.nome}</Text>
          </WrapperTitle>
        </BoxInfo>
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <BoxInfo sx={{ backgroundColor: 'transparent' }}>
          <WrapperTitle spacing={0.5}>
            <Title>Agenciador</Title>
            <Text>{property.agent.data.nome}</Text>
            {property.dataAgenciamento && (
              <Stack>
                <ChipCustom
                  label={`Data ag. ${property.dataAgenciamento.toDateBR()}`}
                />
              </Stack>
            )}
          </WrapperTitle>
        </BoxInfo>
      </WrapperInfoHorizon>
    </React.Fragment>
  );
};

export default Info;
