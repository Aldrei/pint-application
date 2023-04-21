import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { IBannerData, IServiceRequestTemp } from '../../../../../../../types';

import { getBannerPhoto } from '../../../../../../../helpers';

import { useAppDispatch } from '../../../../../../../hooks/useReducerDispatch';

import { useAppSelectorBlaBlaBal } from '../../../../../../../hooks/useReducerSelector';

import { bannersDeleteThunk } from '../../../../../../../reducers/banners/crud';

interface IProps {
  banner?: IBannerData;
  handleCloseCb: () => void;
}

const DeleteConfirm = ({ banner, handleCloseCb }: IProps) => {
  /**
   * State.
  */
  const [open, setOpen] = React.useState(false);

  console.log('DEBUG DeleteConfirm banner:', banner);
  
  React.useEffect(() => {
    if (banner) setOpen(true);
    if (!banner) setOpen(false);

    return () => setOpen(false);
  }, [banner]);

  const handleClose = () => {
    setOpen(false);
    handleCloseCb();
  };

  /**
   * Delete.
  */
  const dispatch = useAppDispatch();
  const bannersReducerData = useAppSelectorBlaBlaBal('bannersCrudReducer') as IServiceRequestTemp;
  console.log('DEBUG bannersReducerData:', bannersReducerData);

  const BANNER_DELETE_STATUS = bannersReducerData?.crud?.delete?.status;

  const handleConfirm = () => {
    if (banner) {
      dispatch(bannersDeleteThunk(banner));
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
      maxWidth="md"
    >
      <DialogTitle 
        id="alert-dialog-title"
        style={{ display: 'flex', flexDirection: 'row' }}
      >
        <img 
          src={banner ? getBannerPhoto(banner, 'thumb') : ''} 
          style={{ width: '45px', marginRight: '10px' }}
        /> Deletar o banner?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <p>Título: <strong>{banner?.titulo}</strong></p>
          <p>Descrição: <strong>{banner?.descGeral}</strong></p>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ flexDirection: 'row' }}>
        <Button onClick={handleClose} disabled={BANNER_DELETE_STATUS === 'loading'}>Cancelar</Button>
        <Button onClick={handleConfirm} autoFocus color="error" disabled={BANNER_DELETE_STATUS === 'loading'}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirm;
