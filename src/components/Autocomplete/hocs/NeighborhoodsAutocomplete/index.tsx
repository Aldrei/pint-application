import React from 'react';

import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';
import { neighborhoodsSearchThunk, INeighborhoodsSearchServiceRequest } from '../../../../reducers/neighborhoods/search';

import Autocomplete from '../..';

// import { OWNERS_SEARCH_LIST } from '../../../../mocks/constants';

const NeighborhoodsAutocomplete = () => {
  const { status, data: dataResult } = useAppSelectorBlaBlaBal('neighborhoodsSearchReducer') as INeighborhoodsSearchServiceRequest;
  console.log('DEBUG dataResult:', dataResult);

  // eslint-disable-next-line
  const dataOwners = dataResult ? dataResult as unknown as Record<string, any> : [];

  // eslint-disable-next-line
  const dataList: readonly any[] = dataOwners.data || [];

  const defaultValue = null; // OWNERS_SEARCH_LIST.data[0];

  return (
    <Autocomplete 
      loading={(status === 'loading')}
      reducerSource={neighborhoodsSearchThunk}
      params={{ search: '', cityId: '4303905' }}
      dataOptions={dataList} 
      descFlag="nome" 
      label="Bairro"
      readonly={false}
      valueDefault={defaultValue ? [defaultValue] : []}
    />
  );
};

export default NeighborhoodsAutocomplete;