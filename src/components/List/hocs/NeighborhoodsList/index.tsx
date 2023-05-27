import React from 'react';

import { neighborhoodsServiceThunk } from '../../../../reducers/neighborhoods/crud';

import { ROUTES } from '../../../../constants/routes';

import { INeighborhoodData } from '../../../../types';

import NeighborhoodsActionsMenu from '../../../ActionsMenu/hocs/NeighborhoodsActionsMenu';

import ListComponent from '../../index';

const OwnersList = () => {
  return <ListComponent
    primaryInfo='nome'
    secondaryInfo=''
    onReducerSource={neighborhoodsServiceThunk}
    stateAppSelector={'neighborhoodsListReducer'}
    onPaginate={ROUTES.neighborhoodsList}
    actionsComponent={(item: INeighborhoodData) => <NeighborhoodsActionsMenu item={item} />}
    hideAvatar
  />;
};

export default OwnersList;