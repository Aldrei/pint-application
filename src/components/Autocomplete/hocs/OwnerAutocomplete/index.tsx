import React from 'react';

import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';
import { ownersSearchThunk, IOwnerSearchServiceRequest, setSelectedOwners } from '../../../../reducers/owners/search';

import Autocomplete from '../../../Autocomplete';

interface IProps {
  error?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any;
}

const OwnerAutocomplete = ({ error, defaultValue }: IProps) => {
  const { status, data: dataResult } = useAppSelectorBlaBlaBal('ownersSearchReducer') as IOwnerSearchServiceRequest;

  // eslint-disable-next-line
  const dataOwners = dataResult ? dataResult as unknown as Record<string, any> : [];

  // eslint-disable-next-line
  const dataList: readonly any[] = dataOwners.data || [];

  return (
    <Autocomplete
      error={error}
      required
      onReducerSource={ownersSearchThunk}
      onReducerSelected={setSelectedOwners}
      loading={(status === 'loading')}
      dataOptions={dataList} 
      descFlag="nomeRazao" 
      label="Proprietário"
      readonly={false}
      valueDefault={defaultValue && defaultValue.id ? [defaultValue] : []}
    />
  );
};

export default OwnerAutocomplete;