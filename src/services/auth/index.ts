import api from '../../config/services';

import { API } from '../../constants';

export interface IAuthService {
  username: string;
  password: string;
}

export const authService = {
  accessToken: (data: IAuthService) => api.post(API.AUTH, { ...data, client_id: 'webid', grant_type: 'password', client_secret: '' }),
}