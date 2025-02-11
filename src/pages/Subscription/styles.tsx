import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';

export const StripeContainer = styled(Box)(({ theme }) => ({
  alignSelf: 'center',
  marginTop: '15%',
  [theme.breakpoints.up('md')]: {
    '& .cardComp': {
      width: '500px'
    }
  }
}));

export const Row = styled(Box)(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between'
}));

export const ButtonContainer = styled(Box)(() => ({
  marginTop: '25px'
}));

export const MessageContainer = styled(Box)(() => ({
  marginTop: '25px'
}));

export const AvailablePaymentsContainer = styled(Box)(() => ({
  marginBottom: '25px'
}));
