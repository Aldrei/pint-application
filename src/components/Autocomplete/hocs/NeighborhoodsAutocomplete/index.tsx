import React, { useEffect, useState } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import { IHookAutocomplete, IServiceRequestTemp, INeighborhoodShow, INeighborhoodData } from '../../../../types';

import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';
import { useAppDispatch } from '../../../../hooks/useReducerDispatch';

import { neighborhoodsSearchThunk, INeighborhoodsSearchServiceRequest, setSelectedNeighborhoods } from '../../../../reducers/neighborhoods/search';
import { ICitiesSearchServiceRequest } from '../../../../reducers/cities/search';

import Autocomplete from '../../../Autocomplete';
import ModalNeighborhoodCreate from '../../../ModalNeighborhoodCreate';

const NeighborhoodsAutocomplete = ({ error, shouldRenderAdd }: IHookAutocomplete) => {
  const dispatch = useAppDispatch();

  const [shouldOpenModal, setShouldOpenModal] = useState<boolean>(false);

  const { crud: { create: { data: dataResultStore, status: statusStore } } } = useAppSelectorBlaBlaBal('neighborhoodsListReducer') as IServiceRequestTemp;
  const neighborhoodCreated = dataResultStore as INeighborhoodShow; 

  console.log('DEBUG statusStore:', statusStore);
  console.log('DEBUG neighborhoodCreated:', neighborhoodCreated);

  useEffect(() => {
    if (statusStore === 'success' && neighborhoodCreated?.neighborhood?.data?.id) {      
      dispatch(setSelectedNeighborhoods([neighborhoodCreated.neighborhood.data] as INeighborhoodData[]));
      setShouldOpenModal(false);
    }
  }, [statusStore, dataResultStore]);

  const { status, data: dataResult, neighborhoodsSelected } = useAppSelectorBlaBlaBal('neighborhoodsSearchReducer') as INeighborhoodsSearchServiceRequest;
  const { citiesSelected } = useAppSelectorBlaBlaBal('citiesSearchReducer') as ICitiesSearchServiceRequest;

  // eslint-disable-next-line
  const dataOwners = dataResult ? dataResult as unknown as Record<string, any> : [] as Record<string, any>;;

  // eslint-disable-next-line
  const dataList: readonly any[] = dataOwners.data || [];

  const city_id = citiesSelected && citiesSelected.length ? citiesSelected[0].id : null;

  return (
    <React.Fragment>
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
        valueDefault={neighborhoodsSelected}
        startAdornmentIcon={shouldRenderAdd ? <AddCircleIcon /> : null}
        startAdornmentHandle={() => setShouldOpenModal(!shouldOpenModal)}
      />
      <ModalNeighborhoodCreate open={shouldOpenModal} handleSetOpen={setShouldOpenModal} />
    </React.Fragment>
  );
};

export default NeighborhoodsAutocomplete;