import * as React from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

interface IProps {
  handleClose: (active: boolean) => void;
  menuActive: boolean;
}

const Menu = ({ menuActive, handleClose }: IProps): React.ReactElement => {
  const list = () => (
    <Box
      sx={{ 
        width: 250,
      }}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton style={{ flexDirection: 'row', color: 'rgb(178, 186, 194)' }}>
              <ListItemIcon style={{ color: 'rgb(178, 186, 194)' }}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton style={{ flexDirection: 'row', color: 'rgb(178, 186, 194)' }}>
              <ListItemIcon style={{ color: 'rgb(178, 186, 194)' }}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  console.log('#### menuActive:', menuActive);

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