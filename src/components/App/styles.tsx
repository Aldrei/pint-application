import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const AppContainer = styled(Box)(() => ({
  width: '100%',
  overflowX: 'hidden',
  border: '2px solid green',
}));

export const AppErrorContainer = styled(Box)(() => ({
  width: '100%',
  overflowX: 'hidden',
  border: '2px solid red',
  alignItems: 'center',
  justifyContent: 'center'
}));

export const ErrorDesc = styled(Typography);
