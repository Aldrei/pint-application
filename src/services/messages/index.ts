import { API } from '../../constants';
import api from '../../hooks/useConfigAxios';
import { IPaginationServiceThunk } from '../../types';

export const messagesService = {
  list: ({ page }: IPaginationServiceThunk) => api.get(`${API.MESSAGES.LIST}${page ? '?orderASC=false&page='+page : ''}`),
  delete: (id: string) => api.delete(API.MESSAGES.DELETE(id)),
  show: (id: string) => api.get(API.MESSAGES.SHOW(id)),
};
