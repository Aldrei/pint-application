import { styled } from '@mui/material/styles';

import ListItemMui from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import AvatarMui from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

export const PropertiesContainer = styled(Box)(({ theme }) => ({
  width: '90%',
  alignSelf: 'center',
  marginTop: '10px',
  marginBottom: '50px',
  [theme.breakpoints.up('lg')]: {
    width: '85%'
  },
  [theme.breakpoints.up('xl')]: {
    width: '65%'
  }
}));

export const BoxInfo = styled(Box)(({ theme }) => ({
  alignItems: 'stretch',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '100%',
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  }
}));

export const WrapperDormGar = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  maxWidth: '100%',
  padding: '0',
  marginBottom: '8px',
  background: 'transparent', 
  backgroundImage: 'unset', 
  '& .MuiChip-root': {
    marginRight: '10px'
  },
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  }
}));

export const AvatarWrapper = styled(ListItemAvatar)(({ theme }) => ({
  width: '100%',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    width: 'max-content',
    paddingRight: '12px'
  },
}));

export const Avatar = styled(AvatarMui)(() => ({
  width: '75px', 
  height: '75px'
}));

export const Codes = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  margin: '10px 0',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'column',
  }
}));

export const ListItem = styled(ListItemMui)(({ theme }) => ({
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default,
  border: '1px solid rgb(23, 58, 94)',
  marginBottom: '15px',
  borderRadius: '5px',
  overflow: 'hidden',
  padding: '0',
  '&:last-child': {
    marginBottom: '0'
  }
}));

export const StackStatus = styled(Stack)(() => ({
  flex: 'unset',
  width: '100%',
  maxWidth: '100%',
  textAlign: 'center'
}));

export const Box4 = styled(Box)(() => ({
  margin: '8px 0',
  width: '100%'
}));

export const StackSite = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  margin: '0',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    '> div.MuiChip-root': {
      margin: '0',
      marginRight: '5px'
    }
  }
}));

export const Actions = styled(Box)(({ theme }) => ({
  width: '100%',
  paddingLeft: '12px',
  marginTop: '10px',
  [theme.breakpoints.up('md')]: {
    width: '230px', 
    alignItems: 'stretch'
  },
  [theme.breakpoints.up('lg')]: {
    width: '175px', 
    alignItems: 'stretch'
  }
}));

export const SubActions = styled(Box)(() => ({
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '15px'
}));

export const WrapperIconFeatures = styled(Chip)(() => ({
  flexDirection: 'row',
  justifyContent: 'left'
}));

export const WrapperStack = styled(Stack)(({ theme }) => ({
  width: '100%',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.paper,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  paddingRight: theme.spacing(4),
  paddingLeft: theme.spacing(4),
}));

export const WrapperTitle = styled(Stack)(() => ({
  flexGrow: 1,
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

export const ChipCustom = styled(Chip)(() => ({
  flexDirection: 'row'
}));

export const WrapperOwner = styled(Box)(() => ({
  marginTop: '0 !important'
}));

export const ActionsContainer = styled(Box)({
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: '10px'
});
