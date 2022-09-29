import * as React from 'react';

import List from '@mui/material/List';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../stores/hooks';
import { propertiesShowThunk, selectPropertiesShowReducer } from '../../../reducers/properties/show';
import { propertiesPhotosThunk, selectPropertiesPhotosReducer } from '../../../reducers/properties/photos';

import { useAppSelectorBlaBlaBal } from '../../../hooks/useReducerSelector';
import { useBreakpoints } from '../../../hooks/useBreakpoints';

import { IPropertiesListRequest, IPropertyData, IPhotoData, IServiceRequest } from '../../../types';

import PropertyListItemSkeleton from './components/Skeleton';
import Info from './components/Info';

import { PropertiesContainer } from './styles';

import { 
  PROPERTIES_DETAIL, 
  PROPERTIES_PHOTOS 
} from '../../../mocks';

interface IPaginate {
  code: string;
  total_pages: number;
  data: IPropertyData;
  photos: IPhotoData[]
}

const PropertiesDetail = () => {
  const { code } = useParams();

  const [goSm, goMd, goLg, goXl] = useBreakpoints();

  const { status } = useAppSelectorBlaBlaBal('propertiesShowSlice') as IServiceRequest;
  const selectPropertiesShowState = useAppSelector(selectPropertiesShowReducer);
  console.log('selectPropertiesShowState:', selectPropertiesShowState);

  const { status: statusPhotos } = useAppSelectorBlaBlaBal('propertiesPhotosSlice') as IServiceRequest;
  const selectPropertiesPhotosState = useAppSelector(selectPropertiesPhotosReducer);
  console.log('statusPhotos:', statusPhotos);
  console.log('selectPropertiesPhotosState:', selectPropertiesPhotosState);
  
  const PROPERTIES_LIST = selectPropertiesShowState.data as unknown as IPropertiesListRequest;

  const dispatch = useAppDispatch();

  const paginate: IPaginate = {
    code: code as string,
    total_pages: PROPERTIES_LIST?.paginate?.meta?.pagination?.total_pages || 0,
    data: PROPERTIES_DETAIL.property.data as unknown as IPropertyData,
    photos: PROPERTIES_PHOTOS.paginate.data as unknown as IPhotoData[]
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
      {paginate.photos && paginate.photos.map((item: IPhotoData, i) => (
        <ImageListItem key={String(i)} sx={{ overflow: 'hidden' }}>
          <img
            src={item.thumb}
            srcSet={item.thumb}
            alt={item.name}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );

  const infosComp = () => (
    <List style={{ width: '100%' }}>
      <React.Fragment>
        <Info property={paginate.data} />
      </React.Fragment>
    </List>
  );

  const StandardImageListMemorized = React.useCallback(() => standardImageList(), [paginate.photos]);
  const InfosCompMemorized = React.useCallback(() => infosComp(), [paginate.data]);

  return (
    <PropertiesContainer data-testid='propertiesList-container'>
      {status === 'loading' ? <PropertyListItemSkeleton /> : (
        <React.Fragment>
          <StandardImageListMemorized />
          <InfosCompMemorized />
        </React.Fragment>
      )}
    </PropertiesContainer>
  );
};

export default PropertiesDetail;