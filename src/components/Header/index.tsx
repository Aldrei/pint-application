import * as React from 'react';

import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import ColorModeContext from '../../contexts/ColorModeContext';

import Search from '../Search';
import AccountMenu from '../AccountMenu';

interface IProps {
  toggleMenu: (event: React.MouseEvent, action: boolean) => unknown;
}

const Header = ({ toggleMenu }: IProps): React.ReactElement => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar 
          style={{
            flexDirection: 'row',
            backgroundColor: theme.palette.background.default,
            border: '1px solid rgb(23, 58, 94)',
            color: theme.palette.text.primary
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
            color="inherit"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <IconButton sx={{ mr: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Search />
          <AccountMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;