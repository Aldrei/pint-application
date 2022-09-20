import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

import { MENU } from '../../../../constants';

import { BootstrapDialog, ButtonProperties, ButtonOwners } from './styles';

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle 
      sx={{ m: 0, p: 2 }} 
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

interface IModal {
  open: boolean;
  handleClose: () => void;
}

const Modal = ({ handleClose, open }: IModal) => {
  return (
    <Box>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          style: {
            backgroundColor: 'rgb(19, 47, 76)',
            borderRight: '1px solid rgb(23, 58, 94)'
          }
        }}
        maxWidth="md"
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Typography sx={{ color: (theme) => theme.palette.grey[500] }}>O que você procura?</Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers style={{ minWidth: '600px', borderTop: '1px solid 1px solid rgb(23,58,94)', borderBottom: '1px solid 1px solid rgb(23,58,94)' }}>
          <Box style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <ButtonProperties
              startIcon={MENU.PART_ONE.IMOVEIS.icon} 
              variant="outlined"
              style={{
                border: '1px solid rgb(23, 58, 94)',
                borderRadius: '10px',
                padding: '20px',
                width: '45%'
              }}  
            >
              Imóveis
            </ButtonProperties>
            <ButtonOwners 
              startIcon={MENU.PART_ONE.CLIENTES.icon} 
              variant="outlined"
              style={{
                border: '1px solid rgb(23, 58, 94)',
                borderRadius: '10px',
                padding: '20px',
                width: '45%'
              }}  
            >
              Proprietários
            </ButtonOwners>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Buscar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
};

export default Modal;