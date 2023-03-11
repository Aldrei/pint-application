import * as React from 'react';

import SpeedDialAction from '@mui/material/SpeedDialAction';

import MenuIcon from '@mui/icons-material/Menu';

import { SpeedDialStyled } from './styles';

export interface IAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  title: string;
  onClick: () => void;
}

interface IProps {
  actions: IAction[],
}

const ActionsMenu = ({ actions }: IProps) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <SpeedDialStyled
        direction='down'
        ariaLabel="SpeedDial tooltip example"
        sx={{ 
          position: 'absolute', 
          top: 16, 
          right: 16,
          '& .MuiButtonBase-root': {
            width: '50px',
            height: '50px',
          }
        }}
        icon={<MenuIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions && actions.map((action, i) => (
          <SpeedDialAction
            key={String(i)}
            tooltipTitle={action.title}
            icon={action.icon}
            tooltipOpen
            onClick={() => {
              try {
                action.onClick();
              } catch (error) {
                console.log(error);
              }
            }}
          />
        ))}
      </SpeedDialStyled>
    </React.Fragment>
  );
};

export default ActionsMenu;
