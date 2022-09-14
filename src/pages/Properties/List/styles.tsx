import { styled } from '@mui/system';

import ListItemMui from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import AvatarMui from '@mui/material/Avatar';
import Box from '@mui/material/Box';

import styledComp from 'styled-components';

export const PropertiesContainer = styledComp.div`
  width: 80%;
  align-self: center;
  margin-top: 50px;
  margin-bottom: 50px;
  
  @media (min-width: 768px) {
    /* .cardComp {
      width: 500px;
    } */
  }
`;

export const AvatarWrapper = styled(ListItemAvatar)(({ theme }) => ({
  width: '100%',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    // width: '95px',
  },
}));

export const Avatar = styled(AvatarMui)(() => ({
  width: '75px', 
  height: '75px'
}));

export const ListItem = styled(ListItemMui)(({ theme }) => ({
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  backgroundColor: 'rgb(19, 47, 76)',
  border: '1px solid rgb(23, 58, 94)',
  marginBottom: '5px',
  borderRadius: '5px',
  padding: '12px 20px',
  [theme.breakpoints.between('md', 'lg')]: {
    // backgroundColor: 'red !important'
  },
  [theme.breakpoints.up('lg')]: {
    flexDirection: 'row',
  },
}));

export const ListItemTextStyle = styled(ListItemText)(() => ({
  flex: 'unset',
  width: '100%',
  maxWidth: '100%',
  textAlign: 'center'
}));

export const Box2 = styled(Box)(() => ({
  maxWidth: '100%',
  width: '100%'
}));

export const Box3 = styled(Box)(() => ({
  margin: '5px 0 2px 0',
  width: 'max-content'
}));

export const Box4 = styled(Box)(() => ({
  margin: '12px 0',
  width: '100%'
}));

export const Actions = styled(Box)(() => ({
  flexGrow: 1,
  width: '100%',
  padding: '0 10px',
}));

export const SubActions = styled(Box)(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: '15px'
}));
