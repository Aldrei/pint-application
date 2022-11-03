import React from 'react';

import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';
import { citiesSearchThunk, ICitiesSearchServiceRequest } from '../../../../reducers/cities/search';

import Autocomplete from '../..';

// import { OWNERS_SEARCH_LIST } from '../../../../mocks/constants';

const CitiesAutocomplete = () => {
  const { status, data: dataResult } = useAppSelectorBlaBlaBal('citiesSearchReducer') as ICitiesSearchServiceRequest;

  // eslint-disable-next-line
  const dataOwners = dataResult ? dataResult as unknown as Record<string, any> : [];

  // eslint-disable-next-line
  const dataList: readonly any[] = dataOwners.data || [];

  const defaultValue = null; // OWNERS_SEARCH_LIST.data[0];

  return (
    <Autocomplete 
      loading={(status === 'loading')}
      onReducerSource={citiesSearchThunk} 
      dataOptions={dataList} 
      descFlag="name" 
      label="Cidade"
      readonly={false}
      valueDefault={defaultValue ? [defaultValue] : []}
    />
  );
};

export default CitiesAutocomplete;