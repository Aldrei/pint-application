import api from '../../hooks/useConfigAxios';

import { API } from '../../constants';

export const employeesService = {
  search: (search: string) => api.get(API.EMPLOYEES.SEARCH(search)),
};
