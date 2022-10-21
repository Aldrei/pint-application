import { styled } from '@mui/material/styles';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


export const WrapperInfo = styled(Card)(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: theme.palette.background.default,
  border: '1px solid rgb(30, 73, 118)',
  borderRadius: '10px',
}));

export const WrapperInfoHorizon = styled(Card)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-around',
  backgroundImage: 'unset',
  backgroundColor: theme.palette.background.default,
  border: '1px solid rgb(30, 73, 118)',
  borderRadius: '10px',
}));

export const BoxInfo = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default
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
  color: theme.palette.text.secondary,
  fontWeight: 400
}));

export const Text = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 100,
}));

export const DividerSpacingRows = styled(Divider)(() => ({
  border: 'none',
  margin: '20px 0'
}));

export const DividerBorderRows = styled(Divider)(({
  margin: '30px 0',
  borderColor: 'rgba(255, 255, 255, 0.03)'
}));

export const ChipCustom = styled(Chip)(() => ({
  flexDirection: 'row'
}));

export const CheckCircleIconCustom = styled(CheckCircleIcon)(() => ({
  color: '#66bb6a !important'
}));

export const CancelIconCustom = styled(CancelIcon)(() => ({
  color: '#f44336 !important'
}));
