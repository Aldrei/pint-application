import * as React from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';
import { MENU } from '../../constants';

interface IProps {
  handleClose: (active: boolean) => void;
  menuActive: boolean;
}

const Menu = ({ menuActive, handleClose }: IProps): React.ReactElement => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleRedirect = (route: string) => {
    navigate(route);
    handleClose(false);
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
            <ListItemButton data-testid={`menu-list1-button-${i}`} onClick={() => handleRedirect(item[1].route)} style={{ flexDirection: 'row', color: theme.palette.text.primary }}>
              <ListItemIcon style={{ color: theme.palette.text.primary }}>
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
            <ListItemButton data-testid={`menu-list2-button-${i}`} onClick={() => handleRedirect(item[1].route)} style={{ flexDirection: 'row', color: theme.palette.text.primary }}>
              <ListItemIcon style={{ color: theme.palette.text.primary }}>
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
      (
        // event: React.KeyboardEvent | React.MouseEvent
      ) => {
        // console.log('#### Menu event.type:', event.type);
        // if (
        //   event.type === 'keydown' &&
        //   ((event as React.KeyboardEvent).key === 'Tab' ||
        //     (event as React.KeyboardEvent).key === 'Shift')
        // ) {
        //   return;
        // }

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
            backgroundColor: theme.palette.background.default,
            backgroundImage: 'unset',
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