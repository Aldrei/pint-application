import * as React from 'react';

import Box from '@mui/material/Box';

import { RowSkeleton } from './styles';

const SearchSkeleton = () => {
  return (
    <Box>
      <RowSkeleton />
      <RowSkeleton />
    </Box>
  );
};

export default SearchSkeleton;
