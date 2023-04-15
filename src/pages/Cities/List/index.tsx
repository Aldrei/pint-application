import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';

import Button from '../../../components/Button';
import CitiesList from '../../../components/List/hocs/CitiesList';

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
      <Button fab onClick={() => navigate(ROUTES.citiesCreate.go())} text="Nova Cidade" icon={<AddIcon />} />
    </ActionsContainer>
  );

  return (
    <PropertiesContainer data-testid='propertiesList-container'>
      {/* {actionButtons()} */}
      <CitiesList />
    </PropertiesContainer>
  );
};

export default OwnerPageList;