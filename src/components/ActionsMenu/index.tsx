import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';

import { IPropertyData } from '../../types';

import SpeedDialAction from '@mui/material/SpeedDialAction';

import MenuIcon from '@mui/icons-material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';

import { SpeedDialStyled } from './styles';

interface IProps {
  item: IPropertyData,
  handleCb?: () => void
}

const ActionsMenu = ({ item, handleCb }: IProps) => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /**
   * Redirects.
  */
  const handleGoToDetails = (code: number) => {
    navigate(ROUTES.propertiesDetail.go({ code }));
    if (handleCb) handleCb();
  };

  const handleGoToEdit = (code: number) => {
    navigate(ROUTES.propertiesEdit.go({ code, tab: 'infos' }));
    if (handleCb) handleCb();
  };

  return (
    <React.Fragment>
      <SpeedDialStyled
        direction='down'
        ariaLabel="SpeedDial tooltip example"
        sx={{ 
          position: 'absolute', 
          top: 16, 
          right: 16,
          '& .MuiButtonBase-root': {
            width: '50px',
            height: '50px',
          }
        }}
        icon={<MenuIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        <SpeedDialAction
          key="+Infos, Fotos, Vídeo, Mapa"
          icon={<InfoIcon />}
          tooltipTitle="+Infos, Fotos, Vídeo, Mapa"
          tooltipOpen
          onClick={() => handleGoToDetails(item.code)}
        />
        <SpeedDialAction
          key="Editar"
          icon={<EditIcon />}
          tooltipTitle="Editar"
          tooltipOpen
          onClick={() => handleGoToEdit(item.code)}
        />
        <SpeedDialAction
          key="Deletar"
          icon={<DeleteIcon />}
          tooltipTitle="Deletar"
          tooltipOpen
          onClick={() => handleGoToEdit(item.code)}
        />
      </SpeedDialStyled>
    </React.Fragment>
  );
};

export default ActionsMenu;
