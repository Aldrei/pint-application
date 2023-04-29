import { styled } from '@mui/material/styles';

import { Stack, Button } from '@mui/material';

export const ActionsContainer = styled(Stack)({});

export const ActionButton = styled(Button)({
  display: 'flex',
  flexDirection: 'row',
  fontSize: '11px',
  '& .MuiButton-startIcon': {
    marginRight: '4px',
    pointerEvents: 'none'
  },
  '& .icon-delete': {
    marginRight: '-2px'
  }
});