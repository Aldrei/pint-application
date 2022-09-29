import api from '../../hooks/useConfigAxios';

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
  /**
   * TODO: Rename list to index.
  */
  list: (page: number) => api.get(`${API.PROPERTIES.LIST}${page ? '?page='+page : ''}`),
  show: (code: string) => api.get(API.PROPERTIES.SHOW(code)),
  photos: (code: string) => api.get(API.PROPERTIES.PHOTOS(code)),
};
