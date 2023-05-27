import React from 'react';

import { citiesServiceThunk } from '../../../../reducers/cities/crud';

import { ROUTES } from '../../../../constants/routes';

import { ICityData } from '../../../../types';

import CitiesActionsMenu from '../../../ActionsMenu/hocs/CitiesActionsMenu';

import ListComponent from '../../index';

const OwnersList = () => {
  return <ListComponent
    primaryInfo='name'
    secondaryInfo=''
    onReducerSource={citiesServiceThunk}
    stateAppSelector={'citiesListReducer'}
    onPaginate={ROUTES.citiesList}
    actionsComponent={(item: ICityData) => <CitiesActionsMenu item={item} />}
    hideAvatar
  />;
};

export default OwnersList;