import * as React from 'react';

import Skeleton from '@mui/material/Skeleton';

import { SkeletonContainer, SkeletonBox } from './styles';

const PhotosSkeleton = () => {
  return (
    <SkeletonContainer>
      <SkeletonBox>
        <Skeleton width={185} />
      </SkeletonBox>
      <SkeletonBox>
        <Skeleton width={185} />
      </SkeletonBox>
      <SkeletonBox>
        <Skeleton width={185} />
      </SkeletonBox>
      <SkeletonBox>
        <Skeleton width={185} />
      </SkeletonBox>
    </SkeletonContainer>
  );
};

export default PhotosSkeleton;