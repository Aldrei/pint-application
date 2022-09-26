import * as React from 'react';

import List from '@mui/material/List';
// import DoneIcon from '@mui/icons-material/Done';
// import CloseIcon from '@mui/icons-material/Close';

import { useLocation } from 'react-router-dom';

// import Card from '../../../components/Card';
import Info from '../../../components/Info';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { propertiesServiceThunk, selectPropertiesListReducer } from '../../../reducer/properties/list';
import { useAppSelectorBlaBlaBal } from '../../../hooks/useReducerSelector';

// import { hasFeature, getValorPub } from '../../../helpers';

import { IPropertiesListRequest, IPropertyData, IServiceRequest } from '../../../types';

import { PropertiesContainer } from './styles';
import PropertyListItemSkeleton from './components/Skeleton';

import { 
  PROPERTIES_DETAIL, 
  // PROPERTIES_PHOTOS 
} from '../../../mocks';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

interface IPaginate {
  current_page: number;
  total_pages: number;
  data: IPropertyData;
}

const PropertiesDetail = () => {
  const query = useQuery();

  const { status } = useAppSelectorBlaBlaBal('propertiesListReducer') as IServiceRequest;
  const selectPropertiesListState = useAppSelector(selectPropertiesListReducer);
  const PROPERTIES_LIST = selectPropertiesListState.data as unknown as IPropertiesListRequest;

  const dispatch = useAppDispatch();

  const paginate: IPaginate = {
    current_page: query.get('page') ? Number(query.get('page')) : 1,
    total_pages: PROPERTIES_LIST?.paginate?.meta?.pagination?.total_pages || 0,
    data: PROPERTIES_DETAIL.property.data as unknown as IPropertyData // PROPERTIES_LIST.paginate.data as IPropertyData[] || []
  };

  React.useEffect(() => {
    dispatch(propertiesServiceThunk(paginate.current_page));
  }, []);

  // const checkIconFeatures = (check: boolean) => check ? <DoneIcon /> : <CloseIcon />;

  const list = () => (
    <List style={{ width: '100%' }}>
      <React.Fragment>
        <Info />
      </React.Fragment>
    </List>
  );

  const ListMemorized = React.useCallback(() => list(), [paginate.data]);

  return (
    <PropertiesContainer data-testid='propertiesList-container'>
      {status === 'loading' ? <PropertyListItemSkeleton /> : <ListMemorized />}
    </PropertiesContainer>
  );
};

export default PropertiesDetail;