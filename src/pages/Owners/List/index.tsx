import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';

import Button from '../../../components/Button';
import OwnersList from '../../../components/List/hocs/OwnersList';

import { ROUTES } from '../../../constants/routes';

import { 
  PropertiesContainer, 
  ActionsContainer
} from './styles';

const OwnerPageList = () => {
  const navigate = useNavigate();

  /**
   * Action buttons.
  */
  const actionButtons = () => (
    <ActionsContainer sx={{ '& > :not(style)': { m: 1 } }} >
      <Button fab onClick={() => navigate(ROUTES.propertiesCreate.go())} text="Novo Cliente" icon={<AddIcon />} />
    </ActionsContainer>
  );

  return (
    <PropertiesContainer data-testid='propertiesList-container'>
      <OwnersList />
    </PropertiesContainer>
  );
};

export default OwnerPageList;