import React from 'react';

import { useNavigate } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';

import { ROUTES } from '../../../../constants/routes';
import { IOwnerData } from '../../../../types';

import ActionsMenu, { IAction } from '../../index';

interface IProps {
  item: IOwnerData,
  handleCb?: () => void
}

const OwnersActionsMenu = ({ item, handleCb }: IProps) => {
  const navigate = useNavigate();

  /**
   * Redirects.
  */
  const handleGoToDetails = () => {
    navigate(ROUTES.ownersDetail.go({ id: item.id }));
    if (handleCb) handleCb();
  };
  
  const handleGoToEdit = () => {
    navigate(ROUTES.ownersEdit.go({ id: item.id, tab: 'infos' }));
    if (handleCb) handleCb();
  };

  const handleGoToDelete = () => {
    navigate(ROUTES.ownersDelete.go({ id: item.id }));
    if (handleCb) handleCb();
  };

  const actions: IAction[] = [
    {
      title: '+Infos',
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
      onClick: handleGoToDelete
    },
  ];

  return (
    <ActionsMenu actions={actions} direction='left' />
  );
};

export default OwnersActionsMenu;