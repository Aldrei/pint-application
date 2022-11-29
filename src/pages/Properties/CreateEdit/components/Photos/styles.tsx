import { styled } from '@mui/material/styles';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

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

export const LinearProgressPercentWrapper = styled(Box)({});

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
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'start',
  marginTop: '10px',
  '& .input-file': {
    display: 'none'
  }
});

export const ActionsContainer = styled(Stack)({
  background: 'rgb(0,0,0,.75)',
  position: 'absolute',
  right: '0',
  bottom: '0',
  borderTopLeftRadius: '5px',
});

export const ActionButton = styled(Button)({
  display: 'flex',
  flexDirection: 'row',
  fontSize: '11px',
  '& .MuiButton-startIcon': {
    marginRight: '4px',
    pointerEvents: 'none'
  },
  '& .icon-delete': {
    marginRight: '-2px'
  }
});

export const MessageContainer = styled(Box)({
  flexDirection: 'row',
  justifyContent: 'start',
  alignItems: 'start',
  marginTop: '10px',
  marginBottom: '25px'
});

export const Message = styled(Alert)({
  flexDirection: 'row',
  width: '100%'
});
