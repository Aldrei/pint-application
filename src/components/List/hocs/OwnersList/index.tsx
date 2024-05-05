
import { ownersServiceThunk } from '../../../../reducers/owners/list';

import { ROUTES } from '../../../../constants/routes';

import { IOwnerData } from '../../../../types';

import OwnersActionsMenu from '../../../../components/ActionsMenu/hocs/OwnersActionsMenu';

import ListComponent from '../../index';

const OwnersList = () => {
  return <ListComponent
    title='Clientes'
    primaryInfo='nomeRazao' 
    secondaryInfo='logradouro' 
    onReducerSource={ownersServiceThunk} 
    stateAppSelector={'ownersListReducer'} 
    onPaginate={ROUTES.ownersList}
    actionsComponent={(item: IOwnerData) => <OwnersActionsMenu item={item} />}
  />;
};

export default OwnersList;