import { styled } from '@mui/material/styles';

import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';

export const ButtonStyle = styled(Button)<{ mycolor?: string, disabled?: boolean }>(({ mycolor, disabled }) => ({
  position: 'relative',
  marginBottom: '10px',
  height: '40px',
  minHeight: '40px',
  padding: '0 20px',
  border: '1px solid rgba(255, 255, 255, 0.23)',
  borderRadius: '4px',
  backgroundColor: 'transparent',
  color: 'inherit',
  cursor: 'pointer',
  '&:last-child': {
    marginBottom: 0,
  },
  '& .linear-progress': {
    position: 'absolute',
    top: '0',
    right: '0',
    left: '0',
    height: '2px',
  },
  ...(mycolor === 'blue' && { backgroundColor: 'rgb(0, 127, 255)', color: 'rgb(255, 255, 255)' }),
  ...(disabled && { cursor: 'not-allowed', opacity: '0.45' }),
}));

export const ButtonFabStyle = styled(Fab)<{ mycolor?: string, disabled?: boolean }>(({ mycolor, disabled }) => ({
  position: 'relative',
  overflow: 'hidden',
  marginBottom: '10px',
  border: '1px solid rgba(255, 255, 255, 0.23)',
  backgroundColor: 'transparent',
  color: 'inherit',
  cursor: 'pointer',
  '& .linear-progress': {
    position: 'absolute',
    top: '-1px',
    right: '0',
    left: '0',
    height: '3px',
  },
  '& .MuiSvgIcon-root': {
    marginRight: '8px'
  },
  ...(mycolor === 'blue' && { backgroundColor: 'rgb(0, 127, 255)', color: 'rgb(255, 255, 255)' }),
  ...(mycolor === 'red' && { backgroundColor: '#c62828', color: 'rgb(255, 255, 255)' }),
  ...(disabled && { cursor: 'not-allowed', opacity: '0.45' }),
}));
