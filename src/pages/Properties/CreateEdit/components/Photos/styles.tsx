import { styled } from '@mui/material/styles';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

export const PhotosContainer = styled(ImageList)(() => ({
  borderRadius: '5px',
  overflow: 'hidden',
  cursor: 'move',
}));

export const PhotoWrapper = styled(ImageListItem)(() => ({
  borderRadius: '5px',
  overflow: 'hidden',
  cursor: 'move',
}));

export const PhotoPreviewWrapper = styled(ImageListItem)(() => ({
  paddingTop: '20px',
  borderRadius: '5px',
  overflow: 'hidden',
  cursor: 'move',
}));

export const LinearProgressContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
}));

export const LinearProgressWrapper = styled(Box)(() => ({
  width: '100%',
  marginRight: '5px'
}));

export const LinearProgressPercentWrapper = styled(Box)();

export const LinearProgressPercent = styled(Chip)(() => ({
  '& .MuiChip-label': {
    overflow: 'unset',
    fontSize: '12px'
  }
}));
