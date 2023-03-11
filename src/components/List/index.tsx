import React from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { useAppDispatch } from '../../hooks/useReducerDispatch';

import { useNavigate } from 'react-router-dom';
import { AsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { Container } from './styles';
import { useAppSelectorBlaBlaBal } from '../../hooks/useReducerSelector';
import { getPhoto, hasProperty } from '../../helpers';
import { IReducersType } from '../../stores';
import { IPaginate } from '../../pages/Properties/List';

import useQuery from '../../hooks/useQuery';
import { IRoute } from '../../types/routes';

interface IProps {
  // eslint-disable-next-line
  onReducerSource: AsyncThunk<AxiosResponse<any, any>, any, {}>;
  onPaginate: IRoute,
  stateAppSelector: keyof IReducersType,
  primaryInfo: any,
  secondaryInfo: any,
}

const ListComponent = ({ 
  onReducerSource,
  onPaginate,
  stateAppSelector,
  primaryInfo,
  secondaryInfo,
}: IProps) => {
  const navigate = useNavigate();
  const queryParams = useQuery();

  const { status, data: dataResult } = useAppSelectorBlaBlaBal(stateAppSelector) as any;
  
  // const theme = useTheme();
  const dispatch = useAppDispatch();

  const page = queryParams.get('page');

  React.useEffect(() => {
    const resolveDispatch = async () => {
      if (onReducerSource) {
        dispatch(onReducerSource({ page }));
      }
    };

    resolveDispatch();
  }, [page]);

  const handleChange = (e: React.ChangeEvent<unknown>, page: number) => {
    // dispatch(onReducerSource({ page }));
    navigate(onPaginate.go({ page }), { replace: true });
  };

  const paginate: IPaginate = {
    current_page: page ? Number(page) : 1,
    total_pages: dataResult?.paginate?.meta?.pagination?.total_pages || 0,
    data: dataResult?.paginate?.data ? dataResult.paginate.data : []
  };

  const shouldRenderList = (dataResult?.paginate?.data && status !== 'loading');

  return (
    <Container>
      {status === 'loading' && (
        <span>Loading...</span>
      )}
      {!!shouldRenderList && (
        <List>
          {dataResult?.paginate?.data?.map((item: any, i: number) => (
            <React.Fragment key={String(i)}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={`${item[primaryInfo]} - Foto ${i}`} 
                    src={hasProperty(item, 'photo.data') ? getPhoto(item.photo.data, 'thumb') : ''}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item[primaryInfo]}
                  secondary={item[secondaryInfo]}
                />
                {/* <ActionsMenu item={item} handleCb={() => handleClose()} /> */}
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      )}
      <Stack spacing={2}>
        <Pagination size="large" variant="outlined" color="primary" count={paginate.total_pages} defaultPage={1} page={paginate.current_page} onChange={(e, page) => handleChange(e, page)} />
      </Stack>
    </Container>
  );
};

export default ListComponent;
