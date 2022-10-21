import { styled } from '@mui/material/styles';

import ImageListItem from '@mui/material/ImageListItem';
import ListItemMui from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import AvatarMui from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const PropertiesContainer = styled(Box)(({ theme }) => ({
  width: '80%',
  alignSelf: 'center',
  marginTop: '25px',
  marginBottom: '50px',
  [theme.breakpoints.up('lg')]: {
    width: '75%',
  },
  [theme.breakpoints.up('xl')]: {
    width: '65%',
  }
}));

export const AvatarWrapper = styled(ListItemAvatar)(({ theme }) => ({
  width: '100%',
  alignItems: 'center',
  [theme.breakpoints.up('lg')]: {
    width: 'max-content',
    paddingRight: '12px'
  },
}));

export const Avatar = styled(AvatarMui)(({
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
  [theme.breakpoints.up('lg')]: {
    flexDirection: 'row',
  }
}));

export const ListItemTextStyle = styled(ListItemText)(({
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

export const Box4 = styled(Box)(({
  margin: '12px 0',
  width: '100%'
}));

export const WrapperMap = styled(Box)(() => ({
  border: '1px solid rgb(30, 73, 118)',
  borderRadius: '10px',
  position: 'relative',
  overflow: 'hidden',
  zIndex: '30',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: '1',
  '> div': {
    height: '100%',
    minHeight: '300px'
  },
  '& .leaflet-pane': {
    // flexDirection: 'row'
  }
}));

export const WrapperNoMap = styled(Box)(() => ({
  border: '1px solid rgb(30, 73, 118)',
  borderRadius: '10px',
  position: 'relative',
  overflow: 'hidden',
  zIndex: '30',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: '1',
  alignItems: 'center',
  justifyContent: 'center',
  height: '70px'
}));

export const WrapperNoMapDesc = styled(Typography)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px 30px',
  '& .MuiSvgIcon-root': {
    marginRight: '5px'
  }
}));

export const WrapperMapInfo = styled(Typography)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  padding: '15px 30px',
  '& .MuiSvgIcon-root': {
    marginRight: '5px'
  }
}));

export const WrapperPhoto = styled(ImageListItem)(() => ({
  borderRadius: '5px',
  overflow: 'hidden'
}));
