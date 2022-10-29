import React from 'react';

import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';
import { ownersSearchThunk, IOwnerSearchServiceRequest } from '../../../../reducers/owners/search';

import Autocomplete from '../../../Autocomplete';

const OwnerAutocomplete = () => {
  const { status, data: dataResult } = useAppSelectorBlaBlaBal('ownersSearchReducer') as IOwnerSearchServiceRequest;

  // eslint-disable-next-line
  const dataOwners = dataResult ? dataResult as unknown as Record<string, any> : [];

  // eslint-disable-next-line
  const dataList: readonly any[] = dataOwners.data || [];

  return <Autocomplete reducerSource={ownersSearchThunk} dataOptions={dataList} descFlat="nomeRazao" loading={(status === 'loading')} label="Proprietário" />;
};

export default OwnerAutocomplete;