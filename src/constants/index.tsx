import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import ContactsIcon from '@mui/icons-material/Contacts';

import { ROUTES } from './routes';

export const API = {
  AUTH: 'oauth/access_token',
  REVOKE: 'api/oauth/revoke',
  PROPERTIES: {
    LIST: 'api/properties',
    SHOW: (code: string) => `api/properties/${code}`,
    STORE: 'api/properties',
    UPDATE: (id: string) => `api/properties/${id}`,
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
    SEARCH: (search: string) => `api/owners/search/${search}`
  },
  EMPLOYEES: {
    SEARCH: (search: string) => `api/employees/search/${search}`
  },
  CITIES: {
    SEARCH: (search: string) => `api/cities/search/${search}`
  },
  NEIGHBORHOODS: {
    SEARCH: (search: string, cityId: string) => `api/cities/${cityId}/neighborhoods/search/${search}`
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
      route: ''
    },
    EQUIPE: {
      desc: 'Equipe',
      icon: '',
      route: ''
    },
    BAIRROS: {
      desc: 'Bairro',
      icon: '',
      route: ''
    },
  },
  PART_TWO: {
    SLIDE_DO_SITE: {
      desc: 'Slide do Site',
      icon: '',
      route: ''
    },
    MENSAGENS_DO_SITE: {
      desc: 'Mensagens do Site',
      icon: '',
      route: ''
    },
    SOLICITACOES_DO_SITE: {
      desc: 'Solicitações do Site',
      icon: '',
      route: ''
    },
    AGENCIAMENTOS_DO_SITE: {
      desc: 'Agenciamentos do Site',
      icon: '',
      route: ''
    },
  }
};

export const MAX_PHOTOS_BY_PROPERTY = 50;
