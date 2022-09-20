import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';

import Search from '../Search';
import AccountMenu from '../AccountMenu';

interface IProps {
  toggleMenu: (event: React.MouseEvent, action: boolean) => unknown;
}

const Header = ({ toggleMenu }: IProps): React.ReactElement => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar 
          style={{
            flexDirection: 'row',
            backgroundColor: 'rgb(19, 47, 76)',
            border: '1px solid rgb(23, 58, 94)'
          }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            data-testid="toggle-left-menu-button"
            onClick={(e) => toggleMenu(e, true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <Search />
          <AccountMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;