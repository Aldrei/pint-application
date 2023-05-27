import React, { useEffect, useState } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import { IOwnerShow, IOwnerData, IHookAutocomplete } from '../../../../types';

import { dataListToDataOptions } from '../../../../helpers';

import { useAppDispatch } from '../../../../hooks/useReducerDispatch';
import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';

import { ownersSearchThunk, IOwnerSearchServiceRequest, setSelectedOwners } from '../../../../reducers/owners/search';
import { IOwnerStoreServiceRequest } from '../../../../reducers/owners/store';

import ModalOwnerCreate from '../../../ModalOwnerCreate';
import Autocomplete from '../../../Autocomplete';

const OwnerAutocomplete = ({ error, shouldRenderAdd }: IHookAutocomplete) => {
  const dispatch = useAppDispatch();

  const [shouldOpenModal, setShouldOpenModal] = useState<boolean>(false);

  const { status: statusStore, data: dataResultStore } = useAppSelectorBlaBlaBal('ownersStoreReducer') as IOwnerStoreServiceRequest;
  const ownerCreated = dataResultStore as IOwnerShow; 

  const { status, data: dataResult, ownerSelected } = useAppSelectorBlaBlaBal('ownersSearchReducer') as IOwnerSearchServiceRequest;

  useEffect(() => {
    if (statusStore === 'success' && ownerCreated?.owner?.data?.id) {
      dispatch(setSelectedOwners([ownerCreated.owner.data] as IOwnerData[]));
      setShouldOpenModal(false);
    }
  }, [statusStore, dataResultStore]);

  return (
    <React.Fragment>
      <Autocomplete
        error={error}
        required
        onReducerSource={ownersSearchThunk}
        onReducerSelected={setSelectedOwners}
        loading={(status === 'loading')}
        dataOptions={dataListToDataOptions(dataResult)}
        descFlag="nomeRazao" 
        label="Proprietário"
        readonly={false}
        valueDefault={ownerSelected}
        startAdornmentIcon={shouldRenderAdd ? <AddCircleIcon /> : null}
        startAdornmentHandle={() => setShouldOpenModal(!shouldOpenModal)}
      />
      <ModalOwnerCreate open={shouldOpenModal} handleSetOpen={setShouldOpenModal} />
    </React.Fragment>
  );
};

export default OwnerAutocomplete;