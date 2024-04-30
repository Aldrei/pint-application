import * as React from 'react';

import Divider from '@mui/material/Divider';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';

import BlockIcon from '@mui/icons-material/Block';
import DoneIcon from '@mui/icons-material/Done';

import { getMessage, hasProperty } from '../../../../../../helpers';

import { IBannerData, IPaginateDefault, IPhotoData, IPropertyData, IServiceRequestStatus, IServiceSuccess } from '../../../../../../types';

import { useBreakpoints } from '../../../../../../hooks/useBreakpoints';
import api from '../../../../../../hooks/useConfigAxios';
import { useAppSelectorBlaBlaBal } from '../../../../../../hooks/useReducerSelector';

import {
  IPropertiesPhotosDeleteServiceRequest,
} from '../../../../../../reducers/properties/photos/delete';
import { IPropertiesPhotosServiceRequest, propertiesPhotosThunk } from '../../../../../../reducers/properties/photos/list';
import {
  IPropertiesPhotosUpdateServiceRequest,
  IPropertiesPhotosUpdateThunk,
  propertiesPhotosUpdateThunk,
} from '../../../../../../reducers/properties/photos/update';
import { setStatus as setStatusUpdatePositions } from '../../../../../../reducers/properties/photos/updatePositions';

import { useAppDispatch } from '../../../../../../hooks/useReducerDispatch';

import SnackContext from '../../../../../../contexts/SnackContext';

import { API, MAX_PHOTOS_BY_PROPERTY } from '../../../../../../constants';

import PropertyPhotoGallery from '../../../../../../components/PropertyPhotoGallery';

import Skeleton from './components/Skeleton';

import {
  ButtonFileContainer,
  LinearProgressContainer,
  LinearProgressPercent,
  LinearProgressPercentWrapper,
  LinearProgressWrapper,
  Message,
  MessageContainer,
  PhotoPreviewWrapper,
  PhotoWrapper,
  PhotosContainer,
} from './styles';

/**
 * Types/Interfaces.
*/
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
  banner?: IBannerData
  handelSetBanner?: (banner: IBannerData) => void
}

let dataFilesProgressFix = {} as IDataFilesProgress;
let dataFilesDoneFix = {} as IDataFilesProgressDone;

const model = 'Foto';

