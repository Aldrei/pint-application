import { styled } from '@mui/material/styles';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const DialogStyled = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const ButtonProperties = styled(Button)(() => ({

}));

export const ButtonOwners = styled(Button)(() => ({

}));

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

export const DialogInputWrapper = styled(Box)(({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%'
}));

export const DialogInput = styled(TextField)(({
  width: '100%',
  marginLeft: '18px',
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  }
}));