import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';

export const LoginContainer = styled(Box)(({ theme }) => ({
  alignSelf: 'center',
  marginTop: '15%',
  [theme.breakpoints.up('md')]: {
    '& .cardComp': {
      width: '500px'
    }
  }
}));