const Photos = ({ dataProperty, banner = {} as IBannerData, handelSetBanner }: IProps) => {
  const dispatch = useAppDispatch();
  const snackContext = React.useContext(SnackContext);

  console.log('DEBUG Photos banner:', banner);
  console.log('DEBUG Photos dataProperty:', dataProperty);

  /**
   * dataProperty prop.
  */
  const [property, setProperty] = React.useState<IPropertyData>(hasProperty(dataProperty, 'code') ? dataProperty as IPropertyData : {} as IPropertyData);

  React.useEffect(() => {
    if (hasProperty(dataProperty, 'code') && !hasProperty(property, 'code')) setProperty(dataProperty as IPropertyData);

    if (dataProperty && dataProperty.code && !dataPhotos.length) {
      dispatch(propertiesPhotosThunk(String(dataProperty.code)));
    }
  }, [dataProperty]);

  /**
   * Get photos stored.
  */
  const propertiesPhotosReducerData = useAppSelectorBlaBlaBal('propertiesPhotosReducer') as IPropertiesPhotosServiceRequest;
  const PROPERTIES_PHOTOS = propertiesPhotosReducerData.data as IPaginateDefault;
  const PROPERTIES_PHOTOS_STATUS = propertiesPhotosReducerData.status as IServiceRequestStatus;

  console.log('DEBUG PROPERTIES_PHOTOS_STATUS:', PROPERTIES_PHOTOS_STATUS);
  console.log('DEBUG PROPERTIES_PHOTOS:', PROPERTIES_PHOTOS);
  console.log('DEBUG propertiesPhotosReducerData:', propertiesPhotosReducerData);

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
  const { status: propertiesPhotosUpdatePositionsStatus, data: propertiesPhotosUpdatePositionsData } = useAppSelectorBlaBlaBal('propertiesPhotosUpdatePositionsReducer') as IPropertiesPhotosServiceRequest;

  React.useEffect(() => {
    /** Update. */
    if (propertiesPhotosUpdatePositionsStatus === 'success' && hasProperty(propertiesPhotosUpdatePositionsData, 'status')) {
      const propertiesPhotosUpdatePositionsDataTyped = propertiesPhotosUpdatePositionsData as unknown as IServiceSuccess;
      dispatch(setStatusUpdatePositions('idle'));
      if (propertiesPhotosUpdatePositionsDataTyped.status === 200) snackContext.addMessage({ type: 'success', message: getMessage({ action: 'update', type: 'success', model }) });
      else snackContext.addMessage({ type: 'error', message: getMessage({ action: 'update', type: 'errorRequest', model }) });
    }

    if (propertiesPhotosUpdatePositionsStatus === 'failed') {
      dispatch(setStatusUpdatePositions('idle'));
      snackContext.addMessage({ type: 'error', message: getMessage({ action: 'update', type: 'errorRequest', model }) });
    }
  }, [propertiesPhotosUpdatePositionsStatus]);

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
   * Actions.
  */
  /** Update */
  const [photoUpdate, setPhotoUpdate] = React.useState<IPhotoData>();
  const { status: photoUpdateStatus } = useAppSelectorBlaBlaBal('propertiesPhotosUpdateReducer') as IPropertiesPhotosUpdateServiceRequest;

  const resolveNewRotate = (photo: IPhotoData) => {
    switch (photo.rotate) {
    case 90: return 180;
    case 180: return 270;
    case 270: return 360;
    default: return 90;
    }
  };

  React.useEffect(() => {
    if (photoUpdate && photoUpdateStatus !== 'loading') {
      const photosUpdate = {
        code: property.code,
        photoId: photoUpdate.id,
        data: { rotate: resolveNewRotate(photoUpdate) }
      } as unknown as IPropertiesPhotosUpdateThunk;
      dispatch(propertiesPhotosUpdateThunk(photosUpdate));
    }
  }, [photoUpdate]);

  React.useEffect(() => {
    console.log('DEBUG photoUpdateStatus:', photoUpdateStatus);
    if (photoUpdate && photoUpdateStatus === 'success') {
      const newDataPhotos = dataPhotos.map(item => {
        if (item.id === photoUpdate.id) return { ...item, rotate: resolveNewRotate(item) };
        return item;
      }) as IPhotoData[];
      setDataPhotos(newDataPhotos);
      setPhotoUpdate(undefined);
      snackContext.addMessage({ type: 'success', message: getMessage({ action: 'update', type: 'success', model }) });
    }

    if (photoUpdateStatus === 'failed') {
      snackContext.addMessage({ type: 'error', message: getMessage({ action: 'update', type: 'errorRequest', model }) });
    }
  }, [photoUpdateStatus]);

  /** Delete */
  const [photoDelete, setPhotoDelete] = React.useState<IPhotoData>();
  const { status: photoDeleteStatus } = useAppSelectorBlaBlaBal('propertiesPhotosDeleteReducer') as IPropertiesPhotosDeleteServiceRequest;

  React.useEffect(() => {
    if (photoDelete && photoDeleteStatus === 'success') {
      const newDataPhotos = dataPhotos.filter(item => item.id !== photoDelete.id);
      setDataPhotos(newDataPhotos);
      setPhotoDelete(undefined);
      snackContext.addMessage({ type: 'success', message: getMessage({ action: 'delete', type: 'success', model }) });
    }

    if (photoDeleteStatus === 'failed') {
      snackContext.addMessage({ type: 'error', message: getMessage({ action: 'delete', type: 'errorRequest', model }) });
    }
  }, [photoDeleteStatus]);

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
      api.post(API.PROPERTIES.PHOTOS.STORE(String(property.code)), formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (event): void => {
          const progress: number = Math.round(
            (event.loaded * 100) / event.total
          );
 
          setDataFilesProgress({ ...dataFilesProgress, [file.name]: progress }) ;
          dataFilesProgressFix[file.name] = progress;
        }
      }).then((res) => {
        if (!hasProperty(res, 'data.photo.data')) {
          dataFilesDoneFix[file.name] = { status: 'error' };
          setDataFilesDone({ ...dataFilesDone, [file.name]: 'error' });
        }

        if (hasProperty(res, 'data.photo.data')) {
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
      if (e.target.files.length > photosLimitDiff()) {
        snackContext.addMessage({ type: 'warning', message: getMessage({ action: 'store', type: 'errorLimit', model: String(photosLimitDiff()) }) });
        return;
      }

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

  React.useEffect(() => {
    if (dataFiles.length && dataFiles.length === Object.keys(dataFilesDoneFix).length) {
      const newDataPhotos = JSON.parse(JSON.stringify(dataPhotos));

      const newDataFiles = dataFiles.filter((item: IDataFiles) => {
        if (dataFilesDoneFix[item.file.name] && dataFilesDoneFix[item.file.name].status !== 'success') return item;
        if (dataFilesDoneFix[item.file.name] && dataFilesDoneFix[item.file.name].status === 'success') newDataPhotos.push(dataFilesDoneFix[item.file.name].dataPhoto);
      }) as IDataFiles[];

      setTimeout(() => {
        if (useRefInputFile && useRefInputFile.current) useRefInputFile.current.value = '';
        dataFilesProgressFix = {} as IDataFilesProgress;
        dataFilesDoneFix = {} as IDataFilesProgressDone;
        setDataFiles(newDataFiles);
        setDataPhotos(newDataPhotos);
      }, 1500);
    }
  }, [dataFilesDone]);

  /**
   * Renders.
  */
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
    <PhotosContainer
      cols={resolveGrid()} 
      rowHeight={120}
    >
      {dataPhotos ? dataPhotos.map((item: IPhotoData, i) => (
        <PhotoWrapper 
          key={String(i)} 
          sx={{ overflow: 'hidden' }}
          onClick={() => handelSetBanner?.({ ...banner, img: item.src, thumb: item.thumb, normal: item.normal } as IBannerData)}
        >
          <PropertyPhotoGallery photo={item} i={i} />
        </PhotoWrapper>
      )) : <React.Fragment />}
    </PhotosContainer>
  ), [dataPhotos]);

  const photosLimitDiff = () => MAX_PHOTOS_BY_PROPERTY - dataPhotos.length;

  const renderContentByProperty = () => {
    if (hasProperty(property, 'code') && PROPERTIES_PHOTOS_STATUS === 'loading')
      return <Skeleton />;

    return (
      <>
        <MessageContainer>
          <Message severity="info">Selecione uma foto do imóvel ou faça o upload de uma imagem.</Message>
        </MessageContainer>
        <ButtonFileContainer>
          <input disabled={!photosLimitDiff()} className='input-file' ref={useRefInputFile} type='file' name='newPhotos[]' multiple accept="image/png, image/jpeg" onChange={handleChangeInput} />
        </ButtonFileContainer>
        {!!dataFiles.length && <RenderDataFilesMemo />}
        <SortableContainerComponentMemo />
      </>
    );
  };

  const renderContent = () => {
    if (hasProperty(property, 'code')) {
      return renderContentByProperty();
    }

    return null;
  };

  return renderContent();
};

export default Photos;