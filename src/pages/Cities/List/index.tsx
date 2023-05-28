import * as React from 'react';

import CitiesList from '../../../components/List/hocs/CitiesList';

import { PropertiesContainer } from './styles';

const OwnerPageList = () => {
  /**
   * Action buttons.
  */
  return (
    <PropertiesContainer data-testid='propertiesList-container'>
      <CitiesList />
    </PropertiesContainer>
  );
};

export default OwnerPageList;