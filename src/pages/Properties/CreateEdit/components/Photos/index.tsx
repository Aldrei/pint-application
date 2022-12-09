import * as React from 'react';

import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import Fab from '@mui/material/Fab';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DoneIcon from '@mui/icons-material/Done';
import BlockIcon from '@mui/icons-material/Block';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

import { hasProperty } from '../../../../../helpers';

import { IPaginateDefault, IPhotoData, IPhotoUpdatePositionsPayload, IPropertyData, IServiceRequestStatus, IServiceSuccess } from '../../../../../types';

import api from '../../../../../hooks/useConfigAxios';
import { useBreakpoints } from '../../../../../hooks/useBreakpoints';
import { useAppSelectorBlaBlaBal } from '../../../../../hooks/useReducerSelector';

import { IPropertiesPhotosServiceRequest, propertiesPhotosThunk } from '../../../../../reducers/properties/photos/list';
import { propertiesPhotosUpdatePositionsThunk, setStatus as setStatusUpdatePositions } from '../../../../../reducers/properties/photos/updatePositions';
import { 
  IPropertiesPhotosUpdateThunk, 
  IPropertiesPhotosUpdateServiceRequest, 
  propertiesPhotosUpdateThunk, 
} from '../../../../../reducers/properties/photos/update';
import { 
  IPropertiesPhotosDeleteServiceRequest, 
} from '../../../../../reducers/properties/photos/delete';

import { useAppDispatch } from '../../../../../hooks/useReducerDispatch';

import SnackContext from '../../../../../contexts/SnackContext';

import { API, MAX_PHOTOS_BY_PROPERTY } from '../../../../../constants';

import { messages } from '../../../../../constants/messages';

import PropertyPhotoGallery from '../../../../../components/PropertyPhotoGallery';

import DeleteConfirm from './components/DeleteConfirm';
import Skeleton from './components/Skeleton';

