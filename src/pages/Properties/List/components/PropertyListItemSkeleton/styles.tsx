import { styled } from '@mui/material/styles';

import ListItemMui from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Box from '@mui/material/Box';

export const ListItem = styled(ListItemMui)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default,
  border: '1px solid rgb(23, 58, 94)',
  marginBottom: '15px',
  borderRadius: '5px',
  overflow: 'hidden',
  padding: '20px 30px',
}));

export const AvatarWrapper = styled(ListItemAvatar)(({ theme }) => ({
  width: '100%',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    width: 'max-content',
    paddingRight: '12px'
  },
}));

export const Box2 = styled(Box)(() => ({
  maxWidth: '100%',
  width: '100%',
  paddingRight: '10px'
}));

export const Actions = styled(Box)(({ theme }) => ({
  width: '100%',
  paddingLeft: '12px',
  [theme.breakpoints.up('md')]: {
    width: '230px', 
    alignItems: 'stretch'
  },
  [theme.breakpoints.up('lg')]: {
    width: '175px', 
    alignItems: 'stretch'
  }
}));
