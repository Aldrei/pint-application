import ContactsIcon from '@mui/icons-material/Contacts';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import EmailIcon from '@mui/icons-material/Email';
import GroupsIcon from '@mui/icons-material/Groups';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import PlaceIcon from '@mui/icons-material/Place';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';

import { canManageUsers } from '../helpers';
import { ROUTES } from './routes';

export const API = {
  AUTH: 'oauth/access_token',
  REVOKE: 'api/oauth/revoke',
  WHO: 'api/who-is-auth',
  PROPERTIES: {
    LIST: 'api/properties',
    SHOW: (code: string) => `api/properties/${code}`,
    STORE: 'api/properties',
    UPDATE: (id: string) => `api/properties/${id}`,
    DELETE: (id: string) => `api/properties/${id}`,
    SEARCH: (search: string) => `api/properties/search/${search}`,
    VIDEOS: {
      LIST: (code: string) => `api/properties/${code}/videos?page=1`,
      UPLOAD: (code: string) => `api/properties/${code}/videos`,
      DELETE: (id: string, video_id: string) => `api/properties/${id}/videos/${video_id}`,
    },
    PHOTOS: {
      LIST: (code: string) => `api/properties/${code}/photos?page=1`,
      STORE: (code: string) => `api/properties/${code}/photos`,
      UPDATE: (id: string, photo_id: string) => `api/properties/${id}/photos/${photo_id}`,
      UPDATE_POSITIONS: (code: string) => `api/properties/${code}/photos/all/update-posicoes`,
      DELETE: (id: string, photo_id: string) => `api/properties/${id}/photos/${photo_id}`,
    }
  },
  OWNERS: {
    LIST: 'api/owners',
    SEARCH: (search: string) => `api/owners/search/${search}`,
    STORE: 'api/owners',
    UPDATE: (id: string) => `api/owners/${id}`,
    SHOW: (id: string) => `api/owners/${id}`,
    DELETE: (id: string) => `api/owners/${id}`,
  },
  EMPLOYEES: {
    LIST: 'api/employees',
    SEARCH: (search: string) => `api/employees/search/${search}`,
    STORE: 'api/employees',
    UPDATE: (id: string) => `api/employees/${id}`,
    DELETE: (id: string) => `api/employees/${id}`,
    SHOW: (id: string) => `api/employees/${id}`,
  },
  CITIES: {
    SEARCH: (search: string) => `api/cities/search/${search}`,
    LIST: 'api/cities',
    STORE: 'api/cities',
    UPDATE: (id: string) => `api/cities/${id}`,
    DELETE: (id: string) => `api/cities/${id}`,
    SHOW: (id: string) => `api/cities/${id}`,
  },
  NEIGHBORHOODS: {
    SEARCH: (search: string, cityId: string) => `api/cities/${cityId}/neighborhoods/search/${search}`,
    LIST: 'api/neighborhoods',
    STORE: (cityId: string) => `api/cities/${cityId}/neighborhoods`,
    UPDATE: (id: string) => `api/neighborhoods/${id}`,
    DELETE: (id: string) => `api/neighborhoods/${id}`,
    SHOW: (id: string) => `api/neighborhoods/${id}`,
  },
  SLIDES: {
    // Don't existe slide CRUD ou any endpoint to slides yet!
  },
  BANNERS: {
    LIST: 'api/banners',
    STORE: 'api/banners',
    UPDATE: (id: string) => `api/banners/${id}`,
    DELETE: (id: string) => `api/banners/${id}`,
    SHOW: (id: string) => `api/banners/${id}`,
    UPDATE_POSITIONS: () => 'api/banners/all/update-posicoes',
  },
  MESSAGES: {
    LIST: 'api/messages',
    DELETE: (id: string) => `api/messages/${id}`,
    SHOW: (id: string) => `api/messages/${id}`,
  },
  PROPERTIES_AGENCIES: {
    LIST: 'api/properties/agency/list',
    DELETE: (id: string) => `api/properties/agency/${id}`,
    SHOW: (id: string) => `api/properties/agency/${id}`,
  },
  SUBSCRIPTION: {
    PAYMENT: 'api/subscription/payment',
    PAYMENT_INTENT: 'api/subscription/payment-intent',
  }
};

export const ROLES = {
  ADMINISTRATOR: {
    LABEL: 'Administrador',
    VALUE: 'admin',
    DESC: 'Tem permissão para tudo, inclusive criar novos funcionário com acesso ao sistema e app.'
  },
  AGENT: {
    LABEL: 'Agente',
    VALUE: 'agent',
    DESC: 'Pode gerenciar os imóveis, clientes e o slide do site.'
  },
  BROKER: {
    LABEL: 'Corretor',
    VALUE: 'broker',
    DESC: 'Pode gerenciar os imóveis, clientes e o slide do site.'
  },
  FINANCIAL: {
    LABEL: 'Financeiro',
    VALUE: 'financial',
    DESC: 'Pode gerenciar as contas a pagar e contas a receber.'
  },
  MANAGER: {
    LABEL: 'Gerenciar Usuários',
    VALUE: 'manager',
    DESC: 'Esta pessoa pode conceder e revogar acesso ao sistema e aplicativo para outras pessoas.'
  },
};

export const MENU = {
  PART_ONE: {
    VISAO_GERAL: {
      desc: 'Visão Geral',
      icon: <DashboardOutlinedIcon />,
      route: ROUTES.dashboard.go()
    },
    IMOVEIS: {
      desc: 'Imóveis',
      icon: <MapsHomeWorkIcon />,
      route: ROUTES.propertiesList.go({})
    },
    CLIENTES: {
      desc: 'Clientes',
      icon: <ContactsIcon />,
      route: ROUTES.ownersList.go({})
    },
    ...(canManageUsers() ? {
      EQUIPE: {
        desc: 'Equipe',
        icon: <GroupsIcon />,
        route: ROUTES.employeesList.go({})
      }
    }: {}),
    CIDADES: {
      desc: 'Cidades',
      icon: <PlaceIcon />,
      route: ROUTES.citiesList.go({})
    },
    BAIRROS: {
      desc: 'Bairro',
      icon: <PlaceIcon />,
      route: ROUTES.neighborhoodsList.go({})
    },
  },
  PART_TWO: {
    SLIDE_DO_SITE: {
      desc: 'Slide do Site',
      icon: <ViewCarouselIcon />,
      route: ROUTES.slidesEdit.go({})
    },
    MENSAGENS_DO_SITE: {
      desc: 'Mensagens do Site',
      icon: <EmailIcon />,
      route: ROUTES.messagesList.go({})
    },
    AGENCIAMENTOS_DO_SITE: {
      desc: 'Agenciamentos do Site',
      icon: <MapsHomeWorkIcon />,
      route: ROUTES.propertiesAgenciesList.go({})
    },
  }
};

export const MAX_PHOTOS_BY_PROPERTY = 50;
