import React from 'react';

import { useNavigate } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';

import { ROUTES } from '../../../../constants/routes';
import { IPropertyData } from '../../../../types';

import ActionsMenu, { IAction } from '../../index';

interface IProps {
  item: IPropertyData,
  handleCb?: () => void
}

const PropertiesActionsMenu = ({ item, handleCb }: IProps) => {
  const navigate = useNavigate();

  /**
   * Redirects.
  */
  const handleGoToDetails = () => {
    navigate(ROUTES.propertiesRead.go({ code: item.code, tab: 'infos' }));
    if (handleCb) handleCb();
  };
  
  const handleGoToEdit = () => {
    navigate(ROUTES.propertiesEdit.go({ code: item.code, tab: 'infos' }));
    if (handleCb) handleCb();
  };

  const actions: IAction[] = [
    {
      title: '+Infos, Fotos, Vídeo, Mapa',
      icon: <InfoIcon />,
      onClick: handleGoToDetails
    },
    {
      title: 'Editar',
      icon: <EditIcon />,
      onClick: handleGoToEdit
    },
    {
      title: 'Deletar',
      icon: <DeleteIcon />,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClick: () => {}
    },
  ];

  return (
    <ActionsMenu actions={actions} />
  );
};

export default PropertiesActionsMenu;