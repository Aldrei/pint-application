import React from 'react';

import { useNavigate } from 'react-router-dom';

// import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';

import { ROUTES } from '../../../../constants/routes';
import { INeighborhoodData } from '../../../../types';

import ActionsMenu, { IAction } from '../../index';

interface IProps {
  item: INeighborhoodData,
  handleCb?: () => void
}

const CitiesActionsMenu = ({ item, handleCb }: IProps) => {
  const navigate = useNavigate();

  /**
   * Redirects.
  */
  const handleGoToDetails = () => {
    navigate(ROUTES.neighborhoodsDetail.go({ id: item.id }));
    if (handleCb) handleCb();
  };
  
  const handleGoToEdit = () => {
    navigate(ROUTES.neighborhoodsEdit.go({ id: item.id, tab: 'infos' }));
    if (handleCb) handleCb();
  };

  // const handleGoToDelete = () => {
  //   navigate(ROUTES.employeesDelete.go({ id: item.id }));
  //   if (handleCb) handleCb();
  // };

  const actions: IAction[] = [
    // {
    //   title: '+Infos',
    //   icon: <InfoIcon />,
    //   onClick: handleGoToDetails
    // },
    {
      title: 'Editar',
      icon: <EditIcon />,
      onClick: handleGoToEdit
    },
    // {
    //   title: 'Deletar',
    //   icon: <DeleteIcon />,
    //   onClick: handleGoToDelete
    // },
  ];

  return (
    <ActionsMenu actions={actions} direction='left' />
  );
};

export default CitiesActionsMenu;