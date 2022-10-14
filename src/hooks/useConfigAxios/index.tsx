import api from './instance';

import { clearAccessTokenReducer } from '../../reducers/auty';
import { useAppDispatch } from '../../stores/hooks';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export const getToken = () => {
  try {
    const persistImob = localStorage.getItem('persist:imob');
    
    if (persistImob) {
      const persistImobData = JSON.parse(persistImob);
      if (persistImobData.authReducer) {
        const authReducerData = Object.assign({}, JSON.parse(persistImobData.authReducer));
        return authReducerData.accessToken.access_token;
      }
    }

    return '';
  } catch (error) {
    return '';
  }
};

/**
 * Interceptor request. 
*/
export const interceptorRequestSuccess = function (config: AxiosRequestConfig) {
  const token = getToken();
  if (config.headers && token) config.headers['Authorization'] = `Bearer ${getToken()}`;
  return config;
};

// Add a request interceptor
api.interceptors.request.use(interceptorRequestSuccess);

/**
 * Interceptor response.
*/
export const interceptorResponseSuccess = (response: AxiosResponse) => {
  // console.log('api.interceptors.response success...', response);
  // Any status code that lie within the range of 2xx cause this function to trigger
  /** NOTE: Suppress 'A non-serializable value was detected in the state, in the path' error */
  return JSON.parse(JSON.stringify(response));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const interceptorResponseError = (error: any, dispatch: any) => {
  // console.log('api.interceptors.response error...', error);
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // return Promise.reject(error);

  /** 
   * NOTE:
   *  JSON.stringify(error) don`t print response flag. Why??? Hmmm... but with Object.assing it`s Ok. Hmmmm...
   * 
   * const teste = Object.assign({}, error);
   * console.log('api.interceptors.response JSON.stringify(teste):', JSON.stringify(teste)); // Now response flag exist...
  */

  if (error.response.status === 401) {
    dispatch(clearAccessTokenReducer());
  }

  /** NOTE: Suppress 'A non-serializable value was detected in the state, in the path' error */
  return JSON.parse(JSON.stringify(error.response));
};

export const useConfigAxios = () => {
  const dispatch = useAppDispatch();
  /* istanbul ignore next */ 
  api.interceptors.response.use(interceptorResponseSuccess, (error) => interceptorResponseError(error, dispatch));
  return [];
};

export default api;