import { 
  PhotosContainer, 
  PhotoWrapper, 
  PhotoPreviewWrapper, 
  LinearProgressContainer, 
  LinearProgressWrapper, 
  LinearProgressPercent, 
  LinearProgressPercentWrapper,
  ButtonFileContainer,
  ActionsContainer,
  ActionButton,
  MessageContainer,
  Message,
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

let dataFilesProgressFix = {} as IDataFilesProgress;
let dataFilesDoneFix = {} as IDataFilesProgressDone;

const Photos = ({ dataProperty }: IProps) => {
  const dispatch = useAppDispatch();
  const snackContext = React.useContext(SnackContext);

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
      if (propertiesPhotosUpdatePositionsDataTyped.status === 200) snackContext.addMessage({ type: 'success', message: messages.pt.properties.update.success });
      else snackContext.addMessage({ type: 'error', message: messages.pt.properties.update.errorRequest });
    }

    if (propertiesPhotosUpdatePositionsStatus === 'failed') {
      dispatch(setStatusUpdatePositions('idle'));
      snackContext.addMessage({ type: 'error', message: messages.pt.properties.photos.update.errorRequest });
    }
  }, [propertiesPhotosUpdatePositionsStatus]);

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
      // Unnecessary change status to idle.
      // dispatch(setStatusPhotosUpdate('idle'));
      snackContext.addMessage({ type: 'success', message: messages.pt.properties.update.success });
    }

    if (photoUpdateStatus === 'failed') {
      // Unnecessary change status to idle.
      // dispatch(setStatusPhotosUpdate('idle'));
      snackContext.addMessage({ type: 'error', message: messages.pt.properties.update.errorRequest });
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
      snackContext.addMessage({ type: 'success', message: messages.pt.properties.photos.delete.success });
      // Unnecessary change status to idle.
      // dispatch(setPhotoDeleteStatus('idle'));
    }

    if (photoDeleteStatus === 'failed') {
      // Unnecessary change status to idle.
      // dispatch(setPhotoDeleteStatus('idle'));
      snackContext.addMessage({ type: 'error', message: messages.pt.properties.photos.delete.errorRequest });
    }
  }, [photoDeleteStatus]);

  const renderActions = (photo?: IPhotoData) => {
    return (
      <ActionsContainer direction="row" spacing={1}>
        <ActionButton 
          size="small" 
          color="error" 
          startIcon={<DeleteIcon className='icon-delete' />}
          onClick={() => setPhotoDelete(photo)} 
          disabled={Boolean(photoDelete)}
        >
          Deletar
        </ActionButton>
        <ActionButton 
          size="small" 
          color="primary" 
          startIcon={<FlipCameraIosIcon />} 
          onClick={() => setPhotoUpdate(photo)} 
          disabled={Boolean(photoUpdate)}
        >
          Girar
        </ActionButton>
      </ActionsContainer>
    );
  };

  /**
   * Sortable HOC.
  */
  interface IHandleSortEnd {
    oldIndex: number;
    newIndex: number;
  }

  const handleSortEnd = ({ oldIndex, newIndex }: IHandleSortEnd) => {
    const newDataPhotos = JSON.parse(JSON.stringify(dataPhotos));
    const item = newDataPhotos[oldIndex];

    newDataPhotos.splice(oldIndex, 1);
    newDataPhotos.splice(newIndex, 0, item);
    
    setDataPhotos(newDataPhotos);
  };
  
  const SortableElementComponent = SortableElement<ISortableElementProps>(({ value, index }: ISortableElementProps) => (
    <PhotoWrapper 
      key={String(index)} 
      sx={{ overflow: 'hidden' }}
    >
      <PropertyPhotoGallery photo={value} i={index} />
      {renderActions(value)}
    </PhotoWrapper>
  ));
  
  const SortableContainerComponent = SortableContainer<ISortableContainerProps>(({ items }: ISortableContainerProps) => (
    <PhotosContainer
      cols={resolveGrid()} 
      rowHeight={120}
    >
      {items ? items.map((item: IPhotoData, i) => (<SortableElementComponent key={String(i)} value={item as IPhotoData} index={i} />)) : <React.Fragment />}
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
        snackContext.addMessage({ type: 'warning', message: messages.pt.properties.photos.store.errorLimit(photosLimitDiff()) });
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
    <SortableContainerComponent axis='xy' items={dataPhotos} onSortEnd={handleSortEnd} />
  ), [dataPhotos]);

  const photosLimitDiff = () => MAX_PHOTOS_BY_PROPERTY - dataPhotos.length;

  return (
    (!hasProperty(property, 'code') || PROPERTIES_PHOTOS_STATUS === 'loading') ? (
      <Skeleton />
    ) : (
      <>
        <MessageContainer>
          <Message severity={MAX_PHOTOS_BY_PROPERTY > dataPhotos.length ? 'info' : 'warning'}>{`50 fotos por imóvel. ${photosLimitDiff()} restante para este imóvel.`}</Message>
        </MessageContainer>
        <ButtonFileContainer>
          <Fab variant="extended" onClick={handleSeletecPhotos} disabled={!photosLimitDiff()}>
            <AddPhotoAlternateIcon sx={{ mr: 1 }} />
            ADICIONAR FOTOS
          </Fab>
          {renderActions()}
          <DeleteConfirm photo={photoDelete || undefined} code={property ? String(property.code) : ''} />
          <input disabled={!photosLimitDiff()} className='input-file' ref={useRefInputFile} type='file' name='newPhotos[]' multiple accept="image/png, image/jpeg" onChange={handleChangeInput} />
          {!!dataPhotos.length && (
            <Fab variant="extended" onClick={handleUpdatePositionsSubmit} disabled={resolveDisableUpdatePositionsSubmit()}>
              <ViewModuleIcon sx={{ mr: 1 }} />
              Salvar ordenação
            </Fab>
          )}
        </ButtonFileContainer>
        {!!dataFiles.length && <RenderDataFilesMemo />}
        <SortableContainerComponentMemo />
      </>
    )
  );
};

export default Photos;