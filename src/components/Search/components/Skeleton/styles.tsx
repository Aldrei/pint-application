import { styled } from '@mui/material/styles';

import Skeleton from '@mui/material/Skeleton';

export const RowSkeleton = styled(Skeleton)(({
  width: '100%', 
  height: '90px', 
  transform: 'unset', 
  marginBottom: '10px'
}));
