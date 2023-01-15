import { styled } from '@mui/material/styles';

import SpeedDial from '@mui/material/SpeedDial';

export const SpeedDialStyled = styled(SpeedDial)(({
  '& .MuiSpeedDialAction-staticTooltipLabel': {
    width: 'max-content'
  }
}));
