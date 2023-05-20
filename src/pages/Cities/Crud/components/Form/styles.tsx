import { styled } from '@mui/material/styles';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export const BoxInfoValores = styled(Box)(({ theme }) => ({
  flexDirection: 'column',
  marginBottom: '10px',
  '& > .MuiPaper-root:nth-of-type(1)': {
    borderTopRightRadius: '10px'
  },
  '& > .MuiPaper-root:nth-of-type(2)': {
    margin: '0',
    borderRadius: '0',
    borderTop: 'none',
    borderBottom: 'none',
  },
  '& > .MuiPaper-root:nth-of-type(3)': {
    borderTopRightRadius: '0'
  },
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    '& > .MuiPaper-root:nth-of-type(1)': {
      borderTopRightRadius: '0'
    },
    '& > .MuiPaper-root:nth-of-type(2)': {
      margin: '0 10px',
      borderRadius: '0',
      border: '1px solid rgb(30, 73, 118)',
    },
    '& > .MuiPaper-root:nth-of-type(3)': {
      borderTopRightRadius: '10px'
    },
  },
}));

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

export const WrapperInfoHorizonStatus = styled(WrapperInfoHorizon)(({ theme }) => ({
  flexDirection: 'column',
  '& > .MuiBox-root:nth-of-type(2)': {
    padding: '0 16px'
  },
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
  }
}));

export const WrapperInfoHorizonSite = styled(WrapperInfoHorizon)(({ theme }) => ({
  flexDirection: 'column',
  '& > .MuiBox-root:nth-of-type(2)': {
    padding: '0 16px'
  },
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
  }
}));

export const WrapperInfoHorizonExclusividade = styled(WrapperInfoHorizon)(({ theme }) => ({
  flexDirection: 'column',
  '& > .MuiBox-root': {
    padding: '0 16px'
  },
  '& > .MuiBox-root:first-of-type': {
    paddingTop: '16px'
  },
  '& > .MuiBox-root:last-child': {
    paddingBottom: '16px'
  },
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    '& > .MuiBox-root': {
      padding: '16px 16px'
    },
  }
}));

export const WrapperInfoHorizonFeatures = styled(WrapperInfoHorizon)(({ theme }) => ({
  flexDirection: 'column',
  '& > .MuiBox-root': {
    padding: '0 16px',
  },
  '& > .MuiBox-root:first-of-type': {
    paddingTop: '16px'
  },
  '& > .MuiBox-root:last-child': {
    paddingBottom: '16px'
  },
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    '& > .MuiBox-root': {
      padding: '16px',
    },
  }
}));

export const BoxInfo = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flexGrow: 1,
  backgroundColor: theme.palette.background.default
}));

export const BoxInfoLocalidade = styled(BoxInfo)(({ theme }) => ({
  flexDirection: 'column',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
  }
}));

export const BoxInfoLocalidadeNumero = styled(BoxInfo)({
  backgroundColor: 'transparent',
  '& .MuiFormControl-root': {
    marginRight: '5px',
    '&:last-child': {
      marginRight: '0'
    }
  }
});

export const BoxInfoAreaTotal = styled(BoxInfo)(({ theme }) => ({
  padding: '16px 8px',
  [theme.breakpoints.up('sm')]: {
    padding: '16px',
  }
}));

export const BoxInfoAreaFrente = styled(BoxInfo)(({ theme }) => ({
  flexDirection: 'column',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
  }
}));

export const BoxInfoCity = styled(BoxInfo)(({ theme }) => ({
  flexDirection: 'column',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
  }
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

export const WrapperTitle = styled(Stack)(({
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

export const DividerSpacingRows = styled(Divider)(({
  border: 'none',
  margin: '20px 0'
}));

export const DividerBorderRows = styled(Divider)(({
  margin: '30px 0',
  borderColor: 'rgba(255, 255, 255, 0.03)'
}));

export const ChipCustom = styled(Chip)(({
  flexDirection: 'row'
}));

export const CheckCircleIconCustom = styled(CheckCircleIcon)(({
  color: '#66bb6a !important'
}));

export const CancelIconCustom = styled(CancelIcon)(({
  color: '#f44336 !important'
}));

export const Textarea = styled(TextareaAutosize)({
  width: '100%', 
  padding: '25px', 
  color: '#fff', 
  background: 'transparent', 
  border: '1px solid rgba(255, 255, 255, 0.1)', 
  borderRadius: '3px'
});

export const InputTextAdornmentContainer = styled(Box)({
  display: 'flex', 
  alignItems: 'flex-end', 
  flexDirection: 'row',
  '> .MuiInputBase-root': {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  '& .MuiInputAdornment-root': {
    flexDirection: 'row'
  }
});

export const InputTextAdornment = styled(InputAdornment)({
  background: '#e0e0e0',
  borderRadius: '25px',
  minHeight: '30px',
  maxHeight: '30px',
  height: '30px',
  minWidth: '30px',
  maxWidth: '30px',
  width: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '> .MuiTypography-root': {
    fontSize: '12px',
    color: '#000',
  }
});

export const InputText = styled(TextField)({
  display: 'flex', 
  alignItems: 'flex-end', 
  flexDirection: 'row',
  '> .MuiInputBase-root': {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  '& .MuiInputAdornment-root': {
    flexDirection: 'column-reverse'
  }
});

export const FormControlSelect = styled(FormControl)({
  flexGrow: 1, 
  '& .MuiSelect-select': { 
    paddingRight: '0 !important',
    padding: '4px 0 5px'
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  },
  '& .MuiInput-root': {
    marginTop: '16px'
  }
});

export const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-root': {
    marginRight: '5px'
  },
  '& .MuiSwitch-switchBase': {
    top: '-3px',
    left: '-3px',
  },
  '& .MuiSwitch-switchBase.Mui-checked': {
    top: '-3px',
    left: '-5px',
  },
  '& .MuiSvgIcon-root': {
    width: '1.1em',
    height: '1.1em'
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {

    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));
