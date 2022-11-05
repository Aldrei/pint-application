import React from 'react';

import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';
import { neighborhoodsSearchThunk, INeighborhoodsSearchServiceRequest, setSelectedNeighborhoods } from '../../../../reducers/neighborhoods/search';
import { ICitiesSearchServiceRequest } from '../../../../reducers/cities/search';

import Autocomplete from '../..';

// import { OWNERS_SEARCH_LIST } from '../../../../mocks/constants';

const NeighborhoodsAutocomplete = () => {
  const { status, data: dataResult } = useAppSelectorBlaBlaBal('neighborhoodsSearchReducer') as INeighborhoodsSearchServiceRequest;
  const { citiesSelected } = useAppSelectorBlaBlaBal('citiesSearchReducer') as ICitiesSearchServiceRequest;

  // eslint-disable-next-line
  const dataOwners = dataResult ? dataResult as unknown as Record<string, any> : [];

  // eslint-disable-next-line
  const dataList: readonly any[] = dataOwners.data || [];

  const city_id = citiesSelected && citiesSelected.length ? citiesSelected[0].id : null;

  const defaultValue = null;

  return (
    <Autocomplete 
      loading={(status === 'loading')}
      onReducerSource={neighborhoodsSearchThunk}
      onReducerSelected={setSelectedNeighborhoods}
      params={{ search: '', cityId: city_id }}
      dataOptions={dataList} 
      descFlag="nome" 
      label="Bairro"
      readonly={false}
      disable={Boolean(!city_id)}
      clear={Boolean(!city_id)}
      valueDefault={defaultValue ? [defaultValue] : []}
    />
  );
};

export default NeighborhoodsAutocomplete;