import React, { useEffect, useState } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import { IHookAutocomplete, IServiceRequestTemp, INeighborhoodShow, INeighborhoodData } from '../../../../types';

import { dataListToDataOptions } from '../../../../helpers';

import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';
import { useAppDispatch } from '../../../../hooks/useReducerDispatch';

import { neighborhoodsSearchThunk, INeighborhoodsSearchServiceRequest, setSelectedNeighborhoods } from '../../../../reducers/neighborhoods/search';
import { ICitiesSearchServiceRequest } from '../../../../reducers/cities/search';

import Autocomplete from '../../../Autocomplete';
import ModalNeighborhoodCreate from '../../../ModalNeighborhoodCreate';

const NeighborhoodsAutocomplete = ({ error, shouldRenderAdd, disabled, valueDefault }: IHookAutocomplete) => {
  const dispatch = useAppDispatch();

  const [shouldOpenModal, setShouldOpenModal] = useState<boolean>(false);

  const { crud: { create: { data: dataStore, status: statusStore } } } = useAppSelectorBlaBlaBal('neighborhoodsListReducer') as IServiceRequestTemp;
  const neighborhoodCreated = dataStore as INeighborhoodShow; 

  useEffect(() => {
    if (statusStore === 'success' && neighborhoodCreated?.neighborhood?.data?.id) {      
      dispatch(setSelectedNeighborhoods([neighborhoodCreated.neighborhood.data] as INeighborhoodData[]));
      setShouldOpenModal(false);
    }
  }, [statusStore, dataStore]);

  const { status, data: dataResult, neighborhoodsSelected } = useAppSelectorBlaBlaBal('neighborhoodsSearchReducer') as INeighborhoodsSearchServiceRequest;
  const { citiesSelected } = useAppSelectorBlaBlaBal('citiesSearchReducer') as ICitiesSearchServiceRequest;

  const city_id = citiesSelected && citiesSelected.length ? citiesSelected[0].id : null;

  /**
   * Resolve value.
  */
  const resolveValue = () => valueDefault && !neighborhoodsSelected?.length ? [valueDefault] : neighborhoodsSelected;

  return (
    <React.Fragment>
      <Autocomplete
        error={error}
        required
        loading={(status === 'loading')}
        onReducerSource={neighborhoodsSearchThunk}
        onReducerSelected={setSelectedNeighborhoods}
        params={{ search: '', cityId: city_id }}
        dataOptions={dataListToDataOptions(dataResult)}
        descFlag="nome" 
        label="Bairro"
        readonly={Boolean(disabled)}
        disable={Boolean(!city_id)}
        clear={Boolean(!city_id)}
        valueDefault={resolveValue()}
        startAdornmentIcon={shouldRenderAdd ? <AddCircleIcon /> : null}
        startAdornmentHandle={() => setShouldOpenModal(!shouldOpenModal)}
      />
      <ModalNeighborhoodCreate open={shouldOpenModal} handleSetOpen={setShouldOpenModal} />
    </React.Fragment>
  );
};

export default NeighborhoodsAutocomplete;