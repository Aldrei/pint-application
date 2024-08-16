import * as React from 'react';

/**
 * Material.
*/
import { Box } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

/**
 * Routes.
*/
import { useNavigate } from 'react-router-dom';

/**
 * Components.
*/
import Button from '../Button';

/**
 * Types.
*/
import { IServiceRequest } from '../../types';

/**
 * Helper.
*/
import { getMessage, hasProperty } from '../../helpers';

/**
 * Constants.
*/
import { ROUTES } from '../../constants/routes';

/**
 * Reducers.
*/
import { propertiesDeleteThunk, setStatus } from '../../reducers/properties/delete';

/**
 * Context.
*/
import SnackContext from '../../contexts/SnackContext';

import { useAppDispatch } from '../../hooks/useReducerDispatch';
import { useAppSelectorBlaBlaBal } from '../../hooks/useReducerSelector';

const model = 'Imóvel';

interface IProps {
  code: string
}

const PropertyDelete = ({ code }: IProps) => {
  const navigate = useNavigate();

  const snackContext = React.useContext(SnackContext);

  const { data, status: propertiesDeleteStatus } = useAppSelectorBlaBlaBal('propertiesDeleteReducer') as IServiceRequest;

  console.log('DEBUG DELETE data:', data);
  console.log('DEBUG DELETE status:', propertiesDeleteStatus);

  React.useEffect(() => {
    if (propertiesDeleteStatus === 'success' && !hasProperty(data, 'error')) {
      dispatch(setStatus('idle'));
      snackContext.addMessage({ type: 'success', message: getMessage({ action: 'delete', type: 'success', model }) });
      
      setTimeout(() => {
        navigate(ROUTES.propertiesList.go({ page: '1' }));
      }, 750);
    } else if (hasProperty(data, 'error')) {
      snackContext.addMessage({ type: 'error', message: getMessage({ action: 'delete', type: 'errorRequest', model }) });
    }
  }, [propertiesDeleteStatus]);

  const dispatch = useAppDispatch();

  // eslint-disable-next-line semi, @typescript-eslint/no-empty-function
  const handleDelete = () => {
    dispatch(propertiesDeleteThunk(code));
  };

  return (
    <Box style={{ alignItems: 'end' }}>
      <Button data-testid="submit-delete-button" fab color='red' text="Deletar Imóvel" icon={<DeleteIcon />} onClick={handleDelete} loading={(propertiesDeleteStatus === 'loading')} />
    </Box>
  );
};

export default PropertyDelete;