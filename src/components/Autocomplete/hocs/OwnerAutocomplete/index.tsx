import React from 'react';

import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';
import { ownersSearchThunk, IOwnerSearchServiceRequest } from '../../../../reducers/owners/search';

import Autocomplete from '../../../Autocomplete';

const OwnerAutocomplete = () => {
  const { status, data: dataResult } = useAppSelectorBlaBlaBal('ownersSearchReducer') as IOwnerSearchServiceRequest;
  console.log('Info status:', status);
  console.log('Info data:', dataResult);

  const dataOwners = dataResult ? dataResult as unknown as Record<string, any> : [];
  console.log('Info dataOwners.data:', dataOwners.data);

  const dataList: readonly any[] = dataOwners.data || [];

  return <Autocomplete reducerSource={ownersSearchThunk} dataOptions={dataList} descFlat="nomeRazao" loading={(status === 'loading')} />;
};

export default OwnerAutocomplete;