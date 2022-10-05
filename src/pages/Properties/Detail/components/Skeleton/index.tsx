import React from 'react';

import Skeleton from '@mui/material/Skeleton';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import { AvatarWrapper, ListItem, Box2 } from '../../styles';

const PropertyDetailItemSkeleton = () => {
  const renderItem = () => (
    <React.Fragment>
      <Box2 style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <AvatarWrapper>
          <Skeleton width={200} height={170} />
        </AvatarWrapper>
        <AvatarWrapper>
          <Skeleton width={200} height={170} />
        </AvatarWrapper>
        <AvatarWrapper>
          <Skeleton width={200} height={170} />
        </AvatarWrapper>
        <AvatarWrapper>
          <Skeleton width={200} height={170} />
        </AvatarWrapper>
      </Box2>
      <ListItem>
        <Box2>
          <Skeleton width="100%" height={40} />
          <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Skeleton width={120} height={40} style={{ marginRight: '15px' }} />
            <Skeleton width={120} height={40} />
          </Box>
          <Skeleton width="100%" height={40} />
        </Box2>
      </ListItem>
      <Box2 style={{ padding: '20px' }}>
        <Skeleton width="100%" height={40} />
        <Skeleton width="100%" height={40} />
        <Skeleton width="100%" height={40} />
      </Box2>
      <ListItem>
        <Box2>
          <Skeleton width="100%" height={40} />
          <Skeleton width="100%" height={40} />
        </Box2>
      </ListItem>
      <Box2 style={{ padding: '20px' }}>
        <Skeleton width="100%" height={40} />
        <Skeleton width="100%" height={40} />
      </Box2>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <List style={{ width: '100%' }}>
        {renderItem()}
      </List>
    </React.Fragment>
  );
};

export default PropertyDetailItemSkeleton;