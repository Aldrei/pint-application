import * as React from 'react';

import CreditCardIcon from '@mui/icons-material/CreditCard';
import Logout from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useAppDispatch } from '../../hooks/useReducerDispatch';
import { useAppSelectorBlaBlaBal } from '../../hooks/useReducerSelector';
import { IAuthState, revokeServiceThunk } from '../../reducers/auth';

const AccountMenu = () => {
  const navigate = useNavigate();

  const { accessToken } = useAppSelectorBlaBlaBal('authReducer') as IAuthState;
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleRevoke = () => dispatch(revokeServiceThunk({ token: accessToken.access_token as string }));

  const goToSubscription = () => navigate(ROUTES.subscription.go());

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Perfil">
          <IconButton
            data-testid="account-menu-button-open-testid"
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        data-testid="account-menu-list-testid"
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            backgroundColor: (theme) => theme.palette.background.paper,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={goToSubscription} data-testid="account-menu-list-logout-option">
          <ListItemIcon>
            <CreditCardIcon fontSize="small" />
          </ListItemIcon>
          Assinatura
        </MenuItem>
        <MenuItem onClick={handleRevoke} data-testid="account-menu-list-logout-option">
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default AccountMenu;