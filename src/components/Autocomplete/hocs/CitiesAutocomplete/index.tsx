import React, { useEffect, useState } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import { dataListToDataOptions } from '../../../../helpers';

import { IHookAutocomplete, IServiceRequestTemp, ICityData, ICityShow } from '../../../../types';

import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';
import { useAppDispatch } from '../../../../hooks/useReducerDispatch';

import { citiesSearchThunk, ICitiesSearchServiceRequest, setSelectedCities } from '../../../../reducers/cities/search';

import Autocomplete from '../../../Autocomplete';
import ModalCityCreate from '../../../ModalCityCreate';

const CitiesAutocomplete = ({ error, shouldRenderAdd, disabled, valueDefault }: IHookAutocomplete) => {
  const dispatch = useAppDispatch();

  const [shouldOpenModal, setShouldOpenModal] = useState<boolean>(false);

  const { crud: { create: { data: dataStore, status: statusStore } } } = useAppSelectorBlaBlaBal('citiesListReducer') as IServiceRequestTemp;
  const cityCreated = dataStore as ICityShow; 

  useEffect(() => {
    if (statusStore === 'success' && cityCreated?.city?.data?.id) {      
      dispatch(setSelectedCities([cityCreated.city.data] as ICityData[]));
      setShouldOpenModal(false);
    }
  }, [statusStore, dataStore]);

  const { status, data: dataResult, citiesSelected } = useAppSelectorBlaBlaBal('citiesSearchReducer') as ICitiesSearchServiceRequest;

  /**
   * Resolve value.
  */
  const resolveValue = () => valueDefault && !citiesSelected?.length ? [valueDefault] : citiesSelected;

  return (
    <React.Fragment>
      <Autocomplete
        error={error}
        required
        onReducerSource={citiesSearchThunk} 
        onReducerSelected={setSelectedCities}
        /**
         * Isn't possible clean the city here because NeighborhoodAutocomplete check 
         * whether has some city selected on reducer to enable the input.
        */
        // shouldCleanReducerSelected
        loading={(status === 'loading')}
        dataOptions={dataListToDataOptions(dataResult)}
        descFlag="long_desc" 
        label="Cidade"
        readonly={Boolean(disabled)}
        valueDefault={resolveValue()}
        startAdornmentIcon={shouldRenderAdd ? <AddCircleIcon /> : null}
        startAdornmentHandle={() => setShouldOpenModal(!shouldOpenModal)}
      />
      <ModalCityCreate open={shouldOpenModal} handleSetOpen={setShouldOpenModal} />
    </React.Fragment>
  );
};

export default CitiesAutocomplete;