/**
 * ENVs.
*/
export interface IEnv {
  REACT_APP_ENVIRONMENT: 'local' | 'dev' | 'prod';
  REACT_APP_API_BASE_URL: string;
}

/**
 * Request.
*/
export interface IServiceError {
  status: string;
  message: string;
}

export interface IServiceRequest {
  name: string;
  statusCode?: number;
  statusText?: string;
  status: 'idle' | 'loading' | 'failed' | 'success';
  attempts?: number;
  data?: object;
}

/**
 * Owners.
*/
export interface IOwnerData {
  id: number,
  client_id: number,
  city_id: number,
  neighborhood_id: number,
  idProprietario: string;
  nomeRazao: string;
  cpfCnpj: string;
  rg: string;
  cnh: string;
  pessoa: string;
  inscricaoEstadual: string;
  sexo: string;
  estadoCivil: string;
  dataNascimento: string;
  naturalidade: string;
  profissao: string;
  renda: string;
  estado: string;
  idCidade: string;
  idBairro: string;
  logradouro: string;
  numero: string;
  cep: string;
  apto: string;
  fixo: string;
  celular: string;
  fax: string;
  email: string;
  email2: string;
  obs: string;
  conjNome: string;
  conjCpf: string;
  conjRg: string;
  conjCnh: string;
  conjDataNascimento: string;
  conjNaturalidade: string;
  conjProfissao: string;
  conjRenda: string;
  conjPai: string;
  conjMae: string;
  conjMesmoEndereco: string;
  conjEstado: string;
  conjIdCidade: string;
  conjIdBairro: string;
  conjLogradouro: string;
  conjNumero: string;
  conjCep: string;
  conjApto: string;
  conjFixo: string;
  conjCelular: string;
  conjFax: string;
  conjEmail: string;
  conjEmail2: string;
  conjSpc: string;
  conjSpcEntrada: string;
  conjSpcSaida: string;
  conjSpcValor: string;
  conjObs: string;
  foto: string;
  fotoMini: string;
  created_at: string;
  updated_at: string;
}

export interface IOwnerDataSearchResult {
  data?: IOwnerData[]
}

/**
 * Employees.
*/
export interface IEmployeeData {
  id: number;
  user_id: number;
  client_id: number;
  city_id: number;
  neighborhood_id: string;
  nome: string;
  dataNascimento: string;
  cargo: string;
  salarioBase: string;
  creci: string;
  usuarioDoSistema: string;
  ativo: string;
  estado: string;
  idCidade: string;
  idBairro: string;
  logradouro: string;
  numero: string;
  cep: string;
  apto: string;
  email: string;
  email2: string;
  celular: string;
  fixo: string;
  foto: string;
  fotoMini: string;
  publicarNoSite: string;
  oculto: string;
  created_at: string;
  updated_at: string;
  city: {
    data: ICityData;
  };
  user: { 
    data: IUserData;
  }
}

export interface IEmployeeDataSearchResult {
  data?: IEmployeeData[]
}

/**
 * Photos and videos.
*/
export interface IPhotoData {
  id: number;
  property_id: number;
  name: string;
  ordem: number;
  rotate: null;
  thumb: string;
  normal: string;
}

export interface IVideoData {
  id: number;
  property_id: number;
  src: string;
  legenda: string;
  url: string;
  ordem: number;
  created_at: string;
  updated_at: string;
}

/**
 * State, city and neighborhood.
*/
interface IStateData {
  id: number;
  name: string;
  abbr: string;
  created_at: string;
  updated_at: string;
}

export interface ICityData {
  id: number,
  name: string;
  long_desc: string;
  state: IStateData;
}

export interface ICitiesDataSearchResult {
  data: ICityData[];
}

export interface INeighborhoodData {
  id: number,
  client_id: number,
  city_id: number,
  idBairro: string,
  nome: string,
  idCidade: string,
  created_at: string,
  updated_at: string,
}

export interface INeighborhoodDataSearchResult {
  data: INeighborhoodData[];
}

/**
 * Roles.
*/
interface IRolesData {
  name: string;
  display_name: string;
  description: string;
  created_at: string;
  updated_at: string;
  pivot: {
    user_id: number;
    role_name: string;
  }
}

/**
 * Users.
*/
interface IUserData {
  id: number;
  name: string;
  email: string;
  password_temp: string;
  token_push: string;
  created_at: string;
  updated_at: string;
  roles: {
    data: IRolesData[]
  }
}

