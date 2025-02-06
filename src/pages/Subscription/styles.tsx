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

export const Row = styled(Box)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between'
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
  marginTop: '25px'
}));

export const MessageContainer = styled(Box)(({ theme }) => ({
  marginTop: '25px'
}));
