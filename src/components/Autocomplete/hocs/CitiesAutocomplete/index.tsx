import React from 'react';

import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';
import { citiesSearchThunk, ICitiesSearchServiceRequest, setSelectedCities } from '../../../../reducers/cities/search';

import Autocomplete from '../../../Autocomplete';

interface IProps {
  error?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any;
}

const CitiesAutocomplete = ({ error, defaultValue }: IProps) => {
  const { status, data: dataResult } = useAppSelectorBlaBlaBal('citiesSearchReducer') as ICitiesSearchServiceRequest;

  // eslint-disable-next-line
  const dataOwners = dataResult ? dataResult as unknown as Record<string, any> : [];

  // eslint-disable-next-line
  const dataList: readonly any[] = dataOwners.data || [];

  return (
    <Autocomplete
      error={error}
      required
      onReducerSource={citiesSearchThunk} 
      onReducerSelected={setSelectedCities}
      loading={(status === 'loading')}
      dataOptions={dataList} 
      descFlag="name" 
      label="Cidade"
      readonly={false}
      valueDefault={defaultValue && defaultValue.id ? [defaultValue] : []}
    />
  );
};

export default CitiesAutocomplete;