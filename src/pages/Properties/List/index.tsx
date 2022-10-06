import * as React from 'react';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import Pagination from '@mui/material/Pagination';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import PermMediaIcon from '@mui/icons-material/PermMedia';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import LocationOn from '@mui/icons-material/LocationOn';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../stores/hooks';
import { propertiesServiceThunk, selectPropertiesListReducer } from '../../../reducers/properties/list';
import { useAppSelectorBlaBlaBal } from '../../../hooks/useReducerSelector';

import Search from '../../../components/Search';

import PropertyListItemSkeleton from './components/Skeleton';

import { hasFeature, getValorPub, getPhoto, hasProperty } from '../../../helpers';

import { IPaginateDefault, IPropertyData, IServiceRequest } from '../../../types';

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
  Actions, 
  SubActions, 
  WrapperIconFeatures, 
  WrapperOwner 
} from './styles';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

interface IPaginate {
  current_page: number;
  total_pages: number;
  data: IPropertyData[];
}

const PropertiesList = () => {
  const navigate = useNavigate();
  const query = useQuery();

  const { status } = useAppSelectorBlaBlaBal('propertiesListReducer') as IServiceRequest;
  const selectPropertiesListState = useAppSelector(selectPropertiesListReducer);
  const PROPERTIES_LIST = selectPropertiesListState.data as IPaginateDefault;

  const dispatch = useAppDispatch();

  const paginate: IPaginate = {
    current_page: query.get('page') ? Number(query.get('page')) : 1,
    total_pages: PROPERTIES_LIST?.paginate?.meta?.pagination?.total_pages || 0,
    data: PROPERTIES_LIST?.paginate?.data ? PROPERTIES_LIST.paginate.data as IPropertyData[] : []
  };

  const handleChange = (e: React.ChangeEvent<unknown>, page: number) => {
    dispatch(propertiesServiceThunk(page));
    navigate(`/properties?page=${page}`, {replace: true});
  };

  React.useEffect(() => {
    dispatch(propertiesServiceThunk(paginate.current_page));
  }, []);

  const checkIconFeatures = (check: boolean) => check ? <DoneIcon /> : <CloseIcon />;

  const handleGoToDetails = (code: number) => navigate(`/properties/${code}`);
  
  const list = () => (
    <List style={{ width: '100%' }}>
      {paginate.data.map((item, i) => (
        <React.Fragment key={String(i)}>
          <ListItem>
            <BoxInfo style={{ alignItems: 'stretch' }}>
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
                      <Chip label={getValorPub(item)} />
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
              <Actions>
                <Box>
                  <Fab
                    size="small" 
                    variant="extended" 
                    style={{ fontSize: '10px', marginBottom: '5px', height: '30px', lineHeight: '1em' }} 
                    onClick={() => handleGoToDetails(item.code)}
                  >
                    <InfoIcon style={{ fontSize: '18px', marginRight: '5px' }} />
                    Detalhes
                  </Fab>
                  <Fab size="small" variant="extended" style={{ fontSize: '10px', lineHeight: '1em', height: '30px' }}>
                    <PermMediaIcon style={{ fontSize: '18px', marginRight: '7px' }} />
                    Fotos e Vídeo
                  </Fab>
                </Box>
                <SubActions>
                  <Fab size="small" color="secondary" variant="extended" style={{ fontSize: '10px', marginRight: '5px', lineHeight: '1em', height: '30px' }}>
                    <EditIcon style={{ fontSize: '18px', marginRight: '5px' }} />
                  Editar
                  </Fab>
                  <Fab size="small" color="error" aria-label="add" style={{ width: '36px', height: '36px' }}>
                    <DeleteIcon style={{ fontSize: '18px' }} />
                  </Fab>
                </SubActions>
              </Actions>
            </BoxInfo>
            <Divider />
            <WrapperStack style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '20px 32px' }}>
              <WrapperDormGar>
                <ChipCustom
                  label={`${item.dormitorio || '--'} dormitório(s)`}
                  variant="outlined"
                  icon={<SingleBedIcon />}
                />
                <ChipCustom
                  label={`${item.garagem || '--'} carro(s)`}
                  variant="outlined"
                  icon={<DirectionsCarIcon />}
                />
              </WrapperDormGar>
              <Text>{item.descGeral}</Text>
            </WrapperStack>
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );

  const ListMemorized = React.useCallback(() => list(), [paginate.data]);

  return (
    <PropertiesContainer data-testid='propertiesList-container'>
      <Search />
      {status === 'loading' ? <PropertyListItemSkeleton /> : <ListMemorized />}
      <Divider component="div" style={{ margin: '20px 20px 30px' }} />
      <Stack spacing={2}>
        <Pagination size="large" variant="outlined" color="primary" count={paginate.total_pages} defaultPage={1} page={paginate.current_page} onChange={(e, page) => handleChange(e, page)} />
      </Stack>
    </PropertiesContainer>
  );
};

export default PropertiesList;