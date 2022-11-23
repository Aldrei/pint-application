import * as React from 'react';

import { arrayMoveImmutable } from 'array-move';

import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';

import CloudDoneIcon from '@mui/icons-material/CloudDone';

import { getPhoto, hasProperty } from '../../../../../helpers';

import { IPaginateDefault, IPhotoData, IPhotoUpdatePositionsPayload, IPropertyData } from '../../../../../types';

import api from '../../../../../hooks/useConfigAxios';
import { useBreakpoints } from '../../../../../hooks/useBreakpoints';

import { IPropertiesPhotosServiceRequest, propertiesPhotosThunk } from '../../../../../reducers/properties/photos';
import { propertiesPhotosUpdatePositionsThunk } from '../../../../../reducers/properties/photosUpdatePositions';

import { useAppSelectorBlaBlaBal } from '../../../../../hooks/useReducerSelector';

import { useAppDispatch } from '../../../../../stores/hooks';

import { API } from '../../../../../constants';

import { PhotosContainer, PhotoWrapper, PhotoPreviewWrapper, LinearProgressContainer, LinearProgressWrapper, LinearProgressPercent, LinearProgressPercentWrapper } from './styles';

/**
 * Types/Interfaces.
*/
interface ISortableElementProps {
  value: IPhotoData;
  index: number;
}

interface ISortableContainerProps {
  items: IPhotoData[];
}

interface IDataFiles {
  file: File;
  progress: number;
}

type IDataFilesProgress = {
  [key: string]: number;
};

interface IProps {
  dataProperty?: IPropertyData
}

const dataFilesProgressFix = {} as IDataFilesProgress;

const Photos = ({ dataProperty }: IProps) => {
  const dispatch = useAppDispatch();

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
   * Get photos stored.
  */
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
   * Update new photos.
  */
  // ...

  /**
   * Update positions.
  */
  const resolveDisableUpdatePositionsSubmit = () => !dataPhotos.length;

  const handleUpdatePositionsSubmit = () => {
    console.log('DEBUG dataPhotos:', dataPhotos);
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
   * Upload factory.
  */
  const [dataFilesProgress, setDataFilesProgress] = React.useState<IDataFilesProgress>({} as IDataFilesProgress);
  const [dataFiles, setDataFiles] = React.useState<IDataFiles[]>([] as unknown as IDataFiles[]);

  const handleUploadFile = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    // eslint-disable-next-line no-prototype-builtins
    if (!dataFilesProgressFix.hasOwnProperty(file.name)){
      api.post(API.PROPERTIES.PHOTOS_UPLOAD(String(property.code)), formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (event): void => {
          const progress: number = Math.round(
            (event.loaded * 100) / event.total
          );
 
          setDataFilesProgress({ ...dataFilesProgress, [String(file.name)]: progress }) ;
          dataFilesProgressFix[file.name] = progress;
        }
      }).then(() => {
        // ...    
      })
        .catch((err) => {
          console.log(err); 
        });
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newDataFiles = Array.from(e.target.files).map((file: File) => ({
        file,
        progress: 0,
      } as IDataFiles));

      setDataFiles(newDataFiles);

      setTimeout((): void => {
        newDataFiles.forEach((item: IDataFiles) => {
          handleUploadFile(item.file);
        });
      }, 2000);
    }
  };

  const resolveObjUrl = (item: File) => {
    try {
      return URL.createObjectURL(item);  
    } catch (error) {
      console.log(error);
      return '';
    }
  };

  const resolveFileProgress = (file: File): number => Math.round(dataFilesProgressFix[file.name] || 0);

  /**
   * Renders.
  */
  const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }) => {
    return (
      <LinearProgressContainer>
        <LinearProgressWrapper>
          <LinearProgress variant="determinate" value={props.value} />
        </LinearProgressWrapper>
        <LinearProgressPercentWrapper>
          <LinearProgressPercent label={`${props.value}%`} size="small" color="primary" />
        </LinearProgressPercentWrapper>
      </LinearProgressContainer>
    );
  };

  return (
    <>
      <input type='file' name='newPhotos[]' multiple accept="image/png, image/jpeg" onChange={handleChangeInput} />
      {!!dataFiles.length && (
        <PhotosContainer
          cols={resolveGrid()} 
          rowHeight={120} 
        >
          {dataFiles.map((item: IDataFiles, i) => (
            <PhotoPreviewWrapper 
              key={String(i)} 
              sx={{ overflow: 'hidden' }}
            >
              <img
                data-testid={`photo-preview-${i}`}
                src={resolveObjUrl(item.file)}
                loading="lazy"
              />
              {resolveFileProgress(item.file) && <LinearProgressWithLabel value={resolveFileProgress(item.file)} />}
            </PhotoPreviewWrapper>
          ))}
        </PhotosContainer>
      )}
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