export interface IServiceRequest {
  statusCode?: number;
  statusText?: string;
  status: 'idle' | 'loading' | 'failed' | 'success';
  attempts?: number;
  data?: object;
}

interface IOwnerData {
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

interface IPhotoData {
  id: number;
  property_id: number;
  name: string;
  ordem: number;
  rotate: null;
  thumb: string;
  normal: string;
}

export interface IPaginatePropertyData {
  id: number;
  client_id: number;
  city_id: number;
  neighborhood_id: number;
  owner_id: number;
  agent_id: number;
  broker_id: number;
  code: number;
  codeTipo: string;
  codePretty: string;
  nomeImovel: string;
  matricula: string;
  lote: string;
  quadra: string;
  empreendimento: number;
  placa: number;
  possuiFoto: number;
  exclusividade: number;
  exclusividadePeriodoInicio: string;
  exclusividadePeriodoFim: string;
  finalidade: string;
  categoria: string;
  tipo: string;
  status: string;
  aluguelPeriodoInicio: string;
  aluguelPeriodoFim: string;
  dormitorio: string;
  garagem: string;
  lavanderia: 1;
  telhado: string;
  forro: string;
  piso: string;
  aberturas: string;
  alarme: number;
  portaoEletronico: number;
  pocoArtesiano: number;
  cercaEletrica: number;
  cameraDeVideo: number;
  nascerDoSol: string;
  descGeral: string;
  dataAgenciamento: string;
  dataVenda: string;
  apNomeCondominio: string;
  apPredio: string;
  apPavimento: string;
  apTotalPavimentos: string;
  apApto: string;
  apElevador: 1;
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
  owner: {
    data: IOwnerData;
  }
  photo: {
    data: IPhotoData;
  }
}

interface IPaginateMeta {
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

interface IPaginateData {
  data: IPaginatePropertyData[];
  meta: IPaginateMeta;
}

export interface IListRequest {
  paginate: IPaginateData;
}