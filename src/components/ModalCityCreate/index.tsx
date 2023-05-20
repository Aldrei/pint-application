import * as React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import CityCreateForm from '../../pages/Cities/Crud/components/Form';

interface IProps {
  handleSetOpen?: (value: boolean) => void;
  open?: boolean
}

const ModalCityCreate = ({ open, handleSetOpen }: IProps) => {
  /**
   * State.
  */
  const handleClose = () => handleSetOpen?.(false);

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
        NOVA CIDADE
      </DialogTitle>
      <DialogContent>
        <CityCreateForm action='create' inModal />
      </DialogContent>
    </Dialog>
  );
};

export default ModalCityCreate;
