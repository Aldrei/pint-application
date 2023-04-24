import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { IVideoData } from '../../../../../../../../types';

import { useAppDispatch } from '../../../../../../../../hooks/useReducerDispatch';

import { useAppSelectorBlaBlaBal } from '../../../../../../../../hooks/useReducerSelector';

import { IPropertiesVideosDeleteServiceRequest, propertiesVideosDeleteThunk } from '../../../../../../../../reducers/properties/videos/delete';

interface IProps {
  video?: IVideoData;
  code: string;
}

const DeleteConfirm = ({ video, code }: IProps) => {
  console.log('DEBUG video:', video);

  /**
   * State.
  */
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (video) setOpen(true);
    if (!video) setOpen(false);
  }, [video]);

  const handleClose = () => {
    setOpen(false);
  };

  /**
   * Delete.
  */
  const dispatch = useAppDispatch();
  const { status: videoDeleteStatus } = useAppSelectorBlaBlaBal('propertiesVideosDeleteReducer') as IPropertiesVideosDeleteServiceRequest;

  const handleConfirm = () => {
    if (video) {
      dispatch(propertiesVideosDeleteThunk({ code, videoId: String(video.id) }));
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
        Deletar o vídeo?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Não se preocupe, você pode enviar outro vídeo depois.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ flexDirection: 'row' }}>
        <Button onClick={handleClose} disabled={videoDeleteStatus === 'loading'}>Cancelar</Button>
        <Button onClick={handleConfirm} autoFocus color="error" disabled={videoDeleteStatus === 'loading'}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirm;
