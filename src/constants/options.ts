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
  { id: 11, name: 'Rondônia' },
  { id: 12, name: 'Acre' },
  { id: 13, name: 'Amazonas' },
  { id: 14, name: 'Roraima' },
  { id: 15, name: 'Pará' },
  { id: 16, name: 'Amapá' },
  { id: 17, name: 'Tocantins' },
  { id: 21, name: 'Maranhão' },
  { id: 22, name: 'Piauí' },
  { id: 23, name: 'Ceará' },
  { id: 24, name: 'Rio Grande do Norte' },
  { id: 25, name: 'Paraíba' },
  { id: 26, name: 'Pernambuco' },
  { id: 27, name: 'Alagoas' },
  { id: 28, name: 'Sergipe' },
  { id: 29, name: 'Bahia' },
  { id: 31, name: 'Minas Gerais' },
  { id: 32, name: 'Espírito Santo' },
  { id: 33, name: 'Rio de Janeiro' },
  { id: 35, name: 'São Paulo' },
  { id: 41, name: 'Paraná' },
  { id: 42, name: 'Santa Catarina' },
  { id: 43, name: 'Rio Grande do Sul' },
  { id: 50, name: 'Mato Grosso do Sul' },
  { id: 51, name: 'Mato Grosso' },
  { id: 52, name: 'Goiás' },
  { id: 53, name: 'Distrito Federa' },
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
