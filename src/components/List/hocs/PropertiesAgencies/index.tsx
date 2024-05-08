
import { propertiesAgenciesServiceThunk } from '../../../../reducers/propertiesAgencies/crud';

import { ROUTES } from '../../../../constants/routes';

import { IPropertiesAgencies } from '../../../../types';
import PropertiesAgenciesActionsMenu from '../../../ActionsMenu/hocs/PropertiesAgenciesActionsMenu';
import ListComponent from '../../index';

const PropertiesAgenciesList = () => {
  return <ListComponent
    title='Agenciamentos do Site'
    primaryInfo='tipo'
    secondaryInfo='address'
    footerPrimaryInfo='owner'
    footerSecondaryInfo='ownerPhone'
    onReducerSource={propertiesAgenciesServiceThunk}
    stateAppSelector={'propertiesAgenciesListReducer'}
    onPaginate={ROUTES.propertiesAgenciesList}
    actionsComponent={(item: IPropertiesAgencies) => 
      <PropertiesAgenciesActionsMenu item={item} />
    }
    hideAvatar
  />;
};

export default PropertiesAgenciesList;
