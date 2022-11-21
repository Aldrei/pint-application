import { styled } from '@mui/material/styles';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export const PhotosContainer = styled(ImageList)(() => ({
  // gridTemplate: 'unset !important',
  // gridTemplateColumns: 'unset !important',
  // gap: 'unset !important',
  borderRadius: '5px',
  overflow: 'hidden',
  cursor: 'move',
}));

export const PhotoWrapper = styled(ImageListItem)(() => ({
  borderRadius: '5px',
  overflow: 'hidden',
  cursor: 'move',
}));
