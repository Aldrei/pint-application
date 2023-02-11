import { styled } from '@mui/material/styles';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Chip from '@mui/material/Chip';
import ListMui from '@mui/material/List';

export const DialogStyled = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const ButtonProperties = styled(Button)();

export const ButtonOwners = styled(Button)();

export const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  minWidth: '600px',
  minHeight: '500px',
  borderTop: '1px solid 1px solid rgb(23,58,94)',
  borderBottom: '1px solid 1px solid rgb(23,58,94)',
  backgroundColor: theme.palette.background.default
}));

export const DialogHeaderStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default,
  margin: 0,
  padding: '1.2em'
}));

export const InputWrapper = styled(Box)(({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%'
}));

export const Input = styled(InputBase)(({
  width: '100%',
  marginLeft: '18px',
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  }
}));

export const ClearButton = styled(Button)(({
  padding: '3px 2px',
  fontSize: '10px',
  borderRadius: '5px',
  backgroundColor: 'rgb(0, 30, 60)',
  border: '1px solid rgb(23, 58, 94)',
  marginRight: '25px'
}));

export const List = styled(ListMui)(({
  marginTop: '1px'
}));

export const Content = styled(Box)(({
  marginTop: '1px'
}));

export const Footer = styled(Box)(({
  marginTop: '3px', 
  fontSize: '13px'
}));

export const Address = styled(Box)(({
  flexDirection: 'row', 
  alignItems: 'center'
}));

export const CodeWrapper = styled(Box)(({
  display: 'inline'
}));

export const Code = styled(Chip)(({
  marginBottom: '5px', 
  marginRight: '3px'
}));

export const CodePretty = styled(Chip)();