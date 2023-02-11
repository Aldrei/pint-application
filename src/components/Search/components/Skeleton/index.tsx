import * as React from 'react';

import Box from '@mui/material/Box';

import { RowSkeleton } from './styles';

const PropertiesSearchSkeleton = () => {
  return (
    <Box>
      <RowSkeleton />
      <RowSkeleton />
    </Box>
  );
};

export default PropertiesSearchSkeleton;
