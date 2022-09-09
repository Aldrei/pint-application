import api from '../../config/services';

import { API } from '../../constants';

/**
 * List.
*/
// export interface IPropertiesServiceListResponse {
//   access_token?: string;
//   token_type?: string;
//   expires_in?: number;
//   refresh_token?: string;
// }

// export interface IPropertiesServiceListRequest {
//   username: string;
//   password: string;
// }

export const propertiesService = {
  list: (page: number) => api.get(`${API.PROPERTIES.LIST}${page ? '?page='+page : ''}`),
};
