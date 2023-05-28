import React from 'react';

import { useNavigate } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';

import { ROUTES } from '../../../../constants/routes';
import { ICityData } from '../../../../types';

import ActionsMenu, { IAction } from '../../index';

interface IProps {
  item: ICityData,
  handleCb?: () => void
}

const CitiesActionsMenu = ({ item, handleCb }: IProps) => {
  const navigate = useNavigate();

  /**
   * Redirects.
  */  
  const handleGoToEdit = () => {
    navigate(ROUTES.citiesEdit.go({ id: item.id, tab: 'infos' }));
    if (handleCb) handleCb();
  };

  const actions: IAction[] = [
    {
      title: 'Editar',
      icon: <EditIcon />,
      onClick: handleGoToEdit
    },
  ];

  return (
    <ActionsMenu actions={actions} direction='left' />
  );
};

export default CitiesActionsMenu;