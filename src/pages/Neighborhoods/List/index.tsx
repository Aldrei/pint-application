import * as React from 'react';

import NeighborhoodsList from '../../../components/List/hocs/NeighborhoodsList';

import { PropertiesContainer } from './styles';

const OwnerPageList = () => {
  /**
   * Action buttons.
  */
  return (
    <PropertiesContainer data-testid='propertiesList-container'>
      <NeighborhoodsList />
    </PropertiesContainer>
  );
};

export default OwnerPageList;