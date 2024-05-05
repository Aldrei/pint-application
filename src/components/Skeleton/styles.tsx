import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';

export const SkeletonContainer = styled(Box)<{ $direction: 'row' | 'column' }>(({ theme, $direction }) => ({
  flexDirection: $direction,
  justifyContent: 'center',
  alignItems: 'center',
  '& span.MuiSkeleton-root': {
    transform: 'unset',
    margin: '3px',
    ...($direction === 'row' ? {
      width: '25%',
      height: '165px',
    }: {
      width: '100%',
      height: '115px'
    })
  }
}));
