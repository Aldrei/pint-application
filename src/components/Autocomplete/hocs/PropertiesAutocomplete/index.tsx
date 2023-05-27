import React from 'react';

import { dataListToDataOptions } from '../../../../helpers';

import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';

import { propertiesSearchThunk, setSelectedProperties, IPropertySearchServiceRequest } from '../../../../reducers/properties/search';

import Autocomplete from '../../../Autocomplete';

interface IProps {
  error?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any;
  disable?: boolean
}

const PropertiesAutocomplete = ({ error, defaultValue, disable }: IProps) => {
  const { status, data: dataResult } = useAppSelectorBlaBlaBal('propertiesSearchReducer') as IPropertySearchServiceRequest;

  return (
    <Autocomplete
      error={error}
      required
      onReducerSource={propertiesSearchThunk}
      onReducerSelected={setSelectedProperties}
      loading={(status === 'loading')}
      dataOptions={dataListToDataOptions(dataResult)}
      descFlag="code"
      label="Imóvel"
      readonly={false}
      valueDefault={defaultValue && defaultValue.id ? [defaultValue] : []}
      disable={disable}
    />
  );
};

export default PropertiesAutocomplete;