import * as React from 'react';

import Fab from '@mui/material/Fab';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';

import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import DoneIcon from '@mui/icons-material/Done';
import BlockIcon from '@mui/icons-material/Block';

import { hasProperty } from '../../../../../helpers';

import { IPaginateDefault, IVideoData, IPropertyData } from '../../../../../types';

import api from '../../../../../hooks/useConfigAxios';
import { useBreakpoints } from '../../../../../hooks/useBreakpoints';

import { IPropertiesVideosServiceRequest, propertiesVideosThunk } from '../../../../../reducers/properties/videos';

import { useAppSelectorBlaBlaBal } from '../../../../../hooks/useReducerSelector';

import { useAppDispatch } from '../../../../../stores/hooks';

import { API } from '../../../../../constants';

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
  VideoWrapper
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
}

const dataFilesProgressFix = {} as IDataFilesProgress;
const dataFilesDoneFix = {} as IDataFilesProgressDone;

const Video = ({ dataProperty }: IProps) => {
  const dispatch = useAppDispatch();

  /**
   * dataProperty prop.
  */
  const [property, setProperty] = React.useState<IPropertyData>(hasProperty(dataProperty, 'code') ? dataProperty as IPropertyData : {} as IPropertyData);

  React.useEffect(() => {
    if (hasProperty(dataProperty, 'code') && !hasProperty(property, 'code')) {
      console.log('DEBUG PROPERTIES_VIDEOS:', PROPERTIES_VIDEOS);
      setProperty(dataProperty as IPropertyData);
      if (dataProperty && dataProperty.code) dispatch(propertiesVideosThunk(String(dataProperty.code)));
    }
  }, [dataProperty]);

  console.log('DEBUG dataProperty:', dataProperty);
  console.log('DEBUG property:', property);

  /**
   * Get videos stored.
  */
  const propertiesVideosReducerData = useAppSelectorBlaBlaBal('propertiesVideosReducer') as IPropertiesVideosServiceRequest;
  const PROPERTIES_VIDEOS = propertiesVideosReducerData.data as IPaginateDefault;
  console.log('DEBUG PROPERTIES_VIDEOS:', PROPERTIES_VIDEOS);

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

        if (!hasProperty(res, 'data.video.data')) {
          console.log('DEBUG-AXIOS DONE ERROR:', file);
          dataFilesDoneFix[file.name] = { status: 'error' };
          setDataFilesDone({ ...dataFilesDone, [file.name]: 'error' });
        }

        if (hasProperty(res, 'data.video.data')) {
          console.log('DEBUG-AXIOS DONE SUCCESS:', res.data.video.data);
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
      console.log('DEBUG-AXIOS e.target.files:', e.target.files);

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
  // console.log('DEBUG dataVideo:', dataVideo);
  // console.log('DEBUG dataFiles:', dataFiles);

  React.useEffect(() => {
    // console.log('DEBUG dataFiles.length:', dataFiles.length);
    // console.log('DEBUG Object.keys(dataFilesProgressFix).length:', Object.keys(dataFilesProgressFix).length);

    if (dataFiles.length && dataFiles.length === Object.keys(dataFilesDoneFix).length) {
      console.log('======> DEBUG UPLOAD FINISH!!! <======');

      const newDataVideo = JSON.parse(JSON.stringify(dataVideos));

      const newDataFiles = dataFiles.filter((item: IDataFiles) => {
        if (dataFilesDoneFix[item.file.name] && dataFilesDoneFix[item.file.name].status !== 'success') return item;
        if (dataFilesDoneFix[item.file.name] && dataFilesDoneFix[item.file.name].status === 'success') newDataVideo.push(dataFilesDoneFix[item.file.name].dataVideo);
      }) as IDataFiles[];

      setTimeout(() => {
        setDataFiles(newDataFiles);
        setDataVideos(newDataVideo);
      }, 1500);
    }
  }, [dataFilesDone]);

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
            <img
              data-testid={`video-preview-${i}`}
              src={resolveObjUrl(item.file)}
              loading="lazy"
            />
            {resolveFileProgress(item.file) && <LinearProgressWithLabel value={resolveFileProgress(item.file)} file={item.file} />}
          </VideoPreviewWrapper>
        ))}
      </VideoPreviewContainer>
      <Divider style={{ margin: '35px 15px' }} />
    </>
  ), [dataFiles]);

  return (
    <>
      <ButtonFileContainer>
        <Fab variant="extended" onClick={handleSeletecVideo}>
          <VideoLibraryIcon sx={{ mr: 1 }} />
          ADICIONAR VÍDEO
        </Fab>
        <input className='input-file' ref={useRefInputFile} type='file' name='newVideo' accept="video/mp4,video/x-m4v,video/*" onChange={handleChangeInput} />
      </ButtonFileContainer>
      {!!dataFiles.length && <RenderDataFilesMemo />}
      <VideoContainer>
        {hasProperty(property, 'video.data.url') ? (
          <VideoWrapper>
            <video src={`${property.video.data.url}#t=2`} autoPlay={false} controls preload="metadata" height="350px">
              Seu navegador não suporta vídeos incorporados.
            </video>
          </VideoWrapper>
        ) : (
          <VideoInfoWrapper>
            <VideoInfo>
              <VideocamOffIcon /> Imóvel sem vídeo.
            </VideoInfo>
          </VideoInfoWrapper>
        )}
      </VideoContainer>
    </>
  );
};

export default Video;