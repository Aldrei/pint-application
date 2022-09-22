import * as React from 'react';

import List from '@mui/material/List';
import Fab from '@mui/material/Fab';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import PermMediaIcon from '@mui/icons-material/PermMedia';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';

import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { propertiesServiceThunk, selectPropertiesListReducer } from '../../../reducer/properties/list';
import { useAppSelectorBlaBlaBal } from '../../../hooks/useReducerSelector';

import { hasFeature, getValorPub } from '../../../helpers';

import { IPropertiesListRequest, IPropertyData, IServiceRequest } from '../../../types';

import { PropertiesContainer, AvatarWrapper, Avatar, Codes, ListItem, ListItemTextStyle, Box2, Box3, Box4, Actions, SubActions, WrapperIconFeatures } from './styles';
import PropertyListItemSkeleton from './components/Skeleton';

// import { PROPERTIES_DETAIL, PROPERTIES_PHOTOS } from '../../../mocks';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

interface IPaginate {
  current_page: number;
  total_pages: number;
  data: IPropertyData[];
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
    data: PROPERTIES_LIST.paginate.data as IPropertyData[] || []
  };

  React.useEffect(() => {
    dispatch(propertiesServiceThunk(paginate.current_page));
  }, []);

  const checkIconFeatures = (check: boolean) => check ? <DoneIcon /> : <CloseIcon />;

  const list = () => (
    <List style={{ width: '100%' }}>
      {paginate.data.map((item, i) => (
        <React.Fragment key={String(i)}>
          <ListItem>
            <AvatarWrapper>
              <Avatar alt={`${item.title} - Foto ${i}`} src={item.photo ? item.photo.data.thumb : ''} />
              <Codes>
                <Chip label={`Código: ${item.code || '--'}`} style={{ marginBottom: '5px', marginRight: '3px' }} />
                <Chip label={`Código tipo: ${item.codePretty || '--'}`} />
              </Codes>
            </AvatarWrapper>
            <Box2>
              <ListItemTextStyle
                primary={item.title}
                secondary={item.descGeral}
              />
              <Box3 component="div">
                <Stack direction="column" spacing={1}>
                  <WrapperIconFeatures icon={checkIconFeatures(hasFeature(item, 'sitePublicarImovel'))} label="Publicado no site" />
                  <WrapperIconFeatures icon={checkIconFeatures(hasFeature(item, 'siteImovelDestaque'))} label="Em destaque" />
                  <WrapperIconFeatures icon={checkIconFeatures(hasFeature(item, 'hasExclusividade'))} label="Exclusividade" />
                </Stack>
              </Box3>
            </Box2>
            <Box4 component="div">
              <ListItemTextStyle
                secondaryTypographyProps={{ component: 'div' }}
                style={{
                  marginTop: 0,
                  flex: 'unset',
                }}
                secondary={
                  <React.Fragment>
                    <Stack direction="column" spacing={1} style={{ marginBottom: '5px' }}>
                      <Chip label={`Status: ${item.status || '--'}`} />
                      <Chip label={getValorPub(item)} />
                    </Stack>
                    {`Proprietário: ${item.owner.data.nomeRazao}`}
                  </React.Fragment>
                }
              />
            </Box4>
            <Actions component="div">
              <Fab size="small" variant="extended" style={{ fontSize: '10px', marginBottom: '5px', height: '30px', lineHeight: '1em' }}>
                <InfoIcon style={{ fontSize: '18px', marginRight: '5px' }} />
                Detalhes
              </Fab>
              <Fab size="small" variant="extended" style={{ fontSize: '10px', lineHeight: '1em', height: '30px' }}>
                <PermMediaIcon style={{ fontSize: '18px', marginRight: '7px' }} />
                Fotos e Vídeo
              </Fab>
              <SubActions component="div">
                <Fab size="small" color="secondary" variant="extended" style={{ fontSize: '10px', marginRight: '5px', lineHeight: '1em', height: '30px' }}>
                  <EditIcon style={{ fontSize: '18px', marginRight: '5px' }} />
                  Editar
                </Fab>
                <Fab size="small" color="error" aria-label="add" style={{ width: '36px', height: '36px' }}>
                  <DeleteIcon style={{ fontSize: '18px' }} />
                </Fab>
              </SubActions>
            </Actions>
          </ListItem>
        </React.Fragment>
      ))}
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