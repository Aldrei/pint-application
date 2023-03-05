import React from 'react';

import { ownersServiceThunk } from '../../../../reducers/owners/list';

import { ROUTES } from '../../../../constants/routes';

import ListComponent from '../../index';

const OwnersList = () => {
  return <ListComponent
    primaryInfo='nomeRazao' 
    secondaryInfo='logradouro' 
    onReducerSource={ownersServiceThunk} 
    stateAppSelector={'ownersListReducer'} 
    onPaginate={ROUTES.ownersList} 
  />;
};

export default OwnersList;