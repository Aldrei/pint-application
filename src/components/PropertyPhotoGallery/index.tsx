
import { getPhoto } from '../../helpers';

import { IPhotoData } from '../../types';

interface IProps {
  i: number;
  photo: IPhotoData;
  handleClick?: () => void;
}

const PropertyPhotoGallery = ({ photo, i, handleClick }: IProps) => (
  <img
    data-testid={`photo-${i}`}
    src={getPhoto(photo, 'normal')}
    srcSet={getPhoto(photo, 'normal')}
    alt={photo.name}
    loading="lazy"
    style={{ ...(photo.rotate ? { rotate: `${photo.rotate}deg` } : undefined) }}
    onClick={() => {
      if (handleClick) handleClick();
    }}
  />
);

export default PropertyPhotoGallery;