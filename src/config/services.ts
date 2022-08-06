import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// Add a response interceptor
api.interceptors.response.use(function (response) {
  console.log('api.interceptors.response success...');
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  console.log('api.interceptors.response error...', { error });
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  // return Promise.reject(error);
  return error.response;
});

export default api;