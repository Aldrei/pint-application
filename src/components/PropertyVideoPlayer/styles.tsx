import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
