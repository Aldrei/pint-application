import React, { useState } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';
import { ownersSearchThunk, IOwnerSearchServiceRequest, setSelectedOwners } from '../../../../reducers/owners/search';

import ModalOwnerCreate from '../../../ModalOwnerCreate';

import Autocomplete from '../../../Autocomplete';

interface IProps {
  error?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any;
  shouldRenderAdd?: boolean;
}

const OwnerAutocomplete = ({ error, defaultValue, shouldRenderAdd }: IProps) => {
  const [shouldOpenModal, setShouldOpenModal] = useState<boolean>(false);

  const { status, data: dataResult } = useAppSelectorBlaBlaBal('ownersSearchReducer') as IOwnerSearchServiceRequest;

  // eslint-disable-next-line
  const dataOwners = dataResult ? dataResult as unknown as Record<string, any> : [] as Record<string, any>;

  // eslint-disable-next-line
  const dataList: readonly any[] = dataOwners.data || [];

  return (
    <React.Fragment>
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
        startAdornmentIcon={shouldRenderAdd ? <AddCircleIcon /> : null}
        startAdornmentHandle={() => setShouldOpenModal(!shouldOpenModal)}
      />
      <ModalOwnerCreate open={shouldOpenModal} handleSetOpen={setShouldOpenModal} />
    </React.Fragment>
  );
};

export default OwnerAutocomplete;