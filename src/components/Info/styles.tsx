import { styled } from '@mui/material/styles';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export const WrapperInfo = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  border: '1px solid rgb(30, 73, 118)',
  borderRadius: '10px',
}));

export const BoxInfo = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
}));

export const WrapperStack = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.paper,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  paddingRight: theme.spacing(4),
  paddingLeft: theme.spacing(4),
}));

export const WrapperTitle = styled(Stack)(() => ({
  backgroundColor: 'inherit',
  margin: '0 20px'
}));

export const Title = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alighItems: 'center',
  color: theme.palette.text.primary,
  fontWeight: 400
}));

export const Text = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 100,
}));
