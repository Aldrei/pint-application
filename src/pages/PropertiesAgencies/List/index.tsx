
import PropertiesAgenciesList from '../../../components/List/hocs/PropertiesAgencies';

import { PropertiesContainer } from './styles';

const PropertiesAgenciesPageList = () => {
  /**
   * Action buttons.
  */
  return (
    <PropertiesContainer data-testid='propertiesList-container'>
      <PropertiesAgenciesList />
    </PropertiesContainer>
  );
};

export default PropertiesAgenciesPageList;