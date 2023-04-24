import React from 'react';

import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';
import { propertiesSearchThunk, setSelectedProperties, IPropertySearchServiceRequest } from '../../../../reducers/properties/search';

import Autocomplete from '../..';

interface IProps {
  error?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any;
}

const OwnerAutocomplete = ({ error, defaultValue }: IProps) => {
  const propertiesSearchReducer = useAppSelectorBlaBlaBal('propertiesSearchReducer') as IPropertySearchServiceRequest;

  const STATUS = propertiesSearchReducer.status;
  const DATA_LIST = propertiesSearchReducer?.data?.paginate?.data?.length 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? propertiesSearchReducer?.data?.paginate as unknown as Record<string, any> 
    : [];

  // eslint-disable-next-line
  const dataOptions: readonly any[] = DATA_LIST.data || [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shouldRenderList = (dataOptions?.length) && STATUS !== 'loading';

  return (
    <Autocomplete
      error={error}
      required
      onReducerSource={propertiesSearchThunk}
      onReducerSelected={setSelectedProperties}
      loading={(STATUS === 'loading')}
      dataOptions={dataOptions}
      descFlag="code"
      label="Imóvel"
      readonly={false}
      valueDefault={defaultValue && defaultValue.id ? [defaultValue] : []}
    />
  );
};

export default OwnerAutocomplete;