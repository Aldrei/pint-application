
import { propertiesAgenciesServiceThunk } from '../../../../reducers/propertiesAgencies/crud';

import { ROUTES } from '../../../../constants/routes';

import ListComponent from '../../index';

const PropertiesAgenciesList = () => {
  return <ListComponent
    primaryInfo='tipo'
    secondaryInfo='address'
    footerPrimaryInfo='owner'
    footerSecondaryInfo='ownerPhone'
    onReducerSource={propertiesAgenciesServiceThunk}
    stateAppSelector={'propertiesAgenciesListReducer'}
    onPaginate={ROUTES.propertiesAgenciesList}
    // actionsComponent={(item: IMessageData) => <MessagesActionsMenu item={item} />}
    hideAvatar
  />;
};

export default PropertiesAgenciesList;
