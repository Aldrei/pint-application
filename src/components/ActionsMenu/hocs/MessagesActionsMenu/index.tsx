
import { useNavigate } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { ROUTES } from '../../../../constants/routes';

import { IMessageData } from '../../../../types';
import ActionsMenu, { IAction } from '../../index';

interface IProps {
  item: IMessageData,
  handleCb?: () => void,
  disableDelete?: boolean
  disable?: boolean
}

const MessagesActionsMenu = ({ item, handleCb }: IProps) => {
  const navigate = useNavigate();

  /**
   * Redirects.
  */
  const handleGoToEdit = () => {
    navigate(ROUTES.neighborhoodsEdit.go({ id: item.id, tab: 'infos' }));
    if (handleCb) handleCb();
  };

  const handleGoToDelete = () => {
    navigate(ROUTES.neighborhoodsDelete.go({ id: item.id, tab: 'infos' }));
    if (handleCb) handleCb();
  };

  const actions: IAction[] = [
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

export default MessagesActionsMenu;