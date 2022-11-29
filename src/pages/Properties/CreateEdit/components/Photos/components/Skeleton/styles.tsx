import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';

export const SkeletonContainer = styled(Box)(() => ({
  flexDirection: 'row',
  justifyContent: 'center'
}));

export const SkeletonBox = styled(Box)(() => ({
  margin: '2px'
}));
