import api from '../../hooks/useConfigAxios';

import { API } from '../../constants';

interface INeighborhoodSearchParams {
  search: string;
  cityId: string;
}
export const neighborhoodsService = {
  search: ({ search, cityId }: INeighborhoodSearchParams) => api.get(API.NEIGHBORHOODS.SEARCH(search, cityId)),
};
