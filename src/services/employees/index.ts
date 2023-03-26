import api from '../../hooks/useConfigAxios';

import { API } from '../../constants';
import { IEmployeesServiceThunk } from '../../types';

export const employeesService = {
  search: (search: string) => api.get(API.EMPLOYEES.SEARCH(search)),
  list: ({ page }: IEmployeesServiceThunk) => api.get(`${API.EMPLOYEES.LIST}${page ? '?page='+page : ''}`),
};
