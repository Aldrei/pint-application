import api from '../../hooks/useConfigAxios';

import { API } from '../../constants';
import { IBannersServiceThunk, IBannerStorePayload, IBannerUpdatePositionsPayload } from '../../types';

export const bannersService = {
  list: ({ page }: IBannersServiceThunk) => api.get(`${API.BANNERS.LIST}${page ? '?page='+page : ''}`),
  store: (dataStore: IBannerStorePayload) => api.post(API.BANNERS.STORE, dataStore),
  update: (id: string, dataStore: IBannerStorePayload) => api.put(API.BANNERS.UPDATE(id), dataStore),
  delete: (id: string) => api.delete(API.BANNERS.DELETE(id)),
  show: (id: string) => api.get(API.BANNERS.SHOW(id)),
  updatePositions: (dataStore: IBannerUpdatePositionsPayload) => api.put(API.BANNERS.UPDATE_POSITIONS(), dataStore),
};
