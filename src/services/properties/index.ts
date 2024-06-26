import api from '../../hooks/useConfigAxios';

import { API } from '../../constants';

import { IPropertyStorePayload, IPropertyUpdatePayload, IPhotoUpdatePositionsPayload, IPhotoUploadPayload, IPhotoUpdatePayload, IPropertiesServiceThunk } from '../../types';

export const propertiesService = {
  list: ({ page, asc }: IPropertiesServiceThunk) => api.get(`${API.PROPERTIES.LIST}${page ? '?page='+page : ''}&orderASC=${asc ? 'true' : 'false'}`),
  show: (code: string) => api.get(API.PROPERTIES.SHOW(code)),
  store: (dataStore: IPropertyStorePayload) => api.post(API.PROPERTIES.STORE, dataStore),
  update: (id: string, dataUpdate: IPropertyUpdatePayload) => api.put(API.PROPERTIES.UPDATE(id), dataUpdate),
  delete: (code: string) => api.delete(API.PROPERTIES.DELETE(code)),
  search: (search: string) => api.get(API.PROPERTIES.SEARCH(search)),
};

export const propertiesVideosService = {
  list: (code: string) => api.get(API.PROPERTIES.VIDEOS.LIST(code)),
  delete: (code: string, videoId: string) => api.delete(API.PROPERTIES.VIDEOS.DELETE(code, videoId)),
};

export const propertiesPhotosService = {
  list: (code: string) => api.get(API.PROPERTIES.PHOTOS.LIST(code)),
  store: (code: string, file: IPhotoUploadPayload) => api.post(API.PROPERTIES.PHOTOS.STORE(code), { file }),
  update: (code: string, photoId: string, dataUpdate: IPhotoUpdatePayload) => api.put(API.PROPERTIES.PHOTOS.UPDATE(code, photoId), dataUpdate),
  updatePositions: (code: string, data: IPhotoUpdatePositionsPayload[]) => api.post(API.PROPERTIES.PHOTOS.UPDATE_POSITIONS(code), { data }),
  delete: (code: string, photoId: string) => api.delete(API.PROPERTIES.PHOTOS.DELETE(code, photoId)),
};
