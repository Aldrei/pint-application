import * as React from 'react';

import { getBannerPhoto } from '../../helpers';

import { IBannerData } from '../../types';

interface IProps {
  i: number;
  banner: IBannerData;
  handleClick?: () => void;
}

const BannerGallery = ({ banner, i, handleClick }: IProps) => (
  <img
    data-testid={`banner-${i}`}
    src={getBannerPhoto(banner, 'thumb')}
    srcSet={getBannerPhoto(banner, 'thumb')}
    alt={banner.titulo}
    loading="lazy"
    onClick={() => {
      if (handleClick) handleClick();
    }}
  />
);

export default BannerGallery;