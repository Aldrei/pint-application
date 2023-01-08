import { IRoutes } from '../types/routes';

interface IPropertiesEdit {
  code: string;
  tab?: 'infos' | 'map' | 'photos' | 'video';
}

interface IPropertiesList {
  page?: string;
}

export const ROUTES: IRoutes = {
  index: {
    path: '/',
    go: () => '/',
  },
  login: {
    path: '/login',
    go: () => '/login',
  },
  dashboard: {
    path: '/dashboard',
    go: () => '/dashboard',
  },
  propertiesList: {
    path: '/properties',
    go: ({ page }: IPropertiesList): string => `/properties?page=${page || '1'}`,
  },
  propertiesDetail: {
    path: '/properties/:code',
    go: ({ code }) => `/properties/${code}`,
  },
  propertiesCreate: {
    path: '/properties/create',
    go: () => '/properties/create',
  },
  propertiesEdit: {
    path: '/properties/edit/:code',
    go: ({ code, tab }: IPropertiesEdit): string => `/properties/edit/${code}?step=${tab || 'infos'}`,
  },
};
