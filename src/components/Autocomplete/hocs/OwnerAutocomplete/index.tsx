import React from 'react';

import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';
import { ownersSearchThunk, IOwnerSearchServiceRequest, setSelectedOwners } from '../../../../reducers/owners/search';

import Autocomplete from '../../../Autocomplete';

// import { OWNERS_SEARCH_LIST } from '../../../../mocks/constants';

const OwnerAutocomplete = () => {
  const { status, data: dataResult } = useAppSelectorBlaBlaBal('ownersSearchReducer') as IOwnerSearchServiceRequest;

  // eslint-disable-next-line
  const dataOwners = dataResult ? dataResult as unknown as Record<string, any> : [];

  // eslint-disable-next-line
  const dataList: readonly any[] = dataOwners.data || [];

  const defaultValue = null; // OWNERS_SEARCH_LIST.data[0];

  return (
    <Autocomplete 
      onReducerSource={ownersSearchThunk}
      onReducerSelected={setSelectedOwners}
      loading={(status === 'loading')}
      dataOptions={dataList} 
      descFlag="nomeRazao" 
      label="Proprietário"
      readonly={false}
      valueDefault={defaultValue ? [defaultValue] : []}
    />
  );
};

export default OwnerAutocomplete;