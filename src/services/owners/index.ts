import api from '../../hooks/useConfigAxios';

import { API } from '../../constants';

export const ownersService = {
  search: (search: string) => api.get(API.OWNERS.SEARCH(search)),
};
