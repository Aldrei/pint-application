import * as React from 'react';

import HomeIcon from '@mui/icons-material/Home';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DoneIcon from '@mui/icons-material/Done';
import LocationOn from '@mui/icons-material/LocationOn';
import SingleBedIcon from '@mui/icons-material/SingleBed';

import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../hooks/useReducerDispatch';
import { propertiesServiceThunk } from '../../../reducers/properties/list';

import useQuery from '../../../hooks/useQuery';
import { useAppSelectorBlaBlaBal } from '../../../hooks/useReducerSelector';

import PropertiesActionsMenu from '../../../components/ActionsMenu/hocs/PropertiesActionsMenu';
import Button from '../../../components/Button';
import Search from '../../../components/Search';


import { getPhoto, hasFeature, hasProperty, showCurrency, showDormitorio, showGaragem } from '../../../helpers';

import { IPaginateDefault, IPropertyData, IServiceRequest, IServiceRequestStatus } from '../../../types';

import { ROUTES } from '../../../constants/routes';

import Skeleton from '../../../components/Skeleton';
import {
  ActionsContainer,
  Avatar,
  AvatarWrapper,
  Box4,
  BoxInfo,
  ChipCustom,
  Codes,
  ListItem,
  PropertiesContainer,
  StackSite,
  StackStatus,
  Text,
  Title,
  WrapperDormGar,
  WrapperIconFeatures,
  WrapperOwner,
  WrapperStack,
  WrapperTitle
} from './styles';

export interface IPaginate {
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
    dispatch(propertiesServiceThunk({ page }));
    navigate(ROUTES.propertiesList.go({ page }), { replace: true });
  };

  React.useEffect(() => {
    dispatch(propertiesServiceThunk({ page: paginate.current_page }));
  }, []);

  const checkIconFeatures = (check: boolean) => check ? <DoneIcon /> : <CloseIcon />;

  /**
   * Set ASC ordernation.
  */
  const [asc, setAsc] = React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch(propertiesServiceThunk({ page: 1, asc }));
    // TODO: Mock navigate in jest testt, this is a lazy solution.
    if(navigate) navigate(ROUTES.propertiesList.go({ page: 1 }), { replace: true });
  }, [asc]);

  /**
   * Action buttons.
  */
  const actionButtons = () => (
    <ActionsContainer sx={{ '& > :not(style)': { m: 1 } }} >
      <Button fab onClick={() => navigate(ROUTES.propertiesCreate.go())} text="Novo Imóvel" icon={<AddIcon />} />
      <Button fab onClick={() => setAsc(!asc)} text={asc ? 'Ver últimos adicionados' : 'Ver primeiros adicionados'} icon={<ImportExportIcon />} />
    </ActionsContainer>
  );
  
  const list = () => (
    <List style={{ width: '100%' }}>
      {paginate.data.map((item, i) => (
        <React.Fragment key={String(i)}>
          <ListItem>
            <BoxInfo>
              <AvatarWrapper>
                {hasProperty(item, 'photo.data') 
                  ? <Avatar alt={`${item.title} - Foto ${i}`} src={hasProperty(item, 'photo.data') ? getPhoto(item.photo.data, 'thumb') : ''} />
                  : <Avatar><HomeIcon /></Avatar>}
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
            <PropertiesActionsMenu item={item} />
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );

  const ListMemorized = React.useCallback(() => list(), [paginate.data]);

  return (
    <PropertiesContainer data-testid='propertiesList-container'>
      {PROPERTIES_STATUS === 'loading' ? <Skeleton /> : (
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