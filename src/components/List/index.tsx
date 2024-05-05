/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { useAppDispatch } from '../../hooks/useReducerDispatch';

import { AsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

import { getPhoto, hasProperty } from '../../helpers';
import { useAppSelectorBlaBlaBal } from '../../hooks/useReducerSelector';
import { IPaginate } from '../../pages/Properties/List';
import { IReducersType } from '../../stores';
import { Container, InfosContainer, Title } from './styles';

import useQuery from '../../hooks/useQuery';
import { IRoute } from '../../types/routes';
import Skeleton from '../Skeleton';

interface IProps {
  // eslint-disable-next-line
  onReducerSource: AsyncThunk<AxiosResponse<any, any>, any, {}>;
  onPaginate: IRoute,
  stateAppSelector: keyof IReducersType,
  primaryInfo: any,
  secondaryInfo: any,
  actionsComponent?: any,
  hideAvatar?: boolean,
  footerPrimaryInfo?: any,
  footerSecondaryInfo?: any,
  title?: string
}

const ListComponent = ({ 
  onReducerSource,
  onPaginate,
  stateAppSelector,
  primaryInfo,
  secondaryInfo,
  footerPrimaryInfo,
  footerSecondaryInfo,
  actionsComponent,
  hideAvatar,
  title
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

  if (status === 'loading') return <Container>
    <Skeleton />
  </Container>;

  return (
    <Container>
      {title && <Title>{title}</Title>}
      {!!shouldRenderList && (
        <List>
          {dataResult?.paginate?.data?.map((item: any, i: number) => (
            <React.Fragment key={String(i)}>
              <ListItem alignItems="flex-start" sx={{ padding: '30px 10px' }}>
                {!hideAvatar && <ListItemAvatar>
                  <Avatar
                    alt={`${item[primaryInfo]} - Foto ${i}`} 
                    src={hasProperty(item, 'photo.data') ? getPhoto(item.photo.data, 'thumb') : ''}
                  />
                </ListItemAvatar>}
                <InfosContainer>
                  <ListItemText
                    primary={item[primaryInfo]}
                    secondary={item[secondaryInfo]}
                  />
                  <ListItemText
                    primary={item[footerPrimaryInfo]}
                    secondary={item[footerSecondaryInfo]}
                  />
                </InfosContainer>
                {actionsComponent?.(item)}
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      )}
      <Stack style={{ marginTop: '25px' }}>
        <Pagination size="large" variant="outlined" color="primary" count={paginate.total_pages} defaultPage={1} page={paginate.current_page} onChange={(e, page) => handleChange(e, page)} />
      </Stack>
    </Container>
  );
};

export default ListComponent;
