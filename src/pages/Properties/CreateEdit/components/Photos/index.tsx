import * as React from 'react';

import { arrayMoveImmutable } from 'array-move';

import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import CloudDoneIcon from '@mui/icons-material/CloudDone';

import { getPhoto, hasProperty } from '../../../../../helpers';

import { IPaginateDefault, IPhotoData, IPhotoUpdatePositionsPayload, IPropertyData } from '../../../../../types';

import { useBreakpoints } from '../../../../../hooks/useBreakpoints';

import { IPropertiesPhotosServiceRequest, propertiesPhotosThunk } from '../../../../../reducers/properties/photos';
import { propertiesPhotosUpdatePositionsThunk } from '../../../../../reducers/properties/photosUpdatePositions';

import { useAppSelectorBlaBlaBal } from '../../../../../hooks/useReducerSelector';

import { useAppDispatch } from '../../../../../stores/hooks';

import { PhotosContainer, PhotoWrapper } from './styles';

interface IProps {
  dataProperty?: IPropertyData
}

const Photos = ({ dataProperty }: IProps) => {
  const dispatch = useAppDispatch();

  const propertiesPhotosReducerData = useAppSelectorBlaBlaBal('propertiesPhotosReducer') as IPropertiesPhotosServiceRequest;
  const PROPERTIES_PHOTOS = propertiesPhotosReducerData.data as IPaginateDefault;

  const [dataPhotos, setDataPhotos] = React.useState<IPhotoData[]>([] as IPhotoData[]);

  React.useEffect(() => {
    if (hasProperty(PROPERTIES_PHOTOS, 'paginate.data') && !dataPhotos.length) {
      const newDataPhoto = hasProperty(PROPERTIES_PHOTOS, 'paginate.data') ? PROPERTIES_PHOTOS.paginate.data as unknown as IPhotoData[] : [] as IPhotoData[];
      setDataPhotos(newDataPhoto);
    }
  }, [PROPERTIES_PHOTOS]);

  /**
   * dataProperty prop.
  */
  const [property, setProperty] = React.useState<IPropertyData>(hasProperty(dataProperty, 'code') ? dataProperty as IPropertyData : {} as IPropertyData);

  React.useEffect(() => {
    if (hasProperty(dataProperty, 'code') && !hasProperty(property, 'code')) {
      setProperty(dataProperty as IPropertyData);
      if (dataProperty && dataProperty.code) dispatch(propertiesPhotosThunk(String(dataProperty.code)));
    }
  }, [dataProperty]);

  /**
   * Update positions.
  */
  const resolveDisableUpdatePositionsSubmit = () => !dataPhotos.length;

  const handleUpdatePositionsSubmit = () => {
    if (dataPhotos.length) {
      const newDataPhotoPositions = dataPhotos.map((item, i) => ({ photo_id: item.id, posicao: i+1 })) as IPhotoUpdatePositionsPayload[];
      dispatch(propertiesPhotosUpdatePositionsThunk({ data: newDataPhotoPositions, code: String(property.code) }));
    }
  };

  /**
   * Grids.
  */
  const [goSm, goMd, goLg, goXl] = useBreakpoints();

  const resolveGrid = () => {
    if (goXl) return 6;
    if (goLg) return 5;
    if (goMd) return 4;
    if (goSm) return 2;
    return 1;
  };

  /**
   * Sortable HOC.
  */
  interface IHandleSortEnd {
    oldIndex: number;
    newIndex: number;
  }

  const handleSortEnd = ({ oldIndex, newIndex }: IHandleSortEnd) => setDataPhotos(arrayMoveImmutable<IPhotoData>(dataPhotos, oldIndex, newIndex));

   interface ISortableElementProps {
    value: IPhotoData;
    index: number;
  }
  
   const SortableElementComponent = SortableElement<ISortableElementProps>(({ value, index }: ISortableElementProps) => (
     <PhotoWrapper 
       key={String(index)} 
       sx={{ overflow: 'hidden' }}
     >
       <img
         data-testid={`photo-${index}`}
         src={getPhoto(value, 'thumb')}
         srcSet={getPhoto(value, 'thumb')}
         alt={value.name}
         loading="lazy"
       />
     </PhotoWrapper>
   ));
  
  interface ISortableContainerProps {
    items: IPhotoData[];
  }
  
  const SortableContainerComponent = SortableContainer<ISortableContainerProps>(({ items }: ISortableContainerProps) => (
    <PhotosContainer
      cols={resolveGrid()} 
      rowHeight={120} 
    >
      {items ? items.map((item: IPhotoData, i) => (
        <SortableElementComponent value={item as IPhotoData} index={i} />
      )) : <React.Fragment />}
    </PhotosContainer>
  ));

  /**
   * Render.
  */
  return (
    <>
      <SortableContainerComponent axis='xy' items={dataPhotos} onSortEnd={handleSortEnd} />
      {!!dataPhotos.length && (
        <Box style={{ alignItems: 'end', marginTop: '10px' }}>
          <Fab variant="extended" onClick={handleUpdatePositionsSubmit} disabled={resolveDisableUpdatePositionsSubmit()}>
            <CloudDoneIcon sx={{ mr: 1 }} />
            Salvar alterações
          </Fab>
        </Box>
      )}
    </>
  );
};

export default Photos;