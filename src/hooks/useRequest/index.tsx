import * as React from 'react';

import axios from '../../hooks/useConfigAxios';

// import { propertiesVideosService } from '../../services/properties';

import { IServiceRequestStatus } from '../../types';

interface IProps {
  type: 'propertyVideoDelete';
  code: string;
  videoId: string;
}

const useRequest = ({ code, videoId }: IProps) => {
  const [status, setStatus] = React.useState<IServiceRequestStatus>('idle');

  axios.get('https://swapi.dev/api/people', {
    onDownloadProgress: progressEvent => {
      setStatus('loading');
    }
  })
    .then((res) => {
      console.log('DEBUG RESPONSE:', res);
      setStatus('success');
    })
    .catch((err) => {
      console.log('DEBUG ERROR:', err);
      setStatus('failed');
    });

  return { status };
};

export default useRequest;