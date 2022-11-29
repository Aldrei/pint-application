import * as React from 'react';

import Skeleton from '@mui/material/Skeleton';

import { SkeletonContainer, SkeletonBox } from './styles';

const PhotosSkeleton = () => {
  return (
    <SkeletonContainer>
      <SkeletonBox>
        <Skeleton width={200} height={200} />
      </SkeletonBox>
      <SkeletonBox>
        <Skeleton width={200} height={200} />
      </SkeletonBox>
      <SkeletonBox>
        <Skeleton width={200} height={200} />
      </SkeletonBox>
      <SkeletonBox>
        <Skeleton width={200} height={200} />
      </SkeletonBox>
    </SkeletonContainer>
  );
};

export default PhotosSkeleton;