/**
 * Properties.
*/
type StatusPropertyData = 'Alugado' | 'Alugando' | 'Alugando Temporada' | 'Suspenso' | 'Vendendo' | 'Vendido' | 'Vendido por outro agente';
type CategoriaPropertyData = 'Comercial' | 'Industrial' | 'Residencial' | 'Rural';
type TipoPropertyData = 'Apartamento' | 'Apartamento Cobertura' | 'Área' | 'Bangalô' | 'Barracão' | 'Casa Alvenaria/Sobrado' | 'Casa Alvenaria' | 'Casa Geminada' | 'Casa Mista' | 'Chácara' | 'Chalé' | 'Edícula' | 'Flat' | 'Fazenda' | 'Galpão' | 'Kitnet' | 'Loft' | 'Prédio' | 'Sala Comercial' | 'Sítio' | 'Sobrado' | 'Terreno';
type NascerDoSolPropertyData = 'Frente' | 'Fundos' | 'Direita' | 'Esquerda';

export interface IPropertyData {
  id: number;
  client_id?: number;
  city_id?: number;
  neighborhood_id?: number;
  owner_id?: number;
  agent_id?: number;
  broker_id?: number;
  code: number;
  codeTipo: number;
  codePretty: string;
  nomeImovel: string;
  matricula: string | null;
  lote: string | null;
  quadra: string | null;
  empreendimento: number | null;
  placa: number | null;
  possuiFoto: number;
  exclusividade: number;
  exclusividadePeriodoInicio: string;
  exclusividadePeriodoFim: string;
  finalidade: string | null;
  categoria: CategoriaPropertyData;
  tipo: TipoPropertyData;
  status: StatusPropertyData;
  aluguelPeriodoInicio: string;
  aluguelPeriodoFim: string;
  dormitorio: string;
  garagem: string;
  lavanderia: number;
  telhado: string;
  forro: string;
  piso: string;
  aberturas: string;
  alarme: number;
  portaoEletronico: number;
  pocoArtesiano: number;
  cercaEletrica: number;
  cameraDeVideo: number;
  nascerDoSol: NascerDoSolPropertyData;
  descGeral: string;
  dataAgenciamento: string;
  dataVenda: string;
  apNomeCondominio: string;
  apPredio: string;
  apPavimento: string;
  apTotalPavimentos: string;
  apApto: string;
  apElevador: number;
  areaTotal: string;
  areaConstruida: string;
  areaFrente: string;
  areaFundos: string;
  areaDireita: string;
  areaEsquerda: string;
  valorPub: string;
  valor: string;
  valorCondicaoDeComissao: string;
  valorPorcentagemDeComissao: string;
  valorPorcentagemDoCorretor: string;
  valorPorcentagemDoAgenciador: string;
  valorCondominio: string;
  valorIPTUPago: string;
  valorIPTU: string;
  valorInssPago: string;
  valorInss: string;
  valorIndiceDoCUB: string;
  valorAlgoParaRegularizar: string;
  valorAlgoParaRegularizarDesc: string;
  condAgente: string;
  condPrestacao: string;
  condSaldoDevedor: string;
  condPrazo: string;
  condReajuste: string;
  condFGTS: number;
  condDoacao: number;
  condFinanciamento: number;
  condCartaConsorcio: number;
  condPartePermuta: number;
  condSituacao: string;
  condObs: string;
  localEstado: string;
  localIdCidade: string;
  localIdBairro: null;
  localLogradouro: string;
  localNumero: string;
  localCEP: string;
  localImediacoes: string;
  latitude: null;
  longitude: null;
  zoom: null;
  sitePublicarImovel: number;
  sitePublicarValor: number;
  siteImovelDestaque: number;
  siteAcesso: string;
  sitePublicarMapa: null;
  videoURL: string;
  idUltimaTransacao: string;
  created_at: string;
  updated_at: string;
  desc: string;
  title: string;
  hasExclusividade: boolean;
  site_url: string;
  photo: {
    data: IPhotoData;
  };
  video: {
    data: IVideoData;
  };
  city: {
    data: ICityData;
  };
  neighborhood: {
    data: INeighborhoodData;
  };
  owner: {
    data: IOwnerData;
  };
  agent: {
    data: IEmployeeData;
  };
  broker: {
    data: IEmployeeData;
  }
}

export interface IPropertyShow {
  property: {
    data: IPropertyData
  }
}

/**
 * Paginate.
*/
interface IPaginationMeta {
  pagination: {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links: {
      previous: string;
      next: string
    }
  }
}

interface IPaginationData {
  data: IPropertyData[] | IOwnerData[] | IEmployeeData[] | IPhotoData[];
  meta: IPaginationMeta;
}

export interface IPaginateDefault {
  paginate: IPaginationData;
}