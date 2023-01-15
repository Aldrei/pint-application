import * as React from 'react';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import Pagination from '@mui/material/Pagination';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import LocationOn from '@mui/icons-material/LocationOn';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AddIcon from '@mui/icons-material/Add';

import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../hooks/useReducerDispatch';
import { propertiesServiceThunk } from '../../../reducers/properties/list';

import { useAppSelectorBlaBlaBal } from '../../../hooks/useReducerSelector';
import useQuery from '../../../hooks/useQuery';

import Search from '../../../components/Search';

import PropertyListItemSkeleton from './components/PropertyListItemSkeleton';
import ActionsMenu from './components/ActionsMenu';

import { hasFeature, getPhoto, hasProperty, showDormitorio, showGaragem, showCurrency } from '../../../helpers';

import { IPaginateDefault, IPropertyData, IServiceRequest, IServiceRequestStatus } from '../../../types';

import { ROUTES } from '../../../constants/routes';

import { 
  PropertiesContainer, 
  BoxInfo,
  WrapperDormGar,
  WrapperStack, 
  WrapperTitle, 
  Title, 
  Text, 
  ChipCustom, 
  AvatarWrapper, 
  Avatar, 
  Codes, 
  ListItem, 
  StackStatus, 
  Box4, 
  StackSite, 
  WrapperIconFeatures, 
  WrapperOwner,
  ActionsContainer
} from './styles';

interface IPaginate {
  current_page: number;
  total_pages: number;
  data: IPropertyData[];
}

const PropertiesList = () => {
  const navigate = useNavigate();
  const queryParams = useQuery();

  const propertiesListReducer = useAppSelectorBlaBlaBal('propertiesListReducer') as IServiceRequest;
  const PROPERTIES_STATUS = propertiesListReducer.status as IServiceRequestStatus;
  const PROPERTIES_LIST = propertiesListReducer.data as IPaginateDefault;

  const dispatch = useAppDispatch();

  const paginate: IPaginate = {
    current_page: queryParams.get('page') ? Number(queryParams.get('page')) : 1,
    total_pages: PROPERTIES_LIST?.paginate?.meta?.pagination?.total_pages || 0,
    data: PROPERTIES_LIST?.paginate?.data ? PROPERTIES_LIST.paginate.data as IPropertyData[] : []
  };

  const handleChange = (e: React.ChangeEvent<unknown>, page: number) => {
    dispatch(propertiesServiceThunk(page));
    navigate(ROUTES.propertiesList.go({ page }), {replace: true});
  };

  React.useEffect(() => {
    dispatch(propertiesServiceThunk(paginate.current_page));
  }, []);

  const checkIconFeatures = (check: boolean) => check ? <DoneIcon /> : <CloseIcon />;

  /**
   * Action buttons.
  */
  const actionButtons = () => (
    <ActionsContainer sx={{ '& > :not(style)': { m: 1 } }} >
      <Fab size="small" color="primary" aria-label="add" variant="extended" onClick={() => navigate(ROUTES.propertiesCreate.go())}>
        <AddIcon />
        Novo Imóvel
      </Fab>
    </ActionsContainer>
  );
  
  const list = () => (
    <List style={{ width: '100%' }}>
      {paginate.data.map((item, i) => (
        <React.Fragment key={String(i)}>
          <ListItem>
            <BoxInfo>
              <AvatarWrapper>
                <Avatar alt={`${item.title} - Foto ${i}`} src={hasProperty(item, 'photo.data') ? getPhoto(item.photo.data, 'thumb') : ''} />
                <Codes>
                  <Chip label={`Código: ${item.code || '--'}`} style={{ marginBottom: '5px', marginRight: '3px' }} />
                  <Chip label={`Código tipo: ${item.codePretty || '--'}`} />
                </Codes>
              </AvatarWrapper>
              <WrapperTitle
                spacing={0.5}
                style={{ alignItems: 'stretch', justifyContent: 'space-evenly' }}
              >
                <Box>
                  <Text sx={{ fontWeight: 400 }}>{item.nomeImovel}</Text>
                  <Title style={{ display: 'flex', alignItems: 'flex-start', marginTop: '3px' }}>
                    <LocationOn sx={{ marginLeft: '-5px' }} /> {item.city.data.long_desc} - {item.neighborhood.data.nome}, {item.localLogradouro}, núm. {item.localNumero || '--'}, apto {item.apApto || '--'} - CEP {item.localCEP || '--'}
                  </Title>
                  <Box4>
                    <StackStatus direction="row" spacing={1} style={{ margin: '5px 0' }}>
                      <Chip label={`Status: ${item.status || '--'}`} />
                      <Chip label={showCurrency(item, 'valor')} />
                    </StackStatus>
                    <StackSite spacing={1}>
                      <WrapperIconFeatures icon={checkIconFeatures(hasFeature(item, 'sitePublicarImovel'))} label="Publicado no site" />
                      <WrapperIconFeatures icon={checkIconFeatures(hasFeature(item, 'siteImovelDestaque'))} label="Em destaque" />
                      <WrapperIconFeatures icon={checkIconFeatures(hasFeature(item, 'hasExclusividade'))} label="Exclusividade" />
                    </StackSite>
                  </Box4>
                </Box>
                <WrapperOwner>
                  <Title style={{ fontSize: '14px' }}>{`Proprietário: ${item.owner.data.nomeRazao}`}</Title>
                </WrapperOwner>
              </WrapperTitle>
            </BoxInfo>
            <Divider />
            <WrapperStack>
              <WrapperDormGar>
                <ChipCustom
                  label={showDormitorio(item)}
                  variant="outlined"
                  icon={<SingleBedIcon />}
                />
                <ChipCustom
                  label={showGaragem(item)}
                  variant="outlined"
                  icon={<DirectionsCarIcon />}
                />
              </WrapperDormGar>
              <Text>{item.descGeral}</Text>
            </WrapperStack>
            <ActionsMenu item={item} />
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );

  const ListMemorized = React.useCallback(() => list(), [paginate.data]);

  return (
    <PropertiesContainer data-testid='propertiesList-container'>
      {PROPERTIES_STATUS === 'loading' ? <PropertyListItemSkeleton /> : (
        <React.Fragment>
          {actionButtons()}
          <Search />
          <ListMemorized />
          <Divider component="div" style={{ margin: '20px 20px 30px' }} />
          <Stack spacing={2}>
            <Pagination size="large" variant="outlined" color="primary" count={paginate.total_pages} defaultPage={1} page={paginate.current_page} onChange={(e, page) => handleChange(e, page)} />
          </Stack>
        </React.Fragment>
      )}
    </PropertiesContainer>
  );
};

export default PropertiesList;