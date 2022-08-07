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
};