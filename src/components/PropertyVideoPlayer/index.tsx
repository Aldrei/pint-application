import React from 'react';

import VideocamOffIcon from '@mui/icons-material/VideocamOff';

import { hasProperty } from '../../helpers';

import { IPropertyData } from '../../types';

import { VideoContainer, VideoWrapper, VideoInfoWrapper, VideoInfo } from './styles';

interface IProps {
  property: IPropertyData | null;
}

const PropertyVideoPlayer = ({ property }: IProps) => {

  if (!property || !hasProperty(property, 'video.data')) return null;

  return (
    <VideoContainer>
      {hasProperty(property, 'video.data.url') ? (
        <VideoWrapper>
          <video src={`${property.video.data.url}#t=2`} autoPlay={false} controls preload="metadata" height="350px">
            Seu navegador não suporta vídeos incorporados.
          </video>
        </VideoWrapper>
      ) : (
        <VideoInfoWrapper>
          <VideoInfo>
            <VideocamOffIcon /> Imóvel sem vídeo.
          </VideoInfo>
        </VideoInfoWrapper>
      )}
    </VideoContainer>
  );
};

export default PropertyVideoPlayer;