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
  // Marker,
  Circle,
  // CircleMarker,
  // Popup,
} from 'react-leaflet';

import { useAppDispatch } from '../../../stores/hooks';
import { propertiesShowThunk, IPropertiesShowServiceRequest } from '../../../reducers/properties/show';
import { propertiesPhotosThunk, IPropertiesPhotosServiceRequest } from '../../../reducers/properties/photos';

import { useAppSelectorBlaBlaBal } from '../../../hooks/useReducerSelector';
import { useBreakpoints } from '../../../hooks/useBreakpoints';

import { IPropertyData, IPropertyShow, IPhotoData, IPaginateDefault } from '../../../types';

import { hasProperty, getPhoto } from '../../../helpers';

import PropertyDetailItemSkeleton from './components/Skeleton';
import Info from './components/Info';

import { PropertiesContainer, WrapperMap, WrapperNoMap, WrapperMapInfo, WrapperNoMapDesc, WrapperPhoto } from './styles';

import { PROPERTIES_DETAIL } from '../../../mocks/constants';
/**
 * Mock test.
*/
// sitePublicarMapa: 1
// longitude: "-51.12821459770203"
// latitude: "-29.70788484478129"

PROPERTIES_DETAIL.property.data.sitePublicarMapa = 0;
// PROPERTIES_DETAIL.property.data.latitude = '';
// PROPERTIES_DETAIL.property.data.longitude = '';
PROPERTIES_DETAIL.property.data.zoom = 15;

interface IPaginate {
  code: string;
  data: IPropertyData | null;
  photos: IPhotoData[] | null
}

const PropertiesDetail = () => {
  const { code } = useParams();

  const [goSm, goMd, goLg, goXl] = useBreakpoints();

  const propertiesShowReducerData = useAppSelectorBlaBlaBal('propertiesShowReducer') as IPropertiesShowServiceRequest;
  const PROPERTIES_STATUS = propertiesShowReducerData.status;
  // const PROPERTIES_DETAIL = propertiesShowReducerData.data as IPropertyShow;

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

  const standardImageList = () => (
    <ImageList 
      cols={resolveGrid()} 
      rowHeight={120} 
    >
      {paginate.photos ? paginate.photos.map((item: IPhotoData, i) => (
        <WrapperPhoto key={String(i)} sx={{ overflow: 'hidden' }}>
          <img
            src={getPhoto(item, 'thumb')}
            srcSet={getPhoto(item, 'thumb')}
            alt={item.name}
            loading="lazy"
          />
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

    if (paginate.data.latitude && paginate.data.longitude)
      return (
        <WrapperMap>
          {!paginate.data.sitePublicarMapa 
            ? (<WrapperMapInfo><NotListedLocationIcon /> Mapa configurado mas não publicado no site.</WrapperMapInfo>)
            : (<WrapperMapInfo><LocationOnIcon /> Mapa configurado e publicado no site.</WrapperMapInfo>)
          }
          <MapContainer
            center={[paginate.data.latitude, paginate.data.longitude]}
            zoom={paginate.data.zoom || undefined}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Circle
              center={[paginate.data.latitude, paginate.data.longitude]}
              fillColor="#829FD9"
              radius={500}
            />
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
          <StandardImageListMemorized />
          <InfosCompMemorized />
        </React.Fragment>
      )}
    </PropertiesContainer>
  );
};

export default PropertiesDetail;