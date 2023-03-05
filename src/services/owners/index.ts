import api from '../../hooks/useConfigAxios';

import { API } from '../../constants';
import { IOwnerStorePayload, IOwnerUpdatePayload } from '../../types';

export const ownersService = {
  search: (search: string) => api.get(API.OWNERS.SEARCH(search)),
  store: (dataStore: IOwnerStorePayload) => api.post(API.OWNERS.STORE, dataStore),
  update: (id: string, dataUpdate: IOwnerUpdatePayload) => api.put(API.OWNERS.UPDATE(id), dataUpdate),
  show: (id: string) => api.get(API.OWNERS.SHOW(id)),
};
