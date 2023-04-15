import api from '../../hooks/useConfigAxios';

import { API } from '../../constants';

import { IPaginationServiceThunk, ICityStorePayload } from '../../types';

export const citiesService = {
  search: (search: string) => api.get(API.CITIES.SEARCH(search)),
  list: ({ page }: IPaginationServiceThunk) => api.get(`${API.CITIES.LIST}${page ? '?page='+page : ''}`),
  store: (dataStore: ICityStorePayload) => api.post(API.CITIES.STORE, dataStore),
  update: (id: string, dataStore: ICityStorePayload) => api.put(API.CITIES.UPDATE(id), dataStore),
  delete: (id: string) => api.delete(API.CITIES.DELETE(id)),
  show: (id: string) => api.get(API.CITIES.SHOW(id)),
};
