import api from '../../hooks/useConfigAxios';

import { API } from '../../constants';

import { IPropertyStorePayload, IPropertyUpdatePayload, IPhotoUpdatePositionsPayload } from '../../types';

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
  show: (code: string) => api.get(API.PROPERTIES.SHOW(code)),
  photos: (code: string) => api.get(API.PROPERTIES.PHOTOS(code)),
  photosUpdatePositions: (code: string, data: IPhotoUpdatePositionsPayload[]) => api.post(API.PROPERTIES.PHOTOS_UPDATE_POSITIONS(code), { data }),
  store: (dataStore: IPropertyStorePayload) => api.post(API.PROPERTIES.STORE, dataStore),
  update: (id: string, dataUpdate: IPropertyUpdatePayload) => api.put(API.PROPERTIES.UPDATE(id), dataUpdate),
};
