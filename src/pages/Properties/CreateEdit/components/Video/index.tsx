import * as React from 'react';

import Fab from '@mui/material/Fab';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';

import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import DoneIcon from '@mui/icons-material/Done';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';

import { hasProperty, getMessage } from '../../../../../helpers';

import { IPaginateDefault, IVideoData, IPropertyData, IServiceRequestStatus, IServiceSuccess } from '../../../../../types';

import api from '../../../../../hooks/useConfigAxios';
import { useBreakpoints } from '../../../../../hooks/useBreakpoints';

import { IPropertiesVideosServiceRequest, propertiesVideosThunk } from '../../../../../reducers/properties/videos/list';
import { IPropertiesVideosDeleteServiceRequest, setVideoDeleteStatus } from '../../../../../reducers/properties/videos/delete';

import { useAppSelectorBlaBlaBal } from '../../../../../hooks/useReducerSelector';

import { useAppDispatch } from '../../../../../hooks/useReducerDispatch';

import { AppDispatch } from '../../../../../stores';

import { API } from '../../../../../constants';

import SnackContext from '../../../../../contexts/SnackContext';

import DeleteConfirm from './components/DeleteConfirm';

import { 
  VideoPreviewContainer, 
  VideoPreviewWrapper, 
  LinearProgressContainer, 
  LinearProgressWrapper, 
  LinearProgressPercent, 
  LinearProgressPercentWrapper,
  ButtonFileContainer,
  VideoContainer,
  VideoInfo,
  VideoInfoWrapper,
  VideoWrapper,
  ActionButton,
  ActionsContainer,
  WrapperVideoLoading,
  VideoLoading
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
    dataVideo?: IVideoData;
  }
};

interface IProps {
  dataProperty?: IPropertyData
  disabled?: boolean
}

let dataFilesProgressFix = {} as IDataFilesProgress;
let dataFilesDoneFix = {} as IDataFilesProgressDone;

const model = 'Vídeo';

