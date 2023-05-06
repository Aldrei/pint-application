import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import Fab from '@mui/material/Fab';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DoneIcon from '@mui/icons-material/Done';
import BlockIcon from '@mui/icons-material/Block';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

import { hasProperty } from '../../../../helpers';

import { IServiceRequestTemp, IPaginateDefault, IBannerData, IPhotoUpdatePositionsPayload, IServiceRequestStatus, IServiceSuccess } from '../../../../types';

import api from '../../../../hooks/useConfigAxios';
import { useBreakpoints } from '../../../../hooks/useBreakpoints';
import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';

// import { propertiesPhotosUpdatePositionsThunk, setStatus as setStatusUpdatePositions } from '../../../../../reducers/properties/photos/updatePositions';
// import { 
//   IPropertiesPhotosUpdateThunk, 
//   IPropertiesPhotosUpdateServiceRequest, 
//   propertiesPhotosUpdateThunk, 
// } from '../../../../../reducers/properties/photos/update';
// import { 
//   IPropertiesPhotosDeleteServiceRequest, 
// } from '../../../../../reducers/properties/photos/delete';

import { bannersServiceThunk } from '../../../../reducers/banners/crud';

import { useAppDispatch } from '../../../../hooks/useReducerDispatch';

import SnackContext from '../../../../contexts/SnackContext';

import { API, MAX_PHOTOS_BY_PROPERTY } from '../../../../constants';

import { messages } from '../../../../constants/messages';

import { ROUTES } from '../../../../constants/routes';

import BannerRepresentation from '../../../../components/BannerRepresentation';

import DeleteConfirm from './components/DeleteConfirm';
import Skeleton from './components/Skeleton';

import { 
  PhotosContainer, 
  PhotoPreviewWrapper, 
  LinearProgressContainer, 
  LinearProgressWrapper, 
  LinearProgressPercent, 
  LinearProgressPercentWrapper,
  ButtonFileContainer,
  MessageContainer,
  Message,
} from './styles';

/**
 * Types/Interfaces.
*/
interface ISortableElementProps {
  value: IBannerData;
  index: number;
}

interface ISortableContainerProps {
  items: IBannerData[];
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
    dataPhoto?: IBannerData;
  }
};


let dataFilesProgressFix = {} as IDataFilesProgress;
let dataFilesDoneFix = {} as IDataFilesProgressDone;

