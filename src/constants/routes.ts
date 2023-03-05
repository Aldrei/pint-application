import { IRoutes } from '../types/routes';

interface IPropertiesList {
  page?: string;
}

interface IPropertiesEdit {
  code: string;
  tab?: 'infos' | 'map' | 'photos' | 'video';
}

interface IOwnersList {
  page?: string;
}

interface IOwnersEdit {
  id: string;
  tab?: 'infos';
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
    go: ({ code, tab }: IPropertiesEdit): string => `/properties/edit/${code}?tab=${tab || 'infos'}`,
  },
  ownersList: {
    path: '/owners',
    go: ({ page }: IOwnersList): string => `/owners?page=${page || '1'}`,
  },
  ownersCreate: {
    path: '/owners/create',
    go: () => '/owners/create',
  },
  ownersEdit: {
    path: '/owners/edit/:id',
    go: ({ id, tab }: IOwnersEdit): string => `/owners/edit/${id}?tab=${tab || 'infos'}`,
  },
};
