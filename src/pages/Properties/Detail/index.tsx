import * as React from 'react';

import List from '@mui/material/List';
import ImageList from '@mui/material/ImageList';
import LocationOffIcon from '@mui/icons-material/LocationOff';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';

import { useParams } from 'react-router-dom';

/**
 * Leaflet Maps.
 */
import {
  MapContainer,
  TileLayer,
  Circle,
} from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

import { useAppDispatch } from '../../../hooks/useReducerDispatch';
import { propertiesShowThunk, IPropertiesShowServiceRequest } from '../../../reducers/properties/show';
import { propertiesPhotosThunk, IPropertiesPhotosServiceRequest } from '../../../reducers/properties/photos/list';

import { useAppSelectorBlaBlaBal } from '../../../hooks/useReducerSelector';
import { useBreakpoints } from '../../../hooks/useBreakpoints';

import { IPropertyData, IPropertyShow, IPhotoData, IPaginateDefault } from '../../../types';

import { hasProperty } from '../../../helpers';

import PropertyVideoPlayer from '../../../components/PropertyVideoPlayer';
import Lightbox from '../../../components/Lightbox';

import PropertyDetailItemSkeleton from './components/Skeleton';
import Info from './components/Info';

import { PropertiesContainer, WrapperMap, WrapperNoMap, WrapperMapInfo, WrapperNoMapDesc, WrapperPhoto } from './styles';
import PropertyPhotoGallery from '../../../components/PropertyPhotoGallery';

interface IPaginate {
  code: string;
  data: IPropertyData | null;
  photos: IPhotoData[] | null
}

const PropertiesDetail = () => {
  const { code } = useParams();

  const [openLightbox, setOpenLightbox] = React.useState(false);
  const [photoLightbox, setPhotoLightbox] = React.useState<IPhotoData | null>();

  const [goSm, goMd, goLg, goXl] = useBreakpoints();

  const propertiesShowReducerData = useAppSelectorBlaBlaBal('propertiesShowReducer') as IPropertiesShowServiceRequest;
  const PROPERTIES_STATUS = propertiesShowReducerData.status;
  const PROPERTIES_DETAIL = propertiesShowReducerData.data as IPropertyShow;

  const propertiesPhotosReducerData = useAppSelectorBlaBlaBal('propertiesPhotosReducer') as IPropertiesPhotosServiceRequest;
  const PROPERTIES_PHOTOS = propertiesPhotosReducerData.data as IPaginateDefault;
  // const PROPERTIES_PHOTOS_STATUS = propertiesPhotosReducerData.status;

  const dispatch = useAppDispatch();

  const paginate: IPaginate = {
    code: code as string,
    data: hasProperty(PROPERTIES_DETAIL, 'property.data') ? PROPERTIES_DETAIL.property.data as unknown as IPropertyData : null,
    photos: hasProperty(PROPERTIES_PHOTOS, 'paginate.data') ? PROPERTIES_PHOTOS.paginate.data as unknown as IPhotoData[] : []
  };

  React.useEffect(() => {
    dispatch(propertiesShowThunk(paginate.code));
    dispatch(propertiesPhotosThunk(paginate.code));
  }, []);

  const resolveGrid = () => {
    if (goXl) return 6;
    if (goLg) return 5;
    if (goMd) return 4;
    if (goSm) return 2;
    return 1;
  };

  /* istanbul ignore next */ 
  const onCloseLightbox = () => { 
    setOpenLightbox(false);
    setPhotoLightbox(null);
  };

  /* istanbul ignore next */ 
  const onOpenLightbox = (item: IPhotoData) => { 
    setOpenLightbox(true);
    setPhotoLightbox(item);
  };

  const standardImageList = () => (
    <ImageList 
      cols={resolveGrid()} 
      rowHeight={120} 
    >
      {paginate.photos ? paginate.photos.map((item: IPhotoData, i) => (
        <WrapperPhoto key={String(i)} sx={{ overflow: 'hidden' }}>
          <PropertyPhotoGallery photo={item} i={i} handleClick={() => onOpenLightbox(item)} />
        </WrapperPhoto>
      )) : <React.Fragment />}
    </ImageList>
  );

  const infosComp = () => (
    <List style={{ width: '100%' }}>
      <React.Fragment>
        <Info property={Object.assign({}, paginate.data)} />
      </React.Fragment>
    </List>
  );

  const resolveLatLon = (): LatLngExpression | undefined => {
    if (!paginate.data) return undefined;
    if (paginate.data.latitude && paginate.data.longitude) return [Number(paginate.data.latitude), Number(paginate.data.longitude)];
    return undefined;
  };

  const resolveMap = () => {
    if (!paginate.data) return null;

    if (!paginate.data.latitude || !paginate.data.longitude)
      return (
        <WrapperNoMap>
          <WrapperNoMapDesc>
            <LocationOffIcon /> Mapa não foi configurado para este imóvel.
          </WrapperNoMapDesc>
        </WrapperNoMap>
      );

    if (paginate.data.latitude && paginate.data.longitude && paginate.data.zoom)
      return (
        <WrapperMap>
          {paginate.data.sitePublicarMapa !== 1
            ? (<WrapperMapInfo><NotListedLocationIcon /> Mapa configurado mas não publicado no site.</WrapperMapInfo>)
            : (<WrapperMapInfo><LocationOnIcon /> Mapa configurado e publicado no site.</WrapperMapInfo>)
          }
          <MapContainer
            center={resolveLatLon()}
            zoom={Number(paginate.data.zoom)}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {resolveLatLon() && <Circle
              center={[Number(paginate.data.latitude), Number(paginate.data.longitude)]}
              fillColor="#829FD9"
              radius={500}
            />}
          </MapContainer>
        </WrapperMap>
      );
  };

  const StandardImageListMemorized = React.useCallback(() => standardImageList(), [paginate.photos]);
  const InfosCompMemorized = React.useCallback(() => infosComp(), [paginate.data]);

  return (
    <PropertiesContainer data-testid='propertiesList-container'>
      {PROPERTIES_STATUS === 'loading' ? <PropertyDetailItemSkeleton /> : (
        <React.Fragment>
          {resolveMap()}
          <PropertyVideoPlayer property={paginate.data || null} />
          <StandardImageListMemorized />
          <Lightbox
            open={openLightbox} 
            onClose={onCloseLightbox}
            dataPhoto={photoLightbox || null}
          />
          <InfosCompMemorized />
        </React.Fragment>
      )}
    </PropertiesContainer>
  );
};

export default PropertiesDetail;