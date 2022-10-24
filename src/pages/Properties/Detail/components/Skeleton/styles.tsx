import { styled } from '@mui/material/styles';

import ListItemMui from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Box from '@mui/material/Box';

export const AvatarWrapper = styled(ListItemAvatar)(({ theme }) => ({
  alignItems: 'center',
  width: 'max-content',
  margin: '0 5px',
  '& .MuiSkeleton-root': {
    width: '65px',
    height: '110px'
  },
  [theme.breakpoints.up('sm')]: {
    '& .MuiSkeleton-root': {
      width: '105px',
      height: '145px'
    }
  },
  [theme.breakpoints.up('lg')]: {
    '& .MuiSkeleton-root': {
      width: '200px',
      height: '170px'
    }
  },
}));

export const ListItem = styled(ListItemMui)(({ theme }) => ({
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  border: '1px solid rgba(255, 255, 255, 0.13)',
  marginBottom: '5px',
  borderRadius: '5px',
  padding: '12px 20px',
  [theme.breakpoints.up('lg')]: {
    flexDirection: 'row',
  }
}));

export const Box2 = styled(Box)(() => ({
  maxWidth: '100%',
  width: '100%',
}));
