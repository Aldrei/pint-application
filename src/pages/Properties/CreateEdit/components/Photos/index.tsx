import * as React from 'react';

import { arrayMoveImmutable } from 'array-move';

import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';

import CloudDoneIcon from '@mui/icons-material/CloudDone';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DoneIcon from '@mui/icons-material/Done';
import BlockIcon from '@mui/icons-material/Block';

import { getPhoto, hasProperty } from '../../../../../helpers';

import { IPaginateDefault, IPhotoData, IPhotoUpdatePositionsPayload, IPropertyData } from '../../../../../types';

import api from '../../../../../hooks/useConfigAxios';
import { useBreakpoints } from '../../../../../hooks/useBreakpoints';

import { IPropertiesPhotosServiceRequest, propertiesPhotosThunk } from '../../../../../reducers/properties/photos';
import { propertiesPhotosUpdatePositionsThunk } from '../../../../../reducers/properties/photosUpdatePositions';

import { useAppSelectorBlaBlaBal } from '../../../../../hooks/useReducerSelector';

import { useAppDispatch } from '../../../../../stores/hooks';

import { API } from '../../../../../constants';

import { 
  PhotosContainer, 
  PhotoWrapper, 
  PhotoPreviewWrapper, 
  LinearProgressContainer, 
  LinearProgressWrapper, 
  LinearProgressPercent, 
  LinearProgressPercentWrapper,
  ButtonFileContainer
} from './styles';

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
}

type IDataFilesProgress = {
  [key: string]: number;
};

type IDataFilesProgressDone = {
  [key: string]: {
    status: 'success' | 'error';
    dataPhoto?: IPhotoData;
  }
};

interface IProps {
  dataProperty?: IPropertyData
}

const dataFilesProgressFix = {} as IDataFilesProgress;
const dataFilesDoneFix = {} as IDataFilesProgressDone;

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
  const [dataFilesDone, setDataFilesDone] = React.useState<IDataFilesProgressDone[]>([] as unknown as IDataFilesProgressDone[]);

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
          // console.log('DEBUG-AXIOS LOADING event:', event);
          // console.log('DEBUG-AXIOS LOADING file:', file);

          const progress: number = Math.round(
            (event.loaded * 100) / event.total
          );
 
          setDataFilesProgress({ ...dataFilesProgress, [file.name]: progress }) ;
          dataFilesProgressFix[file.name] = progress;
        }
      }).then((res) => {
        console.log('DEBUG-AXIOS DONE res:', res);

        if (!hasProperty(res, 'data.photo.data')) {
          console.log('DEBUG-AXIOS DONE ERROR:', file);
          dataFilesDoneFix[file.name] = { status: 'error' };
          setDataFilesDone({ ...dataFilesDone, [file.name]: 'error' });
        }

        if (hasProperty(res, 'data.photo.data')) {
          console.log('DEBUG-AXIOS DONE SUCCESS:', res.data.photo.data);
          dataFilesDoneFix[file.name] = { status: 'success', dataPhoto: res.data.photo.data };
          setDataFilesDone({ ...dataFilesDone, [file.name]: 'success' });
        }
      })
        .catch((err) => {
          console.log('DEBUG-AXIOS err:', err);
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

  const useRefInputFile = React.useRef<HTMLInputElement>(null);
  const handleSeletecPhotos = (): void => {
    if (useRefInputFile && useRefInputFile.current) useRefInputFile.current.click();
  };

  /**
   * Renders.
  */
  const resolveProgressColor = (file: File) => {
    const fileStatus = dataFilesDoneFix[file.name] && dataFilesDoneFix[file.name].status ? dataFilesDoneFix[file.name].status : '';
    switch (fileStatus) {
    case 'success': return 'success';
    case 'error': return 'error';
    default: return 'primary';
    }
  };

  const resolveProgressIcon = (file: File) => {
    const fileStatus = dataFilesDoneFix[file.name] && dataFilesDoneFix[file.name].status ? dataFilesDoneFix[file.name].status : '';
    switch (fileStatus) {
    case 'success': return <DoneIcon />;
    case 'error': return <BlockIcon />;
    default: return undefined;
    }
  };

  const LinearProgressWithLabel = (props: LinearProgressProps & { value: number, file: File }) => {
    return (
      <LinearProgressContainer>
        <LinearProgressWrapper>
          <LinearProgress variant="determinate" value={props.value} color={resolveProgressColor(props.file)} />
        </LinearProgressWrapper>
        <LinearProgressPercentWrapper>
          <LinearProgressPercent 
            label={`${resolveProgressColor(props.file) === 'error' ? 'Erro' : `${props.value}%`}`} 
            size="small" 
            color={resolveProgressColor(props.file)}
            icon={resolveProgressIcon(props.file)}
          />
        </LinearProgressPercentWrapper>
      </LinearProgressContainer>
    );
  };

  // console.log('DEBUG dataFilesProgressFix:', dataFilesProgressFix);
  // console.log('DEBUG dataFilesProgress:', dataFilesProgress);
  // console.log('DEBUG dataFilesDoneFix:', dataFilesDoneFix);
  // console.log('DEBUG dataPhotos:', dataPhotos);
  // console.log('DEBUG dataFiles:', dataFiles);

  React.useEffect(() => {
    // console.log('DEBUG dataFiles.length:', dataFiles.length);
    // console.log('DEBUG Object.keys(dataFilesProgressFix).length:', Object.keys(dataFilesProgressFix).length);

    if (dataFiles.length && dataFiles.length === Object.keys(dataFilesDoneFix).length) {
      console.log('======> DEBUG UPLOAD FINISH!!! <======');

      const newDataPhotos = JSON.parse(JSON.stringify(dataPhotos));

      const newDataFiles = dataFiles.filter((item: IDataFiles) => {
        if (dataFilesDoneFix[item.file.name] && dataFilesDoneFix[item.file.name].status !== 'success') return item;
        if (dataFilesDoneFix[item.file.name] && dataFilesDoneFix[item.file.name].status === 'success') newDataPhotos.push(dataFilesDoneFix[item.file.name].dataPhoto);
      }) as IDataFiles[];

      setTimeout(() => {
        setDataFiles(newDataFiles);
        setDataPhotos(newDataPhotos);
      }, 1500);
    }
  }, [dataFilesDone]);

  const RenderDataFilesMemo = React.useCallback(() => (
    <>
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
            {resolveFileProgress(item.file) && <LinearProgressWithLabel value={resolveFileProgress(item.file)} file={item.file} />}
          </PhotoPreviewWrapper>
        ))}
      </PhotosContainer>
      <Divider style={{ margin: '35px 15px' }} />
    </>
  ), [dataFiles]);

  const SortableContainerComponentMemo = React.useCallback(() => (
    <SortableContainerComponent axis='xy' items={dataPhotos} onSortEnd={handleSortEnd} />
  ), [dataPhotos]);

  return (
    <>
      <ButtonFileContainer>
        <Fab variant="extended" onClick={handleSeletecPhotos}>
          <AddPhotoAlternateIcon sx={{ mr: 1 }} />
          ADICIONAR FOTOS
        </Fab>
        <input className='input-file' ref={useRefInputFile} type='file' name='newPhotos[]' multiple accept="image/png, image/jpeg" onChange={handleChangeInput} />
      </ButtonFileContainer>
      {!!dataFiles.length && <RenderDataFilesMemo />}
      <SortableContainerComponentMemo />
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