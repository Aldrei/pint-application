import * as React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
// import Box from '@mui/material/Box';

import Fab from '@mui/material/Fab';
import Pagination from '@mui/material/Pagination';

import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import DeleteIcon from '@mui/icons-material/Delete';

import DoneIcon from '@mui/icons-material/Done';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { propertiesServiceThunk, selectPropertiesListReducer } from '../../../reducer/properties/list';

import { PropertiesContainer, AvatarWrapper, Avatar, Codes, ListItem, ListItemTextStyle, Box2, Box3, Box4, Actions, SubActions } from './styles';
import { IListRequest, IPaginatePropertyData } from '../../../types';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

interface IPaginate {
  current_page: number;
  total_pages: number;
  data: IPaginatePropertyData[];
}

const PropertiesList = () => {
  const navigate = useNavigate();
  const query = useQuery();

  const selectPropertiesListState = useAppSelector(selectPropertiesListReducer);
  const PROPERTIES_LIST = selectPropertiesListState?.data as IListRequest;
  
  const dispatch = useAppDispatch();

  const paginate: IPaginate = {
    current_page: query.get('page') ? Number(query.get('page')) : 1,
    total_pages: PROPERTIES_LIST ? PROPERTIES_LIST.paginate.meta.pagination.total_pages : 0,
    data: PROPERTIES_LIST ? PROPERTIES_LIST.paginate.data : []
  };

  const handleChange = (e: React.ChangeEvent<unknown>, page: number) => {
    dispatch(propertiesServiceThunk(page));
    navigate(`/properties?page=${page}`, {replace: true});
  };

  React.useEffect(() => {
    if (!paginate.data.length) {
      dispatch(propertiesServiceThunk(paginate.current_page));
    }
  }, [paginate]);

  const list = () => (
    <List style={{ width: '100%' }}>
      {Object.entries(paginate.data).map((item, i) => (
        <React.Fragment key={String(i)}>
          <ListItem>
            <AvatarWrapper>
              <Avatar alt={`${item[1].title} - Foto ${i}`} src={item[1].photo ? item[1].photo.data.thumb : ''} />
              <Codes>
                <Chip label={`Código: ${item[1].code || '--'}`} style={{ marginBottom: '5px' }} />
                <Chip label={`Código tipo: ${item[1].codePretty || '--'}`} />
              </Codes>
            </AvatarWrapper>
            <Box2>
              <ListItemTextStyle
                primary={item[1].title}
                secondary={item[1].descGeral}
              />
              <Box3 component="div">
                <Stack direction="column" spacing={1}>
                  <Chip icon={<DoneIcon />} label="Publicado no site" style={{
                    flexDirection: 'row',
                    justifyContent: 'left'
                  }} />
                  <Chip icon={<DoneIcon />} label="Em destaque" style={{
                    flexDirection: 'row',
                    justifyContent: 'left'
                  }} />
                  <Chip icon={<DoneIcon />} label="Exclusividade" style={{
                    flexDirection: 'row',
                    justifyContent: 'left'
                  }} />
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
                      <Chip label={`Status: ${item[1].status || '--'}`} />
                      <Chip label={`Valor: ${item[1].valor || '--'}`} />
                    </Stack>
                    {`Proprietário: ${item[1].owner.data.nomeRazao}`}
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
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );

  return (
    <PropertiesContainer data-testid='propertiesList-container'>
      {list()}
      <Stack spacing={2}>
        <Pagination size="large" variant="outlined" color="primary" count={paginate.total_pages} defaultPage={1} page={paginate.current_page} onChange={(e, page) => handleChange(e, page)} />
      </Stack>
    </PropertiesContainer>
  );
};

export default PropertiesList;