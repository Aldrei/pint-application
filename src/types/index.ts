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
  status: number;
  message: string;
}

export interface IServiceSuccess {
  status: number;
  message: string;
}

export type IServiceRequestStatus = 'idle' | 'loading' | 'failed' | 'success';

// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
export type IServiceDataRequest = any & IPaginateDefault & IServiceError & IServiceSuccess & {}

export interface IServiceRequest {
  name: string;
  statusCode?: number;
  statusText?: string;
  status: IServiceRequestStatus;
  attempts?: number;
  data?: IServiceDataRequest;
}

export interface IServiceCrudRequest {
  create: IServiceRequest;
  read: IServiceRequest;
  update: IServiceRequest
  delete: IServiceRequest
}

export interface IServiceRequestTemp {
  name: string;
  statusCode?: number;
  statusText?: string;
  status: IServiceRequestStatus;
  attempts?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  crud: IServiceCrudRequest
}

/** When status code 200 with fields required. */
export interface IPropertyStoreRequired {
  errors: {
    city_id?: string;
    neighborhood_id?: string;
    owner_id?: string;
    broker_id?: string;
    agent_id?: string;
  }
}

export interface IServiceFieldsRequired {
  result: {
    errors: IPropertyStoreRequired;
  }
}

/**
 * Who Is Auth.
*/
export interface IClient {
  id: string;
  user_id: string;
  city_id: string;
  neighborhood_id: string;
  pay_last_name: string;
  pay_first_name: string;
  pay_cnpj: string;
  pay_cpf: string;
  theme_id: string;
  palette_id: string;
  endereco: string;
  ssl: string;
  dominio: string;
  nome: string;
  abbr: string;
  creci: string;
  phone1: string;
  phone2: string;
  phone3: string;
  email1: string;
  email2: string;
  email3: string;
  whats: string;
  facebook: string;
  instagram: string;
  youtube: string;
  linkedin: string;
  og_image: string;
  logo: string;
  icon: string;
  favicon: string;
  marcadagua: string;
  map: string;
  page_home: string;
  page_about: string;
  page_contact: string;
  page_financing: string;
  page_enterprise: string;
  page_properties: string;
  page_property: string;
  property_count: string;
  created_at: string;
  updated_at: string;
  api_url: string;
  base_url: string;
  site_url: string;
  logo_thumb: string;
  logo_normal: string;
  icon_thumb: string;
  icon_normal: string;
  favicon_thumb: string;
  favicon_normal: string;
  marcadagua_thumb: string;
  marcadagua_normal: string;
  expires: string;
  site_status: string;
  site_redirect: string;
  user: {
    data: IUserData;
  }
}

export interface IWhoIsAuth {
  client: {
    data: IClient
  };
  employee: {
    data: IEmployeeData;
  }
}

/**
 * Owners.
*/
export interface IOwnerStorePayload {
  client_id: number,
  city_id: number,
  neighborhood_id: number,
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
}

export type IOwnerUpdatePayload = IOwnerStorePayload

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
  city: {
    data: ICityData;
  };
  neighborhood: {
    data: INeighborhoodData;
  };
}

export interface IOwnerDataSearchResult {
  data?: IOwnerData[]
}

export interface IOwnerShow {
  owner: {
    data: IOwnerData;
  };
  status: number;
}

export interface IOwnerStoreRequired {
  nomeRazao?: string;
}

export interface IOwnerServiceFieldsRequired {
  errors: IOwnerStoreRequired
}

/**
 * Employees.
*/
export interface IEmployeeStorePayload {
  client_id: number,
  city_id: number,
  neighborhood_id: number,
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
}

export type IEmployeeUpdatePayload = IEmployeeStorePayload

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
  neighborhood: {
    data: INeighborhoodData;
  };
  user: { 
    data: IUserData;
  }
}

export type TEmployeeType = 'broker' | 'agent'

export interface IEmployeeDataSearchResult {
  data?: IEmployeeData[]
}

export interface IEmployeeShow {
  employee: {
    data: IEmployeeData;
  };
  status: number;
}

export interface IEmployeeStoreRequired {
  employee: {
    nome?: string;
  }
}

export interface IEmployeeServiceFieldsRequired {
  errors: IEmployeeStoreRequired
}

