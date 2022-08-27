import * as React from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { MENU } from '../../constants';
import { useNavigate } from 'react-router-dom';

interface IProps {
  handleClose: (active: boolean) => void;
  menuActive: boolean;
}

const Menu = ({ menuActive, handleClose }: IProps): React.ReactElement => {
  const navigate = useNavigate();

  const handleRedirect = (route: string) => {
    try {
      navigate(route);
    } catch (error) {
      console.log(error);
    }
  };

  const list = () => (
    <Box
      sx={{ 
        width: 275,
      }}
    >
      <List>
        {Object.entries(MENU.PART_ONE).map((item, i) => (
          <ListItem key={String(i)} disablePadding>
            <ListItemButton onClick={() => handleRedirect(item[1].route)} style={{ flexDirection: 'row', color: 'rgb(178, 186, 194)' }}>
              <ListItemIcon style={{ color: 'rgb(178, 186, 194)' }}>
                {item[1].icon || ''}
              </ListItemIcon>
              <ListItemText primary={item[1].desc} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {Object.entries(MENU.PART_TWO).map((item, i) => (
          <ListItem key={String(i)} disablePadding>
            <ListItemButton onClick={() => handleRedirect(item[1].route)} style={{ flexDirection: 'row', color: 'rgb(178, 186, 194)' }}>
              <ListItemIcon style={{ color: 'rgb(178, 186, 194)' }}>
                {item[1].icon || ''}
              </ListItemIcon>
              <ListItemText primary={item[1].desc} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const closeDrawer =
    () =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        handleClose(false);
      };

  return (
    <div>
      <Drawer
        anchor='left'
        open={menuActive}
        onClose={closeDrawer()}
        PaperProps={{
          style: {
            backgroundColor: 'rgb(19, 47, 76)',
            borderRight: '1px solid rgb(23, 58, 94)'
          }
        }}
      >
        {list()}
      </Drawer>
    </div>
  );
};

export default Menu;