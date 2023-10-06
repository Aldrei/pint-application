import * as React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import EmployeeCreateForm from '../../pages/Employees/Crud/components/Form';
import { TEmployeeType } from '../../types';

interface IProps {
  handleSetOpen?: (value: boolean) => void;
  open?: boolean
  type?: TEmployeeType
}

const ModalEmployeeCreate = ({ open, handleSetOpen, type }: IProps) => {
  /**
   * State.
  */
  const handleClose = () => handleSetOpen?.(false);

  /**
   * Resolve title.
  */
  const resolveTitle = () => {
    switch (type) {
    case 'agent': return 'AGENCIADOR';
    case 'broker': return 'CORRETOR';
    default: return '';
    }
  };

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
        NOVO {resolveTitle()}
      </DialogTitle>
      <DialogContent>
        <EmployeeCreateForm action='create' inModal />
      </DialogContent>
    </Dialog>
  );
};

export default ModalEmployeeCreate;