/**
 * Photos and videos.
*/
export interface IPhotoData {
  id: number;
  property_id: number;
  name: string;
  ordem: number;
  rotate: number;
  thumb: string;
  normal: string;
  src: string
}

export interface IPhotoUpdatePositionsPayload {
  photo_id: number;
  posicao: number;
}

export interface IPhotoUpdatePayload {
  rotate: number;
}

export interface IPhotoUploadPayload {
  file: File;
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
export interface IStateData {
  id: number;
  name: string;
  abbr?: string;
}

export interface ICityStorePayload {
  name: string;
  long_desc: string;
  state: IStateData;
}

export interface ICityData {
  id: number;
  state_id: number;
  name: string;
  long_desc?: string;
  state?: IStateData;
}

export interface ICitiesDataSearchResult {
  data: ICityData[];
}

export interface ICityShow {
  city: {
    data: ICityData;
  };
  status: number;
}

export interface ICityStoreRequired {
  name?: string;
}

export interface ICityServiceFieldsRequired {
  errors: ICityStoreRequired
}

export interface INeighborhoodStorePayload {
  client_id: number,
  city_id: number,
  idBairro: string,
  nome: string,
  idCidade: string,
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

export interface INeighborhoodShow {
  neighborhood: {
    data: INeighborhoodData;
  };
  status: number;
}

export interface INeighborhoodStoreRequired {
  nome?: string;
}

export interface INeighborhoodServiceFieldsRequired {
  errors: INeighborhoodStoreRequired
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
  latitude: string;
  longitude: string;
  zoom: string;
  sitePublicarImovel: number;
  sitePublicarValor: number;
  siteImovelDestaque: number;
  siteAcesso: string;
  sitePublicarMapa: number;
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

export interface IPropertyStorePayload {
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
  city_id: number;
  neighborhood_id: number;
  owner_id: number;
  agent_id: number;
  broker_id: number;
}

export type IPropertyUpdatePayload = IPropertyData

export interface IPropertyShow {
  property: {
    data: IPropertyData;
  };
  status: number;
}

export interface IPropertiesServiceThunk {
  page: number;
  asc?: boolean;
}

export interface IOwnersServiceThunk {
  page: number;
}

export interface IEmployeesServiceThunk {
  page: number;
}

export interface IBannersServiceThunk {
  page: number;
}

/**
 * Slides.
*/
export interface ISlidesStoreRequired {
  img?: string;
}

export interface ISlidesFieldsRequired {
  result: {
    errors: ISlidesStoreRequired;
  }
}

/**
 * Banners.
*/
export interface IBannerStorePayload {
  property_id?: number;
  titulo: string;
  descGeral: string;
  img?: string;
  posicao?: number;
}

export type IBannerUpdatePayload = IBannerStorePayload

type IBannerPosition = {
  banner_id: number
}

export interface IBannerUpdatePositionsPayload {
  data: IBannerPosition[]
}

export interface IBannerData {
  id: number;
  client_id: number;
  property_id?: number;
  property: {
    data: IPropertyData
  }
  titulo: string;
  descGeral: string;
  img: string;
  posicao: number;
  link: string;
  thumb: string;
  normal: string;
}

export interface IBannerDataSearchResult {
  data?: IBannerData[]
}

export interface IBannerShow {
  banner: {
    data: IBannerData;
  };
  status: number;
}

export interface IBannerStoreRequired {
  nome?: string;
}

export interface IBannerServiceFieldsRequired {
  errors: IBannerStoreRequired
}

/**
 * Message.
*/
export interface IMessageData {
  id: number;
  client_id: number;
  email: string;
  primary_contact: string;
  secondary_contact: string;
  name: string;
  subject: string;
  message: string;
  created_at: string;
  updated_at: string;
  date: string;
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

export interface IPaginationServiceThunk {
  page: number;
}

/**
 * Others.
*/
export interface ITimer {
  id: number;
  delay: number;
}

export interface IHookAutocomplete {
  error?: boolean;
  shouldRenderAdd?: boolean;
  type?: TEmployeeType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  valueDefault?: any
  disabled?: boolean
}

export enum TAction {
  CREATE = 'create',
  READ = 'read',
  EDIT = 'edit',
  DELETE = 'delete',
}
