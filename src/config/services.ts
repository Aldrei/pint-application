import axios from 'axios';

// import { IAuthServiceAccessTokenResponse } from '../services/auth';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const getToken = () => {
  try {
    const persistImob = localStorage.getItem('persist:imob');
    if (persistImob) {
      const persistImobData = JSON.parse(persistImob);

      if (persistImobData.authReducer) {
        const authReducerData = Object.assign({}, JSON.parse(persistImobData.authReducer));
        return authReducerData?.accessToken?.access_token;
      }
    }

    return '';
  } catch (error) {
    console.log(error);
    return '';
  }
};


// Add a request interceptor
api.interceptors.request.use(function (config) {
  if (config.headers) config.headers['Authorization'] = `Bearer ${getToken()}`;
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


// Add a response interceptor
api.interceptors.response.use(function (response) {
  console.log('api.interceptors.response success...');
  // Any status code that lie within the range of 2xx cause this function to trigger
  /** NOTE: Suppress 'A non-serializable value was detected in the state, in the path' error */
  return JSON.parse(JSON.stringify(response));
}, function (error) {
  console.log('api.interceptors.response error...', { error });
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // return Promise.reject(error);

  console.log('api.interceptors.response success...', error);

  if (error.response.status === 401) {
    const persistImob = localStorage.getItem('persist:imob');
    if (persistImob) {
      const persistImobData = JSON.parse(persistImob);

      if (persistImobData.authReducer) {
        const authReducerData = Object.assign({}, JSON.parse(persistImobData.authReducer));
        authReducerData.accessToken = {};
        localStorage.setItem('persist:imob', JSON.stringify(authReducerData));
      }
    }
  }

  /** NOTE: Suppress 'A non-serializable value was detected in the state, in the path' error */
  return JSON.parse(JSON.stringify(error.response));
});

export default api;