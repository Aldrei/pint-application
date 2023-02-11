import * as React from 'react';

import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

const PropertiesSearchSkeleton = () => {
  return (
    <Box>
      <Skeleton sx={{ width: '100%', height: '90px', transform: 'unset', marginBottom: '10px' }}/>
      <Skeleton sx={{ width: '100%', height: '90px', transform: 'unset', marginBottom: '10px' }}/>
    </Box>
  );
};

export default PropertiesSearchSkeleton;
