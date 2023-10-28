/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

/**
 * Third libs
*/
import { ListItem as ListItemMui, ListItemAvatar, Avatar, ListItemText, Divider } from '@mui/material';

import { hasProperty, getPhoto } from '../../helpers';

interface IProps<TItem> {
    dataResult: Record<string, any>;
    hideAvatar: boolean;
    primaryInfo: keyof Record<string, any>;
    secondaryInfo: keyof Record<string, any>;
    actionsComponent: (item: TItem) => React.ReactElement
}

function ListItems<TItem>({
  dataResult,
  hideAvatar,
  primaryInfo,
  secondaryInfo,
  actionsComponent
}: IProps<TItem>) {
  return dataResult?.map((item: any, i: number) => (
    <React.Fragment key={String(i)}>
      <ListItemMui alignItems="flex-start" sx={{ padding: '20px 10px' }}>
        {!hideAvatar && <ListItemAvatar>
          <Avatar
            alt={`${item[primaryInfo]} - Foto ${i}`} 
            src={hasProperty(item, 'photo.data') ? getPhoto(item.photo.data, 'thumb') : ''}
          />
        </ListItemAvatar>}
        <ListItemText
          primary={item[primaryInfo]}
          secondary={item[secondaryInfo]}
        />
        {actionsComponent(item)}
      </ListItemMui>
      <Divider variant="inset" component="li" />
    </React.Fragment>
  ));
}

export default ListItems;