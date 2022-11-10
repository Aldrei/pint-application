import { IRoutes } from '../types/routes';

export const ROUTES: IRoutes = {
  index: {
    path: '/'
  },
  login: {
    path: '/login'
  },
  dashboard: {
    path: '/dashboard'
  },
  propertiesList: {
    path: '/properties'
  },
  propertiesDetail: {
    path: '/properties/:code'
  },
  propertiesCreate: {
    path: '/properties/create'
  },
  propertiesEdit: {
    path: '/properties/edit/:code'
  },
};
