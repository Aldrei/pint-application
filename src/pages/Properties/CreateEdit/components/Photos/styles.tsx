import { styled } from '@mui/material/styles';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

export const PhotosContainer = styled(ImageList)(() => ({
  borderRadius: '5px',
  overflow: 'hidden',
}));

export const PhotoWrapper = styled(ImageListItem)(() => ({
  borderRadius: '5px',
  overflow: 'hidden',
  cursor: 'move',
}));

export const PhotoPreviewWrapper = styled(ImageListItem)(() => ({
  margin: '2px',
  paddingTop: '20px',
  borderRadius: '5px',
  overflow: 'hidden',
  '& img': {
    borderRadius: '5px'
  }
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
  marginRight: '5px',
  '& .MuiLinearProgress-root': {
    borderRadius: '2px'
  }
}));

export const LinearProgressPercentWrapper = styled(Box)();

export const LinearProgressPercent = styled(Chip)(() => ({
  flexDirection: 'row',
  '& .MuiChip-label': {
    overflow: 'unset',
    fontSize: '11px',
    paddingLeft: '6px',
    paddingRight: '6px',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '17px',
    marginTop: '-1px',
    marginRight: '-6px'
  }
}));

export const ButtonFileContainer = styled(Box)({
  alignItems: 'start',
  marginTop: '10px',
  '& .input-file': {
    display: 'none'
  }
});