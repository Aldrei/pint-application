import api from '../../hooks/useConfigAxios';

import { API } from '../../constants';

export const citiesService = {
  search: (search: string) => api.get(API.CITIES.SEARCH(search)),
};
