import api from '../../config/services';

import { API } from '../../constants';

/**
 * Access token.
*/
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

/**
 * Revoke.
*/
export interface IAuthServiceRevokeResponse {
  message?: string;
}

export interface IAuthServiceRevokeRequest {
  token: string;
}

export const authService = {
  accessToken: (data: IAuthServiceAccessTokenRequest) => api.post(API.AUTH, { ...data, client_id: 'webid', grant_type: 'password', client_secret: '' }),
  revoke: (data: IAuthServiceRevokeRequest) => api.post(API.REVOKE, { ...data })
};