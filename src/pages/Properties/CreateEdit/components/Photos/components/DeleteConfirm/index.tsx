import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { IPhotoData } from '../../../../../../../types';

import { getPhoto } from '../../../../../../../helpers';

import { useAppDispatch } from '../../../../../../../stores/hooks';

import { useAppSelectorBlaBlaBal } from '../../../../../../../hooks/useReducerSelector';

import { IPropertiesPhotosDeleteServiceRequest, propertiesPhotosDeleteThunk } from '../../../../../../../reducers/properties/photos/delete';

interface IProps {
  photo?: IPhotoData;
  code: string;
}

const DeleteConfirm = ({ photo, code }: IProps) => {
  /**
   * State.
  */
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (photo) setOpen(true);
    if (!photo) setOpen(false);
  }, [photo]);

  const handleClose = () => {
    setOpen(false);
  };

  /**
   * Delete.
  */
  const dispatch = useAppDispatch();
  const { status: photoDeleteStatus } = useAppSelectorBlaBlaBal('propertiesPhotosDeleteReducer') as IPropertiesPhotosDeleteServiceRequest;

  const handleConfirm = () => {
    if (photo) {
      dispatch(propertiesPhotosDeleteThunk({ code, photoId: String(photo.id) }));
    }
  };

  /**
   * Renders.
  */
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
    >
      <DialogTitle 
        id="alert-dialog-title"
        style={{ display: 'flex', flexDirection: 'row' }}
      >
        <img 
          src={photo ? getPhoto(photo, 'thumb') : ''} 
          style={{ width: '45px', marginRight: '10px' }}
        /> Deletar a foto?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Não se preocupe, você pode enviar outra foto depois.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ flexDirection: 'row' }}>
        <Button onClick={handleClose} disabled={photoDeleteStatus === 'loading'}>Cancelar</Button>
        <Button onClick={handleConfirm} autoFocus color="error" disabled={photoDeleteStatus === 'loading'}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirm;
