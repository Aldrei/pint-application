import { API } from '../../constants';
import api from '../../hooks/useConfigAxios';
import { IPaginationServiceThunk } from '../../types';

export const propertiesAgenciesService = {
  list: ({ page }: IPaginationServiceThunk) => api.get(`${API.PROPERTIES_AGENCIES.LIST}${page ? '?orderASC=false&page='+page : ''}`),
  delete: (id: string) => api.delete(API.PROPERTIES_AGENCIES.DELETE(id)),
  show: (id: string) => api.get(API.PROPERTIES_AGENCIES.SHOW(id)),
};
