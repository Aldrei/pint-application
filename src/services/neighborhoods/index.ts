import api from '../../hooks/useConfigAxios';

import { API } from '../../constants';

import { IPaginationServiceThunk, INeighborhoodStorePayload } from '../../types';

interface INeighborhoodSearchParams {
  search: string;
  cityId: string;
}
export const neighborhoodsService = {
  search: ({ search, cityId }: INeighborhoodSearchParams) => api.get(API.NEIGHBORHOODS.SEARCH(search, cityId)),
  list: ({ page }: IPaginationServiceThunk) => api.get(`${API.NEIGHBORHOODS.LIST}${page ? '?page='+page : ''}`),
  store: (dataStore: INeighborhoodStorePayload, cityId: string) => api.post(API.NEIGHBORHOODS.STORE(cityId), dataStore),
  update: (id: string, dataStore: INeighborhoodStorePayload) => api.put(API.NEIGHBORHOODS.UPDATE(id), dataStore),
  delete: (id: string) => api.delete(API.NEIGHBORHOODS.DELETE(id)),
  show: (id: string) => api.get(API.NEIGHBORHOODS.SHOW(id)),
};
