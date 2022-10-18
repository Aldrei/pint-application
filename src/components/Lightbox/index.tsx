import * as React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import LinearProgress from '@mui/material/LinearProgress';

import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';

import { IPhotoData } from '../../types';

import { getPhoto } from '../../helpers';

import { 
  PhotoWrapper, 
  Photo 
} from './styles';

interface IProps {
  open: boolean;
  onClose(): void;
  dataPhoto: IPhotoData | null;
}

const Lightbox = ({ open, onClose, dataPhoto }: IProps) => {
  const handleClose = () => {
    onClose();
  };

  React.useEffect(() => {
    if (!dataPhoto) setLoadPhoto(false);
  }, [dataPhoto]);

  const [loadPhoto, setLoadPhoto] = React.useState<boolean>(false);

  const renderPhoto = (
    <PhotoWrapper>
      {!loadPhoto && <LinearProgress style={{ width: '325px' }} />}
      {dataPhoto && (
        <Photo
          style={{
            display: loadPhoto ? 'block' : 'none'
          }}
          src={getPhoto(dataPhoto, 'normal')} 
          onLoad={() => { setLoadPhoto(true); }}
        />
      )}
    </PhotoWrapper>
  );

  const resolveContent = () => {
    return (
      <Box sx={{ display: 'flex' }}>
        {/* Conditionally applies the timeout prop to change the entry speed. */}
        <Grow
          in={open}
          style={{ transformOrigin: '0 0 0' }}
          {...(open ? { timeout: 1000 } : {})}
        >
          {renderPhoto}
        </Grow>
      </Box>
    );
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth="xs"
        PaperProps={{
          style: {
            background: 'none',
            width: '65%',
            maxWidth: 'fit-content',
          }
        }}
      >
        <DialogContent
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            padding: '0',
            '> .MuiBox-root': {
              alignItems: 'center'
            }
          }}
        >
          {resolveContent()}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default Lightbox;