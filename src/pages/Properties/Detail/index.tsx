import * as React from 'react';

import List from '@mui/material/List';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../../stores/hooks';
import { propertiesShowThunk, IPropertiesShowServiceRequest } from '../../../reducers/properties/show';
import { propertiesPhotosThunk, IPropertiesPhotosServiceRequest } from '../../../reducers/properties/photos';

import { useAppSelectorBlaBlaBal } from '../../../hooks/useReducerSelector';
import { useBreakpoints } from '../../../hooks/useBreakpoints';

import { IPropertyData, IPropertyShow, IPhotoData, IPaginateDefault } from '../../../types';

import { hasProperty } from '../../../helpers';

import PropertyListItemSkeleton from './components/Skeleton';
import Info from './components/Info';

import { PropertiesContainer } from './styles';

// import { PROPERTIES_DETAIL } from '../../../mocks';

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

  const standardImageList = () => (
    <ImageList 
      cols={resolveGrid()} 
      rowHeight={120} 
    >
      {paginate.photos ? paginate.photos.map((item: IPhotoData, i) => (
        <ImageListItem key={String(i)} sx={{ overflow: 'hidden' }}>
          <img
            /**
             * TODO: Make helper to retur path to imobmobile URL when local environment with "file not exist".
            */
            // src={`https://imobmobile.com.br/photos/thumb/${item.name}`}
            src={item.thumb}
            srcSet={item.thumb}
            alt={item.name}
            loading="lazy"
          />
        </ImageListItem>
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

  const StandardImageListMemorized = React.useCallback(() => standardImageList(), [paginate.photos]);
  const InfosCompMemorized = React.useCallback(() => infosComp(), [paginate.data]);

  return (
    <PropertiesContainer data-testid='propertiesList-container'>
      {PROPERTIES_STATUS === 'loading' ? <PropertyListItemSkeleton /> : (
        <React.Fragment>
          <StandardImageListMemorized />
          <InfosCompMemorized />
        </React.Fragment>
      )}
    </PropertiesContainer>
  );
};

export default PropertiesDetail;