const Video = ({ dataProperty, disabled }: IProps) => {
  const dispatch = useAppDispatch() as AppDispatch;
  const snackContext = React.useContext(SnackContext);

  /**
   * dataProperty prop.
  */
  const [property, setProperty] = React.useState<IPropertyData>(hasProperty(dataProperty, 'code') ? dataProperty as IPropertyData : {} as IPropertyData);

  React.useEffect(() => {
    if (hasProperty(dataProperty, 'code') && !hasProperty(property, 'code')) {
      setProperty(dataProperty as IPropertyData);
    }

    if (dataProperty && dataProperty.code && !dataVideos.length) dispatch(propertiesVideosThunk(String(dataProperty.code)));
  }, [dataProperty]);

  /**
   * Get videos stored.
  */
  const propertiesVideosReducerData = useAppSelectorBlaBlaBal('propertiesVideosReducer') as IPropertiesVideosServiceRequest;
  const PROPERTIES_VIDEOS = propertiesVideosReducerData.data as IPaginateDefault;
  const PROPERTIES_VIDEOS_STATUS = propertiesVideosReducerData.status as IServiceRequestStatus;

  const [dataVideos, setDataVideos] = React.useState<IVideoData[]>([] as IVideoData[]);

  React.useEffect(() => {
    if (hasProperty(PROPERTIES_VIDEOS, 'paginate.data') && !dataVideos.length) {
      const newDataVideo = hasProperty(PROPERTIES_VIDEOS, 'paginate.data') ? PROPERTIES_VIDEOS.paginate.data as unknown as IVideoData[] : [] as IVideoData[];
      setDataVideos(newDataVideo);
    }
  }, [PROPERTIES_VIDEOS]);

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
      api.post(API.PROPERTIES.VIDEOS.UPLOAD(String(property.code)), formData, {
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
        if (!hasProperty(res, 'data.video.data')) {
          dataFilesDoneFix[file.name] = { status: 'error' };
          setDataFilesDone({ ...dataFilesDone, [file.name]: 'error' });
        }

        if (hasProperty(res, 'data.video.data')) {
          dataFilesDoneFix[file.name] = { status: 'success', dataVideo: res.data.video.data };
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
  const handleSeletecVideo = (): void => {
    if (useRefInputFile && useRefInputFile.current) useRefInputFile.current.click();
  };

  /**
   * Actions.
  */
  /** Delete. */
  const [videoDelete, setVideoDelete] = React.useState<IVideoData>();
  const { status: videoDeleteStatus, data: propertiesVideosDeleteData } = useAppSelectorBlaBlaBal('propertiesVideosDeleteReducer') as IPropertiesVideosDeleteServiceRequest;

  React.useEffect(() => {
    if (videoDelete && videoDeleteStatus === 'success') {
      const propertiesVideosDeleteDataTyped = propertiesVideosDeleteData as IServiceSuccess;

      const newDataVideos = dataVideos.filter(item => item.id !== videoDelete.id);
      setDataVideos(newDataVideos);
      setVideoDelete(undefined);
      dispatch(setVideoDeleteStatus('idle'));

      if (propertiesVideosDeleteDataTyped.status === 200) snackContext.addMessage({ type: 'success', message: getMessage({ action: 'delete', type: 'success', model }) });
      else snackContext.addMessage({ type: 'error', message: getMessage({ action: 'delete', type: 'errorRequest', model }) });
    }

    if (videoDeleteStatus === 'failed') {
      dispatch(setVideoDeleteStatus('idle'));
      snackContext.addMessage({ type: 'error', message: getMessage({ action: 'delete', type: 'errorRequest', model }) });
    }
  }, [videoDeleteStatus]);

  const renderActions = () => {
    if (disabled) return null;

    return (
      <ActionsContainer direction="row" spacing={1}>
        <ActionButton 
          size="small" 
          color="error" 
          startIcon={<DeleteIcon className='icon-delete' />}
          onClick={() => setVideoDelete(dataVideos.length ? dataVideos[0] : undefined)} 
          disabled={Boolean(videoDelete)}
        >
          Deletar
        </ActionButton>
      </ActionsContainer>
    );
  };

  const DeleteConfirmMemo = React.useCallback(() => <DeleteConfirm video={videoDelete || undefined} code={property ? String(property.code) : ''} />, [videoDelete]);

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
      const newDataVideo = JSON.parse(JSON.stringify(dataVideos));

      const newDataFilesErrors = dataFiles.filter((item: IDataFiles) => {
        if (dataFilesDoneFix[item.file.name] && dataFilesDoneFix[item.file.name].status !== 'success') return item;
        if (dataFilesDoneFix[item.file.name] && dataFilesDoneFix[item.file.name].status === 'success') newDataVideo.push(dataFilesDoneFix[item.file.name].dataVideo);
      }) as IDataFiles[];

      if (newDataFilesErrors.length) snackContext.addMessage({ type: 'error', message: getMessage({ action: 'store', type: 'errorRequest', model }) });
      else snackContext.addMessage({ type: 'success', message: getMessage({ action: 'store', type: 'success', model }) });

      setTimeout(() => {
        if (useRefInputFile && useRefInputFile.current) useRefInputFile.current.value = '';
        dataFilesProgressFix = {} as IDataFilesProgress;
        dataFilesDoneFix = {} as IDataFilesProgressDone;
        setDataFiles(newDataFilesErrors);
        setDataVideos(newDataVideo);
      }, 1500);
    }
  }, [dataFilesDone]);

  /**
   * Renders.
  */
  const RenderDataFilesMemo = React.useCallback(() => (
    <>
      <VideoPreviewContainer
        cols={resolveGrid()} 
        rowHeight={120} 
      >
        {dataFiles.map((item: IDataFiles, i) => (
          <VideoPreviewWrapper 
            key={String(i)} 
            sx={{ overflow: 'hidden' }}
          >
            <video src={`${resolveObjUrl(item.file)}#t=2`} autoPlay={false} controls={false} preload="metadata" height="120px">
              Seu navegador não suporta vídeos incorporados.
            </video>
            {resolveFileProgress(item.file) && <LinearProgressWithLabel value={resolveFileProgress(item.file)} file={item.file} />}
          </VideoPreviewWrapper>
        ))}
      </VideoPreviewContainer>
      <Divider style={{ margin: '35px 15px' }} />
    </>
  ), [dataFiles]);

  const renderMap = () => {
    if (!hasProperty(property, 'code') || PROPERTIES_VIDEOS_STATUS === 'loading')
      return (
        <WrapperVideoLoading>
          <VideoLoading component='div' />
        </WrapperVideoLoading>
      );

    if (dataVideos.length)
      return (
        <>
          <DeleteConfirmMemo />
          <VideoWrapper>
            {renderActions()}
            <video src={`${dataVideos[0].url}#t=2`} autoPlay={false} controls preload="metadata" height="350px">
              Seu navegador não suporta vídeos incorporados.
            </video>
          </VideoWrapper>
        </>
      );
    else 
      return (
        <VideoInfoWrapper>
          <VideoInfo>
            <VideocamOffIcon /> Imóvel sem vídeo.
          </VideoInfo>
        </VideoInfoWrapper>
      );
  };

  const renderGalleryActions = () => {
    if (disabled) return null;

    return (
      <ButtonFileContainer>
        <Fab variant="extended" onClick={handleSeletecVideo} disabled={Boolean(!hasProperty(property, 'code') || dataVideos.length)}>
          <VideoLibraryIcon sx={{ mr: 1 }} />
          ADICIONAR VÍDEO
        </Fab>
        <input className='input-file' ref={useRefInputFile} type='file' name='newVideo' accept="video/mp4,video/x-m4v,video/*" onChange={handleChangeInput} />
      </ButtonFileContainer>
    );
  };

  return (
    <>
      {renderGalleryActions()}
      {!!dataFiles.length && <RenderDataFilesMemo />}
      <VideoContainer>
        {renderMap()}
      </VideoContainer>
    </>
  );
};

export default Video;