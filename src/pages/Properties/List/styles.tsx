import { styled } from '@mui/system';

import ListItemMui from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import AvatarMui from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

import styledComp from 'styled-components';

export const PropertiesContainer = styledComp.div`
  width: 80%;
  align-self: center;
  margin-top: 50px;
  margin-bottom: 50px;
  
  @media (min-width: 1200px) {
    width: 85%;
  }

  @media (min-width: 1350px) {
    width: 75%;
  }

  @media (min-width: 1550px) {
    width: 65%;
  }
`;

export const AvatarWrapper = styled(ListItemAvatar)(({ theme }) => ({
  width: '100%',
  alignItems: 'center',
  [theme.breakpoints.up('lg')]: {
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
  [theme.breakpoints.up('lg')]: {
    flexDirection: 'column',
  }
}));

export const ListItem = styled(ListItemMui)(({ theme }) => ({
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default,
  border: '1px solid rgb(23, 58, 94)',
  marginBottom: '5px',
  borderRadius: '5px',
  padding: '12px 20px',
  [theme.breakpoints.up('lg')]: {
    flexDirection: 'row',
  }
}));

export const ListItemTextStyle = styled(ListItemText)(() => ({
  flex: 'unset',
  width: '100%',
  maxWidth: '100%',
  textAlign: 'center'
}));

export const Box2 = styled(Box)(() => ({
  maxWidth: '100%',
  width: '100%',
  paddingRight: '10px'
}));

export const Box3 = styled(Box)(({ theme }) => ({
  margin: '5px 0 2px 0',
  width: 'max-content',
  [theme.breakpoints.up('lg')]: {
    width: '100%',
  }
}));

export const Box4 = styled(Box)(() => ({
  margin: '12px 0',
  width: '100%'
}));

export const Actions = styled(Box)(({ theme }) => ({
  width: '100%',
  paddingLeft: '12px',
  [theme.breakpoints.up('lg')]: {
    width: '50%'
  }
}));

export const SubActions = styled(Box)(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: '15px'
}));

export const WrapperIconFeatures = styled(Chip)(() => ({
  flexDirection: 'row',
  justifyContent: 'left'
}));
