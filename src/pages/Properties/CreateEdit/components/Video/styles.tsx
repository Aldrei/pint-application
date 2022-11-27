import { styled } from '@mui/material/styles';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

export const VideoPreviewContainer = styled(ImageList)(() => ({
  borderRadius: '5px',
  overflow: 'hidden',
}));

export const VideoPreviewWrapper = styled(ImageListItem)(() => ({
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

export const VideoContainer = styled(Box)(() => ({
  margin: '15px 0 0 0',
  alignItems: 'center',
}));

export const VideoWrapper = styled(Box)(() => ({
  height: '350px',
  width: 'fit-content',
  borderRadius: '10px',
  overflow: 'hidden',
}));

export const VideoInfoWrapper = styled(Box)(() => ({
  border: '1px solid rgb(30, 73, 118)',
  borderRadius: '10px',
  position: 'relative',
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
  height: '70px',
  width: '100%'
}));

export const VideoInfo = styled(Typography)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  padding: '15px 30px',
  '& .MuiSvgIcon-root': {
    marginRight: '5px'
  }
}));
