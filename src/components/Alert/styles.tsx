import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';

export const AlertContainer = styled(Box)(() => ({
  flexDirection: 'row',
  borderRadius: '4px',
  boxShadow: 'none',
  lineHeight: '1.43',
  letterSpacing: '0.01071em',
  color: 'white',
  padding: '12px 16px',
  '> div': {
    flexDirection: 'row',
  }
}));

