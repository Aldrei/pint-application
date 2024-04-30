
import { dataListToDataOptions } from '../../../../helpers';

import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';

import { IPropertySearchServiceRequest, propertiesSearchThunk, setSelectedProperties } from '../../../../reducers/properties/search';

import Autocomplete from '../../../Autocomplete';

interface IProps {
  error?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any;
  disable?: boolean
}

const PropertiesAutocomplete = ({ error, defaultValue, disable }: IProps) => {
  const { status, data: dataResult } = useAppSelectorBlaBlaBal('propertiesSearchReducer') as IPropertySearchServiceRequest;

  const dataList = {
    data: dataResult?.paginate?.data?.length ? dataResult.paginate.data.map((item: any) => ({
      id:item.id,
      label: `Código: ${item.code} | Código tipo: ${item.codePretty}${item.nomeImovel ? ` | Nome: ${item.nomeImovel}` : ''}`,
      descGeral: item.descGeral,
      nomeImovel: item.nomeImovel,
      code: item.code
    })) : []
  };

  return (
    <Autocomplete
      error={error}
      required
      onReducerSource={propertiesSearchThunk}
      onReducerSelected={setSelectedProperties}
      loading={(status === 'loading')}
      dataOptions={dataListToDataOptions(dataList)}
      descFlag="label"
      label="Imóvel"
      readonly={false}
      valueDefault={defaultValue && defaultValue.id ? [defaultValue] : []}
      disable={disable}
    />
  );
};

export default PropertiesAutocomplete;