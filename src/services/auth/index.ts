import api from '../../config/services';

import { API } from '../../constants';

export interface IAuthServiceAccessTokenResponse {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  refresh_token?: string;
}

export interface IAuthServiceAccessTokenRequest {
  username: string;
  password: string;
}

export const authService = {
  accessToken: (data: IAuthServiceAccessTokenRequest) => api.post(API.AUTH, { ...data, client_id: 'webid', grant_type: 'password', client_secret: '' })
    // .then(function (response) {
    //   console.log('response 1:', response);
    //   return response;
    // }, function (response) {
    //   console.log('response 2:', response);
    //   return response;
    // })
    // .catch(function (error) {
    //   console.log('response error 3:', error);
    //   return error;
    // }),
}