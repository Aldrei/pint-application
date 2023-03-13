import api from '../../hooks/useConfigAxios';

import { API } from '../../constants';
import { IOwnerStorePayload, IOwnerUpdatePayload, IOwnersServiceThunk } from '../../types';

export const ownersService = {
  list: ({ page }: IOwnersServiceThunk) => api.get(`${API.OWNERS.LIST}${page ? '?page='+page : ''}`),
  search: (search: string) => api.get(API.OWNERS.SEARCH(search)),
  store: (dataStore: IOwnerStorePayload) => api.post(API.OWNERS.STORE, dataStore),
  update: (id: string, dataUpdate: IOwnerUpdatePayload) => api.put(API.OWNERS.UPDATE(id), dataUpdate),
  show: (id: string) => api.get(API.OWNERS.SHOW(id)),
  delete: (id: string) => api.delete(API.OWNERS.DELETE(id)),
};
