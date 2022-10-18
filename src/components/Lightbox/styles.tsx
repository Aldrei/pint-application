import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

export const PhotoContainer = styled(Paper)(() => ({
  background: 'none',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const PhotoWrapper = styled(Box)(() => ({
  width: '100%',
  borderRadius: '5px',
  overflow: 'hidden'
}));

export const Photo = styled('img')(() => ({
  width: '100%'
}));