const Banners = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const snackContext = React.useContext(SnackContext);

  const handleGoToBannerCreate = () => navigate(ROUTES.bannersCreate.go());

  /**
   * Get photos stored.
  */
  React.useEffect(() => {
    dispatch(bannersServiceThunk({ page: 1 }));
  }, []);

  const bannersReducerData = useAppSelectorBlaBlaBal('bannersCrudReducer') as IServiceRequestTemp;

  const BANNERS_DATA = bannersReducerData.data as IPaginateDefault;
  const BANNERS_DATA_STATUS = bannersReducerData.status as IServiceRequestStatus;

  const BANNER_DELETE_STATUS = bannersReducerData?.crud?.delete?.status;

  const [dataPhotos, setDataPhotos] = React.useState<IBannerData[]>([] as IBannerData[]);

  React.useEffect(() => {
    if (hasProperty(BANNERS_DATA, 'paginate.data') && !dataPhotos.length) {
      const newDataBanner = hasProperty(BANNERS_DATA, 'paginate.data') ? BANNERS_DATA.paginate.data as unknown as IBannerData[] : [] as IBannerData[];
      setDataPhotos(newDataBanner);
    }
  }, [BANNERS_DATA]);

  /**
   * Update positions.
  */
  // const { status: propertiesPhotosUpdatePositionsStatus, data: propertiesPhotosUpdatePositionsData } = useAppSelectorBlaBlaBal('propertiesPhotosUpdatePositionsReducer') as IServiceRequestTemp;

  // React.useEffect(() => {
  //   /** Update. */
  //   if (propertiesPhotosUpdatePositionsStatus === 'success' && hasProperty(propertiesPhotosUpdatePositionsData, 'status')) {
  //     const propertiesPhotosUpdatePositionsDataTyped = propertiesPhotosUpdatePositionsData as unknown as IServiceSuccess;
  //     dispatch(setStatusUpdatePositions('idle'));
  //     if (propertiesPhotosUpdatePositionsDataTyped.status === 200) snackContext.addMessage({ type: 'success', message: messages.pt.banners.update.success });
  //     else snackContext.addMessage({ type: 'error', message: messages.pt.banners.update.errorRequest });
  //   }

  //   if (propertiesPhotosUpdatePositionsStatus === 'failed') {
  //     dispatch(setStatusUpdatePositions('idle'));
  //     snackContext.addMessage({ type: 'error', message: messages.pt.banners.update.errorRequest });
  //   }
  // }, [propertiesPhotosUpdatePositionsStatus]);

  const resolveDisableUpdatePositionsSubmit = () => !dataPhotos.length;

  const handleUpdatePositionsSubmit = () => {
    // if (dataPhotos.length) {
    //   const newDataPhotoPositions = dataPhotos.map((item, i) => ({ photo_id: item.id, posicao: i+1 })) as IPhotoUpdatePositionsPayload[];
    //   dispatch(propertiesPhotosUpdatePositionsThunk({ data: newDataPhotoPositions, code: String(property.id) }));
    // }
  };

  /**
   * Grids.
  */
  const [goSm, goMd, goLg, goXl] = useBreakpoints();

  const resolveGrid = () => {
    if (goXl) return 4;
    if (goLg) return 4;
    if (goMd) return 3;
    if (goSm) return 2;
    return 1;
  };

  /**
   * Actions.
  */
  /** Update */
  const [photoUpdate, setPhotoUpdate] = React.useState<IBannerData>();
  // const { status: photoUpdateStatus } = useAppSelectorBlaBlaBal('bannersCrudReducer') as IPropertiesPhotosUpdateServiceRequest;

  // const resolveNewRotate = (photo: IBannerData) => {
  //   switch (photo.rotate) {
  //   case 90: return 180;
  //   case 180: return 270;
  //   case 270: return 360;
  //   default: return 90;
  //   }
  // };

  // React.useEffect(() => {
  //   if (photoUpdate && photoUpdateStatus !== 'loading') {
  //     const photosUpdate = {
  //       code: property.id,
  //       photoId: photoUpdate.id,
  //       data: { rotate: resolveNewRotate(photoUpdate) }
  //     } as unknown as IPropertiesPhotosUpdateThunk;
  //     dispatch(propertiesPhotosUpdateThunk(photosUpdate));
  //   }
  // }, [photoUpdate]);

  // React.useEffect(() => {
  //   console.log('DEBUG photoUpdateStatus:', photoUpdateStatus);
  //   if (photoUpdate && photoUpdateStatus === 'success') {
  //     const newDataPhotos = dataPhotos.map(item => {
  //       if (item.id === photoUpdate.id) return { ...item, rotate: resolveNewRotate(item) };
  //       return item;
  //     }) as IBannerData[];
  //     setDataPhotos(newDataPhotos);
  //     setPhotoUpdate(undefined);
  //     // Unnecessary change status to idle.
  //     // dispatch(setStatusPhotosUpdate('idle'));
  //     snackContext.addMessage({ type: 'success', message: messages.pt.banners.update.success });
  //   }

  //   if (photoUpdateStatus === 'failed') {
  //     // Unnecessary change status to idle.
  //     // dispatch(setStatusPhotosUpdate('idle'));
  //     snackContext.addMessage({ type: 'error', message: messages.pt.banners.update.errorRequest });
  //   }
  // }, [photoUpdateStatus]);

  /** Delete */
  const [photoDelete, setPhotoDelete] = React.useState<IBannerData>();

  React.useEffect(() => {
    if (photoDelete && BANNER_DELETE_STATUS === 'success') {
      const newDataPhotos = dataPhotos.filter(item => item.id !== photoDelete.id);
      setDataPhotos(newDataPhotos);
      setPhotoDelete(undefined);
      snackContext.addMessage({ type: 'success', message: messages.pt.banners.delete.success });
      // Unnecessary change status to idle.
      // dispatch(setPhotoDeleteStatus('idle'));
    }

    if (BANNER_DELETE_STATUS === 'failed') {
      // Unnecessary change status to idle.
      // dispatch(setPhotoDeleteStatus('idle'));
      snackContext.addMessage({ type: 'error', message: messages.pt.banners.delete.errorRequest });
    }
  }, [BANNER_DELETE_STATUS]);

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
    <BannerRepresentation banner={value} handleOnDelete={setPhotoDelete} key={String(index)} mode="readonly" />
  ));
  
  const SortableContainerComponent = SortableContainer<ISortableContainerProps>(({ items }: ISortableContainerProps) => (
    <PhotosContainer
      cols={resolveGrid()} 
      rowHeight={120}
    >
      {items ? items.map((item: IBannerData, i) => (<SortableElementComponent key={String(i)} value={item as IBannerData} index={i} />)) : <React.Fragment />}
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
      api.post(API.BANNERS.STORE, formData, {
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
        if (!hasProperty(res, 'data.banner.data')) {
          dataFilesDoneFix[file.name] = { status: 'error' };
          setDataFilesDone({ ...dataFilesDone, [file.name]: 'error' });
        }

        if (hasProperty(res, 'data.banner.data')) {
          dataFilesDoneFix[file.name] = { status: 'success', dataPhoto: res.data.banner.data };
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
    (BANNERS_DATA_STATUS === 'loading') ? (
      <Skeleton />
    ) : (
      <>
        <MessageContainer>
          <Message severity="info">Slide Principal do Site</Message>
        </MessageContainer>
        <ButtonFileContainer>
          <Fab variant="extended" onClick={handleGoToBannerCreate} disabled={!photosLimitDiff()}>
            <AddPhotoAlternateIcon sx={{ mr: 1 }} />
            ADICIONAR FOTOS
          </Fab>
          <DeleteConfirm banner={photoDelete || undefined} handleCloseCb={() => setPhotoDelete(undefined)} />
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

export default Banners;
