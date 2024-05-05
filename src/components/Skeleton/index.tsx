
import Skeleton from '@mui/material/Skeleton';

import { SkeletonContainer } from './styles';

interface IProps {
  direction?: 'row' | 'column';
}

const SkeletonComponent = ({ direction = 'column' }: IProps) => {
  return (
    <SkeletonContainer $direction={direction}>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </SkeletonContainer>
  );
};

export default SkeletonComponent;