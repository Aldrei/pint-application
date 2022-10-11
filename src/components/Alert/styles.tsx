import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const AlertContainer = styled(Box)(() => ({
  flexDirection: 'row',
  borderRadius: '4px',
  boxShadow: 'none',
  lineHeight: '1.43',
  letterSpacing: '0.01071em',
  color: 'rgb(244, 199, 199)',
  backgroundColor: 'rgb(22, 11, 11)',
  padding: '12px 16px',
}));

export const ColIcon = styled(Box)(() => ({
  marginRight: '10px',
}));

export const ColMessage = styled(Box)(() => ({
  fontWeight: '400',
  marginBottom: '10px',
}));

export const MessageTitle = styled(Typography)(() => ({
  fontWeight: '400',
  marginBottom: '10px',
}));

export const MessageDesc = styled(Typography)(() => ({
  fontWeight: '300',
}));
