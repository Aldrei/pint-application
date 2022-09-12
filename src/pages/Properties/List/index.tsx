import * as React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

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

import { PropertiesContainer } from './styles';
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
          <ListItem alignItems="flex-start" style={{
            justifyContent: 'space-between',
            backgroundColor: 'rgb(19, 47, 76)',
            border: '1px solid rgb(23, 58, 94)',
            marginBottom: '5px',
            borderRadius: '5px',
            padding: '12px 20px'
          }}>
            <ListItemAvatar style={{ width: '95px' }}>
              <Avatar alt={`${item[1].title} - Foto ${i}`} src={item[1].photo ? item[1].photo.data.thumb : ''} style={{ width: '75px', height: '75px' }} />
            </ListItemAvatar>
            <ListItemText
              secondaryTypographyProps={{ component: 'div' }}
              style={{
                flex: 'unset',
                width: '290px'
              }}
              primary={item[1].title}
              secondary={
                <React.Fragment>
                  <Stack direction="row" spacing={1} style={{
                    margin: '3px 0'
                  }}>
                    <Chip label={`Código: ${item[1].code || '--'}`} />
                    <Chip label={`Código tipo: ${item[1].codePretty || '--'}`} />
                  </Stack>
                  {item[1].descGeral}
                </React.Fragment>
              }
            />
            <Box component="div" style={{ 
              padding: '0 10px'
            }}>
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
            </Box>
            <Box component="div" style={{ 
              padding: '0 10px'
            }}>
              <ListItemText
                secondaryTypographyProps={{ component: 'div' }}
                style={{
                  marginTop: 0,
                  flex: 'unset',
                }}
                // primary={`Proprietário: ${item[1].owner.data.nomeRazao}`}
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
            </Box>
            <Box component="div" style={{
              flexGrow: 1,
              maxWidth: '210px',
              padding: '0 10px',
            }}>
              <Fab size="small" variant="extended" style={{ marginBottom: '5px' }}>
                <InfoIcon style={{ marginRight: '5px' }} />
                Detalhes
              </Fab>
              <Fab size="small" variant="extended">
                <PermMediaIcon style={{ marginRight: '7px' }} />
                Fotos e Vídeo
              </Fab>
              <Box component="div" style={{
                flexDirection: 'row',
                justifyContent: 'end',
                marginTop: '15px'
              }}>
                <Fab size="small" color="secondary" variant="extended" style={{ marginRight: '5px' }}>
                  <EditIcon fontSize="small" style={{ marginRight: '5px' }} />
                  Editar
                </Fab>
                <Fab size="small" color="error" aria-label="add">
                  <DeleteIcon />
                </Fab>
              </Box>
            </Box>
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