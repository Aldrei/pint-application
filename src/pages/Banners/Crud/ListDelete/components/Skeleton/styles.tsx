import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';

export const SkeletonContainer = styled(Box)(({ theme }) => ({
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
  }
}));

export const SkeletonBox = styled(Box)(() => ({
  margin: '2px',
  '& .MuiSkeleton-root': {
    transform: 'unset',
    height: '135px'
  }
}));
