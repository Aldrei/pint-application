import * as React from 'react';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

import { 
  DialogStyled, 
  DialogHeaderStyled,
  DialogContentStyled,
  DialogInputWrapper,
  DialogInput
} from './styles';

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogHeaderStyled
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            padding: 0
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogHeaderStyled>
  );
};

interface IModal {
  open: boolean;
  handleClose: () => void;
}

const Modal = ({ handleClose, open }: IModal) => {
  const theme = useTheme();

  return (
    <Box>
      <DialogStyled
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          style: {
            backgroundColor: theme.palette.background.default,
            borderRight: '1px solid rgb(23, 58, 94)'
          }
        }}
        maxWidth="md"
        scroll='paper'
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          <DialogInputWrapper>
            <SearchIcon fontSize='large' />
            <DialogInput variant="outlined" placeholder='Código, rua, proprietário...' />
          </DialogInputWrapper>
        </BootstrapDialogTitle>
        <DialogContentStyled dividers>
          
        </DialogContentStyled>
      </DialogStyled>
    </Box>
  );
};

export default Modal;