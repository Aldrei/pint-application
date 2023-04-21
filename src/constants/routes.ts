import { IRoutes } from '../types/routes';

interface IPropertiesList {
  page?: string;
}

interface IPropertiesEdit {
  code: string;
  tab?: 'infos' | 'map' | 'photos' | 'video';
}

interface ICrudList {
  page?: string;
}

interface ICrudEdit {
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
  /**
   * Owners.
  */
  ownersList: {
    path: '/owners',
    go: ({ page }: ICrudList): string => `/owners?page=${page || '1'}`,
  },
  ownersCreate: {
    path: '/owners/create',
    go: () => '/owners/create',
  },
  ownersEdit: {
    path: '/owners/edit/:id',
    go: ({ id }: ICrudEdit): string => `/owners/edit/${id}`,
  },
  ownersDetail: {
    path: '/owners/:id',
    go: ({ id }): string => `/owners/${id}`,
  },
  ownersDelete: {
    path: '/owners/delete/:id',
    go: ({ id }): string => `/owners/delete/${id}`,
  },
  /**
   * Employees.
  */
  employeesList: {
    path: '/employees',
    go: ({ page }: ICrudList): string => `/employees?page=${page || '1'}`,
  },
  employeesCreate: {
    path: '/employees/create',
    go: () => '/employees/create',
  },
  employeesEdit: {
    path: '/employees/edit/:id',
    go: ({ id }: ICrudEdit): string => `/employees/edit/${id}`,
  },
  employeesDetail: {
    path: '/employees/:id',
    go: ({ id }): string => `/employees/${id}`,
  },
  employeesDelete: {
    path: '/employees/delete/:id',
    go: ({ id }): string => `/employees/delete/${id}`,
  },
  /**
   * Cities.
  */
  citiesList: {
    path: '/cities',
    go: ({ page }: ICrudList): string => `/cities?page=${page || '1'}`,
  },
  citiesCreate: {
    path: '/cities/create',
    go: () => '/cities/create',
  },
  citiesEdit: {
    path: '/cities/edit/:id',
    go: ({ id }: ICrudEdit): string => `/cities/edit/${id}`,
  },
  citiesDetail: {
    path: '/cities/:id',
    go: ({ id }): string => `/cities/${id}`,
  },
  citiesDelete: {
    path: '/cities/delete/:id',
    go: ({ id }): string => `/cities/delete/${id}`,
  },
  /**
   * Neighborhoods.
  */
  neighborhoodsList: {
    path: '/neighborhoods',
    go: ({ page }: ICrudList): string => `/neighborhoods?page=${page || '1'}`,
  },
  neighborhoodsCreate: {
    path: '/neighborhoods/create',
    go: () => '/neighborhoods/create',
  },
  neighborhoodsEdit: {
    path: '/neighborhoods/edit/:id',
    go: ({ id }: ICrudEdit): string => `/neighborhoods/edit/${id}`,
  },
  neighborhoodsDetail: {
    path: '/neighborhoods/:id',
    go: ({ id }): string => `/neighborhoods/${id}`,
  },
  neighborhoodsDelete: {
    path: '/neighborhoods/delete/:id',
    go: ({ id }): string => `/neighborhoods/delete/${id}`,
  },
  /**
   * Slides.
  */
  slidesEdit: {
    path: '/slides/edit',
    go: (): string => '/slides/edit',
  },
};
