
import { neighborhoodsServiceThunk } from '../../../../reducers/neighborhoods/crud';

import { ROUTES } from '../../../../constants/routes';

import { INeighborhoodData } from '../../../../types';

import NeighborhoodsActionsMenu from '../../../ActionsMenu/hocs/NeighborhoodsActionsMenu';

import ListComponent from '../../index';

const NeighborhoodsList = () => {
  return <ListComponent
    title='Bairros'
    primaryInfo='nome'
    secondaryInfo=''
    onReducerSource={neighborhoodsServiceThunk}
    stateAppSelector={'neighborhoodsListReducer'}
    onPaginate={ROUTES.neighborhoodsList}
    actionsComponent={(item: INeighborhoodData) => <NeighborhoodsActionsMenu item={item} />}
    hideAvatar
  />;
};

export default NeighborhoodsList;