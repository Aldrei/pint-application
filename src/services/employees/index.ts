import api from '../../hooks/useConfigAxios';

import { API } from '../../constants';
import { IEmployeesServiceThunk, IEmployeeStorePayload } from '../../types';

export const employeesService = {
  search: (search: string) => api.get(API.EMPLOYEES.SEARCH(search)),
  list: ({ page }: IEmployeesServiceThunk) => api.get(`${API.EMPLOYEES.LIST}${page ? '?page='+page : ''}`),
  store: (dataStore: IEmployeeStorePayload) => api.post(API.EMPLOYEES.STORE, dataStore),
  update: (dataStore: IEmployeeStorePayload) => api.post(API.EMPLOYEES.STORE, dataStore),
  delete: (id: string) => api.delete(API.EMPLOYEES.DELETE(id)),
  show: (id: string) => api.get(API.EMPLOYEES.SHOW(id)),
};
