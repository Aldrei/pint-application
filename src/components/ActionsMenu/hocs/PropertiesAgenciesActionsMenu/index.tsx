import InfoIcon from '@mui/icons-material/Info';

import { LocationOn } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle, Divider } from '@mui/material';

import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SingleBedIcon from '@mui/icons-material/SingleBed';

import React from 'react';
import { WrapperInfo } from '../../../../pages/Cities/Crud/components/Form/styles';
import { WrapperTitle } from '../../../../pages/Cities/Crud/styles';
import { IPropertiesAgencies } from '../../../../types';
import ActionsMenu, { IAction } from '../../index';

import { CancelIconCustom, CheckCircleIconCustom, WrapperInfoHorizon } from '../../../../pages/Properties/Detail/components/Info/styles';
import { BoxInfo, ChipCustom, Text, Title, WrapperStack } from '../../../../pages/Properties/List/styles';

interface IProps {
  item: IPropertiesAgencies;
}

const PropertiesAgenciesActionsMenu = ({ item }: IProps) => {
  const [openModal, setOpenModal] = React.useState(false);

  const actions: IAction[] = [
    {
      title: '+Infos',
      icon: <InfoIcon />,
      onClick: () => setOpenModal(true),
    },
  ];

  return (
    <>
      <ActionsMenu actions={actions} />
      {openModal && (
        <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle 
            id="alert-dialog-title"
            style={{ display: 'flex', flexDirection: 'row' }}
          >
            {item?.tipo}
          </DialogTitle>
          <DialogContent>
            <WrapperInfo>
              <BoxInfo>
                <WrapperTitle>
                  <Title style={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ marginLeft: '-5px' }} /> {`${item.address} - ${item.neighborhood}, ${item.city} - ${item.state}`}
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
                      label={`${item.dormitorio || '--'} dormitório(s)`}
                      variant="outlined"
                      icon={<SingleBedIcon />}
                    />
                    <ChipCustom
                      label={`${item.garagem || '--'} carro(s)`}
                      variant="outlined"
                      icon={<DirectionsCarIcon />}
                    />
                  </BoxInfo>
                </WrapperTitle>
              </BoxInfo>
              <Divider />
              <WrapperInfoHorizon sx={{ backgroundColor: 'transparent', backgroundImage: 'unset', border: 'unset', boxShadow: 'none' }}>
                <BoxInfo 
                  sx={{
                    display: 'flow',
                    justifyContent: 'center',
                    backgroundColor: 'transparent', 
                    backgroundImage: 'unset', 
                    '& .MuiChip-root': {
                      margin: '3px'
                    }
                  }}
                >
                  <ChipCustom
                    label="Lavanderia"
                    variant="outlined"
                    icon={item.lavanderia ? <CheckCircleIconCustom /> : <CancelIconCustom />}
                  />
                  <ChipCustom
                    label="Alarme"
                    variant="outlined"
                    icon={item.alarme ? <CheckCircleIconCustom /> : <CancelIconCustom />}
                  />
                  <ChipCustom
                    label="Portão Eletrônico"
                    variant="outlined"
                    icon={item.portaoEletronico ? <CheckCircleIconCustom /> : <CancelIconCustom />}
                  />
                  <ChipCustom
                    label="Elevador"
                    variant="outlined"
                    icon={item.elevador ? <CheckCircleIconCustom /> : <CancelIconCustom />}
                  />
                  <ChipCustom
                    label="Poço Artesiano"
                    variant="outlined"
                    icon={item.pocoArtesiano ? <CheckCircleIconCustom /> : <CancelIconCustom />}
                  />
                  <ChipCustom
                    label="Cerca Elétrica"
                    variant="outlined"
                    icon={item.cercaEletrica ? <CheckCircleIconCustom /> : <CancelIconCustom />}
                  />
                  <ChipCustom
                    label="Câmera de Vídeo"
                    variant="outlined"
                    icon={item.cameraDeVideo ? <CheckCircleIconCustom /> : <CancelIconCustom />}
                  />
                </BoxInfo>
              </WrapperInfoHorizon>
              <WrapperStack>
                <Text sx={{ fontWeight: 400 }}>{item.owner}</Text>
                <Text>{item.ownerPhone}</Text>
                <Text>{item.ownerEmail}</Text>
                <Text>{item.tipo}</Text>
              </WrapperStack>
            </WrapperInfo>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default PropertiesAgenciesActionsMenu;