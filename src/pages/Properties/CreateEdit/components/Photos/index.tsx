import * as React from 'react';

import { arrayMoveImmutable } from 'array-move';

import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import { getPhoto, hasProperty } from '../../../../../helpers';

import { IPhotoData, IPropertyData } from '../../../../../types';

import { useBreakpoints } from '../../../../../hooks/useBreakpoints';

import { PhotosContainer, PhotoWrapper } from './styles';

/** TODO: Just a test... */
import { PROPERTIES_PHOTOS } from '../../../../../mocks/constants';

interface IProps {
  dataProperty?: IPropertyData
}

const Photos = ({ dataProperty }: IProps) => {
  /** TODO: Just a test... */
  // const dataPhotos = PROPERTIES_PHOTOS.paginate.data as IPhotoData[];
  const [dataPhotos, setDataPhotos] = React.useState<IPhotoData[]>(PROPERTIES_PHOTOS.paginate.data as IPhotoData[]);

  /**
   * dataProperty prop.
  */
  const [property, setProperty] = React.useState<IPropertyData>(hasProperty(dataProperty, 'code') ? dataProperty as IPropertyData : {} as IPropertyData);

  React.useEffect(() => {
    if (hasProperty(dataProperty, 'code') && !hasProperty(property, 'code')) {
      setProperty(dataProperty as IPropertyData);
    }
  }, [dataProperty]);

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
    <SortableContainerComponent axis='xy' items={dataPhotos} onSortEnd={handleSortEnd} />
  );
};

export default Photos;