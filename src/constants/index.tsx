import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

import { ROUTES } from './routes';

export const API = {
  AUTH: 'oauth/access_token',
  REVOKE: 'api/oauth/revoke',
};

export const MENU = {
  PART_ONE: {
    VISAO_GERAL: {
      desc: 'Visão Geral',
      icon: <DashboardOutlinedIcon />,
      route: ROUTES.dashboard.path
    },
    IMOVEIS: {
      desc: 'Imóveis',
      icon: '',
      route: ''
    },
    CLIENTES: {
      desc: 'Clientes',
      icon: '',
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
