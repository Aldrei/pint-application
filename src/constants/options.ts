export const noneSelected = { id: '', desc: 'Selecione' };

export const statusImovOptions = [
  { ...noneSelected },
  { id: 'Alugado', desc: 'Alugado' },
  { id: 'Alugando', desc: 'Alugando' },
  { id: 'Alugando Temporada', desc: 'Alugando Temporada' },
  { id: 'Suspenso', desc: 'Suspenso' },
  { id: 'Vendendo', desc: 'Vendendo' },
  { id: 'Vendido', desc: 'Vendido' },
  { id: 'Vendido por outro agente', desc: 'Vendido por outro agente' },
];

export const categoriaOptions = [
  { ...noneSelected },
  { id: 'Comercial', desc: 'Comercial' },
  { id: 'Industrial', desc: 'Industrial' },
  { id: 'Residencial', desc: 'Residencial' },
  { id: 'Rural', desc: 'Rural' },
];

export const tipoOptions = [
  { ...noneSelected },
  { id: 'Apartamento', desc: 'Apartamento' },
  { id: 'Apartamento Cobertura', desc: 'Apartamento Cobertura' },
  { id: 'Área', desc: 'Área' },

  { id: 'Bangalô', desc: 'Bangalô' },
  { id: 'Barracão', desc: 'Barracão' },

  { id: 'Casa Alvenaria/Sobrado', desc: 'Casa Alvenaria/Sobrado' },
  { id: 'Casa Alvenaria', desc: 'Casa Alvenaria' },
  { id: 'Casa Geminada', desc: 'Casa Geminada' },
  { id: 'Casa Mista', desc: 'Casa Mista' },
  { id: 'Chácara', desc: 'Chácara' },
  { id: 'Chalé', desc: 'Chalé' },

  { id: 'Edícula', desc: 'Edícula' },

  { id: 'Flat', desc: 'Flat' },
  { id: 'Fazenda', desc: 'Fazenda' },

  { id: 'Galpão', desc: 'Galpão' },

  { id: 'Kitnet', desc: 'Kitnet' },

  { id: 'Loft', desc: 'Loft' },

  { id: 'Prédio', desc: 'Prédio' },

  { id: 'Sala Comercial', desc: 'Sala Comercial' },
  { id: 'Sítio', desc: 'Sítio' },
  { id: 'Sobrado', desc: 'Sobrado' },

  { id: 'Terreno', desc: 'Terreno' },
];

export const nascerDoSolOptions = [
  { ...noneSelected },
  { id: 'Frente', desc: 'Frente' },
  { id: 'Fundos', desc: 'Fundos' },
  { id: 'Direita', desc: 'Direita' },
  { id: 'Esquerda', desc: 'Esquerda' },
];

export const statesOptions = [
  { ...noneSelected },
  { id: 11, desc: 'Rondônia' },
  { id: 12, desc: 'Acre' },
  { id: 13, desc: 'Amazonas' },
  { id: 14, desc: 'Roraima' },
  { id: 15, desc: 'Pará' },
  { id: 16, desc: 'Amapá' },
  { id: 17, desc: 'Tocantins' },
  { id: 21, desc: 'Maranhão' },
  { id: 22, desc: 'Piauí' },
  { id: 23, desc: 'Ceará' },
  { id: 24, desc: 'Rio Grande do Norte' },
  { id: 25, desc: 'Paraíba' },
  { id: 26, desc: 'Pernambuco' },
  { id: 27, desc: 'Alagoas' },
  { id: 28, desc: 'Sergipe' },
  { id: 29, desc: 'Bahia' },
  { id: 31, desc: 'Minas Gerais' },
  { id: 32, desc: 'Espírito Santo' },
  { id: 33, desc: 'Rio de Janeiro' },
  { id: 35, desc: 'São Paulo' },
  { id: 41, desc: 'Paraná' },
  { id: 42, desc: 'Santa Catarina' },
  { id: 43, desc: 'Rio Grande do Sul' },
  { id: 50, desc: 'Mato Grosso do Sul' },
  { id: 51, desc: 'Mato Grosso' },
  { id: 52, desc: 'Goiás' },
  { id: 53, desc: 'Distrito Federa' },
];

export const pessoaOptions = [
  { ...noneSelected },
  { id: 'Fisica', desc: 'Física' },
  { id: 'Juridica', desc: 'Jurídica' },
];

export const sexoOptions = [
  { ...noneSelected },
  { id: 'Feminino', desc: 'Feminino' },
  { id: 'Masculino', desc: 'Masculino' },
];

export const estadoCivilOptions = [
  { ...noneSelected },
  { id: 'Casado(a)', desc: 'Casado(a)' },
  { id: 'Solteiro(a)', desc: 'Solteiro(a)' },
  { id: 'Divorciado(a)', desc: 'Divorciado(a)' },
  { id: 'Viúvo(a)', desc: 'Viúvo(a)' },
  { id: 'União estável', desc: 'União estável' },
];

export const paymentsCategoriesOptions = [
  { ...noneSelected },
  { id: 8, desc: 'Aluguel' },
  { id: 4, desc: 'Gasolina' },
  { id: 3, desc: 'Imposto' },
  { id: 6, desc: 'Marketing' },
  { id: 5, desc: 'Placas' },
  { id: 1, desc: 'Salário' },
  { id: 2, desc: 'Taxa' },
  { id: 7, desc: 'Outro' },
];

export const receivablesCategoriesOptions = [
  { ...noneSelected },
  { id: 1, desc: 'Venda de imóvel' },
  { id: 2, desc: 'Aluguel de imóvel' },
  { id: 3, desc: 'Comissão' },
  { id: 4, desc: 'Consultoria' },
  { id: 5, desc: 'Outro' },
];

export const prospectsStatusOptions = [
  { ...noneSelected },
  { id: 'pending', desc: 'Pendente' },
  { id: 'approved', desc: 'Aprovado' },
  { id: 'disapproved', desc: 'Reprovado' },
];
