import * as React from 'react';

/**
 * Third Libs.
*/
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

/**
 * Components.
*/
import OwnerCreateForm from '../../pages/Owners/Crud/components/Form';

/**
 * Types.
*/
import { ICityData, INeighborhoodData, TAction } from '../../types';

/**
 * Hooks.
*/
import { useAppDispatch } from '../../hooks/useReducerDispatch';

/**
 * Redux & Reducers
*/
import { setSelectedCities } from '../../reducers/cities/search';
import { setSelectedNeighborhoods } from '../../reducers/neighborhoods/search';

interface IProps {
  handleSetOpen?: (value: boolean) => void;
  open?: boolean
}

const ModalOwnerCreate = ({ open, handleSetOpen }: IProps) => {
  const dispatch = useAppDispatch();

  /**
   * Clear the city and neighborhood selected their reducers.
   * It's necessary because the selected values shows in others auto completes use city and neighborhood auto complete.
   * Short explanation: selected values to city and neigh. are showing in others auto completes.
  */
  const cleanReducers = () => {
    dispatch(setSelectedCities([] as ICityData[]));
    dispatch(setSelectedNeighborhoods([] as INeighborhoodData[]));
  };
  
  /**
   * State.
  */
  const handleClose = () => {
    console.log('DEBUG ModalOwnerCreate closed by onClose: fn.');
    handleSetOpen?.(false);
    cleanReducers();
  };

  React.useEffect(() => {
    if (!open) {
      console.log('DEBUG ModalOwnerCreate closed by open: boolean prop.');
      cleanReducers();
    }
  }, [open]);

  /**
   * Renders.
  */
  return (
    <Dialog
      open={Boolean(open)}
      onClose={handleClose}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      maxWidth="sm"
    >
      <DialogTitle 
        id="alert-dialog-title"
        style={{ display: 'flex', flexDirection: 'row' }}
      >
        NOVO PROPRIETÁRIO
      </DialogTitle>
      <DialogContent>
        <OwnerCreateForm action={TAction.CREATE} inModal />
      </DialogContent>
    </Dialog>
  );
};

export default ModalOwnerCreate;
