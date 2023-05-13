import React from 'react';

import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';
import { neighborhoodsSearchThunk, INeighborhoodsSearchServiceRequest, setSelectedNeighborhoods } from '../../../../reducers/neighborhoods/search';
import { ICitiesSearchServiceRequest } from '../../../../reducers/cities/search';

import Autocomplete from '../..';

interface IProps {
  error?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any;
}

const NeighborhoodsAutocomplete = ({ error, defaultValue }: IProps) => {
  const { status, data: dataResult } = useAppSelectorBlaBlaBal('neighborhoodsSearchReducer') as INeighborhoodsSearchServiceRequest;
  const { citiesSelected } = useAppSelectorBlaBlaBal('citiesSearchReducer') as ICitiesSearchServiceRequest;

  // eslint-disable-next-line
  const dataOwners = dataResult ? dataResult as unknown as Record<string, any> : [] as Record<string, any>;;

  // eslint-disable-next-line
  const dataList: readonly any[] = dataOwners.data || [];

  const city_id = citiesSelected && citiesSelected.length ? citiesSelected[0].id : null;

  return (
    <Autocomplete
      error={error}
      required
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
      valueDefault={defaultValue && defaultValue.id ? [defaultValue] : []}
    />
  );
};

export default NeighborhoodsAutocomplete;