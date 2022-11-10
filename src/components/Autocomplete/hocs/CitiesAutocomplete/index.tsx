import React from 'react';

import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';
import { citiesSearchThunk, ICitiesSearchServiceRequest, setSelectedCities } from '../../../../reducers/cities/search';

import Autocomplete from '../../../Autocomplete';

interface IProps {
  error?: boolean;
}

const CitiesAutocomplete = ({ error }: IProps) => {
  const { status, data: dataResult } = useAppSelectorBlaBlaBal('citiesSearchReducer') as ICitiesSearchServiceRequest;

  // eslint-disable-next-line
  const dataOwners = dataResult ? dataResult as unknown as Record<string, any> : [];

  // eslint-disable-next-line
  const dataList: readonly any[] = dataOwners.data || [];

  const defaultValue = null;

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
      valueDefault={defaultValue ? [defaultValue] : []}
    />
  );
};

export default CitiesAutocomplete;