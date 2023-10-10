import * as React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import OwnerCreateForm from '../../pages/Owners/Crud/components/Form';
import { TAction } from '../../types';

interface IProps {
  handleSetOpen?: (value: boolean) => void;
  open?: boolean
}

const ModalOwnerCreate = ({ open, handleSetOpen }: IProps) => {
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
        NOVO PROPRIETÁRIO
      </DialogTitle>
      <DialogContent>
        <OwnerCreateForm action={TAction.CREATE} inModal />
      </DialogContent>
    </Dialog>
  );
};

export default ModalOwnerCreate;
