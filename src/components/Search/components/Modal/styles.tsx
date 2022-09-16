import { styled } from '@mui/material/styles';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
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
