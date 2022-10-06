import React from 'react';

import Skeleton from '@mui/material/Skeleton';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import { AvatarWrapper, ListItem, Box2, Actions } from './styles';

const PropertyListItemSkeleton = () => {
  const renderItem = () => (
    <ListItem>
      <AvatarWrapper>
        <Skeleton width={75} height={75} variant="circular" />
        <Box width={{ width: '130px' }}>
          <Skeleton width="100%" height={50} style={{ borderRadius: '16px' }} />
        </Box>
      </AvatarWrapper>
      <Box2>
        <Skeleton width="100%" height={40} />
        <Skeleton width="100%" height={40} />
        <Skeleton width="100%" height={40} />
      </Box2>
      <Actions style={{ width: '30%' }}>
        <Skeleton width="100%" height={40} style={{ borderRadius: '16px' }} />
        <Skeleton width="100%" height={40} style={{ borderRadius: '16px' }} />
        <Box style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Skeleton width={60} height={40} style={{ borderRadius: '16px' }} />
          <Skeleton width={35} height={35} variant="circular" />
        </Box>
      </Actions>
    </ListItem>
  );

  return (
    <React.Fragment>
      <List style={{ width: '100%' }}>
        {renderItem()}
        {renderItem()}
        {renderItem()}
      </List>
    </React.Fragment>
  );
};

export default PropertyListItemSkeleton;