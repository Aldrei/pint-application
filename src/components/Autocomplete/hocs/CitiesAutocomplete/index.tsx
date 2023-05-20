import React, { useEffect, useState } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import { IHookAutocomplete, IServiceRequestTemp, ICityData, ICityShow } from '../../../../types';

import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';
import { useAppDispatch } from '../../../../hooks/useReducerDispatch';

import { citiesSearchThunk, ICitiesSearchServiceRequest, setSelectedCities } from '../../../../reducers/cities/search';

import Autocomplete from '../../../Autocomplete';
import ModalCityCreate from '../../../ModalCityCreate';

const CitiesAutocomplete = ({ error, shouldRenderAdd }: IHookAutocomplete) => {
  const dispatch = useAppDispatch();

  const [shouldOpenModal, setShouldOpenModal] = useState<boolean>(false);

  const { crud: { create: { data: dataResultStore, status: statusStore } } } = useAppSelectorBlaBlaBal('citiesListReducer') as IServiceRequestTemp;
  const cityCreated = dataResultStore as ICityShow; 

  useEffect(() => {
    if (statusStore === 'success' && cityCreated?.city?.data?.id) {      
      dispatch(setSelectedCities([cityCreated.city.data] as ICityData[]));
      setShouldOpenModal(false);
    }
  }, [statusStore, dataResultStore]);

  const { status, data: dataResult, citiesSelected } = useAppSelectorBlaBlaBal('citiesSearchReducer') as ICitiesSearchServiceRequest;

  // eslint-disable-next-line
  const dataOwners = dataResult ? dataResult as unknown as Record<string, any> : [] as Record<string, any>;

  // eslint-disable-next-line
  const dataList: readonly any[] = dataOwners.data || [];

  return (
    <React.Fragment>
      <Autocomplete
        error={error}
        required
        onReducerSource={citiesSearchThunk} 
        onReducerSelected={setSelectedCities}
        loading={(status === 'loading')}
        dataOptions={dataList} 
        descFlag="name" 
        label="Cidade"
        readonly={false}
        valueDefault={citiesSelected}
        startAdornmentIcon={shouldRenderAdd ? <AddCircleIcon /> : null}
        startAdornmentHandle={() => setShouldOpenModal(!shouldOpenModal)}
      />
      <ModalCityCreate open={shouldOpenModal} handleSetOpen={setShouldOpenModal} />
    </React.Fragment>
  );
};

export default CitiesAutocomplete;